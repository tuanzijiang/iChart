iChartApp.directive("switchButton",function () {
   return {
       restrict: "A",
       scope:{},
       template:"                <div class=\"switch-menu-item\" ng-click=\"bottom_position=0\" ></div>\n" +
       "                <div class=\"switch-menu-item\" ng-click=\"bottom_position=1\" ></div>\n" +
       "                <div class=\"switch-menu-item\" ng-click=\"bottom_position=2\" ></div>\n" +
       "                <div class=\"switch-menu-item\" ng-click=\"bottom_position=3\" ></div>\n" +
       "                <div class=\"switch-menu-bottom\"></div>",
       link: function (scope,element,attr) {
           var item_len=attr.switchButton.split(",").length;
           for(var i=0;i<item_len;i++){
               element[0].children[i].innerHTML=attr.switchButton.split(",")[i];
           }
           for(var i=item_len;i<4;i++){
               element[0].children[i].style.cssText="display:none";
           }
           scope.$watch("bottom_position",function () {
               var buttonNum=attr.switchButton.split(",").length;
               element[0].children[element[0].children.length-1].style.cssText="left: "+(100/buttonNum)*scope.bottom_position+"%;width: "+100/buttonNum+"%";
           });
       }
   }
});