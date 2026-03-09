<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {

    public function get_all() {
        return $this->db->get('users')->result();
    }

    public function get_by_id($id) {
        return $this->db->get_where('users', array('id' => $id))->row();
    }

    public function insert($data) {
        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        return $this->db->insert('users', $data);
    }

    public function update($id, $data) {
        if (!empty($data['password'])) {
            $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        } else {
            unset($data['password']);
        }
        $this->db->where('id', $id);
        return $this->db->update('users', $data);
    }

    public function delete($id) {
        $this->db->where('id', $id);
        return $this->db->delete('users');
    }
}
