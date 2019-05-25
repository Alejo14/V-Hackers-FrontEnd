angular.module('vHackersModule').controller('herramientaEvaluacionCtrl', herramientaEvaluacionCtrl);

herramientaEvaluacionCtrl.$inject = ['$scope','$state'];

function herramientaEvaluacionCtrl($scope, $state){
  var ctrl = this;
  ctrl.titulo = 'Nueva Herramienta de Evaluación';
  

}
