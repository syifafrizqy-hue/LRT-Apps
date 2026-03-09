import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "lrt-secret-key-2024";

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "lrt_bus",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // Middleware to check auth
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // Auth Routes
  app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const [rows]: any = await pool.execute("SELECT * FROM users WHERE username = ?", [username]);
      const user = rows[0];
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
      res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' });
      res.json({ user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ success: true });
  });

  app.get("/api/auth/me", authenticate, (req: any, res) => {
    res.json({ user: req.user });
  });

  // Public Data Routes
  app.get("/api/public/data", async (req, res) => {
    try {
      const [settings] = await pool.execute("SELECT * FROM settings");
      const [banners] = await pool.execute("SELECT * FROM banners ORDER BY sort_order ASC");
      const [fleet] = await pool.execute("SELECT * FROM fleet");
      const [articles] = await pool.execute("SELECT * FROM articles ORDER BY created_at DESC LIMIT 6");
      const [clients] = await pool.execute("SELECT * FROM clients");
      const [aboutRows]: any = await pool.execute("SELECT * FROM about LIMIT 1");
      const [reviews] = await pool.execute("SELECT * FROM reviews WHERE is_approved = 1 ORDER BY date DESC");

      res.json({
        settings,
        banners,
        fleet,
        articles,
        clients,
        about: aboutRows[0] || null,
        reviews
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch public data" });
    }
  });

  app.get("/api/public/articles", async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;
    const search = (req.query.search as string) || "";
    const category = (req.query.category as string) || "Semua";
    const offset = (page - 1) * limit;

    try {
      let query = "SELECT * FROM articles WHERE 1=1";
      let countQuery = "SELECT COUNT(*) as count FROM articles WHERE 1=1";
      const params: any[] = [];

      if (search) {
        query += " AND (title LIKE ? OR content LIKE ?)";
        countQuery += " AND (title LIKE ? OR content LIKE ?)";
        params.push(`%${search}%`, `%${search}%`);
      }

      if (category !== "Semua") {
        query += " AND category = ?";
        countQuery += " AND category = ?";
        params.push(category);
      }

      query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
      const [items] = await pool.execute(query, [...params, limit.toString(), offset.toString()]);
      const [countRows]: any = await pool.execute(countQuery, params);
      const total = countRows[0].count;

      res.json({
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/public/articles/:id", async (req, res) => {
    try {
      const [rows]: any = await pool.execute("SELECT * FROM articles WHERE id = ?", [req.params.id]);
      const article = rows[0];
      if (!article) return res.status(404).json({ error: "Article not found" });
      
      const [latest] = await pool.execute("SELECT id, title, image_url, created_at FROM articles WHERE id != ? ORDER BY created_at DESC LIMIT 5", [req.params.id]);
      
      res.json({ article, latest });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.post("/api/public/book", async (req, res) => {
    const { name, phone, fleetId, fleetName, date, duration, destination } = req.body;
    try {
      await pool.execute(`
        INSERT INTO bookings (name, phone, fleet_id, fleet_name, date, duration, destination)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [name, phone, fleetId, fleetName, date, duration, destination]);

      const confirmationMessage = `*KONFIRMASI BOOKING LAWANG RIZKI TRANSPORT*\n\nHalo ${name}, terima kasih telah melakukan pemesanan!\n\n*Detail Pesanan:*\n- Armada: ${fleetName}\n- Tanggal: ${date}\n- Durasi: ${duration} Hari\n- Tujuan: ${destination}\n\nTim kami akan segera memproses pesanan Anda. Mohon tunggu konfirmasi ketersediaan unit.\n\nTerima kasih telah memilih Lawang Rizki Transport!`;
      res.json({ message: confirmationMessage });
    } catch (error) {
      res.status(500).json({ error: "Booking failed" });
    }
  });

  // Dashboard Stats Route
  app.get("/api/admin/dashboard-stats", authenticate, async (req, res) => {
    try {
      const [totalBookings]: any = await pool.execute("SELECT COUNT(*) as count FROM bookings");
      const [pendingBookings]: any = await pool.execute("SELECT COUNT(*) as count FROM bookings WHERE status = 'Pending'");
      const [totalFleet]: any = await pool.execute("SELECT COUNT(*) as count FROM fleet");
      const [totalArticles]: any = await pool.execute("SELECT COUNT(*) as count FROM articles");
      const [recentBookings] = await pool.execute("SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5");
      const [statusStats] = await pool.execute("SELECT status as name, COUNT(*) as value FROM bookings GROUP BY status");
      const [timeStats] = await pool.execute(`
        SELECT DATE(created_at) as date, COUNT(*) as count 
        FROM bookings 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `);

      res.json({
        total_bookings: totalBookings[0],
        pending_bookings: pendingBookings[0],
        total_fleet: totalFleet[0],
        total_articles: totalArticles[0],
        recent_bookings: recentBookings,
        bookings_by_status: statusStats,
        bookings_over_time: timeStats
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Admin CRUD Routes
  const tables = ["banners", "fleet", "articles", "clients", "about", "settings", "reviews", "users", "bookings"];
  
  tables.forEach(table => {
    app.get(`/api/admin/${table}`, authenticate, async (req, res) => {
      try {
        const [rows] = await pool.execute(`SELECT * FROM ${table}`);
        res.json(rows);
      } catch (error) {
        res.status(500).json({ error: `Failed to fetch ${table}` });
      }
    });

    app.post(`/api/admin/${table}`, authenticate, async (req, res) => {
      try {
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        const placeholders = keys.map(() => "?").join(",");
        const [result]: any = await pool.execute(`INSERT INTO ${table} (${keys.join(",")}) VALUES (${placeholders})`, values as any[]);
        res.json({ id: result.insertId });
      } catch (error) {
        res.status(500).json({ error: `Failed to create ${table}` });
      }
    });

    app.put(`/api/admin/${table}/:id`, authenticate, async (req, res) => {
      try {
        const { id } = req.params;
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        const setClause = keys.map(k => `${k} = ?`).join(",");
        await pool.execute(`UPDATE ${table} SET ${setClause} WHERE id = ?`, [...values, id] as any[]);
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: `Failed to update ${table}` });
      }
    });

    app.delete(`/api/admin/${table}/:id`, authenticate, async (req, res) => {
      try {
        await pool.execute(`DELETE FROM ${table} WHERE id = ?`, [req.params.id]);
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: `Failed to delete ${table}` });
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
