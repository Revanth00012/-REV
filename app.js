angular.module('app', ['ngResource', 'ngMessages', 'ngAnimate', 'ui.router', 'satellizer', 'ngTable', 'ngCart'])
    .config(function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {


        window.appSettings = {};
        window.appSettings.serviceURL = "https://localhost:3000";
        $.get("https://ipinfo.io", function (response) {
            window.appSettings.locationInfo = response;
        }, "jsonp");
        $authProvider.baseUrl = appSettings.serviceURL;

        $httpProvider.interceptors.push('logInterceptor');

        /**
         * Helper auth functions
         */
        var skipIfLoggedIn = ['$q', '$auth', function ($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }];

        var loginRequired = ['$q', '$location', '$auth', function ($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }
            return deferred.promise;
        }];



        /**
         * App routes
         */
        $stateProvider
            .state('start', {
                abstract: true,
                url: '/start',
                templateUrl: 'views/home.html'
            })
            .state('login', {
                parent: 'start',
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('signup', {
                parent: 'start',
                url: '/signup',
                templateUrl: 'views/signup.html',
                controller: 'SignupCtrl'
            })
            .state('logout', {
                url: '/logout',
                template: null,
                controller: 'LogoutCtrl'
            })
            .state('user', {
                abstract: true,
                url: '/user',
                controller: 'UserCtrl',
                templateUrl: 'views/user.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('main', {
                parent: 'user',
                url: '/main',
                controller: 'MainCtrl',
                templateUrl: 'views/post.html'
            })
            .state('search', {
                parent: 'user',
                url: '/search',
                controller: 'SearchCtrl',
                templateUrl: 'views/viewposts.html'
            })
            .state('profile', {
                parent: 'user',
                url: '/profile',
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('myposts', {
                parent: 'user',
                url: '/myposts',
                templateUrl: 'views/viewposts.html',
                controller: 'MyPostsCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('bid', {
                parent: 'user',
                url: '/bid/:postId',
                templateUrl: 'views/post.html',
                controller: 'BidCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('cart', {
                parent: 'user',
                url: '/cart',
                templateUrl: 'views/shoppingcart.html',
                controller: 'CartCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('change', {
                parent: 'user',
                url: '/change',
                templateUrl: 'views/pwdedit.html',
                controller: 'ChangePwdCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            });

        $urlRouterProvider.otherwise('/start/login');

        /**
         *  Satellizer config
         */
        $authProvider.facebook({
            clientId: '1819921691584314'
        });



    })
    .run(['$rootScope', '$state', 'ngTableDefaults', 'ngCart', 'CartService','$auth', function ($rootScope, $state, ngTableDefaults, ngCart, CartService,$auth) {
        $rootScope.$on('ngCart:change', function (event) {
            if($auth.isAuthenticated()){
                CartService.saveCart({cart: ngCart.getItems()});
            }
        });
        $rootScope.$on('$stateChangeError', function (event) {
            $state.go('404');
        });

        $state.transitionTo('login');
        ngTableDefaults.params.count = 10;
        ngTableDefaults.settings.counts = [];
        ngCart.empty();
    }
]);
