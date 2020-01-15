<div class="container">
	
    <!-- Status message -->
    <?php  
        if(!empty($success_msg)){ 
            echo '<p class="status-msg success">'.$success_msg.'</p>'; 
        }elseif(!empty($error_msg)){ 
            echo '<p class="status-msg error">'.$error_msg.'</p>'; 
        } 
    ?>
	
    <!-- Login form -->
    <div class="card">
        <div class="card-header" style="color:red;">
            Sign In Please
        </div>
        <div class="card-body">
        <form action="" method="post">
            <div class="form-group">
                <input type="email" name="email" class="form-control" placeholder="Enter your Emai Id here" required="">
                <?php echo form_error('email','<p class="help-block">','</p>'); ?>
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="Enter Your Password here" class="form-control" required="">
                <?php echo form_error('password','<p class="help-block">','</p>'); ?>
            </div>
            <div class="">
                <input type="submit" name="loginSubmit" class="btn btn-primary" value="LOGIN">
            </div>
        </form>
        <br />
        <p>Don't have an account? <a href="<?php echo base_url('users/registration'); ?>">Register</a></p>
        </div>
    </div>
</div>