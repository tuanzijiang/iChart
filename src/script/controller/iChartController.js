app.controller("iChartController", function ($scope, $timeout, slowLoadStep, fastLoadStep) {
    $timeout(function () {
        slowLoadStep.slowLoad($scope,document.getElementsByTagName("body")[0].offsetWidth/4);
    }, 0);
    $timeout(function () {
        fastLoadStep.fastLoad($scope,document.getElementsByTagName("body")[0].offsetWidth);
    }, 1000);
});

