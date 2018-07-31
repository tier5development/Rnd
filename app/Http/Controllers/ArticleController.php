<?php
namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redir;
use App\User;
use App\Articlelist;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Session;



class ArticleController extends Controller {

    
    /**************article form display start*************/

    public function articleFormDisplay(){

        return view('user_add_article');
    }

    /**************article form display end***************/

     /**************article form processing start*********/

    public function articleFormProcessing(Request $request) {

        $article = new Articlelist();
        $user = Auth::user();
        $article->title=$request->title;
        $article->content=$request->content;
        $article->excerpt=$request->excerpt;
        $article->status=$request->status;
        $article->user_id=$user->id;
        $imagename = $request->file('image')->getClientOriginalName();
        $imagename=time().$imagename;
        $request->file('image')->move(
            base_path() . '/public/articleimage/', $imagename
        );
        $article->image=$imagename;
        if($article->save()){
        $request->session()->flash('alert-success', 'Article has been successfully created !');
        return redirect()->action('ArticleController@articleListDisplay');
    }
    else{
        $request->session()->flash('alert-danger', 'Article has not been created !');
        return redirect()->action('ArticleController@articleListDisplay');
    }

    }
    /**************article form processing end*********/

    /**************article form listing start*********/

    public function articleListDisplay(){

       $articlelist = \App\Articlelist::where('status', 'A')
               ->orderBy('id', 'desc')
               ->get();
        //dd($articlelist);
        return view('articledetailslist',compact('articlelist'));

    }
    /**************article form listing end*********/

    /**************article form edit display start***/


    public function articleEdit($id=null){

      if($id==null){

        return view('articledetailslist');

    }

    else{

        $article_id=base64_decode($id);
        $article_details=\App\Articlelist::where('id',$article_id)->first();
        return view('edit_article',compact('article_details'));
    }
}

    /**************article form edit display end****/

    /**************article form update start***/

    public function UpdateArticle(Request $request, $id){

        $article_details=Articlelist::find($id);
        $article_details->title=$request->title;
        $article_details->content=$request->content;
        $article_details->excerpt=$request->excerpt;
        $article_details->status=$request->status;
        $image=$request->file('image');
        if(!empty($image)){
        $filename=$image->getClientOriginalName();
        $filename=time().$filename;
        $destinationPath = base_path().'/public/articleimage/';
        $image->move($destinationPath,$filename);
        $old_image=base_path().'/public/articleimage/'.$request->hidden_image;
        unlink($old_image);
        $article_details->image=$filename;
        }
        else{
            $article_details->image=$request->hidden_image;
        }
        
        if($article_details->save()){
            $request->session()->flash('alert-success', 'Article has been successfully updated !');
            return redirect()->action('ArticleController@articleListDisplay');
        }
        else{

            $request->session()->flash('alert-danger', 'Article has not been Updated !');
            return redirect()->action('ArticleController@articleListDisplay');
        }

    }
    /**************article form update end********/

    /**************article form delete start**************/

    public function DeleteArticle(Request $request,$id){

        $id=base64_decode($id);
        $article_details=\App\Articlelist::find($id);
        //dd($article_details);
        if($article_details->delete()){
            $request->session()->flash('alert-success', 'Article has been successfully deleted !');   
            return redirect()->action('ArticleController@articleListDisplay');
        }

        else{
            $request->session()->flash('alert-danger', 'Article has not been deleted !');   
            return redirect()->action('ArticleController@articleListDisplay');
        }
    }

    public function LogoutArticle(){

        Auth::logout();

        return redirect()->action('UserController@login');

    }
}
