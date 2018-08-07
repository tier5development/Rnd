<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserappController extends Controller
{

	/***********************User registration start******************/

	public function registrationProcess(Request $request){
			/*dd($request->all());*/
			$name=$request->name;
			$gender=$request->gender;
			$address=$request->address;
			$email=$request->email;
			$password=$request->password;
			$confirm_password=$request->confirm_password;
			try{
			/*
			$request->validate([
				'name'=>'required',
				'gender'=>'required',
				'address'=>'required',
				'email'=>'required|email|unique:users,email',
				'password'=>'required|min:4',
				'confirm_password'=>'required|min:4|same:password'
			],
			[
			  'name.required'=>'Enter your name',
              'gender.required'=>'Select your gender',
              'address.required'=>'Enter your address',
              'email.required'=>'Enter your email',
              'email.unique'=>'User is already exists',
              'password.required'=>'password is required',
              'password.min'=>'password should be 4 character long',
              'confirm_password.required'=>'Enter your confirm password',
              'confirm_password.min'=>'confirm password should be 4 character long',
              'confirm_password.same'=>'check your confirm password'
			]);
			*/

			$validator = Validator::make($request->all(), [
            'name' => 'required',
            'gender' => 'required',
            'address' => 'required',
            'email' => 'required|email|unique:users,email',
            'password'=>'required|min:4',
            'confirm_password'=>'required|min:4|same:password'
        ]);

			if($validator->fails()){
				return response()->json([
					'success'=>false,
					'message'=>$validator->errors()
				],400);
				/*return response()->json([
					'success'=>false,
					'name'=>'name is required'
				],400); */
			}

			$user=new User();
			$user->sign_up_ip=\Request::ip();
	        $user->name=$name;
	        $user->gender=$gender;
	        $user->email=$email;
	        $user->password=$password;
	        $user->address=$address;

	        if($user->save()){
	        	return response()->json([
	        		'success'=>true,
	        		'message'=>'Registration has been successfully done'
	        	],200);
	        }
	        else{
	        	return response()->json([
	        		'success'=>false,
	        		'message'=>'Registration failed'
	        	],400);

	        }
		}
		catch (Exception $e){
		      return response()->json([
		      	'success'=>false,
		      	'message'=>$e->getMessage()
		      ],500);
    	}
	}
	/***********************User registration end********************/

	/***********************User Login ******************************/
}
