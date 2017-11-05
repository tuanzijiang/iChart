iChartApp.controller("iChartController", function ($scope, $timeout, openLeftMenu,closeLeftMenu) {
    //左边的菜单栏点击事件
    $scope.flags=[true,false,false,false,false];
    $scope.srcs=['menu1_selected.png','menu2.png','menu3.png','menu4.png','menu5.png']
    $scope.switchMenuButton=function (i) {
        $scope.flags=[false,false,false,false,false];
        $scope.flags[i]=true;
        $scope.srcs=['menu1.png','menu2.png','menu3.png','menu4.png','menu5.png'];
        $scope.srcs[i]='menu'+(i+1)+'_selected.png';
        $scope.leftMenuFlag=1;
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
iChartApp.controller('leftMenu1',function ($scope) {

});
iChartApp.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/leftMenu1',{
            templateUrl:'./view/leftMenu1.html',
            controller: 'leftMenu1'
        })
        .when('/leftMenu2',{
            templateUrl:'./view/leftMenu2.html'
        })
        .when('/leftMenu3',{
            templateUrl:'./view/leftMenu3.html'
        })
        .when('/leftMenu4',{
            templateUrl:'./view/leftMenu4.html'
        })
        .when('/leftMenu5',{
            templateUrl:'./view/leftMenu5.html'
        })
        .otherwise({redirectTo:'/leftMenu1'})
}]);



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