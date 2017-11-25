updateApp.controller("updateController",function ($scope,$state) {
    $state.go("updateLoad");
    $scope.currentPage=0;
    $scope.mainContentSwitch=function (flag) {
        // if(flag<=$scope.currentPage){
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
        // }
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

updateApp.controller("updateScanController",function ($scope,$state) {
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
    $scope.table_kind=[0,1,2,0,0];//0--文本；1--数字；2--日期
    $scope.table_hover=0;
});

updateApp.controller("updateAttrsController",function ($scope,$state) {

});