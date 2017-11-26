updateApp.controller("updateController",function ($scope,$state,$http) {
    $state.go("updateLoad");
    $scope.currentPage=0;
    $scope.table_info=[];
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

updateApp.controller("updateLoadController",function ($scope,$state,$http) {

    //实现拖拽上传
    var dropbox=document.getElementById("drop-box");
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
        fileOnChange(e.dataTransfer.files);
    }

    //文件被修改
    fileOnChange=function(value){
        var fd=new FormData();
        fd.append("file",value[0]);
        //上传excel文件
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "http://127.0.0.1:8000/upload");
        xhr.send(fd);

        //上传中
        function uploadProgress(evt) {
            if (evt.lengthComputable) {
                var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                console.log(percentComplete.toString() + '%');
            }
            else {
                console.log('unable to compute');
            }
        }
        //上传完成
        function uploadComplete(evt) {
            /* This event is raised when the server send back a response */
            var JSON_obj=JSON.parse(evt.target.responseText);
            console.log(JSON_obj);
            console.log(JSON_obj.result.id);
            $http({
                method: 'post',
                url: 'http://127.0.0.1:8000/sheet_content',
                withCredentials: true,
                data: {
                    sheet_id: JSON_obj.result.id,
                    start_line: 0,
                    lines: 20,
                    columns: "1,2,3,4",
                    all: 1
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }, transformRequest: function (obj) {
                    var str = [];
                    for (var s in obj) {
                        str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                    }
                    return str.join("&");
                }
            }).success(function(req){
                console.log(req.result);
                console.log($scope.$$nextSibling);
                $state.go("updateScan");
                $scope.$parent.currentPage=1;
                $scope.$parent.table_info=JSON.parse(req.result);
            }).error(function (req) {
                console.log(req);
            })
        }
        //上传失败
        function uploadFailed(evt) {
            alert("There was an error attempting to upload the file.");
        }
        //上传被取消
        function uploadCanceled(evt) {
            alert("The upload has been canceled by the user or the browser dropped the connection.");
        }
    };
});

updateApp.controller("updateScanController",function ($scope,$state) {
    $scope.table_info=$scope.$parent.table_info;
    $scope.table_kind=[];//0--文本；1--数字；2--日期
    for(var i in $scope.table_info[0]){
        $scope.table_kind.push(0);
    }
    $scope.table_hover=0;
    $scope.nextStep=function () {
        $scope.$parent.currentPage=2;
        $state.go("updateAttrs");
    };
});

updateApp.controller("updateAttrsController",function ($scope,$state) {
    $scope.nextStep=function () {
        window.location.href="./iChart.html";
    };
});