<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function showHomePage(Request $request)
    {
        $title = $this->title;
        return view('pages.home', compact('title'));
    }
}
