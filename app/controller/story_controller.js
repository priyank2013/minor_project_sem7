(function() {



    var story_controller = function($scope, $http, $q,$localStorage) {
    
        if($localStorage.user){
            $scope.clientUsername=$localStorage.user;
            $scope.disable=true;
        }
        
        var title;
        var story ;
        //= [{"title" : "C++", "body": "Programming language"},{"title" : "C++", "body": //"Programming language"},{"title" : "C++", "body": "Programming language"}];
      //  $scope.story = story;
        angular.element('document').ready(function() {

            $http({
                method: 'POST',
                url: 'api/showStory.php',
                data: '',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data) {

                $scope.story=data;
                console.log(data);
            })

        });
       
    }
    
    

    story_controller.$inject = ['$scope', '$http', '$q','$localStorage'];

    angular.module('bookPortal').controller('story_controller', story_controller);

}())