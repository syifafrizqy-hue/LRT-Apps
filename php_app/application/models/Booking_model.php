<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Booking_model extends CI_Model {

    public function get_all() {
        $this->db->order_by('created_at', 'DESC');
        $query = $this->db->get('bookings');
        return $query->result();
    }

    public function get_recent($limit = 5) {
        $this->db->order_by('created_at', 'DESC');
        $this->db->limit($limit);
        $query = $this->db->get('bookings');
        return $query->result();
    }

    public function insert($data) {
        return $this->db->insert('bookings', $data);
    }

    public function update($id, $data) {
        $this->db->where('id', $id);
        return $this->db->update('bookings', $data);
    }
}
