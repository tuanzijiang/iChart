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
        var compileTestNode=$compile('<div ng-click="clickTableDom(\'editTest'+$scope.eleDomOrders.length+'\')"></div>')($scope);
        console.log(compileTestNode);

        var editTestNode=compileTestNode;
        editTestNode.attr("id","editTable"+$scope.eleDomOrders.length);//设置dom元素的id
        editTestNode.attr("class","editPage_workspace_item");
        editTestNode[0].style.height=iChartInitData.normalTable.barTable["kind0"].iChartHeight;
        editTestNode[0].style.width=iChartInitData.normalTable.barTable["kind0"].iChartWidth;
        // 指定图表的配置项和数据
        var myChart = echarts.init(editTestNode[0]);
        var option = iChartInitData.normalTable.barTable["kind0"];
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        document.getElementById("editPage_workspace").appendChild(editTestNode[0]);
        $scope.eleDomInfos["editTest"+$scope.eleDomOrders.length]={"chartHandler":myChart};
        $scope.eleDomOrders.push("editTest"+$scope.eleDomOrders.length);//记录顺序
    }
});

iChartApp.service("changeTableAttr",function () {
    this.changeTableAttr=function ($scope,args) {
        console.log(document.getElementById(args[0]).value);
        var option={
            title:{
                text: document.getElementById(args[0]).value
            }
        };
        console.log($scope.eleDomInfos["editTest0"].chartHandler.setOption(option));
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