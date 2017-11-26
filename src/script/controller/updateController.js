updateApp.controller("updateController",function ($scope,$state,$http) {
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

    // $http({
    //     method:'post',
    //     url:'http://127.0.0.1:8000/sheet_columns',
    //     withCredentials: true,
    //     data:{},
    //     headers:{
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },transformRequest: function(obj) {
    //         var str = [];
    //         for (var s in obj) {
    //             str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
    //         }
    //         return str.join("&");
    //     }
    // }).success(function(req){
    //     console.log(req);
    // });
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
        console.log(value[0]);
        var fd=new FormData();
        fd.append("file",value[0]);
        console.log(fd);

        var xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "http://127.0.0.1:8000/upload");
        xhr.send(fd);

        function uploadProgress(evt) {//上传中
            if (evt.lengthComputable) {
                var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                console.log(percentComplete.toString() + '%');
            }
            else {
                console.log('unable to compute');
            }
        }
        function uploadComplete(evt) {//上传完成
            /* This event is raised when the server send back a response */
            alert(evt.target.responseText);
        }

        function uploadFailed(evt) {//上传失败
            alert("There was an error attempting to upload the file.");
        }
        function uploadCanceled(evt) {//上传被取消
            alert("The upload has been canceled by the user or the browser dropped the connection.");
        }



        // $state.go("updateScan");
        // $scope.$parent.currentPage=1;
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