<?php

namespace App\Http\Controllers;

//use Auth;
//use DB;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redir;
use luminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Session;


class UserController extends Controller {

    
    /*******************user registration form display start************************/
    public function create() {

        return view('auth.register');
    }
    /*******************user registration form display end************************/

    /*******************user registration process start************************/

    public function store(Request $request) {

        /*$this->validate(request(), [
            'name'     => 'required',
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::create(request(['name', 'email', 'password']));

        auth()->login($user);
        return redirect()->action('UserController@userlist'); */
        //dd($request);
        $user=new User();
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=$request->password;
        if($user->save()){
            
            $request->session()->flash('reg_success','Your registration is successfull');
            return redirect()->action('UserController@login');
        }
        else{
            $request->session()->flash('reg_fail','Your registration is failed');
            return redirect()->action('UserController@create');
        }


    }
    /*******************user registration process end************************/

    /*******************user login start************************/
    public function login() {

        return view('auth.login');

    }
    /******************user login end***************************/

    /******************start user login process*****************/

    public function loginprocess(Request $request) {

        //dd($request);
        $email=$request->email;
        $password=$request->password;
        if (Auth::attempt(['email' => $email, 'password' => $password])){
            $request->session()->flash('alert-success','You have successfully logggedin');
            return redirect()->action('ArticleController@articleListDisplay');

        } else {

             //return Redirect::to('login');
            $request->session()->flash('alert-failed','Invalid credentials');
            return redirect()->action('UserController@login');
           

        }

    }
    /******************end user login process*******************/

    /***********************user dashboard listing start**********************/

    public function userlist() {
        $users = DB::table('users')->get();

        return view('user_dashboard', ['users' => $users]);

    }
/***********************user dashboard listing end**********************/

    public function edit($id) {

        if ($id == null) {
            return redirect()->action('UserController@userlist');
        } else {

            $id   = base64_decode($id);
            $user = DB::table('users')->where('id', $id)->first();
            return view('edit_user', compact('user'));

        }

    }

    /*public function update() {
    /* dd(Input::get());die;
    $name  = Input::get('name');
    $email = Input::get('email');
    DB::table('users')
    ->where('imei_number', $arg1)
    ->update(['name' => $name, 'email' => $email]);
    return redirect('datamanager');

    }*/

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        //
    }

}
