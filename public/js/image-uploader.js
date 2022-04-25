/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************************!*\
  !*** ./resources/js/image-uploader.js ***!
  \****************************************/
$(document).ready(function () {
  var readURL = function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.profile-pic').attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  $(".file-upload").on('change', function () {
    readURL(this);
  });
  $(".upload-button").on('click', function () {
    $(".file-upload").click();
  });
});
/******/ })()
;