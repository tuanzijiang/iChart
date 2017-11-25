updateApp.config(["$stateProvider",function ($stateProvider) {
    $stateProvider
        .state("updateLoad",{
            templateUrl: './view/updateLoad.html',
            controller: 'updateLoadController'
        })
        .state("updateScan",{
            templateUrl: './view/updateScan.html',
            controller: 'updateScanController'
        })
        .state("updateAttrs",{
            templateUrl: './view/updateAttrs.html',
            controller: 'updateAttrsController'
        })
}]);