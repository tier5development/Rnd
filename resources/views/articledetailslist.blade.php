@extends('layouts.app')

@section('content')

<div class="flash-message">
    @foreach (['danger', 'warning', 'success', 'info'] as $msg)
      @if(Session::has('alert-' . $msg))

      <p class="alert alert-{{ $msg }}">{{ Session::get('alert-' . $msg) }} <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a></p>
      @endif
    @endforeach
  </div> <!-- end .flash-message -->

    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Article</div>
                     <div class="panel-heading"><a href='{!! url("addarticle"); !!}' class = 'btn btn-primary'>Add Article</a></div>
                    <div class="panel-body">
                        <center><table border='1'>
                                <tr>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Excerpt</th>
                                     <th>Created</th>
                                    <th>Action</th>
                                </tr>
                                @if(!empty($articlelist)) 
                                <tr>{{ 'No Record Found' }}</tr>
                                @endif
                                @foreach ($articlelist as $article)
                                <tr>
                                    <td>{{ $article->title }}</td>
                                    <td>{{ $article->image }}</td>
                                     <td>{{$article->excerpt}}</td>

                                    <td>{{$article->created_at}}</td>
                                    <td>
                                        <!--<a href='/article/articleedit/{{ base64_encode($article->id) }}'>Edit</a> -->
                                    <a href="{{ url('articleedit/' . base64_encode($article->id)) }}">Edit</a>

                                       <!-- <a href='/article/articledelete/{{ base64_encode($article->id) }}'> Delete</a></td>-->
                                        <a href="{{ url('articledelete/'.base64_encode($article->id)) }}">Delete</a>

                                </tr>
                                @endforeach
                                
                            </table>

                            
                        </center>



                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
