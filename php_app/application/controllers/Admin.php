<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('session');
        $this->load->helper('url');
        $this->load->model('Fleet_model');
        $this->load->model('Booking_model');
        $this->load->model('User_model');

        // Check login
        if (!$this->session->userdata('logged_in')) {
            redirect('auth/login');
        }
    }

    public function dashboard() {
        $data['total_fleet'] = $this->db->count_all('fleet');
        $data['total_bookings'] = $this->db->count_all('bookings');
        $data['recent_bookings'] = $this->Booking_model->get_recent(5);
        
        $this->load->view('admin/header');
        $this->load->view('admin/dashboard', $data);
        $this->load->view('admin/footer');
    }

    // ==========================================
    // FLEET CRUD
    // ==========================================
    public function fleet() {
        $data['fleets'] = $this->Fleet_model->get_all();
        $this->load->view('admin/header');
        $this->load->view('admin/fleet/list', $data);
        $this->load->view('admin/footer');
    }

    public function fleet_add() {
        if ($this->input->post()) {
            $data = array(
                'name' => $this->input->post('name'),
                'type' => $this->input->post('type'),
                'price' => $this->input->post('price'),
                'price_numeric' => $this->input->post('price_numeric'),
                'capacity' => $this->input->post('capacity'),
                'description' => $this->input->post('description'),
                'image_url' => $this->input->post('image_url')
            );
            $this->Fleet_model->insert($data);
            redirect('admin/fleet');
        }
        $this->load->view('admin/header');
        $this->load->view('admin/fleet/form');
        $this->load->view('admin/footer');
    }

    public function fleet_edit($id) {
        $data['fleet'] = $this->Fleet_model->get_by_id($id);
        if ($this->input->post()) {
            $update_data = array(
                'name' => $this->input->post('name'),
                'type' => $this->input->post('type'),
                'price' => $this->input->post('price'),
                'price_numeric' => $this->input->post('price_numeric'),
                'capacity' => $this->input->post('capacity'),
                'description' => $this->input->post('description'),
                'image_url' => $this->input->post('image_url')
            );
            $this->Fleet_model->update($id, $update_data);
            redirect('admin/fleet');
        }
        $this->load->view('admin/header');
        $this->load->view('admin/fleet/form', $data);
        $this->load->view('admin/footer');
    }

    public function fleet_delete($id) {
        $this->Fleet_model->delete($id);
        redirect('admin/fleet');
    }

    // ==========================================
    // CLIENTS CRUD
    // ==========================================
    public function clients() {
        $data['clients'] = $this->db->get('clients')->result();
        $this->load->view('admin/header');
        $this->load->view('admin/clients/list', $data);
        $this->load->view('admin/footer');
    }

    public function client_add() {
        if ($this->input->post()) {
            $this->db->insert('clients', array(
                'name' => $this->input->post('name'),
                'logo_url' => $this->input->post('logo_url')
            ));
            redirect('admin/clients');
        }
        $this->load->view('admin/header');
        $this->load->view('admin/clients/form');
        $this->load->view('admin/footer');
    }

    public function client_delete($id) {
        $this->db->delete('clients', array('id' => $id));
        redirect('admin/clients');
    }

    // ==========================================
    // BANNERS CRUD
    // ==========================================
    public function banners() {
        $data['banners'] = $this->db->get('banners')->result();
        $this->load->view('admin/header');
        $this->load->view('admin/banners/list', $data);
        $this->load->view('admin/footer');
    }

    public function banner_add() {
        if ($this->input->post()) {
            $this->db->insert('banners', array(
                'title' => $this->input->post('title'),
                'image_url' => $this->input->post('image_url'),
                'link_url' => $this->input->post('link_url')
            ));
            redirect('admin/banners');
        }
        $this->load->view('admin/header');
        $this->load->view('admin/banners/form');
        $this->load->view('admin/footer');
    }

    public function banner_delete($id) {
        $this->db->delete('banners', array('id' => $id));
        redirect('admin/banners');
    }

    // ==========================================
    // ARTICLES CRUD
    // ==========================================
    public function articles() {
        $data['articles'] = $this->db->get('articles')->result();
        $this->load->view('admin/header');
        $this->load->view('admin/articles/list', $data);
        $this->load->view('admin/footer');
    }

    public function article_add() {
        if ($this->input->post()) {
            $this->db->insert('articles', array(
                'title' => $this->input->post('title'),
                'content' => $this->input->post('content'),
                'category' => $this->input->post('category'),
                'image_url' => $this->input->post('image_url'),
                'description' => $this->input->post('description')
            ));
            redirect('admin/articles');
        }
        $this->load->view('admin/header');
        $this->load->view('admin/articles/form');
        $this->load->view('admin/footer');
    }

    public function article_delete($id) {
        $this->db->delete('articles', array('id' => $id));
        redirect('admin/articles');
    }

    // ==========================================
    // REVIEWS CRUD
    // ==========================================
    public function reviews() {
        $data['reviews'] = $this->db->get('reviews')->result();
        $this->load->view('admin/header');
        $this->load->view('admin/reviews/list', $data);
        $this->load->view('admin/footer');
    }

    public function review_delete($id) {
        $this->db->delete('reviews', array('id' => $id));
        redirect('admin/reviews');
    }

    // ==========================================
    // SITE CONFIGURATION
    // ==========================================
    public function config() {
        $data['config'] = $this->db->get('site_config')->row();
        if ($this->input->post()) {
            $update_data = array(
                'site_name' => $this->input->post('site_name'),
                'address' => $this->input->post('address'),
                'phone' => $this->input->post('phone'),
                'email' => $this->input->post('email'),
                'whatsapp' => $this->input->post('whatsapp'),
                'instagram' => $this->input->post('instagram'),
                'about_text' => $this->input->post('about_text')
            );
            if ($data['config']) {
                $this->db->update('site_config', $update_data);
            } else {
                $this->db->insert('site_config', $update_data);
            }
            redirect('admin/config');
        }
        $this->load->view('admin/header');
        $this->load->view('admin/config/form', $data);
        $this->load->view('admin/footer');
    }

    // ==========================================
    // USER MANAGEMENT (RBAC)
    // ==========================================
    public function users() {
        // Only superadmin or admin can manage users (example logic)
        if ($this->session->userdata('role') != 'admin') {
            show_error('Anda tidak memiliki akses ke halaman ini.', 403);
        }
        $data['users'] = $this->User_model->get_all();
        $this->load->view('admin/header');
        $this->load->view('admin/users/list', $data);
        $this->load->view('admin/footer');
    }

    public function user_add() {
        if ($this->input->post()) {
            $data = array(
                'username' => $this->input->post('username'),
                'password' => $this->input->post('password'),
                'role' => $this->input->post('role')
            );
            $this->User_model->insert($data);
            redirect('admin/users');
        }
        $this->load->view('admin/header');
        $this->load->view('admin/users/form');
        $this->load->view('admin/footer');
    }

    public function user_edit($id) {
        $data['user'] = $this->User_model->get_by_id($id);
        if ($this->input->post()) {
            $update_data = array(
                'username' => $this->input->post('username'),
                'role' => $this->input->post('role')
            );
            if ($this->input->post('password')) {
                $update_data['password'] = $this->input->post('password');
            }
            $this->User_model->update($id, $update_data);
            redirect('admin/users');
        }
        $this->load->view('admin/header');
        $this->load->view('admin/users/form', $data);
        $this->load->view('admin/footer');
    }

    public function user_delete($id) {
        if ($id == $this->session->userdata('user_id')) {
            show_error('Anda tidak bisa menghapus akun Anda sendiri.', 403);
        }
        $this->User_model->delete($id);
        redirect('admin/users');
    }

    // ==========================================
    // BOOKING MANAGEMENT
    // ==========================================
    public function bookings() {
        $data['bookings'] = $this->Booking_model->get_all();
        $this->load->view('admin/header');
        $this->load->view('admin/bookings/list', $data);
        $this->load->view('admin/footer');
    }

    public function booking_status($id, $status) {
        $this->Booking_model->update($id, array('status' => $status));
        redirect('admin/bookings');
    }
}
