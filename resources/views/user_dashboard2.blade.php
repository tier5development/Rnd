<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>User Dashboard </title>
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
  </head>
  <body>
    <table border='1'>
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
  </body>
</html>