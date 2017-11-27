iChartApp.controller("iChartController", function ($scope,$state,$http) {
    $scope.mainOrSub=1;
    $scope.iChart_hidden=0;
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
    //左边的菜单栏点击事件


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

    //纬度字段弹窗
    $scope.fieldList={
        date:["日期"],
        text:["订单来源","用户注册来源","订单地区"],
        number:["支付订单量","被投诉订单量"]
    };
    $scope.latitudeListTemp={};//保留弹窗内部纬度值
    $scope.valueListTemp={};//保留弹窗内部纬度值
    $scope.settingLatitude=function (valueKind,value) {
        var key=valueKind+value;
        if($scope.latitudeListTemp[key]){
            if($scope.latitudeListTemp[key]===2){
                $scope.latitudeListTemp[key]=0
            }
            else{
                $scope.latitudeListTemp[key]=2;
            }
        }
        else{
            $scope.latitudeListTemp[key]=2;
        }
    };
    $scope.settingValue=function (valueKind,value) {
        var key=valueKind+value;
        if($scope.valueListTemp[key]){
            if($scope.valueListTemp[key]===3){
                $scope.valueListTemp[key]=0
            }
            else{
                $scope.valueListTemp[key]=3;
            }
        }
        else{
            $scope.valueListTemp[key]=3;
        }
    };
    $scope.settingLatitudeOK=function () {
        for(var key in $scope.latitudeListTemp){
            var keyKind=key.substring(0,1);
            var keyNum=key.substring(1);
            switch (keyKind){
                case 'a':
                    $scope.$$childHead.$$nextSibling.latitudeList.push($scope.fieldList.date[keyNum]);
                    break;
                case 'b':
                    $scope.$$childHead.$$nextSibling.latitudeList.push($scope.fieldList.text[keyNum]);
                    break;
                case 'c':
                    $scope.$$childHead.$$nextSibling.latitudeList.push($scope.fieldList.number[keyNum]);
                    break;
                default:
                    break;
            }
            var newLatitude=[];
            for(var i=0;i<$scope.$$childHead.$$nextSibling.latitudeList.length;i++){
                var flag=true;
                for(var j=0;j<newLatitude.length;j++){
                    if(newLatitude[j]===$scope.$$childHead.$$nextSibling.latitudeList[i]){
                        flag=false;
                    }
                }
                if(flag){
                    newLatitude.push($scope.$$childHead.$$nextSibling.latitudeList[i]);
                }
            }
            $scope.$$childHead.$$nextSibling.latitudeList=newLatitude;
            $scope.iChart_hidden=0;
        }
    };
    $scope.settingValueOK=function () {
        for(var key in $scope.valueListTemp){
            var keyKind=key.substring(0,1);
            var keyNum=key.substring(1);
            switch (keyKind){
                case 'a':
                    $scope.$$childHead.$$nextSibling.valueList.push($scope.fieldList.date[keyNum]);
                    break;
                case 'b':
                    $scope.$$childHead.$$nextSibling.valueList.push($scope.fieldList.text[keyNum]);
                    break;
                case 'c':
                    $scope.$$childHead.$$nextSibling.valueList.push($scope.fieldList.number[keyNum]);
                    break;
                default:
                    break;
            }
            var newLatitude=[];
            for(var i=0;i<$scope.$$childHead.$$nextSibling.valueList.length;i++){
                var flag=true;
                for(var j=0;j<newLatitude.length;j++){
                    if(newLatitude[j]===$scope.$$childHead.$$nextSibling.valueList[i]){
                        flag=false;
                    }
                }
                if(flag){
                    newLatitude.push($scope.$$childHead.$$nextSibling.valueList[i]);
                }
            }
            $scope.$$childHead.$$nextSibling.valueList=newLatitude;
            $scope.iChart_hidden=0;
        }
    };
});


iChartApp.controller("iChartEditPController",function ($scope,$state,$compile,$http,scanTable,changeTableAttr,changeTextAttr,addTableDom,addTextDom,openLeftMenu,closeLeftMenu) {
    /**
     * 页面初始化
     */
    $scope.eleDomOrders=[];//记录增加元素的相关信息
    $scope.eleDomInfos={};//记录增加元素的相关信息
    $scope.attrKindFlag=0;//属性种类集合

    $scope.attrsIsExieted=[true,true,false,true];//属性是否显示
    $scope.attrsDataIsExieted=[true,true,false,true];//数据属性是否显示

    $scope.attrsIsClose=[];//属性是否关闭
    $scope.attrsDataIsClose=[];//数据属性是否关闭

    $scope.currentDomId="";//正在处理的DOM
    $scope.currentHoverID="";

    $scope.latitudeList=[];//选中纬度值
    $scope.valueList=[];


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
     *  纬度弹窗
     */
    $scope.showHidden_Latitude=function () {
        $scope.$parent.iChart_hidden=2;
        $scope.$parent.latitudeListTemp={};
        for(var i=0;i<$scope.latitudeList.length;i++){
            var key;
            for(var j=0;j<$scope.$parent.fieldList.date.length;j++){
                if($scope.latitudeList[i]===$scope.$parent.fieldList.date[j]){
                    key='a'+j;
                }
            }
            for(var j=0;j<$scope.$parent.fieldList.text.length;j++){
                if($scope.latitudeList[i]===$scope.$parent.fieldList.text[j]){
                    key='b'+j;
                }
            }
            for(var j=0;j<$scope.$parent.fieldList.number.length;j++){
                if($scope.latitudeList[i]===$scope.$parent.fieldList.number[j]){
                    key='c'+j;
                }
            }
            if(key){
                $scope.$parent.latitudeListTemp[key]=2;
            }
        }
    };
    /**
     *  值弹窗
     */
    $scope.showHidden_Value=function () {
        $scope.$parent.iChart_hidden=3;
        $scope.$parent.valueListTemp={};
        for(var i=0;i<$scope.valueList.length;i++){
            var key;
            for(var j=0;j<$scope.$parent.fieldList.date.length;j++){
                if($scope.valueList[i]===$scope.$parent.fieldList.date[j]){
                    key='a'+j;
                }
            }
            for(var j=0;j<$scope.$parent.fieldList.text.length;j++){
                if($scope.valueList[i]===$scope.$parent.fieldList.text[j]){
                    key='b'+j;
                }
            }
            for(var j=0;j<$scope.$parent.fieldList.number.length;j++){
                if($scope.valueList[i]===$scope.$parent.fieldList.number[j]){
                    key='c'+j;
                }
            }
            if(key){
                $scope.$parent.valueListTemp[key]=2;
            }
        }
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