<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Fleet_model');
        $this->load->model('Booking_model');
        $this->load->helper('url');
    }

    public function index() {
        $data['fleets'] = $this->Fleet_model->get_all();
        $data['banners'] = $this->db->get_where('banners', array('is_active' => 1))->result();
        $data['articles'] = $this->db->order_by('created_at', 'DESC')->limit(3)->get('articles')->result();
        $data['config'] = $this->db->get('site_config')->row();
        
        $this->load->view('public/header', $data);
        $this->load->view('public/home', $data);
        $this->load->view('public/footer', $data);
    }

    public function fleet_detail($id) {
        $data['fleet'] = $this->Fleet_model->get_by_id($id);
        $data['config'] = $this->db->get('site_config')->row();
        if (!$data['fleet']) show_404();
        
        $this->load->view('public/header', $data);
        $this->load->view('public/fleet_detail', $data);
        $this->load->view('public/footer', $data);
    }

    public function article_detail($id) {
        $data['article'] = $this->db->get_where('articles', array('id' => $id))->row();
        $data['config'] = $this->db->get('site_config')->row();
        if (!$data['article']) show_404();
        
        $this->load->view('public/header', $data);
        $this->load->view('public/article_detail', $data);
        $this->load->view('public/footer', $data);
    }

    public function submit_booking() {
        if ($this->input->post()) {
            $data = array(
                'name' => $this->input->post('name'),
                'phone' => $this->input->post('phone'),
                'fleet_id' => $this->input->post('fleet_id'),
                'fleet_name' => $this->input->post('fleet_name'),
                'date' => $this->input->post('date'),
                'duration' => $this->input->post('duration'),
                'destination' => $this->input->post('destination'),
                'status' => 'Pending'
            );
            $this->Booking_model->insert($data);
            $this->session->set_flashdata('success', 'Booking berhasil dikirim! Kami akan menghubungi Anda segera.');
            redirect('home');
        }
    }
}
