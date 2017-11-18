iChartApp.config(["$stateProvider",function($stateProvider){
    $stateProvider
        .state("iChartDataPage",{
            url: '/iChartDataPage',
            views:{
                'subPages':{
                    templateUrl: './view/iChartDataPage.html',
                    controller: 'iChartDataPController'
                }
            }
        })
        .state("iChartWorkPage",{
            url: '/iChartWorkPage',
            views:{
                'subPages':{
                    templateUrl: './view/iChartWorkPage.html',
                    controller: 'iChartWorkPController'
                }
            }
        })
        .state("leftMenu1",{
            url: '/leftMenu1',
            views:{
                'menus':{
                    templateUrl: './view/iChartEditPage/leftMenu1.html'
                }
            }
        })
        .state("leftMenu2",{
            url: '/leftMenu2',
            views:{
                'menus':{
                    templateUrl: './view/iChartEditPage/leftMenu2.html'
                }
            }
        })
        .state("leftMenu3",{
            url: '/leftMenu3',
            views:{
                'menus':{
                    templateUrl: './view/iChartEditPage/leftMenu3.html'
                }
            }
        })
        .state("leftMenu4",{
            url: '/leftMenu4',
            views:{
                'menus':{
                    templateUrl: './view/iChartEditPage/leftMenu4.html'
                }
            }
        })
        .state("leftMenu5",{
            url: '/leftMenu5',
            views:{
                'menus':{
                    templateUrl: './view/iChartEditPage/leftMenu5.html'
                }
            }
        })

    // $stateProvider
    //     .state("iChartDataPage",{
    //         templateUrl: './view/iChartDataPage.html',
    //         controller: 'iChartDataPController'
    //     })
    //     .state("iChartWorkPage",{
    //         templateUrl: './view/iChartWorkPage.html',
    //         controller: 'iChartWorkPController'
    //     })
    //     .state("leftMenu1",{
    //         templateUrl: './view/iChartEditPage/leftMenu1.html'
    //     })
    //     .state("leftMenu2",{
    //         templateUrl: './view/iChartEditPage/leftMenu2.html'
    //     })
    //     .state("leftMenu3",{
    //         templateUrl: './view/iChartEditPage/leftMenu3.html'
    //     })
    //     .state("leftMenu4",{
    //         templateUrl: './view/iChartEditPage/leftMenu4.html'
    //     })
    //     .state("leftMenu5",{
    //         templateUrl: './view/iChartEditPage/leftMenu5.html'
    //     })
}]);