lovefly.controller('EditorController', function($scope, $http, $log, _) {

    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };
    // init stuff
    $scope.title = window.localStorage.getItem("edittingArticleTitle");
    $scope.content = window.localStorage.getItem("edittingArticleContent");
    // $scope.tags = window.localStorage.getItem("edittingArticleTags") ? window.localStorage.getItem("edittingArticleTags").split(",") : [];

    // bind preview stuff
    $scope.getPreview = function() {
        $http.post('/edit/preview', {
            content: $scope.content
        }).
        error($scope.logError).
        success($scope.renderPreview);
    };

    $scope.renderPreview = function(result) {
        $log.info(result);
        $scope.preview = result
    };
    // bind change event on tag model
    $scope.addTag = function() {
        $scope.tags.push($scope.tag);
        window.localStorage.setItem("edittingArticleTags", $scope.tags);
        $scope.tag = "";
    };
    // bind change event on title model
    $scope.setTitle = function() {
        window.localStorage.setItem("edittingArticleTitle", $scope.title);
    };

    // bind change event on content model
    $scope.setContent = function() {
        window.localStorage.setItem("edittingArticleContent", $scope.content);
        $scope.getPreview()

    };

    $scope.saveTags = function(result) {
        $scope.stamp = result.Stamp
        if ($scope.tags.length == 0) {
            return $scope.clean();
        };
        for (var i = $scope.tags.length - 1; i >= 0; i--) {
            $scope.saveTag($scope.tags[i]);
        };
    };
    $scope.saveTag = function(tag) {
        $http.post('/tag/save', {
            title: $scope.title,
            stamp: $scope.stamp,
            tag: tag
        }).
        error($scope.logError).
        success($scope.clean);

    };
    $scope.clean = function(result) {
        $scope.stamp = result.Stamp
        window.location.href = "/post/index?stamp=" + $scope.stamp;
        window.localStorage.clear();

    };
    // bind click event on submit btn
    $scope.sendPost = function() {
        return $http.post('/edit/post', {
            title: $scope.title,
            content: $scope.content,
            categoryId: $scope.categoryId.id,
            subCategoryId: $scope.subCategoryId.id
        }).
        error($scope.logError).
        // success($scope.saveTags);
        success($scope.clean);
    };
    $scope.categoryId = null
    $scope.subCategoryId = null
    $scope.categories = [{
        id: 1,
        name: '资讯',
        children: [{
            id: 11,
            name: '政策新闻',
            parentId: 1
        }, {
            id: 12,
            name: '行业动态',
            parentId: 1
        }, {
            id: 13,
            name: '公司新闻',
            parentId: 1
        }]
    }, {
        id: 2,
        name: '培训',
        children: [{
            id: 11,
            name: '私人执照飞行培训',
            parentId: 2
        }, {
            id: 12,
            name: 'test',
            parentId: 2
        }, {
            id: 13,
            name: 'test',
            parentId: 2
        }]
    }, {
        id: 3,
        name: '招生',
        children: [{
            id: 11,
            name: '学校招生报名页面',
            parentId: 3
        }, {
            id: 12,
            name: 'test',
            parentId: 3
        }, {
            id: 13,
            name: 'test',
            parentId: 3
        }]
    }];

})