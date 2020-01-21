



<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd; margin-top:8px">
  <h1 style="font-family: Courier New; color:SlateBlue; font-size:25px;">TO-DO</h1>

  <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item" style="font-size: 13px;">
        <a class="nav-link nav-item active" href="<?php echo base_url('Todo/create') ?>"><b>Create New Task</b></a>
      </li>
      <li class="nav-item" style="font-size: 15px;">
        <a class="nav-link" href="<?php echo base_url('users/logout'); ?>"><b>Logout</b></a>
      </li>   
    </ul>
  </div>  
</nav>
<h2>Welcome <u><span style="color: Chocolate;"><?php echo $data1->first_name." ".$data1->last_name; ?></span></u></h2>


<table class="table table-hover" style="margin-top: 55px;">


  <thead>
      <tr>
          <th width="200px"  style="color:blue; font-size:15px;">Task Name</th>
          <th style="color:blue; font-size:15px;">Description</th>
          <th width="50px" style="color:blue; font-size:15px;">Done</th>
          <th width="350px" style="color:blue; font-size:15px;">Action</th>
      </tr>
  </thead>


  <tbody>
   <?php foreach ($data as $item) { ?>      
      <tr>

            <td style="font-size:15px;"><b><?php echo $item->task_name; ?></b></td>
            <td style="font-size:15px;"><?php echo $item->description; ?></td> 
          
          
          <td>
          <?php if($item->status == 1){  ?>
            <p><span class="glyphicon glyphicon-ok"></span></p>
          <?php  } else{  ?>
            <p><span class="glyphicon glyphicon-remove"></span></p>
            <?php } ?>
          </td>
            
      <td>
        <form method="DELETE" action="<?php echo base_url('Todo/delete/'.$item->id);?>">
        

            
        <?php if($item->status == 1){  ?>
          <a class="btn btn-dark" href="<?php echo base_url('Todo/undone/'.$item->id) ?>"> UnDone</a>
          <?php  } else{  ?>
            <a class="btn btn-warning" href="<?php echo base_url('Todo/done/'.$item->id) ?>"> Done</a>
            <?php } ?>


          <a class="btn btn-info" href="<?php echo base_url('Todo/'.$item->id) ?>"> Show</a>
         <a class="btn btn-primary" href="<?php echo base_url('Todo/edit/'.$item->id) ?>"> Edit</a>
          <button type="submit" class="btn btn-danger"> Delete</button>
        </form>
      </td>     
      </tr>
      <?php } ?>
  </tbody>


</table>


