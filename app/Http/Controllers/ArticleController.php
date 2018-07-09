<?php
namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redir;
use App\User;
use App\Articlelist;
use App\Article;

class ArticleController extends Controller {

    public function articleFormDisplay() {
        return view('user_add_article');
    }

    public function articleFormProcessing(Request $request) {

        //$title = Input::get('title');

        $article = new Articlelist();
        $user = Auth::user();
        $article->title=request('title');
        $article->content=request('content');
        $article->image=request()->file('image')->store('resources/articleimage');
        $article->excerpt=request('excerpt');
        $article->status=request('status');
        $article->user_id=$user->id;



        /*$image = $request->file('image');

        $input['imagename'] = time().'.'.$image->getClientOriginalExtension();

        $destinationPath = public_path('resources/articleimage');

        $image->move($destinationPath, $input['imagename']);
        */

        $imageName = $request->file('image')->getClientOriginalName();

        $request->file('image')->move(
            base_path() . '/resources/articleimage/', $imageName
        );
        $article->save();
        echo 'success';
        return redirect()->action('ArticleController@articlelist');

    }

}
