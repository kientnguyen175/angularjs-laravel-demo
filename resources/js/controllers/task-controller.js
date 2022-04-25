import taskModule from "./index";
taskModule.controller("taskController", function($scope, $http, Upload, API_URL) {
    $scope.breadcrumbItems = ['Home' , 'Tasks'];
    $scope.columns = [
        'No',
        'Tittle',
        'Content',
        'Image',
        'Created At',
        'Options'
    ];
    $scope.tasks = [];
    $scope.mode = null;
    $scope.task = null;
    // get all tasks
    $http({
        method: 'GET',
        url: API_URL + "tasks"
    }).then(function (response) {
        $scope.tasks = response.data.tasks;
    }, function (error) {
        console.log(error);
    }); 
    // create task
    $scope.createTask = function (taskForm) {
        $scope.mode = 'create';
        $scope.task = null;
        $('#title').val('');
        $('#content').val('');
        taskForm.$setUntouched();
        $('.image-url').attr('src', '');
        $('#modal').modal('show');
    }
    // store task
    $scope.storeTask = function () {
        // truong hop ko touched ma da submit
        if (!$scope.task) {
            $('#title').focus();
            $('#content').focus();
            $('#content').blur();
        } 
        if ($scope.task && $scope.task.title && $scope.task.title.trim() && $scope.task.content.trim()) {
            Upload.upload({
                method : "POST",
                url: API_URL + 'tasks',
                data: {
                    'title': $scope.task.title,
                    'content': $scope.task.content,
                    'image': $scope.task.image
                }
            }).then(function (response) {
                $scope.tasks.unshift(response.data.task);
                $('.image-url').attr('src', '');
                $('#modal').modal('hide');
                tata.success('Add Task', 'Successfully!');
            }, function (error) {
                console.log(error);
                tata.error('Add Task', 'Sorry, something went wrong!');
            });
        }
    }
    // edit task 
    $scope.editTask = function (item) {
        $scope.mode = 'edit';
        $('.image-url').attr('src', '');
        $scope.task = angular.copy(item);
        $('#modal').modal('show');
    }
    // update task
    $scope.updateTask = function () {
        if ($scope.task && $scope.task.title && $scope.task.title.trim() && $scope.task.content.trim()) {
            if (!($scope.task.image instanceof File)) {
                delete $scope.task['image'];
            };
            $scope.task._method = 'PATCH';
            Upload.upload({
                method : "POST",
                url: API_URL + 'tasks/' + $scope.task.id,
                data: $scope.task
            }).then(function (response) { 
                for (var i in $scope.tasks) {
                    if ($scope.tasks[i].id == response.data.task.id) {
                        $scope.tasks[i] = response.data.task;
                        break; 
                    }
                }
                $('#modal').modal('hide');
                tata.success('Update Task', 'Successfully!');
            }, function (error) {
                console.log(error);
                tata.error('Add Task', 'Sorry, something went wrong!');
            });
        }
    }
    // confirm deleting task
    $scope.confirmDeletingTask = function (item) {
        $scope.mode = 'delete';
        $scope.task = angular.copy(item);
        $('#modal').modal('show');
    }
    // delete task
    $scope.deleteTask = function () {
        $http({
            method : "DELETE",
            url: API_URL + 'tasks/' + $scope.task.id,
        })
        .then(function (response) { 
            for (var j in $scope.tasks) {
                if ($scope.tasks[j].id == $scope.task.id) {
                    $scope.tasks.splice(j, 1);    
                    break;
                }
            }
            $('#modal').modal('hide');
            tata.success('Delete Task', 'Successfully!');
        }, function (error) {
            console.log(error);
            tata.error('Delete Task', 'Sorry, something went wrong!');
        });
    }
});
