<?php


class TodoModel extends CI_Model{


    public function get_Todo($id = ""){
        if(!empty($this->input->get("search"))){
          $this->db->like('title', $this->input->get("search"));
          $this->db->or_like('description', $this->input->get("search")); 
        }
        //$query = $this->db->get("tasks");
        $this->db->where('user_id', $id);
        $result = $this->db->get("tasks")->result();
        return $result;
    }

    
    public function get_user($id = "")
    {
        return $this->db->get_where('users', array('id' => $id))->row();
    }



    public function insert_item()
    {    
        $data = array(
            'task_name' => $this->input->post('task_name'),
            'description' => $this->input->post('description'),
            'user_id' => $this->input->post('user_id')
        );
        
        return $this->db->insert('tasks', $data);
    }


    public function update_item($id) 
    {
        $data=array(
            'task_name' => $this->input->post('task_name'),
            'description'=> $this->input->post('description')
        );
        if($id==0){
            return $this->db->insert('tasks',$data);
        }else{
            $this->db->where('id',$id);
            return $this->db->update('tasks',$data);
        }        
    }


    public function find_item($id)
    {
        return $this->db->get_where('tasks', array('id' => $id))->row();
    }


    public function delete_item($id)
    {
        return $this->db->delete('tasks', array('id' => $id));
    }

    public function done_item($id)
    {
        $data=array(
            'status' => '1'
        );
        if($id==0){
            return $this->db->insert('tasks',$data);
        }else{
            $this->db->where('id',$id);
            return $this->db->update('tasks',$data);
        }   
    }

    public function undone_item($id)
    {
        $data=array(
            'status' => '0'
        );
        if($id==0){
            return $this->db->insert('tasks',$data);
        }else{
            $this->db->where('id',$id);
            return $this->db->update('tasks',$data);
        }   
    }
}
?>