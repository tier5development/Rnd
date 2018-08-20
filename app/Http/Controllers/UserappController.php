<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use luminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use App\User;

class UserappController extends Controller
{

	/***********************User registration start******************/

	public function registrationProcess(Request $request){
			//dd($request->all());
			$name=$request->name;
			$gender=$request->gender;
			$address=$request->address;
			$email=$request->email;
			$password=$request->password;
			$confirm_password=$request->confirm_password;
			try{
			
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
			}
			$user=new User();
			$user->sign_up_ip=\Request::ip();
			$user->sign_up_string='hdfkgjvhkfgjh';
	        $user->name=$name;
	        $user->gender=$gender;
	        $user->address=$address;
	        $user->email=$email;
	        $user->password=$password;
	        //dd($user);
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
		      ],400);
    	}
	}
	/***********************User registration end********************/

	/***********************User Login ******************************/

	public function loginProcess(Request $request){

		$email=$request->email;
		$password=$request->password;

		$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:4'
        ]);
		try{
	        if($validator->fails()){
	        	return response()->json([
	        		'success'=>false,
	        		'message'=>$validator->errors()
	        	],400);
	        }
	         if (Auth::attempt(['email' => $email, 'password' => $password])){
	         	return response()->json([
	         		'success'=>true,
	         		'message'=>'Your login has been successfully done'
	         	],200);
	         }

	         else{
	         	return response()->json([
	         		'success'=>false,
	         		'message'=>'Please check your authentication'
	         	],400);
	        }
		}
		catch(Exception $e){
			return response()->json([
				'success'=>false,
				'message'=>$e->getMessage()

			],400);
		}
	}
	/***********************User Login end******************************/
}
