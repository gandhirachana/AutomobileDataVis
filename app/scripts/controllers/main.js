'use strict';

/**
 * @ngdoc function
 * @name carDataApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the carDataApp
 */
angular.module('carDataApp')
  .controller('MainCtrl', ['$scope','drawService',function ($scope, drawService) {
    d3.csv('../data/data.csv')
      .row(function(d){ return {symboling: d.symboling, carName: d.make,horsepower: d.horsepower, carType: d.bodyStyle,price: d.price }; })
      .get(function(error, rows) {$scope.data = rows; $scope.$digest();});

    $scope.changeVisualizationParameter = function(event, param){
      $(event.target).siblings('.active').removeClass('active');
      drawService.clearCircles();
      drawService.drawPackCircles($scope.data,$scope.elem, param);
    };


  }]);
