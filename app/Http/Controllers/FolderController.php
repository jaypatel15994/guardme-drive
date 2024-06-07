<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\File;
use App\Models\Folder;
use Illuminate\Support\Str;
use Carbon\Carbon;
 
class FolderController extends Controller
{
    /**
     * Show the form for creating a new folder.
     *
     * @return Response
     */
    public function index()
    {
        $folders = Folder::latest()->get();
        return Inertia::render('FolderUpload', compact('folders'));
    }
  
    /**
     * Store the folder data
     * @return Response
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'name' => ['required']
        ])->validate();
        
    
        Folder::create([
            'name' => $request->name,
            'parent_id' => $request->parentId?:null
        ]);
    
        return redirect()->route('file.upload');
    }
}