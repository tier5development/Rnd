<?php

namespace App\Http\Controllers;

use App\User;
use App\Articlelist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redir;
use luminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Session;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
//use Mail;


class UserController extends Controller {

    
    /*******************user registration form display start**********************/
    public function create() {

        return view('auth.register');
    }
    /*******************user registration form display end************************/

    /*******************user registration process start************************/

    public function store(Request $request) {
        
            $validator=Validator::make($request->all(),[
                'name'=>'required',
                'gender'=>'required',
                'address'=>'required',
                'email'=>'required|unique:users,email',
                'password'=>'required|min:4',
                'confirm_password'=>'required|min:4|same:password'
            ],
            [
                'name.required'=>'name is required',
                'gender.required'=>'gender is requird',
                'address.required'=>'address is required',
                'email.required'=>'email is required',
                'email.unique'=>'User already exist',
                'password.required'=>'password is required',
                'password.min'=>'password must be 4 character long',
                'confirm_password.required'=>'confirm password is required',
                'confirm_password.min'=>'confirm password must be 4 character long',
            'confirm_password.same'=>'password & confirm password does not match'
            ]);

        if($validator->fails()){
            return redirect()->back()
                        ->withErrors($validator)
                        ->withInput();
        }
        else{
        $user=new User();
        $user->sign_up_ip=\Request::ip();
        $sign_up_string=str_random(10);
        $user->sign_up_string=$sign_up_string;
        $user->name=$request->name;
        $email=$request->email;
        $user->email=$email;
        $user->password=$request->password;
        $user->address=$request->address;
        $user->gender=$request->gender;

        if($user->save()){
            $data = array(
                'name' =>$request->name,
                //'link' =>url('/verify/' .$sign_up_string.$user->id)
        );
            Mail::send('email.user_registration', compact('data'), function ($message) use($request){
            $message->from('work@tier5.us','Tier5');
        
            $message->to($request->email)->subject('User registration!');
        });
            $request->session()->flash('alert-success','Your registration is successfull');
            return redirect()->route('login');
        }
        else{
            $request->session()->flash('alert-fail','Your registration is failed');
            return redirect()->route('registration');
    }

    }
}
    /*******************user registration verification process start*********/

    public function verify($sign_up_string,$userid){
        $verifyUser = User::where('id', $userid)
                      ->first();
        if(isset($verifyUser) && !empty($verifyUser)){
            $update_signup_string=App\User::where('id',$userid)
                                  ->update(['sign_up_string' =>'']);
                $request->session()->flash('alert-success','Your verification is done');
                return redirect()->action('UserController@login');
            }else{
                $request->session()->flash('alert-danger','Your verification was expired');
                return redirect()->action('UserController@create');
            }
    }

    /*******************user registration verification process end***********/



    /*******************user registration process end************************/

    /*******************user login start************************/
    public function login() {

        return view('auth.login');

    }
    /******************user login end***************************/

    /******************start user login process*****************/

    public function loginprocess(Request $request) {

        $validator=Validator::make($request->all(),[

            'email'=>'required|email',
            'password'=>'required|min:4'
        ],[
            'email.required'=>'Email is required',
            'email.email'=>'Enter valid email address',
            'password.required'=>'Password is required',
            'password.min'=>'password atleast 4 character'

        ]);
        if($validator->fails()){
            return redirect()->back()
                        ->withErrors($validator)
                        ->withInput();

        }
        else{
        $email=$request->email;
        $password=$request->password;
        if (Auth::attempt(['email' => $email, 'password' => $password])){
            $request->session()->flash('alert-success','You have successfully logggedin');
            return redirect()->action('ArticleController@articleListDisplay');

        } else {

            $request->session()->flash('alert-danger','Invalid credentials');
            //return redirect()->action('UserController@login');
            return redirect()->route('login');
           

        }
    }

    }
    /******************end user login process*******************/


    /******************start user logout process start*****************/

   public function LogoutArticle(){
    Auth::logout();
    return redirect()->route('login');
}
    /******************start user logout process end*****************/

    /*******************User listing start***************************/
    public function userList(){
        $userlist=User::all();
        return view('user_list',compact('userlist'));
    }
    /*******************User listing end*****************************/

    /*******************Article listing for individual user start****/
    public function userarticleList(){
        $user_id=Auth::user()->id;
        $articledetailslist=User::find($user_id)->articlelists;
        //dd($articledetailslist);
        return view('user_article_details_list',compact('articledetailslist'));
    }
    /*******************Article listing for individual user start****/


}
