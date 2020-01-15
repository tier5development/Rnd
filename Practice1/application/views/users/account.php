
<ul class="nav nav-tabs">
  <li class="nav-item">
    <p>Welcome <?php echo $user['first_name'].'&nbsp;&nbsp;&nbsp;'; ?></p>
  </li>
  <li class="nav-item justify-content-end">
  <a href="<?php echo base_url('users/logout'); ?>" class="btn btn-info" role="button">Logout</a>
  </li>
</ul>
<br />
<div class="container">
    <div class="card">
        <div class="card-body">
            <p><b>Name: </b><?php echo $user['first_name'].' '.$user['last_name']; ?></p>
            <p><b>Email: </b><?php echo $user['email']; ?></p>
            <p><b>Phone: </b><?php echo $user['phone']; ?></p>
            <p><b>Gender: </b><?php echo $user['gender']; ?></p>
        </div>
    </div>

    <div>
    
    </div>
</div>