@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Add Article</div>

                <div class="panel-body">
                   
                    {!! Form::open(array('id'=>'myform','class'=>'form-horizontal','route' => 'articleprocess','method'=>'POST','enctype'=>'multipart/form-data')) !!}
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('title') ? ' has-error' : '' }}">
                            <label for="title" class="col-md-4 control-label">Title</label>

                            <div class="col-md-6">
                                

                                {!! Form::text('title', null, ['id' => 'title','class' => 'form-control']) !!}

                                @if ($errors->has('title'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('title') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('content') ? ' has-error' : '' }}">
                            <label for="content" class="col-md-4 control-label">content</label>

                            <div class="col-md-6">
                                
                                {!! Form::textarea('content',null,['class'=>'form-control','id'=>'content']) !!}
                                @if ($errors->has('content'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('content') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('image') ? ' has-error' : '' }}">
                            <label for="image" class="col-md-4 control-label">Image</label>

                            <div class="col-md-6">
                                
                                {!! Form::file('image',null,['class'=>'form-control','id'=>'image']) !!}
                                @if ($errors->has('image'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('image') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        


                        <div class="form-group">
                            <label for="excerpt" class="col-md-4 control-label">Excerpt</label>

                            <div class="col-md-6">
                                
                                {!! Form::textarea('excerpt',null,array('id'=>'excerpt','class'=>'form-control')) !!}

                            </div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="col-md-4 control-label">Status</label>

                            <div class="col-md-6">

                                
                                {!! Form::select('status', ['null'=>'Select Status','A' => 'Active', 'I' => 'Inactive'],['class' => 'form-control']) !!}

                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                
                                {!! Form::submit('Add', ['class' => 'btn btn-primary','id'=>'sub']) !!}
                                <a href='{!! url("/articlelistdisplay"); !!}' class = 'btn btn-primary'>Cancel</a>
                            </div>
                        </div>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
<!--<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script> -->


<script>
$(document).ready(function (){
    $('#myform').validate({ 
         rules: {
             title: {
                required:true
            },
            content:{
                required:true,
                minlength:10
            },
            image:{
                required:true,
            },
            excerpt:{
                required:true,
                minlength:8
            },
            status:{
                required:true
            }
        }
});
});  


</script> 


