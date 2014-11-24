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

    $scope.clean = function(result) {
        $scope.stamp = result.Stamp
        window.location.href = "/post/index?stamp=" + $scope.stamp;
        window.localStorage.clear();

    };
    // bind click event on submit btn
    $scope.sendPost = function() {
        return $http.post('/edit/post', {
            stamp: $scope.stamp,
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

    var pageUtil = {
        init: function() {
            // $log.info($scope.islogin);
            $scope.stamp = urlParamsMap["stamp"];
            if (!!$scope.stamp) {
                this.getPost();//进入编辑文章流程
            };
        },
        getPost: function() {
            var self = this;
            $http.get('/post/getPostByStamp', {
                params: {
                    stamp: $scope.stamp
                }
            }).
            success(function(data) {
                if (!!data && data.length != 0 && data != "null") {
                    $scope.title = data.Title;
                    $scope.content = data.Content;
                    $scope.categoryId = $scope.categories.find({"id": data.CategoryId});
                    $scope.subCategoryId = $scope.categoryId.children.find({"id": data.SubCategoryId});
                };
            }).
            error($scope.logError);

        }

    }
    pageUtil.init();

})