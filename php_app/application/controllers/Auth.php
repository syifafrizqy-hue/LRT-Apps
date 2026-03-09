<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Auth_model');
        $this->load->library('session');
        $this->load->helper('url');
    }

    public function login() {
        if ($this->session->userdata('logged_in')) {
            redirect('admin/dashboard');
        }
        $this->load->view('auth/login');
    }

    public function do_login() {
        $username = $this->input->post('username');
        $password = $this->input->post('password');

        $user = $this->Auth_model->get_user($username);

        if ($user && password_verify($password, $user->password)) {
            $session_data = array(
                'user_id' => $user->id,
                'username' => $user->username,
                'role' => $user->role,
                'logged_in' => TRUE
            );
            $this->session->set_userdata($session_data);
            redirect('admin/dashboard');
        } else {
            $this->session->set_flashdata('error', 'Username atau Password salah!');
            redirect('auth/login');
        }
    }

    public function logout() {
        $this->session->sess_destroy();
        redirect('auth/login');
    }
}
