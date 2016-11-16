(function() {



    var home = function($scope, $http, $q,$localStorage) {
        
    
        if($localStorage.user){
            
            $scope.clientUsername=$localStorage.user;
            $scope.disable=true;
        }
        
        var currentUser;
        var currentISBN;
        var booksData = [];
        var isbn = [];
        var auth = [];
        var userId = [];
        var UserID = "";
        var tempISBN = "";
        angular.element('document').ready(function() {

            
            
            
            
            $http({
                method: 'POST',
                url: 'api/showBooks.php',
                data: '',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data) {

                console.log(data);
                isbn = data.isbn;
                userId = data.user;
                console.log("userId" + userId);
                console.log(isbn);
                console.log(userId);
                var isbn_13 = "";
                var k = 0;

                var i = 0;
                for (i = 0; i < isbn.length; i++) {

                    var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn[i];
                    UserID = userId[i];
                    tempISBN = isbn[i];


                    $scope.myXhr = function(u, temp) {


                        var deferred = $q.defer();
                        $http.get(url)
                            .success(function(data, status, headers, config) {
                                deferred.resolve('request successful');

                                UserID = userId[i];
                                tempISBN = isbn[i];
                                //    k++;

                                var book = data.items[0];
                                var img = book["volumeInfo"]["imageLinks"];

                                //var isbn_13 = book["volumeInfo"]["ISBN_13"];

                                var lblTitle = (book["volumeInfo"]["title"]);
                                if (lblTitle.length > 15) {
                                    lblTitle = lblTitle.substring(0, 14) + "...";
                                }
                                //var subtitle = (book["volumeInfo"]["subtitle"]);
                                try {
                                    var lblAuth = (book["volumeInfo"]["authors"]).toString();
                                    if (lblAuth.length > 15)
                                        lblAuth = lblAuth.substring(0, 10) + "...";
                                } catch (e) {
                                    lblAuth = " ";
                                }
                                //  var printType = (book["volumeInfo"]["printType"]);
                                try {
                                    var lblSummary = (book["volumeInfo"]["description"]);
                                } catch (e) {
                                    lblSummary = " ";
                                }
                                try {
                                    var lblPub = (book["volumeInfo"]["publisher"]);
                                } catch (e) {
                                    lblPub = " ";
                                }
                                try {
                                    var imgUrl = img["thumbnail"];
                                } catch (e) {
                                    imgUrl = "app/res/NotAvailable.png";
                                }

                                console.log(lblTitle);
                                //console.log(isbn_13);

                                var x = {
                                    title: lblTitle,
                                    auth: lblAuth,
                                    image: imgUrl,
                                    userData: u,
                                    isbn: temp
                                };

                                booksData.push(x);

                            })
                            .error(function(error, status, headers, config) {
                                console.log(status);
                                console.log("Error occured");
                                deferred.reject('ERROR');
                            });

                        return deferred.promise;
                    }





                    var myPromise = $scope.myXhr(UserID, tempISBN);

                    // wait until the promise return resolve or eject
                    //"then" has 2 functions (resolveFunction, rejectFunction)
                    myPromise.then(function(resolve) {
                        //alert(resolve);
                        console.log(resolve);
                    }, function(reject) {
                        //alert(reject);  
                        console.log(reject);
                    });






                }

                $scope.BookDetails = booksData;

            })




        });

        $scope.showUser = function(index) {

            //$scope.BookDetails[index].UserInfo = $scope.BookDetails[index].userData;
            //$scope.BookDetails[index].isbnNEW = $scope.BookDetails[index].isbn;
            console.log(index);
            index.UserInfo= index.userData;
            index.isbnNEW= index.isbn;
        }
        
        $scope.setCurrent=function(index){
            
            //currentISBN =$scope.BookDetails[index].isbn;
            //currentUser=$scope.BookDetails[index].userData;
            
             currentISBN =index.isbn;
            currentUser=index.userData;
        }
        
        $scope.inquiry=function(name){
            
        
            $http({
                method: 'POST',
                url: 'api/requestBook.php',
                data: {client:name,
                       owner:currentUser,
                       isbn:currentISBN
                      },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data){
                
              if(data.success){
                  
                  alert(data.message);
              }else{
                  
                  alert("Error: Opps, You have to first register on this portal");
              }
                
            });
        }
    }

    home.$inject = ['$scope', '$http', '$q','$localStorage'];

    angular.module('bookPortal').controller('home', home);

}())