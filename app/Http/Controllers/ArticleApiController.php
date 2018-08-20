<?php

namespace App\Http\Controllers;

use App\Articlelist;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ArticleApiController extends Controller
{
    /*****************Add article start*************/
    public function addArticle(Request $request){

        $article_title=$request->article_title;
        $article_content=$request->article_content;
        $article_excerpt=$request->article_excerpt;
        $article_status=$request->article_status;
        $image=$request->file('image');
        //$image=time().$image;
        try{
        $article_validation=Validator::make($request->all(),[
                'article_title'=>'required',
                'article_content'=>'required',
                'article_excerpt'=>'required',
                'article_status'=>'required',
                'image'=>'required'
            ]);
                if($article_validation->fails()){
                    return response()->json([
                        'success'=>false,
                        'message'=>$article_validation->errors()
                    ],400);
                }
                else{
                    $article = new Articlelist();
                    $article->title=$article_title;
                    $article->content=$article_content;
                    $article->excerpt=$article_excerpt;
                    $article->status=$article_status;
                    $image=$request->file('image')->getClientOriginalName();
                    $image=time().$image;
                    $request->file('image')
                    ->move(base_path().'/public/articleimage/',$image);
                    $article->image=$image;
                    //$user=Auth::user()->id;
                    //$article->user_id=$user;
                    $article->user_id=44;
                    if($article->save()){
                    return response()->json([
                        'success'=>true,
                        'message'=>'successfully done'
                    ],200);
                    } 
                    else{
                        return response()->json([
                            'success'=>false,
                            'message'=>'Database error'
                        ],400);
                    }  
        }
    }
        catch(Exception $e){
            return response()->json([
                'success'=>false,
                'message'=>$e->getMessage()
            ],500);

        }
    
}
    /*****************Add article end***************/

    /*****************Article Listing start*********/
    public function articleListing(){
        try{
        $article_details=Articlelist::where('status','A')
                         ->where('user_id',44)->paginate(10);
        //dd($article_details);
        if(isset($article_details->items) && (!empty($article_details->items))){
            return response()->json([
                'success'=>true,
                'data'=>$article_details
            ],200);
        }
        else{
            return response()->json(['success'=>false,'message'=>'No Record'],400);
        }
       } 
       catch(Exception $e){
            return response()->json(['success'=>false,'message'=>$e->getMessage()],500);
       }
    }
/*****************Article listing end************/

/*****************Article form edit display start**********************/

public function editForm(Request $request){
    
        $article_id=$request->id;
        try{
        $article_details=Articlelist::where('id',$article_id)->first();
        if(isset($article_details) && !empty($article_details)){
            return response()->json([
                'success'=>true,
                'data'=>$article_details
            ],200);
        }
        else{
            return response()->json(['success'=>false,'message'=>'Record not found'],400);
        }
    }
    catch(Exception $e){
        return response()->json(['success'=>false,'message'=>$e->getMessage()],400);
    }
}
/*****************Article form edit display end**********************/

/******************Article form Update start*************************/

public function updateForm(Request $request){
    
    $article_id=$request->article_id;
    $image_hidden_value=$request->hidden_image;
    $article_title=$request->title;
    $article_content=$request->content;
    $article_excerpt=$request->excerpt;
    //$article_image=$request->file('image');
    $article_status=$request->status;
    try{
        $validator=Validator::make($request->all(),
            [
                'title'=>'required',
                'content'=>'required',
                'excerpt'=>'required',
                'status'=>'required',
            ]);
        if($validator->fails()){
            return response()->json(['success'=>false,'message'=>$validator->errors()],400);
        }
        else{
            $article_details=Articlelist::where('id',$article_id)->first();
            //dd($article_details);
            $article_details->title=$article_title;
            $article_details->content=$article_content;
            $article_details->excerpt=$article_excerpt;
            $article_details->status=$article_status;
            $article_image=$request->file('image')->getClientOriginalName();
            $article_image_rename=time().$article_image;
            $request->file('image')->move(base_path().'/public/articleimage/',$article_image_rename);
            $old_image_path=base_path().'/public/articleimage/'.$image_hidden_value;
            unlink($old_image_path);
            $article_details->image=$article_image_rename;
            if($article_details->save()){
                return response()->json(['success'=>true,'message'=>'Update successfully'],200);
            }
            else{
                return response()->json(['success'=>false,'message'=>'Not updated'],400);
            }
        }
    }
    catch(Exception $e){
        return response()->json(['success'=>false,'message'=>$e->getMessage()],500);
    }
}
/******************Article form Update end***************************/

/******************Article delete start******************************/

public function deleteArticle(Request $request){

    $article_id=$request->article_id;
    try{
    $article_details=Articlelist::where('id',$article_id)->first();
    if(isset($article_details) && !empty($article_details)){
        //dd(base_path().'/public/articleimage/'.$article_details->image);
        $article_details->delete();
        unlink(base_path().'/public/articleimage/'.$article_details->image);
        return response()->json(['success'=>true,'message'=>'record deleted successfully'],200);
    }
    else{
        return response()->json(['success'=>false,'message'=>'Record not found'],400);
    }
}
    catch(Exception $e){
        return response()->json(['success'=>false,'message'=>$e->getMessage()],500);

    }

}
/******************Article delete end********************************/
}