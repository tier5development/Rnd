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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created</th>
                            <th>Action</th>

                          </tr>
                          <?php foreach ($users as $user_value) {?>
                          <tr>
                          <td><?php echo $user_value->name; ?></td>
                          <td><?php echo $user_value->email; ?></td>

                          <td><?php echo $user_value->created_at; ?></td>
                          <td><a href="{{ url('edit_user/' . base64_encode($user_value->id)) }}">Edit</a></td>


                        </tr>
                        <?php }?>
                    </table>

                    <div class="form-group">
                            <div class="col-md-8 col-md-offset-4">
                                <a href="/addarticle" class="btn btn-primary">
                                    Add Article
                                </a>


                    </div>
                </div>
                </center>



                </div>
            </div>
        </div>
    </div>
</div>
@endsection
