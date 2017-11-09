iChartApp.controller("iChartController", function ($scope,$state) {
    $state.go("iChartEditPage");
    $scope.mainContentSwitch=function(flag) {
        switch (flag){
            case 0:
                $state.go("iChartEditPage");
                break;
            case 1:
                $state.go("iChartWorkPage");
                break;
            case 2:
                $state.go("iChartDataPage");
                break;
            default:
                $state.go("iChartEditPage");
                break;
        }
    };
    //左边的菜单栏点击事件

});
iChartApp.controller("iChartEditLController",function ($scope,$state,openLeftMenu,closeLeftMenu) {
    $state.go("iChartEditPage.leftMenu1");
    $scope.flags=[true,false,false,false,false];
    $scope.srcs=['menu1_selected.png','menu2.png','menu3.png','menu4.png','menu5.png']
    $scope.switchMenuButton=function (i) {
        $scope.flags=[false,false,false,false,false];
        $scope.flags[i]=true;
        $scope.srcs=['menu1.png','menu2.png','menu3.png','menu4.png','menu5.png'];
        $scope.srcs[i]='menu'+(i+1)+'_selected.png';
        $scope.leftMenuFlag=1;
        switch (i){
            case 0:
                $state.go("iChartEditPage.leftMenu1");
                break;
            case 1:
                $state.go("iChartEditPage.leftMenu2");
                break;
            case 2:
                $state.go("iChartEditPage.leftMenu3");
                break;
            case 3:
                $state.go("iChartEditPage.leftMenu4");
                break;
            case 4:
                $state.go("iChartEditPage.leftMenu5");
                break;
            default:
                $state.go("iChartEditPage.leftMenu1");
                break;
        }
    };
    $scope.leftMenuFlag=0;
    $scope.$watch("leftMenuFlag",function () {
       if($scope.leftMenuFlag===0){
           closeLeftMenu.closeLeftMenu();
       }
       else{
           openLeftMenu.openLeftMenu();
       }
    });
});







// iChartApp.config(['$routeProvider',function ($routeProvider) {
//     $routeProvider
//         .when('/leftMenu1',{
//             templateUrl:'./view/leftMenu1.html',
//             controller: 'leftMenu1'
//         })
//         .when('/leftMenu2',{
//             templateUrl:'./view/leftMenu2.html'
//         })
//         .when('/leftMenu3',{
//             templateUrl:'./view/leftMenu3.html'
//         })
//         .when('/leftMenu4',{
//             templateUrl:'./view/leftMenu4.html'
//         })
//         .when('/leftMenu5',{
//             templateUrl:'./view/leftMenu5.html'
//         })
//         .otherwise({redirectTo:'/leftMenu1'})
// }]);



// $timeout(function () {
//     loadStep.loadStep($scope,"30%","10s");
// }, 0);
// $timeout(function () {
//     loadStep.loadStep($scope,"100%","1s");
// }, 1000);
// $timeout(function () {
//     initLoadStep.init($scope);
// }, 2000);
//
// $timeout(function () {
//     loadStep.loadStep($scope,"100%","1s");
// }, 5000);


// $timeout(function () {
//     closeLeftMenu.closeLeftMenu();
// },0);
// $timeout(function () {
//     openLeftMenu.openLeftMenu();
// },7000);