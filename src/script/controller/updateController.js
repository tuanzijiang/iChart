updateApp.controller("updateController",function ($scope,$state) {
    $state.go("updateLoad");
    $scope.currentPage=0;
    $scope.mainContentSwitch=function (flag) {
        if(flag<=$scope.currentPage){
            switch (flag){
                case 0:
                    $state.go("updateLoad");
                    $scope.currentPage=0;
                    break;
                case 1:
                    $state.go("updateScan");
                    $scope.currentPage=1;
                    break;
                case 2:
                    $state.go("updateAttrs");
                    $scope.currentPage=2;
                    break;
                default:
                    $state.go("updateLoad");
                    $scope.currentPage=0;
                    break;
            }
        }
    }
});

updateApp.controller("updateLoadController",function ($scope,$state) {
    var dropbox;
    dropbox=document.getElementById("drop-box");
    dropbox.addEventListener("dragenter",dragenter,false);
    dropbox.addEventListener("dragover",dragover,false);
    dropbox.addEventListener("drop",drop,false);
    function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    function dragover(e){
        e.stopPropagation();
        e.preventDefault();
    }
    function drop(e){
        e.stopPropagation();
        e.preventDefault();
        $state.go("updateScan");
        $scope.$parent.currentPage=1;
    }
    fileOnChange=function(value){
        console.log(value);
        $state.go("updateScan");
        $scope.$parent.currentPage=1;
    }

});