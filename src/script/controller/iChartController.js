iChartApp.controller("iChartController", function ($scope,$state,$http) {
    $scope.mainOrSub=1;//select what page was shown in iChartApp
    $scope.iChart_hidden=0;//point to the kind of the iChartPage hidden
    $scope.mainContentSwitch=function(flag) {
        switch (flag){
            case 0:
                $scope.mainOrSub=1;
                $state.go("leftMenu1");
                break;
            case 1:
                $scope.mainOrSub=2;
                $state.go("iChartWorkPage");
                break;
            case 2:
                $scope.mainOrSub=2;
                $state.go("iChartDataPage");
                break;
            default:
                $scope.mainOrSub=1;
                break;
        }
    };

    // $http({
    //     method:'post',
    //     url:'http://127.0.0.1:8000/log_in',
    //     withCredentials: true,
    //     data:{
    //         account:'abcde',
    //         password: 'abcde'
    //     },
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
    // $http({
    //     method:'post',
    //     url:'http://127.0.0.1:8000/post_test',
    //     data:{
    //         test:'test123'
    //     },
    //     headers:{
    //         'Content-Type':'application/x-www-form-urlencoded'
    //     }
    // }).success(function(req){
    //     console.log(req);
    // });
});


iChartApp.controller("iChartEditPController",function ($scope,$state,$compile,$http,scanTable,changeTableAttr,changeTextAttr,addTableDom,addTextDom,openLeftMenu,closeLeftMenu) {
    /**
     * initial the  page
     */
    $scope.eleDomOrders=[];//document the orders of elements added
    $scope.eleDomInfos={};//document some information of elements added
    $scope.attrKindFlag=0;//control which page will be shown between data and setting

    $scope.attrsIsExieted=[true,true,false,true];//document whether the attributes will be displayed in data part
    $scope.attrsDataIsExieted=[true,true,false,true];//document whether the attributes will be displayed in setting part

    $scope.attrsIsClose=[];//属性是否关闭
    $scope.attrsDataIsClose=[];//数据属性是否关闭

    $scope.currentDomId="";//正在处理的DOM
    $scope.currentHoverID="";

    //data setting controller
    $scope.barItems=["item羊毛1","item羊毛2"];


    /**
     * 控制菜单打开与关闭
     * @param i 菜单编号
     */
    $scope.flags=[true,false,false,false,false];//控制菜单图片列表
    $scope.srcs=['menu1_selected.png','menu2.png','menu3.png','menu4.png','menu5.png'];//激活菜单图片效果
    $scope.switchMenuButton=function (i) {
        $scope.flags=[false,false,false,false,false];
        $scope.flags[i]=true;
        $scope.srcs=['menu1.png','menu2.png','menu3.png','menu4.png','menu5.png'];
        $scope.srcs[i]='menu'+(i+1)+'_selected.png';
        $scope.leftMenuFlag=1;
        switch (i){
            case 0:
                $state.go("leftMenu1");
                break;
            case 1:
                $state.go("leftMenu2");
                break;
            case 2:
                $state.go("leftMenu3");
                break;
            case 3:
                $state.go("leftMenu4");
                break;
            case 4:
                $state.go("leftMenu5");
                break;
            default:
                $state.go("leftMenu1");
                break;
        }
    };


    /**
     * 控制菜单开启和关闭
     */
    $scope.leftMenuFlag=0;
    $scope.$watch("leftMenuFlag",function () {
       if($scope.leftMenuFlag===0){
           closeLeftMenu.closeLeftMenu();
       }
       else if ($scope.leftMenuFlag===1){
           openLeftMenu.openLeftMenu();
       }
    });
    $scope.closeMenu=function () {
        $scope.leftMenuFlag=0;
    };

    /**
     * 增加一个表单元素
     */
    $scope.addTableDom=function (kind) {
        addTableDom.addTableDom($scope,$compile,kind);
    };
    /**
     * 点击一个表单元素
     */
    $scope.clickTableDom=function (id) {
        $scope.currentDomId=id;
        console.log($scope.currentDomId);
    };
    /**
     *
     * @param kind 0--保存，1--预览，2--撤回，3--恢复
     */
    $scope.controlTable=function (kind) {
        console.log(kind);
        switch (kind){
            case 0:
                break;
            case 1:
                scanTable.scanTable($scope,$http);
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                break;
        }
    };
    /**
     * 增加一个文本结点
     * @param kind
     */
    $scope.addTextDom=function (kind) {
        addTextDom.addTextDom($scope,$compile,kind);
    };


    uploadPic=function (value) {
        var reader = new FileReader();
        reader.readAsDataURL(value[0]);
        reader.onload = function(e){
            var img=new Image();
            img.src=this.result;
            document.getElementById("editPage_workspace").appendChild(img);
            $scope.eleDomInfos["editImage"+$scope.eleDomOrders.length]={"imgHandler":img,"kind":"img"};
            $scope.eleDomOrders.push("editImage"+$scope.eleDomOrders.length);//记录顺序
        }
    };

    /**
     * 控制属性栏显示种类的切换
     * @param flag
     */
    $scope.mainContentAttrKinds=function (flag) {
        if(flag){
            $scope.attrKindFlag=1;
        }
        else{
            $scope.attrKindFlag=0;
        }
    };
    /**
     * 改变图表的相关属性
     */
    $scope.changeTableAttr=function () {
        changeTableAttr.changeTableAttr($scope,arguments);
    };
    /**
     * 改变文字结点的相关属性
     */
    $scope.changeTextAttr=function () {
        changeTextAttr.changeTextAttr($scope,arguments);
    };

    /**
     *  数据来源弹窗
     */
    $scope.showHidden_DataSource=function () {
        $scope.$parent.iChart_hidden=1;
    };
    /**
     *  柱弹窗
     */
    $scope.showHidden_Bar=function () {
        $scope.$parent.iChart_hidden=2;
    };

});

iChartApp.controller("iChartWorkPController",function ($scope,$timeout,$http,adjustTableInfo) {
    //$http result
    $scope.xlss_name=[];
    $scope.xlss_id=[];
    $scope.dbs_name=["iChart1","iChart2","iChart3","iChart4"];

    $http({
        method: 'post',
        url: 'http://127.0.0.1:8000/sheets',
        withCredentials: true,
        data: {},
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
        for(var i in req.result){
            $scope.xlss_name.push(req.result[i].sheet_name);
            $scope.xlss_id.push(req.result[i].id);
        }
    }).error(function (req) {
        console.log(req);
    });
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
    //init
    $scope.inputValue="";//input search value
    $scope.menuClassFlag=0;//init menu flag
    $scope.tableX=0;
    $scope.tableY=0;
    $scope.afterAdjust=[];
    adjustTableInfo.adjustTableInfo($scope);


    $scope.controlMenu=function(flag){
        $scope.menuClassFlag=flag;
    };
    $scope.controlTableClick=function(x,y){
      $scope.tableX=x;
      $scope.tableY=y;
    };
    //获取单个表格的保存值
    $scope.getSheet=function (id) {
        var xlssId=$scope.xlss_id[id];
        console.log(id);
        $http({
            method: 'post',
            url: 'http://127.0.0.1:8000/sheet_content',
            withCredentials: true,
            data: {
                sheet_id: xlssId,
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
            console.log(req);
            $scope.table_info=JSON.parse(req.result);
        }).error(function (req) {
            console.log(req);
        })
    }
});

iChartApp.controller("iChartDataPController",function ($scope,$state,openLeftMenu,closeLeftMenu) {
});

iChartApp.controller("iChartBarController",function ($scope,$http) {
    $scope.attrList=["羊毛1","纤维2","羊毛3","纤维4","羊毛5","纤维6"];//items displayed in attrList
    $scope.attrListKind=[0,0,0,1,2,3];
    $scope.getAttrOperatorCN=["计数","平均数","中位数","最大值","最小值"];
    $scope.xAttriKinds=["一班","二班","三班"];
    $scope.yAttriKinds=["一班","二班","三班"];
    //control window open or close
    $scope.attrListFlag=false;//control window of x-filter(equal);false-close、true-open
    $scope.attrListYFlag=false;//control window of y-filter(equal);false-close、true-open
    $scope.attrScaleFilterFlag=false;//control window of x-filter(scale);false-close、true-open
    $scope.attrScaleYAttriFilterFlag=false;//control window of x-filter(scale);false-close、true-open
    $scope.attrListXAttriFlag=false;//control window of x-filter(single);false-close、true-open
    $scope.attrListYAttriFlag=false;//control window of x-filter(single);false-close、true-open
    $scope.attrOperatorHoverFlag=false;
    //save data from sub window
    $scope.attrListSelectState=[];
    $scope.attrListYAttribSelectState=[];
    $scope.scaleCondition=[];
    $scope.scaleYAttribCondition=[];
    $scope.attrListXAttriCurrentFlag=0;
    $scope.attrListYAttriCurrentFlag=0;
    $scope.attrOperatorKind=0;
    //添加范围的筛选方式
    $scope.addScaleFilterLine=function () {
        var newScaleCondition={
            max: 2,//""--表示无穷大
            min: 1,//""--表示无穷大
            left: 0,//开
            right: 0//闭
        };
        $scope.scaleCondition.push(newScaleCondition);
    };
    //添加Y范围的筛选方式
    $scope.addScaleYAttribFilterLine=function () {
        var newScaleCondition={
            max: 2,//""--表示无穷大
            min: 1,//""--表示无穷大
            left: 0,//开
            right: 0//闭
        };
        $scope.scaleYAttribCondition.push(newScaleCondition);
    };
    //删除范围的筛选方式
    $scope.deleteScaleFilterLine=function (num) {
        var tempCondition=[];
        for(var i=0;i<$scope.scaleCondition.length;i++){
            if(i!==num){
                tempCondition[i]=$scope.scaleCondition[i];
            }
        }
        $scope.scaleCondition=tempCondition;
    };
    //删除Y范围的筛选方式
    $scope.deleteScaleYAttribFilterLine=function (num) {
        var tempCondition=[];
        for(var i=0;i<$scope.scaleYAttribCondition.length;i++){
            if(i!==num){
                tempCondition[i]=$scope.scaleYAttribCondition[i];
            }
        }
        $scope.scaleYAttribCondition=tempCondition;
    };
    //单项选择X项
    $scope.setAttrListXAttriCurrentFlag=function (num) {
        $scope.attrListXAttriCurrentFlag=num;
    };
    //单项选择Y项
    $scope.setAttrListYAttriCurrentFlag=function (num) {
        $scope.attrListYAttriCurrentFlag=num;
    };
    //设置聚类操作类型
    $scope.setAttrOperatorKind=function (num) {
        $scope.attrOperatorKind=num;
    };
    //将数据写入到edit页面
    $scope.sendInfoTOEditPage=function () {
        $scope.$parent.iChart_hidden=0;
        var sendInfo={};
        sendInfo.xAttri=$scope.attrList[$scope.attrListXAttriCurrentFlag];
        sendInfo.xAttriKind=$scope.attrListKind[$scope.attrListXAttriCurrentFlag];
        sendInfo.xAttriSelf=0;
        sendInfo.xField=[];
        for(var i=0;i<$scope.attrListSelectState.length;i++){
            if($scope.attrListSelectState[i]){
                var temp={};
                temp.min=$scope.xAttriKinds[i];
                temp.max=$scope.xAttriKinds[i];
                temp.left=1;
                temp.right=1;
                sendInfo.xField.push(temp);
            }
        }
        for(var i=0;i<$scope.scaleCondition.length;i++){
            var temp={};
            temp.min=$scope.scaleCondition[i].min;
            temp.max=$scope.scaleCondition[i].max;
            temp.left=$scope.scaleCondition[i].left;
            temp.right=$scope.scaleCondition[i].right;
            sendInfo.xField.push(temp);
        }
        sendInfo.yAttri=$scope.attrList[$scope.attrListYAttriCurrentFlag];
        sendInfo.yAttriKind=$scope.attrListKind[$scope.attrListYAttriCurrentFlag];
        sendInfo.Operator=$scope.attrOperatorKind;
        sendInfo.yField=[];
        for(var i=0;i<$scope.attrListYAttribSelectState.length;i++){
            if($scope.attrListYAttribSelectState[i]){
                var temp={};
                temp.min=$scope.yAttriKinds[i];
                temp.max=$scope.yAttriKinds[i];
                temp.left=1;
                temp.right=1;
                sendInfo.yField.push(temp);
            }
        }
        for(var i=0;i<$scope.scaleYAttribCondition.length;i++){
            var temp={};
            temp.min=$scope.scaleYAttribCondition[i].min;
            temp.max=$scope.scaleYAttribCondition[i].max;
            temp.left=$scope.scaleYAttribCondition[i].left;
            temp.right=$scope.scaleYAttribCondition[i].right;
            sendInfo.yField.push(temp);
        }
        console.log(JSON.stringify(sendInfo));
        console.log($scope.$parent.$$childHead.$$nextSibling);
        $http({
            method: 'post',
            url: 'http://127.0.0.1:8000/get_chart_content',
            withCredentials: true,
            data: {
                info:JSON.stringify(sendInfo),
                sheet_id: 3
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
        }).error(function (req) {
            console.log(req);
        });
    };

    //获取初始化数据
    //获取列表属性
    $http({
        method: 'post',
        url: 'http://127.0.0.1:8000/sheet_columns',
        withCredentials: true,
        data: {
            sheet_id:3,
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
        console.log(JSON.parse(req.result));
        $scope.attrList=[];
        for(var item in JSON.parse(req.result)){
            $scope.attrList.push(item);
        }
    }).error(function (req) {
        console.log(req);
    });
    //获取列表单个字段
    $http({
        method: 'post',
        url: 'http://127.0.0.1:8000/get_column_content',
        withCredentials: true,
        data: {
            sheet_id:3,
            column:'一'
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
        console.log(req.result);
        $scope.xAttriKinds=req.result;
        $scope.yAttriKinds=req.result;
    }).error(function (req) {
        console.log(req);
    });

});



// iChartApp.config(['$routeProvider',function ($routeProvider) {
//     $routeProvider
//         .when('/leftMenu1',{
//             templateUrl:'./view/leftMenu1.html',
//             controller: 'leftMenu1'
//         })
//         .when('/leftMenu2',{
//             templateUrl:'./view/leftMenu2.html'
//         })
//         .when('/leftMenu3',{
//             templateUrl:'./view/leftMenu3.html'
//         })
//         .when('/leftMenu4',{
//             templateUrl:'./view/leftMenu4.html'
//         })
//         .when('/leftMenu5',{
//             templateUrl:'./view/leftMenu5.html'
//         })
//         .otherwise({redirectTo:'/leftMenu1'})
// }]);



// $timeout(function () {
//     loadStep.loadStep($scope,"30%","10s");
// }, 0);
// $timeout(function () {
//     loadStep.loadStep($scope,"100%","1s");
// }, 1000);
// $timeout(function () {
//     initLoadStep.init($scope);
// }, 2000);
//
// $timeout(function () {
//     loadStep.loadStep($scope,"100%","1s");
// }, 5000);


// $timeout(function () {
//     closeLeftMenu.closeLeftMenu();
// },0);
// $timeout(function () {
//     openLeftMenu.openLeftMenu();
// },7000);