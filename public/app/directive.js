angular.module('customControl', [])

.directive('custom-simplemde', [function(){
  return {
    restrict: 'A',
    require: 'simplemde',
    link: function(scope, element, attrs, simplemde) {
      simplemde.get() // => SimpleMDE instance
      simplemde.rerenderPreview()
    }
  }
}]);
