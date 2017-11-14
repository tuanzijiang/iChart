// The page was organized as follow:
// - loadStep
// - initLoadStep
// - openLeftMenu
// - closeLeftMenu

//control the load of loadBar
iChartApp.service("loadStep",function () {
    this.loadStep=function ($scope,ToPostion,Seconds){
        $scope.loadPartBar = {
            width : ToPostion,
            transition: "all "+Seconds,
            opacity: "1"
        };
    }
});
iChartApp.service("initLoadStep",function () {
    this.init=function ($scope) {
        $scope.loadPartBar = {
            width : "0",
            transition: "none",
            opacity: "1"
        };
    }
});
//control the leftMenu in iChartEditPage
iChartApp.service("openLeftMenu",function () {
   this.openLeftMenu=function () {
       document.getElementsByClassName("mainContent-tool-bottom")[0].style.cssText="width: 17%;min-width: 17em;";
       document.getElementsByClassName("mainContent-tool-upper")[0].style.cssText="left: 4.2em;";
   }
});
iChartApp.service("closeLeftMenu",function () {
    this.closeLeftMenu=function () {
        document.getElementsByClassName("mainContent-tool-bottom")[0].style.cssText="width: 0;min-width: 0;";
        document.getElementsByClassName("mainContent-tool-upper")[0].style.cssText="left: -"+((document.getElementsByClassName("mainContent-tool-bottom")[0].offsetWidth-document.getElementsByClassName("mainContent-menus")[0].offsetWidth)+1+"px");
    }
});

//adjust the table info in the workPage
iChartApp.service("adjustTableInfo",function () {
    this.adjustTableInfo=function ($scope) {
        console.log($scope);
        $scope.afterAdjust=[];
        if($scope.table_info[0].length<10){
            for(var i=0;i<$scope.table_info.length;i++){
                $scope.afterAdjust[i]=[];
                var afterAdjustLine=$scope.afterAdjust[i];
                for(var j=0;j<$scope.table_info[0].length;j++){
                    afterAdjustLine[j]=$scope.table_info[i][j];
                }
                for(j=$scope.table_info[0].length;j<10;j++){
                    afterAdjustLine[j]="";
                }
            }
        }
        else{
            $scope.afterAdjust=$scope.table_info;
        }
        if($scope.table_info.length<30){
            for(var i=$scope.table_info.length;i<30;i++){
                $scope.afterAdjust[i]=[];
                var afterAdjustLine=$scope.afterAdjust[i];
                for(var j=0;j<$scope.afterAdjust[0].length;j++){
                    afterAdjustLine[j]="";
                }
            }
        }
        $scope.table_info=$scope.afterAdjust;
    }
});