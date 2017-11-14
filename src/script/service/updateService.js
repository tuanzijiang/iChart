//control the load of loadBar
updateApp.service("loadStep",function () {
    this.loadStep=function ($scope,ToPostion,Seconds){
        $scope.loadPartBar = {
            width : ToPostion,
            transition: "all "+Seconds,
            opacity: "1"
        };
    }
});
updateApp.service("initLoadStep",function () {
    this.init=function ($scope) {
        $scope.loadPartBar = {
            width : "0",
            transition: "none",
            opacity: "1"
        };
    }
});