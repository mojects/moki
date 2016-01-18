angular.module('myApp')
.controller('editor', ['$scope', 'editor',
function ($scope, editor) {
    
    editor.bind($scope, 'htmlData');
    
}]);