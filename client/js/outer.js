
myApp.factory('PageConfigResolver', ['$rootScope', function($rootScope) {

    var pageConfigService = {};

    pageConfigService.result = null;

    pageConfigService.resolved = function(result){
        pageConfigService.result = result;
        this.broadcast()
    }

    pageConfigService.broadcast = function(){
        $rootScope.$broadcast("pageConfig");
    }

    return pageConfigService;

}]);

/* Controllers */


myApp.controller('OuterController', ['$scope', 'PageConfigResolver',
    function($scope, PageConfigResolver){

    $scope.configs = {};
    $scope.configs['header'] = { size: {value:'massive', fallback:'massive'} };
    //  $scope.configs['menubar'] = { visible: {value: true, default: true} };

    $scope.configParams = function(configs){
        for(var category in configs){
            // insert/update the config map
            if( $scope.configs[category] == null ){
                $scope.configs[category] = {};
            }
            // modify the individual values
            for(var attr in configs[category]){
                if($scope.configs[category][attr] == null){
                    $scope.configs[category][attr] = {value:null, fallback:''};
                }
                $scope.configs[category][attr].value = configs[category][attr];
            }
        }

    }

    // listed for the page resolve broadcast, then update $scope
    $scope.$on("pageConfig", function() {
        $scope.configParams(PageConfigResolver.result.configs)
    });

}]);


