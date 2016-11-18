routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('tutorial', {
            abstract: true,
            url: '/tutorial',
            views: {
                'contents': {
                    templateUrl: 'pages/main/views/contents/index.html'
                }
            }
        })
        .state('tutorial.signUp', {
            url: '/signup',
            templateUrl: 'pages/main/views/contents/signup.html'
        })
        .state('tutorial.home', {
            url: '/home',
            templateUrl: 'pages/main/views/contents/home.html'
        })
        .state('tutorial.login', {
            url: '/login',
            templateUrl: 'pages/main/views/contents/login.html'
        });
}
