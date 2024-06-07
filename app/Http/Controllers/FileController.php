<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\File;
use App\Models\Folder;
use Illuminate\Support\Str;
use Carbon\Carbon;
 
class FileController extends Controller
{
    /**
     * Show the form for creating a new file.
     *
     * @return Response
     */
    public function index()
    {
        $files = File::latest()->get();
        $folders = Folder::latest()->get();
        // dd($folders);
        return Inertia::render('FileUpload', compact(['files','folders']));
    }
  
    /**
     * Store the file data
     *
     * @return Response
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'file' => ['required']
        ])->validate();
        $fileType = $request->file->extension();
        $fileName = $request->file->getClientOriginalName();  
        if (file_exists(public_path('uploads').'/'.$fileName)) {
            $replaceString = '_' . Carbon::now()->timestamp . '_' . rand(0, 99) . '.' . $fileType;
            $findString = '.'.$fileType;
            $fileName = Str::replace($findString, $replaceString, $fileName);
        }
        $request->file->move(public_path('uploads'), $fileName);
    
        File::create([
            'path' => $fileName,
            'type' => $fileType,
            'folder_id' => $request->folderId?:null
        ]);
    
        return redirect()->route('file.upload');
    }

    /**
     * @parameter $parentId
     */
    public function getFilesAndFoldersForParent(int|string $parentId){
        $parentId = ($parentId=='' || $parentId == 'null') ? NULL : $parentId;
        try {
            $childrenFolders = Folder::where('parent_id', $parentId)->get();
            $childrenFiles = File::where('folder_id', $parentId)->get();
            $result = [
                'folders' => $childrenFolders,
                'files' => $childrenFiles
            ];
			$arr = array("status"=>200,"data"=>$result);
		}catch ( \Illuminate\Database\QueryException $ex) {
			$msg = $ex->getMessage();
			if(isset($ex->errorInfo[2])) {
				$msg = $ex->errorInfo[2];
			}
			
			$arr = array("status"=>500,"message"=>$msg,"data"=>(object)array());
		} catch (\Exception $ex) {
			$msg = $ex->getMessage();
			if(isset($ex->errorInfo[2])) {
				$msg = $ex->errorInfo[2];
			}
			
			$arr = array("status"=>500,"message"=>$msg,"data"=>(object)array());
		}
		return \Response::json($arr);
        
       

    }
}