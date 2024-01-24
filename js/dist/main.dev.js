"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // استهلال العناصر في الصفحة
  var uploadInput = document.getElementById('upload');
  var imgElement = document.getElementById('img');
  var saturateInput = document.getElementById('saturate');
  var contrastInput = document.getElementById('contrast');
  var brightnessInput = document.getElementById('brightness');
  var sepiaInput = document.getElementById('sepia');
  var grayscaleInput = document.getElementById('grayscale');
  var blurInput = document.getElementById('blur');
  var hueRotateInput = document.getElementById('hue-rotate');
  var downloadLink = document.getElementById('download');
  var resetSpan = document.querySelector('.filters span'); // إضافة حدث لتغيير الصورة عند تحميل ملف جديد

  uploadInput.addEventListener('change', function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      imgElement.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }); // إضافة حدث لتحديث الفلاتر على الصورة

  function updateFilters() {
    var filters = ['saturate(' + saturateInput.value + '%)', 'contrast(' + contrastInput.value + '%)', 'brightness(' + brightnessInput.value + '%)', 'sepia(' + sepiaInput.value + '%)', 'grayscale(' + grayscaleInput.value + ')', 'blur(' + blurInput.value + 'px)', 'hue-rotate(' + hueRotateInput.value + 'deg)'];
    imgElement.style.filter = filters.join(' ');
  }

  var filterInputs = [saturateInput, contrastInput, brightnessInput, sepiaInput, grayscaleInput, blurInput, hueRotateInput];
  filterInputs.forEach(function (input) {
    input.addEventListener('input', updateFilters);
  }); // إضافة حدث لإعادة الفلاتر إلى القيم الافتراضية

  resetSpan.addEventListener('click', function () {
    filterInputs.forEach(function (input) {
      input.value = input.getAttribute('value');
    });
    updateFilters();
  }); // إضافة حدث لتنفيذ تحميل الصورة بعد التعديل

  downloadLink.addEventListener('click', function () {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    ctx.filter = imgElement.style.filter;
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height); // تحميل الصورة كملف

    var downloadURL = canvas.toDataURL();
    var downloadLink = document.createElement('a');
    downloadLink.href = downloadURL;
    downloadLink.download = 'edited_image.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });
});