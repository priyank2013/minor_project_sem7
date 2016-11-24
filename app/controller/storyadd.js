(function() {


    var storyadd = function($scope, $http, $rootScope,$localStorage) {

        var sessionUser = null;
    
        angular.element(document).ready(function() {
            sessionUser = $localStorage.user;
            console.log(sessionUser);
            if (!sessionUser || 0 === sessionUser.length) {
                var path = "#/login";

                window.location.href = path;
            } else {

                $scope.LoggedUser = sessionUser;
                $rootScope.info = sessionUser;
            }
        });


        
          $scope.submitFormStory = function() {
              $http({

                method: 'POST',
                url: 'api/saveStory.php',
                data: $scope.reg,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

            }).success(function(data) {
                if (!data.success) {
                    console.log($scope.reg.story);
                    //console.log("unsucessful");
                    // Showing errors.
                    $scope.errorName = data.errors.name;
                    $scope.errorException = data.errors.exception;

                    $scope.message = "Error in Adding";
                } else {
                    console.log("sucessful");
                    $scope.message = "Story Added Sucessful";
                    
                }
            });
        }

    }

    storyadd.$inject = ['$scope', '$http', '$rootScope','$localStorage'];
    angular.module('bookPortal').controller('storyadd', storyadd);

}())