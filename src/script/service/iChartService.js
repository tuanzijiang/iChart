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
        if(document.getElementsByClassName("mainContent-tool-upper")[0]){
            document.getElementsByClassName("mainContent-tool-bottom")[0].style.cssText="width: 0;min-width: 0;";
            document.getElementsByClassName("mainContent-tool-upper")[0].style.cssText="left: -"+((document.getElementsByClassName("mainContent-tool-bottom")[0].offsetWidth-document.getElementsByClassName("mainContent-menus")[0].offsetWidth)+1+"px");
        }
    }
});

//增加表单元素
iChartApp.service("addTableDom",function () {
    this.addTableDom=function ($scope,$compile,kind) {
        var editTestNode=$compile('<div ng-click="clickTableDom(\'editTable'+$scope.eleDomOrders.length+'\')"></div>')($scope);
        editTestNode.attr("id","editTable"+$scope.eleDomOrders.length);//设置dom元素的id
        editTestNode.attr("class","editPage_workspace_item");
        console.log(iChartInitData.normalTable.barTable["kind0"]);
        editTestNode[0].style.height=iChartInitData.normalTable.barTable["kind0"].iChartHeight;
        editTestNode[0].style.width=iChartInitData.normalTable.barTable["kind0"].iChartWidth;
        // 指定图表的配置项和数据
        var myChart = echarts.init(editTestNode[0]);
        var option = iChartInitData.normalTable.barTable["kind0"];
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        document.getElementById("editPage_workspace").appendChild(editTestNode[0]);
        $scope.eleDomInfos["editTable"+$scope.eleDomOrders.length]={"chartHandler":myChart,"kind":"canvas"};
        $scope.eleDomOrders.push("editTable"+$scope.eleDomOrders.length);//记录顺序
    }
});

//修改表单元素
iChartApp.service("changeTableAttr",function () {
    this.changeTableAttr=function ($scope,args) {
        switch (args[0]){
            case 0: {//修改表单title
                var option={
                    title:{
                        text: document.getElementById(args[1]).value
                    }
                };
                if($scope.eleDomInfos[$scope.currentDomId]){
                    $scope.eleDomInfos[$scope.currentDomId].chartHandler.setOption(option);
                }
                else{
                    console.log("没有选中任何元素");
                }
                break;
            }
            default:
                break;
        }
    }
});

//预览表单元素
iChartApp.service("scanTable",function () {
    this.scanTable=function ($scope,$http) {
        var JSONObjects=[];
        //循环每一个元素
        for(var eleDom in $scope.eleDomOrders){
            if($scope.eleDomInfos[$scope.eleDomOrders[eleDom]].kind==="canvas"){
                var img = new Image();
                var currentChart=$scope.eleDomInfos[$scope.eleDomOrders[eleDom]];
                img.src = currentChart.chartHandler.getDataURL({
                    pixelRatio: 1,
                    backgroundColor: '#fff'
                });
                var JSONObject={kind:"canvas",src:img.src};
                JSONObjects.push(JSONObject);
            }
            else if ($scope.eleDomInfos[$scope.eleDomOrders[eleDom]].kind==="p"){
                var pHandler=$scope.eleDomInfos[$scope.eleDomOrders[eleDom]].pHandler;
                pHandler.removeAttribute("ng-click");
                pHandler.removeAttribute("contenteditable");
                pHandler.removeAttribute("class");
                pHandler.removeAttribute("id");
                var JSONObject={kind:"p",innerHTML:pHandler.innerHTML,style:pHandler.style};
                JSONObjects.push(JSONObject);
            }else if ($scope.eleDomInfos[$scope.eleDomOrders[eleDom]].kind==="img"){
                var imgHandler=$scope.eleDomInfos[$scope.eleDomOrders[eleDom]].imgHandler;
                var JSONObject={kind:"img",src:imgHandler.src};
                JSONObjects.push(JSONObject);
            }
        }
        console.log(JSONObject);
        $http({
            method: 'post',
            url: 'http://127.0.0.1:8000/save_page',
            withCredentials: true,
            data: {
                data: JSON.stringify(JSONObjects)
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
            console.log(req);
            window.location.href="./wxDisplay.html";
        }).error(function (req) {
            console.log(req);
        });
    }
});

//增加文本结点
iChartApp.service("addTextDom",function () {
   this.addTextDom=function ($scope,$compile,kind) {
       var editTestNode=$compile('<p ng-click="clickTextDom(\'editText'+$scope.eleDomOrders.length+'\')" contenteditable="true">'+kind+'</p>')($scope);
       editTestNode.attr("id","editTable"+$scope.eleDomOrders.length);//设置dom元素的id
       editTestNode.attr("class","editPage_workspace_item");
       console.log(editTestNode);
       console.log(kind);
       editTestNode[0].style.fontFamily=kind;
       document.getElementById("editPage_workspace").appendChild(editTestNode[0]);
       $scope.eleDomInfos["editText"+$scope.eleDomOrders.length]={"pHandler":editTestNode[0],"kind":"p"};
       $scope.eleDomOrders.push("editText"+$scope.eleDomOrders.length);//记录顺序
   }
});

//修改文本结点
iChartApp.service("changeTextAttr",function () {
    this.changeTextAttr=function ($scope,args) {
        switch (args[0]){
            case 0: {//修改文字尺寸
                var newNode=document.createElement("span");
                newNode.style.fontWeight='600';
                console.log(document.getElementById(args[1]).value);
                console.log(window.getSelection().getRangeAt(0).surroundContents(newNode));
                break;
            }
            default:
                break;
        }
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