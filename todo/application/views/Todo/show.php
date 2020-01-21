<div class="row alert alert-dark" style="margin-top: 58px;">
    <div class="col-lg-12 margin-tb">
        <div class="pull-left ">
            <h2 style="color: darkblue;"> Show Task</h2>
        </div>
        <div class="pull-right">
            <a class="btn btn-primary" href="<?php echo base_url('Todo');?>"> Back</a>
        </div>
    </div>
</div>

<br/>
<br/>
<div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12">
        <div class="form-group">
            <strong style="font-size: 22px;">Task name:</strong>
            <span style="font-size: 16px;"><?php echo $item->task_name ?></span>
        </div>
    </div>
    <br/>
    <br/>
    <div class="col-xs-12 col-sm-12 col-md-12">
        <div class="form-group">
            <strong style="font-size: 22px;">Description:</strong>
            <span style="font-size: 16px;"><?php echo $item->description; ?></span>
        </div>
    </div>
</div>