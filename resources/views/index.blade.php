<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home</title>
    {{-- bootstrap --}}
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    {{-- fontawesome --}}
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    {{-- angularjs --}}
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-messages.js"></script>
    {{-- notification --}}
    <script src="{{ asset('bower_components/tata/dist/tata.js') }}"></script>
    {{-- image uploader --}}
    <link rel="stylesheet" href="{{ asset('css/image-uploader.css') }}">
    <script src="{{ asset('js/image-uploader.js') }}"></script>
    {{-- upload file --}}
    <script src="{{ asset('bower_components/ng-file-upload/dist/ng-file-upload-shim.min.js') }}"></script>
    <script src="{{ asset('bower_components/ng-file-upload/dist/ng-file-upload.min.js') }}"></script>
    {{-- index --}}
    <link rel="stylesheet" href="{{ asset('css/index.css') }}">
</head>
<body ng-app="taskModule" ng-controller="taskController">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item" ng-repeat="breadcrumbItem in breadcrumbItems">@{{ breadcrumbItem }}</li>
        </ol>
    </nav>
    <div class="container-fluid">
        {{-- add task --}}
        <button class="btn btn-info" 
            type="button"
            ng-click="createTask(taskForm)">
            Add Task
        </button>
        {{-- tasks management --}}
        <div class="card text-white" style="margin-top:16px; border-color:#17a2b8">
            <div class="card-header bg-info">Tasks Management</div>
            <div class="card-body">
                <table class="table table-hover">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col" ng-repeat="column in columns">@{{ column }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="(key, item) in tasks">
                            <th scope="row">@{{ key + 1 }}</th>
                            <td>@{{ item.title }}</td>
                            <td>@{{ item.content }}</td>
                            <td>
                                <div class="task-image" ng-show="item.image != null">
                                    <img ng-src="@{{ item.image.url }}">
                                </div>
                            </td>
                            <td>@{{ item.created_at | date : 'dd/MM/yyyy HH:mm' : 'Asia/Hanoi' }}</td>
                            <td>
                                {{-- edit task --}}
                                <i class="far fa-edit" 
                                    style="color:#007bff; cursor:pointer;"
                                    ng-click="editTask(item)"></i>
                                {{-- delete task --}}
                                <i class="far fa-trash-alt" 
                                    style="color:#dc3545; cursor:pointer;"
                                    ng-click="confirmDeletingTask(item)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    {{-- modal --}}
    <div id="modal" 
        class="modal fade" 
        tabindex="-1" 
        role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                {{-- modal header --}}
                <div class="modal-header">
                    <h5 class="modal-title" ng-show="mode == 'create'">Add Task</h5>
                    <h5 class="modal-title" ng-show="mode == 'edit'">Edit Task</h5>
                    <h5 class="modal-title" ng-show="mode == 'delete'">Delete Task</h5>
                    <button class="close" 
                        type="button" 
                        data-dismiss="modal" 
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                {{-- modal body --}}
                <div class="modal-body" ng-show="mode == 'create' || mode == 'edit'">
                    <form name="taskForm">
                        <input id="title"
                            class="form-control"
                            type="text" 
                            aria-label="Username" 
                            aria-describedby="basic-addon1"
                            placeholder="Title"
                            ng-model="task.title"
                            ng-required="true"
                            name="title">
                        <small class="form-text" 
                            style="color:#dc3545"
                            ng-show="taskForm.title.$touched && taskForm.title.$invalid">
                            Title is required!
                        </small>
                        <div style="margin-bottom:16px"></div>
                        <textarea id="content"
                            class="form-control" 
                            placeholder="Content"
                            rows="4" 
                            cols="50" 
                            ng-model="task.content"
                            ng-required="true"
                            name="content"></textarea>
                        <small class="form-text" 
                            style="color:#dc3545"
                            ng-show="taskForm.content.$touched && taskForm.content.$invalid">
                            Content is required!
                        </small>
                    </form>    
                    <div class="avatar-wrapper">
                        <img class="image-url profile-pic" 
                            ng-show="mode == 'create'"  
                            src=""/>
                        <img class="image-url profile-pic" 
                            ng-show="mode == 'edit'"  
                            ng-src="@{{ task.image.url }}"/>
                        <div class="upload-button">
                            <i class="fas fa-arrow-circle-up" aria-hidden="true"></i>
                        </div>
                        <input class="file-upload" 
                            type="file" 
                            accept="image/*"
                            ngf-select 
                            ng-model="task.image"/>
                    </div>
                </div>
                <div class="modal-body" ng-show="mode == 'delete'">
                    Are you sure to delete this task?
                </div>
                {{-- modal footer --}}
                <div class="modal-footer">
                    <button class="btn btn-secondary" 
                        type="button" 
                        data-dismiss="modal">
                        Close
                    </button>
                    <button class="btn btn-primary" 
                        type="button"
                        ng-show="mode == 'create'"
                        ng-click="storeTask()">
                        Save
                    </button>
                    <button class="btn btn-primary" 
                        type="button"
                        ng-show="mode == 'edit'"
                        ng-click="updateTask()">
                        Update
                    </button>
                    <button class="btn btn-primary" 
                        type="button"
                        ng-show="mode == 'delete'"
                        ng-click="deleteTask()">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/controllers/task-controller.js') }}"></script>
</body>
</html>
