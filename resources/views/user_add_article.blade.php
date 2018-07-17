@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Add Article</div>

                <div class="panel-body">
                   
                    {!! Form::open(array('class'=>'form-horizontal','route' => 'articleprocess','method'=>'POST','enctype'=>'multipart/form-data')) !!}
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Title</label>

                            <div class="col-md-6">
                                

                                {!! Form::text('title', null, ['id' => 'title','class' => 'form-control']) !!}

                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">content</label>

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
                            <label for="excerpt" class="col-md-4 control-label">Status</label>

                            <div class="col-md-6">

                                
                                {!! Form::select('status', ['empty'=>'Select Status','A' => 'Active', 'I' => 'Inactive'], null, ['class' => 'form-control']) !!}

                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                
                                {!! Form::submit('Add', ['class' => 'btn btn-primary']) !!}
                            </div>
                        </div>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

<!-- <script type='text/javascript'>
$(document).ready(function(){
    $("#title").click(function(){
        $(this).hide();
    });
});
    
    </script> -->
