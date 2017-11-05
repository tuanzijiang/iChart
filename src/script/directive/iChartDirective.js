//The page organized as followd:
//- switchButton


iChartApp.directive("switchButton",function () {
   return {
       restrict: "A",
       scope:{},
       template:"                <div class=\"switch-menu-item\" ng-click=\"bottom_position=0\" ng-init=\"bottom_position=0\"></div>\n" +
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
               var buttonHalf=(attr.switchButtonSize*element[0].offsetWidth)/(buttonNum*200);//the half width of the button
               var buttonLeft=((2*scope.bottom_position+1)*element[0].offsetWidth)/(buttonNum*2);//the offset from left point
               console.log((buttonLeft-buttonHalf));
               element[0].children[element[0].children.length-1].style.cssText="left: "+(buttonLeft-buttonHalf)+"px;width: "+attr.switchButtonSize/buttonNum+"%";
           });
       }
   }
});