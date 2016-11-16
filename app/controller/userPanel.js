(function() {


    var userPanel = function($scope, $http, $rootScope,$localStorage) {

        var sessionUser = null;
    
        angular.element(document).ready(function() {
            sessionUser = $localStorage.user;
           /// $rootScope.showDiv =true;
            console.log(sessionUser);
            if (!sessionUser || 0 === sessionUser.length) {
                var path = "#/login";

                window.location.href = path;
            } else {

                $scope.LoggedUser = sessionUser;
                $rootScope.info = sessionUser;
            }
        });


        $scope.searchBook = function() {

            var ISBN = $scope.ISBN;

            //var url="http://isbndb.com/api/v2/json/C92KZEHH/books?q="+ ISBN;   
            var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + ISBN;
            $http.get(url)
                .success(function(data, status, headers, config) {
                    var book = data.items[0];
                    var img = book["volumeInfo"]["imageLinks"];

                    $scope.lblTitle = (book["volumeInfo"]["title"]);
                    //var subtitle = (book["volumeInfo"]["subtitle"]);
                    $scope.lblAuth = (book["volumeInfo"]["authors"]).toString();
                    //  var printType = (book["volumeInfo"]["printType"]);
                    $scope.lblSummary = (book["volumeInfo"]["description"]);
                    $scope.lblPub = (book["volumeInfo"]["publisher"]);
                    $scope.imgUrl = img["thumbnail"];

                })
                .error(function(error, status, headers, config) {
                    console.log(status);
                    console.log("Error occured");
                });

        }


        $scope.saveMyBook = function() {

            $http({
                method: 'POST',
                url: 'api/saveMyBook.php',
                data: {
                    username: sessionUser,
                    isbn: $scope.ISBN
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data) {

                if (!data.success) {

                    alert(data.errors.toString());

                } else {

                    alert(data.message);

                }

            });



        }
        
    $scope.notification=function(){
        
        $http({
            
            method:'POST',
            url:'api/notification.php',
            data:{username:sessionUser},
            headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
        }).success(function(data){
            
            
            if(data.success){
                
                var notiISBN=data.isbn;
                var notiClient=data.user;
                
                var notiData=[];
                for(i=0;i<notiISBN.length;i++){
                    
                    var x={
                        ISBN:notiISBN[i],
                        CLIENT:notiClient[i]
                    };
                    notiData.push(x);
                    
                }
                $scope.NotificationData=notiData;
                
                console.log($scope.NotificationData);
                
            }else{
                
                alert('Opps, something went wrong');
                
            }
        
        });
        
    }    

    $scope.setISBN=function(val){
        
        $scope.ISBN=val;
        console.log(val);
    }
    }

    userPanel.$inject = ['$scope', '$http', '$rootScope','$localStorage'];
    angular.module('bookPortal').controller('userPanel', userPanel);

}())