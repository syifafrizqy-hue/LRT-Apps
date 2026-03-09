import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("lrt.db");
const JWT_SECRET = "lrt-secret-key-2024";

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'admin'
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS banners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    subtitle TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS fleet (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    price TEXT,
    price_numeric INTEGER,
    capacity INTEGER,
    description TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    category TEXT,
    image_url TEXT,
    author TEXT DEFAULT 'Admin',
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    review_text TEXT,
    rating INTEGER,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_approved INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    logo_url TEXT
  );

  CREATE TABLE IF NOT EXISTS about (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    fleet_id INTEGER,
    fleet_name TEXT,
    date TEXT,
    duration INTEGER,
    destination TEXT,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
`);

// Migration for existing articles table
try { db.exec("ALTER TABLE articles ADD COLUMN author TEXT DEFAULT 'Admin'"); } catch(e) {}
try { db.exec("ALTER TABLE articles ADD COLUMN description TEXT"); } catch(e) {}

// Seed default admin if not exists
const admin = db.prepare("SELECT * FROM users WHERE username = ?").get("admin");
if (!admin) {
  const hashedPassword = bcrypt.hashSync("admin123", 10);
  db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run("admin", hashedPassword, "admin");
}

// Seed default settings
const defaultSettings = [
  { key: "sticky_info", value: "Promo Ramadhan! Diskon 10% untuk penyewaan Hiace dan Bus Pariwisata." },
  { key: "whatsapp_number", value: "6281234567890" },
  { key: "footer_address", value: "Jl. Lawang Rizki No. 123, Jakarta, Indonesia" },
  { key: "footer_email", value: "info@lawangrizki.com" },
  { key: "footer_phone", value: "+62 812 3456 7890" },
  { key: "site_title", value: "Lawang Rizki Transport - Sewa Hiace & Bus Pariwisata" },
  { key: "site_description", value: "Penyedia layanan sewa Hiace, Bus Pariwisata, dan mobil mewah terpercaya di Jakarta. Armada terbaru, driver profesional, harga kompetitif." },
  { key: "site_keywords", value: "sewa hiace jakarta, sewa bus pariwisata, rental mobil jakarta, lawang rizki transport" },
  { key: "favicon_url", value: "https://picsum.photos/seed/lrt-favicon/32/32" },
  { key: "logo_main", value: "" }, // Empty means use default text logo
  { key: "logo_login", value: "" },
  { key: "logo_admin", value: "" },
  { key: "google_analytics_id", value: "" },
  { key: "google_tag_manager_id", value: "" }
];

const insertSetting = db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)");
defaultSettings.forEach(s => insertSetting.run(s.key, s.value));

// Seed sample data if empty
const seedData = () => {
  const bannerCount = db.prepare("SELECT COUNT(*) as count FROM banners").get() as any;
  if (bannerCount.count === 0) {
    db.prepare("INSERT INTO banners (title, subtitle, image_url, sort_order) VALUES (?, ?, ?, ?)").run(
      "Perjalanan Nyaman Bersama LRT",
      "Sewa Hiace & Bus Pariwisata dengan fasilitas premium dan pengemudi profesional.",
      "https://picsum.photos/seed/lrt-banner-1/1920/1080",
      1
    );
    db.prepare("INSERT INTO banners (title, subtitle, image_url, sort_order) VALUES (?, ?, ?, ?)").run(
      "Armada Terbaru & Terawat",
      "Kami menjamin kebersihan dan performa armada kami untuk kenyamanan Anda.",
      "https://picsum.photos/seed/lrt-banner-2/1920/1080",
      2
    );
  }

  const fleetCount = db.prepare("SELECT COUNT(*) as count FROM fleet").get() as any;
  if (fleetCount.count === 0) {
    db.prepare("INSERT INTO fleet (name, type, price, price_numeric, capacity, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
      "Toyota Hiace Premio", "Hiace", "Rp 1.500.000", 1500000, 14, "Hiace Premio terbaru dengan kursi yang lega dan AC dingin.", "https://picsum.photos/seed/hiace/800/600"
    );
    db.prepare("INSERT INTO fleet (name, type, price, price_numeric, capacity, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
      "Big Bus Pariwisata", "Bus", "Rp 3.500.000", 3500000, 59, "Bus besar dengan fasilitas karaoke, toilet, dan reclining seat.", "https://picsum.photos/seed/bus/800/600"
    );
    db.prepare("INSERT INTO fleet (name, type, price, price_numeric, capacity, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
      "Innova Reborn", "Mobil", "Rp 800.000", 800000, 7, "Mobil keluarga premium untuk perjalanan dalam dan luar kota.", "https://picsum.photos/seed/innova/800/600"
    );
  }

  const articleCount = db.prepare("SELECT COUNT(*) as count FROM articles").get() as any;
  if (articleCount.count === 0) {
    db.prepare("INSERT INTO articles (title, content, category, image_url) VALUES (?, ?, ?, ?)").run(
      "Tips Memilih Bus Pariwisata", "Berikut adalah tips penting sebelum Anda menyewa bus untuk perjalanan keluarga...", "Tips Perjalanan", "https://picsum.photos/seed/tips-bus/800/600"
    );
    db.prepare("INSERT INTO articles (title, content, category, image_url) VALUES (?, ?, ?, ?)").run(
      "Destinasi Wisata Bandung", "Bandung selalu menjadi pilihan favorit untuk berakhir pekan. Berikut 5 tempat wajib...", "Destinasi", "https://picsum.photos/seed/bandung/800/600"
    );
  }

  const reviewCount = db.prepare("SELECT COUNT(*) as count FROM reviews").get() as any;
  if (reviewCount.count === 0) {
    db.prepare("INSERT INTO reviews (customer_name, review_text, rating) VALUES (?, ?, ?)").run(
      "Budi Santoso", "Layanan sangat memuaskan, driver ramah dan tepat waktu. Unit Hiace sangat bersih.", 5
    );
    db.prepare("INSERT INTO reviews (customer_name, review_text, rating) VALUES (?, ?, ?)").run(
      "Siti Aminah", "Bus pariwisatanya nyaman sekali untuk rombongan kantor. Fasilitas karaoke oke banget!", 5
    );
  }

  const clientCount = db.prepare("SELECT COUNT(*) as count FROM clients").get() as any;
  if (clientCount.count === 0) {
    db.prepare("INSERT INTO clients (name, logo_url) VALUES (?, ?)").run("Google", "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg");
    db.prepare("INSERT INTO clients (name, logo_url) VALUES (?, ?)").run("Microsoft", "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg");
    db.prepare("INSERT INTO clients (name, logo_url) VALUES (?, ?)").run("Amazon", "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg");
  }

  const aboutCount = db.prepare("SELECT COUNT(*) as count FROM about").get() as any;
  if (aboutCount.count === 0) {
    db.prepare("INSERT INTO about (title, content, image_url) VALUES (?, ?, ?)").run(
      "Solusi Transportasi Terpercaya",
      "Lawang Rizki Transport adalah perusahaan yang bergerak di bidang jasa sewa kendaraan pariwisata. Kami berkomitmen memberikan layanan terbaik dengan armada yang selalu prima.",
      "https://picsum.photos/seed/about-img/800/1000"
    );
  }
};
seedData();

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
  app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    const user: any = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' });
    res.json({ user: { id: user.id, username: user.username, role: user.role } });
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ success: true });
  });

  app.get("/api/auth/me", authenticate, (req: any, res) => {
    res.json({ user: req.user });
  });

  // Public Data Routes
  app.get("/api/public/data", (req, res) => {
    const data = {
      settings: db.prepare("SELECT * FROM settings").all(),
      banners: db.prepare("SELECT * FROM banners ORDER BY sort_order ASC").all(),
      fleet: db.prepare("SELECT * FROM fleet").all(),
      articles: db.prepare("SELECT * FROM articles ORDER BY created_at DESC LIMIT 6").all(),
      clients: db.prepare("SELECT * FROM clients").all(),
      about: db.prepare("SELECT * FROM about LIMIT 1").get(),
      reviews: db.prepare("SELECT * FROM reviews WHERE is_approved = 1 ORDER BY date DESC").all()
    };
    res.json(data);
  });

  app.get("/api/public/articles", (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;
    const search = (req.query.search as string) || "";
    const category = (req.query.category as string) || "Semua";
    const offset = (page - 1) * limit;

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
    const items = db.prepare(query).all(...params, limit, offset);
    const total = (db.prepare(countQuery).get(...params) as any).count;

    res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  });

  app.get("/api/public/articles/:id", (req, res) => {
    const article = db.prepare("SELECT * FROM articles WHERE id = ?").get(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });
    
    // Get latest articles for sidebar
    const latest = db.prepare("SELECT id, title, image_url, created_at FROM articles WHERE id != ? ORDER BY created_at DESC LIMIT 5").all(req.params.id);
    
    res.json({ article, latest });
  });

  app.post("/api/public/book", (req, res) => {
    const { name, phone, fleetId, fleetName, date, duration, destination } = req.body;
    
    // Save to database
    const stmt = db.prepare(`
      INSERT INTO bookings (name, phone, fleet_id, fleet_name, date, duration, destination)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(name, phone, fleetId, fleetName, date, duration, destination);

    // Format confirmation message
    const confirmationMessage = `*KONFIRMASI BOOKING LAWANG RIZKI TRANSPORT*
 
Halo ${name}, terima kasih telah melakukan pemesanan!
 
*Detail Pesanan:*
- Armada: ${fleetName}
- Tanggal: ${date}
- Durasi: ${duration} Hari
- Tujuan: ${destination}
 
Tim kami akan segera memproses pesanan Anda. Mohon tunggu konfirmasi ketersediaan unit.
 
Terima kasih telah memilih Lawang Rizki Transport!`;
 
    res.json({ message: confirmationMessage });
  });

  // Dashboard Stats Route
  app.get("/api/admin/dashboard-stats", authenticate, (req, res) => {
    try {
      const stats = {
        total_bookings: db.prepare("SELECT COUNT(*) as count FROM bookings").get() as any || { count: 0 },
        pending_bookings: db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'Pending'").get() as any || { count: 0 },
        total_fleet: db.prepare("SELECT COUNT(*) as count FROM fleet").get() as any || { count: 0 },
        total_articles: db.prepare("SELECT COUNT(*) as count FROM articles").get() as any || { count: 0 },
        recent_bookings: db.prepare("SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5").all(),
        bookings_by_status: db.prepare("SELECT status as name, COUNT(*) as value FROM bookings GROUP BY status").all(),
        bookings_over_time: db.prepare(`
          SELECT strftime('%Y-%m-%d', created_at) as date, COUNT(*) as count 
          FROM bookings 
          WHERE created_at >= date('now', '-7 days')
          GROUP BY date
          ORDER BY date ASC
        `).all()
      };
      res.json(stats);
    } catch (error) {
      console.error("Dashboard stats error:", error);
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Admin CRUD Routes
  const createCrudRoutes = (table: string) => {
    app.get(`/api/admin/${table}`, authenticate, (req, res) => {
      res.json(db.prepare(`SELECT * FROM ${table}`).all());
    });
    app.post(`/api/admin/${table}`, authenticate, (req, res) => {
      const keys = Object.keys(req.body);
      const values = Object.values(req.body);
      const placeholders = keys.map(() => "?").join(",");
      const stmt = db.prepare(`INSERT INTO ${table} (${keys.join(",")}) VALUES (${placeholders})`);
      const result = stmt.run(...values);
      res.json({ id: result.lastInsertRowid });
    });
    app.put(`/api/admin/${table}/:id`, authenticate, (req, res) => {
      const { id } = req.params;
      const keys = Object.keys(req.body);
      const values = Object.values(req.body);
      const setClause = keys.map(k => `${k} = ?`).join(",");
      const stmt = db.prepare(`UPDATE ${table} SET ${setClause} WHERE id = ?`);
      stmt.run(...values, id);
      res.json({ success: true });
    });
    app.delete(`/api/admin/${table}/:id`, authenticate, (req, res) => {
      db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(req.params.id);
      res.json({ success: true });
    });
  };

  ["banners", "fleet", "articles", "clients", "about", "settings", "reviews", "users", "bookings"].forEach(createCrudRoutes);

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
