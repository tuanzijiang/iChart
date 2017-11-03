app.service("slowLoadStep",function () {
    this.slowLoad=function ($scope,ToPostion){
        $scope.loadPartBar = {
            width : ToPostion+"px",
            transition: "all 20s"
        };
    }
});
app.service("fastLoadStep",function () {
   this.fastLoad=function ($scope, ToPostion) {
       $scope.loadPartBar = {
           width : ToPostion+"px",
           transition: "all .5s"
       };
   }
});