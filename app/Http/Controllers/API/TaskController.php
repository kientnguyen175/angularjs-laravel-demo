<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File; 

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::with('image')->orderBy('id', 'DESC')->get();

        return response()->json(['tasks' => $tasks]);
    }
  
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'image' => 'image|max:102400'
        ]);
        $task = null;
        DB::transaction(function () use ($request, &$task) {
            $task = Task::create([
                'title' => trim($request->title),
                'content' => trim($request->content)
            ]);
            if ($request->image) {
                $imageName = time() . '_' . $request->image->getClientOriginalName();
                $destinationPath = public_path('images/uploads');
                $request->image->move($destinationPath, $imageName);
                $imageUrl = "//localhost:8000/images/uploads/$imageName" ;
                $task->image()->create([
                    'url' => $imageUrl
                ]);
                $task->load('image');
            }
        });

        return response()->json(['task' => $task]);
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'image' => 'image|max:102400'
        ]);
        $task = Task::with('image')->where('id', $id)->first();
        DB::transaction(function () use ($request, &$task) {
            $task->update([
                'title' => trim($request->title),
                'content' => trim($request->content),
            ]);
            if (isset($request->image)) {
                $imageName = time() . '_' . $request->image->getClientOriginalName();
                $destinationPath = public_path('images/uploads');
                $request->image->move($destinationPath, $imageName);
                $imageUrl = "//localhost:8000/images/uploads/$imageName";
                if ($task->image != null) {
                    $task->image()->update([
                        'url' => $imageUrl
                    ]);
                } else {
                    $task->image()->create([
                        'url' => $imageUrl
                    ]);
                }
            }
        });
        if ($task->image != null) {
            $oldImagePath = str_replace('//localhost:8000/images/uploads/', '', $task->image->url);
            $oldImagePath = public_path('images/uploads') . '/' . $oldImagePath; 
            File::delete($oldImagePath);
        }
        $task->load('image');

        return response()->json(['task' => $task]);
    }

    public function destroy($id)
    {
        $task = Task::with('image')->where('id', $id)->first();
        DB::transaction(function () use (&$task) {
            if ($task->image != null) {
                $task->image()->delete();
            }
            $task->delete();
        });
        if ($task->image != null) {
            $imagePath = str_replace('//localhost:8000/images/uploads/', '', $task->image->url);
            $imagePath = public_path('images/uploads') . '/' . $imagePath; 
            File::delete($imagePath);
        }

        return response()->json(['message' => "Task record successfully deleted, id #$id"]);
    }
}
