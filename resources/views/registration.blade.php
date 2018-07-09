<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>User Registration </title>

  </head>
  <body>

    <div class="container">
      <h2>Registration Creation</h2><br  />
      <form method="post" action="{{ route('registerrr') }}">
        {{ csrf_field() }}
        <div class="row">
          <div class="col-md-4"></div>
          <div class="form-group col-md-4">
            <label for="name">Name:</label>
            <input type="text" class="form-control" name="name">
          </div>
        </div>
        <div class="row">
          <div class="col-md-4"></div>
            <div class="form-group col-md-4">
              <label for="price">Email:</label>
              <input type="text" class="form-control" name="email">
            </div>
          </div>
          <div class="row">
          <div class="col-md-4"></div>
            <div class="form-group col-md-4">
              <label for="price">Password:</label>
              <input type="password" class="form-control" name="password">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="form-group col-md-4">
            <button type="submit" class="btn btn-success" style="margin-left:38px">Add User</button>
          </div>
        </div>
      </form>
    </div>

  </body>
</html>