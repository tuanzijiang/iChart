updateApp.config(["$stateProvider",function ($stateProvider) {
    $stateProvider
        .state("updateLoad",{
           templateUrl: './view/updateLoad.html'
        })
        .state("updateScan",{
            templateUrl: './view/updateScan.html'
        })
        .state("updateAttrs",{
            templateUrl: './view/updateAttrs.html'
        })
}]);