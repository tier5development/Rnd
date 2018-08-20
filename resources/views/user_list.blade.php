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
							        <th>Name</th>
							        <th>Email</th>
							        <th>Action</th>
							      </tr>
							    </thead>
							    <tbody>
							    	{{-- {{dd($userlist)}} --}}
							    	@if(count($userlist) == 0)
							    	<tr>No Record Found</tr>
							    	@else
							    	@foreach($userlist as $user)
							      <tr>
							        <td>{{$user->name}}</td>
							        <td>{{$user->email}}</td>
							        <td><a href="{{url('userarticlelist')}}">Details</a></td>
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