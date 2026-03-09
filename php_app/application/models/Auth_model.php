<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth_model extends CI_Model {

    public function get_user($username) {
        $this->db->where('username', $username);
        $query = $this->db->get('users');
        return $query->row();
    }

    public function register($data) {
        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        return $this->db->insert('users', $data);
    }
}
