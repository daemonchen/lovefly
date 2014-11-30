lovefly.controller('CategoryController', function($scope, $http, $log, _){
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
            name: '飞机介绍',
            parentId: 1
        }, {
            id: 14,
            name: '航空英语',
            parentId: 1
        }, {
            id: 15,
            name: '常见问题',
            parentId: 1
        }]
    }, {
        id: 2,
        name: '培训项目',
        children: [{
            id: 21,
            name: '私人飞行执照',
            parentId: 2
        }, {
            id: 22,
            name: '仪器仪表执照',
            parentId: 2
        }, {
            id: 23,
            name: '单引擎商业飞行执照',
            parentId: 2
        }, {
            id: 24,
            name: '多引擎商业飞行执照',
            parentId: 2
        }, {
            id: 25,
            name: '多引擎飞行执照',
            parentId: 2
        },
        {
            id: 26,
            name: '飞行维护培训',
            parentId: 2
        }]
    }, {
        id: 3,
        name: '招生',
        children: [{
            id: 32,
            name: '培训学校',
            parentId: 3
        }, {
            id: 33,
            name: '招生代理',
            parentId: 3
        }, {
            id: 34,
            name: '助学贷款',
            parentId: 3
        }]
    }, {
        id: 4,
        name: '俱乐部',
        children: [{
            id: 41,
            name: '服务宗旨',
            parentId: 4
        }, {
            id: 42,
            name: '会员特权',
            parentId: 4
        }, {
            id: 43,
            name: '合作加盟',
            parentId: 4
        }]
    }, {
        id: 5,
        name: '关于',
        children: [{
            id: 51,
            name: '公司介绍',
            parentId: 5
        }]
    }];
  if (location.href.indexOf("categoryId") > 0) {
    var urlParams = location.href.split("?")[1].split("&");
    var urlParamsMap = {};
    for (var i = urlParams.length - 1; i >= 0; i--) {
        urlParamsMap[urlParams[i].split("=")[0]] = urlParams[i].split("=")[1];
    };
    $scope.categoryId = urlParamsMap["categoryId"];
    $scope.currentCategory = _.find($scope.categories, function(item){
        return item.id == $scope.categoryId;
    })
    $scope.subCategories = $scope.currentCategory.children;
    $log.log("subCategories", $scope.subCategories);
  };

  var logError = function(data, status) {
    $log.log('code '+status+': '+data);
  };
  // $scope.loading = true;

  var init = function() {

  };

  init();

})
