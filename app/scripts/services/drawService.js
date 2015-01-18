angular.module('carDataApp').service('drawService', function() {
  var dispatch = d3.dispatch("tooltipEnter", "tooltipExit");
  var convertTosafety = function(symboling){
    var safety = symboling <0 ? -symboling +3 : symboling;
    return safety;
  };
  var drawPackCircles = function(data, ele, param){

      var diameter = 960;

      /*var color = d3.scale.category10();*/
      var color = d3.scale.quantize()
        .range(['#58D3F7', '#045FB4', '#0B243B']);



      var tree = makeTree(data, param);

      var pack = d3.layout.pack()
        .size([diameter - 4, diameter - 4])
        .value(function(d) { return 1+parseInt(convertTosafety(d.symboling));});

      color.domain(d3.extent(data, function(d){return parseInt(d.horsepower);}));

      var svg = d3.select(ele[0]).append('svg')
        .attr('width', diameter)
        .attr('height', diameter)
        .append('g')
        .attr('transform', 'translate(2,2)');

      var circle = svg.selectAll('circle')
         .data(pack.nodes(tree));

     circle
          .enter().append('circle')
          .attr('r', function(d) {return d.r; })
          .attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; })
          .style('fill', function(d) { return color(parseInt(d.horsepower)); })
          .on('mouseover', function(d, i){
             dispatch.tooltipEnter(d,i,svg);
          })
          .on('mouseout', function(d,i){
             dispatch.tooltipExit(d,i,svg);
          });

       //svg.selectAll('circle').exit().remove();
       circle.exit().remove();

    };

    var makeTree = function(data, parameter){
      var root = {
        children : []
      };

      data.map(function(d){
        if(!root.children.length){
          root.children.push({
            carName: d.carName,
            symboling: d.symboling,
            horsepower: d.horsepower,
            price: d.price,
            children:[]

          });
        }else{
          var isMatch = false;
          angular.forEach(root.children, function(obj){

            if(obj[parameter] === d[parameter]){
              obj.children.push({
                carName: d.carName,
                symboling: d.symboling,
                horsepower: d.horsepower,
                price: d.price,
                children:[]
              });
              isMatch = true;
            }
          });
          if(!isMatch){

            root.children.push({
              carName: d.carName,
              symboling: d.symboling,
              horsepower: d.horsepower,
              price: d.price,
              children:[]
            });
          }

        }

      });

      return root;
    };

    var clearCircles = function(){
      d3.selectAll('svg').remove();
    };

   return {
     'clearCircles':clearCircles,
     'drawPackCircles':drawPackCircles,
     'dispatch':dispatch,
     'convertToSafety':convertTosafety
   };

});
