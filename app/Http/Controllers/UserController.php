<?php

namespace App\Http\Controllers;

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

        $user=new User();
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=$request->password;
        $user->address=$request->address;
        $user->gender=$request->gender;
        if($user->save()){
            
            $request->session()->flash('alert-success','Your registration is successfull');
            return redirect()->action('UserController@login');
        }
        else{
            $request->session()->flash('alert-fail','Your registration is failed');
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

        
        $email=$request->email;
        $password=$request->password;
        if (Auth::attempt(['email' => $email, 'password' => $password])){
            $request->session()->flash('alert-success','You have successfully logggedin');
            return redirect()->action('ArticleController@articleListDisplay');

        } else {

            $request->session()->flash('alert-danger','Invalid credentials');
            return redirect()->action('UserController@login');
           

        }

    }
    /******************end user login process*******************/


    /******************start user logout process start*****************/

   public function LogoutArticle(){

    Auth::logout();
    return redirect()->action('UserController@login');

}

    /******************start user logout process end*****************/

}
