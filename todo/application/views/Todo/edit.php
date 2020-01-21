<div class="row alert alert-dark" style="margin-top: 58px;">
    <div class="col-lg-12 margin-tb">
        <div class="pull-left">
            <h2 style="color: darkblue;">Edit Task</h2>
        </div>
        <div class="pull-right">
            <a class="btn btn-primary" href="<?php echo base_url('Todo');?>"> Back</a>
        </div>
    </div>
</div>


<form method="post" action="<?php echo base_url('Todo/update/'.$item->id);?>">
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
                <strong style="font-size: 22px;">Task Name:</strong>
                <input type="text" name="task_name" class="form-control" value="<?php echo $item->task_name; ?>">
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong style="font-size: 22px;">Description:</strong>
                <textarea name="description" class="form-control"><?php echo $item->description; ?></textarea>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </div>


</form>