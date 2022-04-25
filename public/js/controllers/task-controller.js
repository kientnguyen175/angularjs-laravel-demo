/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/controllers/index.js":
/*!*******************************************!*\
  !*** ./resources/js/controllers/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var taskModule = angular.module("taskModule", ['ngMessages', 'ngFileUpload']).constant('API_URL', 'http://localhost:8000/api/');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (taskModule);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************************************!*\
  !*** ./resources/js/controllers/task-controller.js ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./resources/js/controllers/index.js");

_index__WEBPACK_IMPORTED_MODULE_0__.default.controller("taskController", function ($scope, $http, Upload, API_URL) {
  $scope.breadcrumbItems = ['Home', 'Tasks'];
  $scope.columns = ['No', 'Tittle', 'Content', 'Image', 'Created At', 'Options'];
  $scope.tasks = [];
  $scope.mode = null;
  $scope.task = null; // get all tasks

  $http({
    method: 'GET',
    url: API_URL + "tasks"
  }).then(function (response) {
    $scope.tasks = response.data.tasks;
  }, function (error) {
    console.log(error);
  }); // create task

  $scope.createTask = function (taskForm) {
    $scope.mode = 'create';
    $scope.task = null;
    $('#title').val('');
    $('#content').val('');
    taskForm.$setUntouched();
    $('.image-url').attr('src', '');
    $('#modal').modal('show');
  }; // store task


  $scope.storeTask = function () {
    // truong hop ko touched ma da submit
    if (!$scope.task) {
      $('#title').focus();
      $('#content').focus();
      $('#content').blur();
    }

    if ($scope.task && $scope.task.title && $scope.task.title.trim() && $scope.task.content.trim()) {
      Upload.upload({
        method: "POST",
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
  }; // edit task 


  $scope.editTask = function (item) {
    $scope.mode = 'edit';
    $('.image-url').attr('src', '');
    $scope.task = angular.copy(item);
    $('#modal').modal('show');
  }; // update task


  $scope.updateTask = function () {
    if ($scope.task && $scope.task.title && $scope.task.title.trim() && $scope.task.content.trim()) {
      if (!($scope.task.image instanceof File)) {
        delete $scope.task['image'];
      }

      ;
      $scope.task._method = 'PATCH';
      Upload.upload({
        method: "POST",
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
  }; // confirm deleting task


  $scope.confirmDeletingTask = function (item) {
    $scope.mode = 'delete';
    $scope.task = angular.copy(item);
    $('#modal').modal('show');
  }; // delete task


  $scope.deleteTask = function () {
    $http({
      method: "DELETE",
      url: API_URL + 'tasks/' + $scope.task.id
    }).then(function (response) {
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
  };
});
})();

/******/ })()
;