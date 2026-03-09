<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Fleet_model extends CI_Model {

    public function get_all() {
        $query = $this->db->get('fleet');
        return $query->result();
    }

    public function get_by_id($id) {
        $this->db->where('id', $id);
        $query = $this->db->get('fleet');
        return $query->row();
    }

    public function insert($data) {
        return $this->db->insert('fleet', $data);
    }

    public function update($id, $data) {
        $this->db->where('id', $id);
        return $this->db->update('fleet', $data);
    }

    public function delete($id) {
        $this->db->where('id', $id);
        return $this->db->delete('fleet');
    }
}
