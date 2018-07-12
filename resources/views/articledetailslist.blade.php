@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Article</div>

                    <div class="panel-body">
                        <center><table border='1'>
                                <tr>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Excerpt</th>
                                     <th>Created</th>
                                    <th>Action</th>

                                </tr>
                                <?php foreach ($articlelist as $article) {?>
                                <tr>
                                    <td><?php echo $article->title; ?></td>
                                    <td><?php echo $article->image; ?></td>
                                     <td><?php echo $article->excerpt; ?></td>

                                    <td><?php echo $article->created_at; ?></td>
                                    <td><a href='/Rnd/articleedit/{{ base64_encode($article->id) }}'>Edit</a><a href='/articleedit/{{ base64_encode($article->id) }}'> Delete</a></td>

                                </tr>
                                <?php }?>
                            </table>

                            
                        </center>



                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
