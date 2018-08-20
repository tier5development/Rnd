<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Articlelist extends Model
{
    protected $fillable = [
        'title', 'content', 'image','excerpt','user_id','status'
    ];

    public function user(){
    	return $this->belongsTo('App\User');
    }
}
