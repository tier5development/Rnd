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

    public function articleFormDisplay() {

        if (Auth::check()) {
        return view('user_add_article');
    }
    else{
        return view('auth.login');
    }
}

    public function articleFormProcessing(Request $request) {

        //$title = Input::get('title');
        //dd($request->all());
       
        $article = new Articlelist();
        $user = Auth::user();
        $article->title=request('title');
        $article->content=request('content');
        $article->excerpt=request('excerpt');
        $article->status=request('status');
        $article->user_id=$user->id;
        $imagename = $request->file('image')->getClientOriginalName();
        $request->file('image')->move(
            base_path() . '/public/articleimage/', $imagename
        );

        $article->image=$imagename;
        $article->save();
        
        Session::flash('success', 'The Data has inserted successfully in the Database');
        return redirect()->action('ArticleController@articleListDisplay');

    }

    public function articleListDisplay(){

       $articlelist = \App\Articlelist::where('status', 'A')
               ->orderBy('title', 'asc')
               ->get();
        //dd($articlelist);
        return view('articledetailslist',compact('articlelist'));

    }

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

    public function UpdateArticle(){

        App\Articlelist::where('active', 1)
            ->update(['delayed' => 1]);

    }





















}
