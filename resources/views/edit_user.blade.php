<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Edit User</title>

  </head>
  <body>

    <div class="container">
      <h2>Edit User</h2><br  />
      <form method="post">
        {{ csrf_field() }}
        <div class="row">
          <div class="col-md-4"></div>
          <div class="form-group col-md-4">
            <label for="name">Name:</label>
            <input type="text" class="form-control" name="name" value="<?php echo $user->name ?>">
          </div>
        </div>
        <div class="row">
          <div class="col-md-4"></div>
            <div class="form-group col-md-4">
              <label for="price">Email:</label>
              <input type="text" class="form-control" name="email" value="<?php echo $user->email; ?>">
            </div>
          </div>

        </div>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="form-group col-md-4">
            <button type="submit" class="btn btn-success" style="margin-left:38px">Edit User</button>
          </div>
        </div>
      </form>
    </div>

  </body>
</html>