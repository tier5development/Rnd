
<div class="row alert alert-dark" style="margin-top: 58px;">
    <div class="col-lg-12 margin-tb">
        <div class="pull-left">
            <h2 style="color: darkblue;">Add New Task</h2>
        </div>
        <div class="pull-right">
            <a class="btn btn-primary" href="<?php echo base_url('Todo');?>"> Back</a>
        </div>
    </div>
</div>


<form method="post" action="<?php echo base_url('TodoCreate');?>">
    <?php


    if ($this->session->flashdata('errors')){
        echo '<div class="alert alert-danger">';
        echo $this->session->flashdata('errors');
        echo "</div>";
    }


    ?>


    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong style="font-size: 22px;">Task name::</strong>
                <input type="text" name="task_name" class="form-control">
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong style="font-size: 22px;">Description:</strong>
                <textarea name="description" class="form-control"></textarea>
            </div>
            <input type="hidden" name="user_id" value="<?php echo $this->session->userId; ?>"/>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </div>


</form>

