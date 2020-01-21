<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Todo extends CI_Controller {


   public $Todo;


  
   public function __construct() {
      parent::__construct(); 

      $this->load->library('form_validation');
      $this->load->library('session');
      $this->load->model('TodoModel');
      $this->load->model('user'); 

      $this->Todo = new TodoModel;
   }



   public function index()
   {
        if ($this->session->userdata('isUserLoggedIn') == FALSE) {
        redirect('users/login');
      }
       $id = $this->session->userId;
       $data['data'] = $this->Todo->get_Todo($id);
       $data['data1'] = $this->Todo->get_user($id);
       $this->load->view('theme/header');       
       $this->load->view('Todo/list',$data);
       $this->load->view('theme/footer');
   }


  
   public function show($id)
   {
    if ($this->session->userdata('isUserLoggedIn') == FALSE) {
        redirect('users/login');
      }
      $item = $this->Todo->find_item($id);
      $this->load->view('theme/header');
      $this->load->view('Todo/show',array('item'=>$item));
      $this->load->view('theme/footer');
   }


   public function create()
   {
    if ($this->session->userdata('isUserLoggedIn') == FALSE) {
        redirect('users/login');
      }
      $this->load->view('theme/header');
      $this->load->view('Todo/create');
      $this->load->view('theme/footer');   
   }


   public function store()
   {
    if ($this->session->userdata('isUserLoggedIn') == FALSE) {
        redirect('users/login');
      }
        $this->form_validation->set_rules('task_name', 'TaskName', 'required');
        $this->form_validation->set_rules('description', 'Description', 'required');


        if ($this->form_validation->run() == FALSE){
            $this->session->set_flashdata('errors', validation_errors());
            redirect(base_url('Todo/create'));
        }else{
           $this->Todo->insert_item();
           redirect(base_url('Todo'));
        }
    }


   public function edit($id)
   {
    if ($this->session->userdata('isUserLoggedIn') == FALSE) {
        redirect('users/login');
      }
       $item = $this->Todo->find_item($id);


       $this->load->view('theme/header');
       $this->load->view('Todo/edit',array('item'=>$item));
       $this->load->view('theme/footer');
   }



   public function update($id)
   {
    if ($this->session->userdata('isUserLoggedIn') == FALSE) {
        redirect('users/login');
      }
        $this->form_validation->set_rules('task_name', 'TaskName', 'required');
        $this->form_validation->set_rules('description', 'Description', 'required');


        if ($this->form_validation->run() == FALSE){
            $this->session->set_flashdata('errors', validation_errors());
            redirect(base_url('Todo/edit/'.$id));
        }else{ 
          $this->Todo->update_item($id);
          redirect(base_url('Todo'));
        }
   }


   public function delete($id)
   {
    if ($this->session->userdata('isUserLoggedIn') == FALSE) {
        redirect('users/login');
      }
       $item = $this->Todo->delete_item($id);
       redirect(base_url('Todo'));
   }

   public function done($id)
   {
    if ($this->session->userdata('isUserLoggedIn') == FALSE) {
        redirect('users/login');
      }
        $item = $this->Todo->done_item($id);
        redirect(base_url('Todo'));
   }

   public function undone($id)
   {
    if ($this->session->userdata('isUserLoggedIn') == FALSE) {
        redirect('users/login');
      }
    $item = $this->Todo->undone_item($id);
    redirect(base_url('Todo'));
   }

}

?>