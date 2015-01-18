angular.module('carDataApp').directive('bubbleChart',['drawService','tooltipService',function(drawService, tooltipService){
  return {
    restrict: 'A',
    controller: 'MainCtrl',

    link:function(scope, ele, attrs, mainCtrl){

      scope.$watch('data',function(newVal, oldVal){
        if(newVal){
          //draw the chart
          scope.elem = ele;
          drawService.drawPackCircles(newVal, ele, 'carName');

        }
      });
      var tooltipOptions = {
          headerFormat:'',
          bodyFormat:''

      };


      drawService.dispatch.on("tooltipEnter", function(d, i,svg) {
        if(d.carName) {
          tooltipOptions.body = 'Horsepower: ' + d.horsepower + '<br>' +
          'Safety: ' + drawService.convertToSafety(d.symboling)  +'<br>'+
          'Price: ' + d.price;
          tooltipOptions.header = 'Car Name: '+d.carName;
          tooltipService.init(d, i, svg, tooltipOptions);
          tooltipService.show();
        }
      });
      drawService.dispatch.on("tooltipExit", function(d,i,svg){
           tooltipService.hide();
      });


    }
  };
}]);
