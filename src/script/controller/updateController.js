updateApp.controller("updateController",function ($scope,$state) {
    $state.go("updateLoad");
    $scope.currentPage=0;
    $scope.mainContentSwitch=function (flag) {
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
});