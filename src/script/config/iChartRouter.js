iChartApp.config(["$stateProvider",function($stateProvider){
    $stateProvider
        .state("iChartDataPage",{
            templateUrl: './view/iChartDataPage.html'
        })
        .state("iChartEditPage",{
            templateUrl: './view/iChartEditPage.html',
            controller: 'iChartEditLController'
        })
        .state("iChartWorkPage",{
            templateUrl: './view/iChartWorkPage.html'
        })
        .state("iChartEditPage.leftMenu1",{
            templateUrl: './view/iChartEditPage/leftMenu1.html'
        })
        .state("iChartEditPage.leftMenu2",{
            templateUrl: './view/iChartEditPage/leftMenu2.html'
        })
        .state("iChartEditPage.leftMenu3",{
            templateUrl: './view/iChartEditPage/leftMenu3.html'
        })
        .state("iChartEditPage.leftMenu4",{
            templateUrl: './view/iChartEditPage/leftMenu4.html'
        })
        .state("iChartEditPage.leftMenu5",{
            templateUrl: './view/iChartEditPage/leftMenu5.html'
        })
}]);