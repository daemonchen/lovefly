lovefly.controller('AdminController', function($scope, $http, $log, _) {
    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };
    $scope.refer = document.referrer;
    $scope.username = $scope.userInfo;
    // $scope.userInfo = 11;
    if (!!$scope.username) {
        $scope.isLogin = true;
    };
})
lovefly.controller('LoginController', function($scope, $http, $log, _, $cookieStore) {
    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };
    $scope.refer = document.referrer;
    $scope.login = function() {
        return $http.get('/admin/login', {
            params: {
                username: $scope.username,
                password: MD5($scope.password)
            }
        }).
        success(function() {
            console.log("login success");
            $cookieStore.put("username", $scope.username);
            //TODO display userinfo on page
            // window.location.href = $scope.refer;
            window.location.href = '/edit/index';
        }).
        error($scope.logError);
    }
})
lovefly.controller('RegisterController', function($scope, $http, $log, _, $cookieStore) {
    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };
    $scope.refer = document.referrer;
    $scope.register = function() {
        $log.log($scope.username);
        return $http.post('/admin/register', {
            username: $scope.username,
            password: $scope.password
        }).
        success(function() {
            $cookieStore.put("username", $scope.username);
            alert("register success");
            // window.location.href = $scope.refer;
            window.location.href = '/edit/index';
        }).
        error($scope.logError);
    }
})