(function(){
var demoApp= angular.module('bookPortal',['ngRoute','ngStorage']);

demoApp.config(function($routeProvider) {

    $routeProvider
        .when('/',{
        controller: 'home',
        templateUrl:'app/views/home.html'
        })
         .when('/login',{
        controller: 'bookPortal',
        templateUrl: 'app/views/login.html'
        })
        .when('/registration',{
        controller: 'bookPortal',
        templateUrl: 'app/views/registration.html'
        })
        .when('/admin',{
        controller: 'userPanel',
        templateUrl: 'app/views/userPanel_new.html'
        })
        .when('/about',{
        controller: '',
        templateUrl: 'app/views/about_us.html'
        })
        .when('/tour',{
        controller: '',
        templateUrl: 'app/views/tour.html'
        })
    
    
        .otherwise( {redirectTo:'/'} );
    
    });

}());