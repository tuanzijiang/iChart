iChartApp.controller("iChartController", function ($scope,$state) {
    $scope.mainOrSub=1;
    $scope.mainContentSwitch=function(flag) {
        switch (flag){
            case 0:
                $scope.mainOrSub=1;
                $state.go("leftMenu1");
                break;
            case 1:
                console.log($scope);
                $scope.mainOrSub=2;
                $state.go("iChartWorkPage");
                break;
            case 2:
                $scope.mainOrSub=2;
                $state.go("iChartDataPage");
                break;
            default:
                $scope.mainOrSub=1;
                break;
        }
    };
    //左边的菜单栏点击事件
});


iChartApp.controller("iChartEditPController",function ($scope,$state,$compile,addTableDom,openLeftMenu,closeLeftMenu) {
    /**
     * 页面初始化
     */



    /**
     * 控制菜单打开与关闭
     * @param i 菜单编号
     */
    $scope.flags=[true,false,false,false,false];//控制菜单图片列表
    $scope.srcs=['menu1_selected.png','menu2.png','menu3.png','menu4.png','menu5.png'];//激活菜单图片效果
    $scope.switchMenuButton=function (i) {
        $scope.flags=[false,false,false,false,false];
        $scope.flags[i]=true;
        $scope.srcs=['menu1.png','menu2.png','menu3.png','menu4.png','menu5.png'];
        $scope.srcs[i]='menu'+(i+1)+'_selected.png';
        $scope.leftMenuFlag=1;
        switch (i){
            case 0:
                $state.go("leftMenu1");
                break;
            case 1:
                $state.go("leftMenu2");
                break;
            case 2:
                $state.go("leftMenu3");
                break;
            case 3:
                $state.go("leftMenu4");
                break;
            case 4:
                $state.go("leftMenu5");
                break;
            default:
                $state.go("leftMenu1");
                break;
        }
    };


    /**
     * 控制菜单开启和关闭
     */
    $scope.leftMenuFlag=0;
    $scope.$watch("leftMenuFlag",function () {
       if($scope.leftMenuFlag===0){
           closeLeftMenu.closeLeftMenu();
       }
       else if ($scope.leftMenuFlag===1){
           openLeftMenu.openLeftMenu();
       }
    });
    $scope.closeMenu=function () {
        $scope.leftMenuFlag=0;
    };

    /**
     * 增加一个表单元素
     */
    $scope.addTableDom=function (kind) {
        addTableDom.addTableDom($scope,$compile,kind);
    };
    /**
     * 点击一个表单元素
     */
    $scope.clickTableDom=function () {
        console.log("click_table");
    };



});



iChartApp.controller("iChartWorkPController",function ($scope,$timeout,adjustTableInfo) {
    //$http result
    $scope.xlss_name=["iChart1","iChart2","iChart3","iChart4"];
    $scope.dbs_name=["iChart1","iChart2","iChart3","iChart4"];
    $scope.table_info=[
        ["日期","性别","来源","地区","支付量"],
        ["2015-10-12 00:00","男","app","北京","12384884561235"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"],
        ["2015-10-12 00:00","男","app","北京","123"]
    ];
    //init
    $scope.inputValue="";//input search value
    $scope.menuClassFlag=0;//init menu flag
    $scope.tableX=0;
    $scope.tableY=0;
    $scope.afterAdjust=[];
    adjustTableInfo.adjustTableInfo($scope);


    $scope.controlMenu=function(flag){
        $scope.menuClassFlag=flag;
    };
    $scope.controlTableClick=function(x,y){
      $scope.tableX=x;
      $scope.tableY=y;
    };

});



iChartApp.controller("iChartDataPController",function ($scope,$state,openLeftMenu,closeLeftMenu) {
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