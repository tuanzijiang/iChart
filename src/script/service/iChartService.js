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