@extends('layouts.app')

@section('content')
	<div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Article</div>
                     <div class="panel-heading"></div>
                    <div class="panel-body">
                     	<center><table class="table table-striped">
							    <thead>
							      <tr>
							        <th>Article Name</th>
							        <th>Article Image</th>
							        <th>Article Excerpt</th>
							      </tr>
							    </thead>
							    <tbody>
							    	
							    	@if(count($articledetailslist) == 0)
							    	<tr>No Record Found</tr>
							    	@else
							    	@foreach($articledetailslist as $article)
							      <tr>
							        <td>{{$article->title}}</td>
							        <td>{{$article->image}}</td>
							        <td>{{$article->excerpt}}</td>
							      </tr>
							      @endforeach
							      @endif
							    </tbody>
							  </table>
                            
                        </center>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection