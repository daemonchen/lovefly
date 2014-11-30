lovefly.controller('ApplyController', function($scope, $http, $log, _) {
    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };
    $scope.doSubmit = function() {
        return $http.post('/apply/save', {
            name: $scope.name,
            phone: $scope.phone,
            email: $scope.email,
            address: $scope.address,
            courseType: $scope.courseType,
            gender: $scope.gender,
            bornAddress: $scope.bornAddress,
            birthday: $scope.birthday,
            eduBackground: $scope.eduBackground,
            major: $scope.major,
            graduationTime: $scope.graduationTime,
            englishLevel: $scope.englishLevel,
            tall: $scope.tall,
            weight: $scope.weight,
            caseHistory: $scope.caseHistory
        }).
        success(function() {
            alert("submit success");
            // window.location.href = $scope.refer;
            window.location.href = '/';
        }).
        error($scope.logError);
    };
    $scope.doReset = function(){
        $scope.name = "";
        $scope.phone = "";
        $scope.email = "";
        $scope.address = "";
        $scope.courseType = "";
        $scope.gender = "";
        $scope.bornAddress = "";
        $scope.birthday = "";
        $scope.eduBackground ="";
        $scope.major = "";
        $scope.graduationTime = "";
        $scope.englishLevel = "";
        $scope.tall = "";
        $scope.weight = "";
        $scope.caseHistory = "";
        console.log("reset");
    }
});