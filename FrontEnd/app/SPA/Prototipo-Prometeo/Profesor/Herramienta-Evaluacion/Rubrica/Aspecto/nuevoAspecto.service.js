angular.module("vHackersModule").service('nuevoAspectoRubricaServicio', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.enviarAspecto = function(data){
    var urlEnviarAspecto = 'http://localhost:7008/herramienta/asignarAspecto'; //url a donde se envían los niveles seleccionados
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEnviarAspecto,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.listarNiveles = function(data){
    var urlListarNiveles = variablesAmbiente.apiUrl + variablesAmbiente.puertoHerramientaEvaluacion + '/herramienta/listarNiveles';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlListarNiveles,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.listarCriteriosXAspecto = function(data){
    console.log(data);
    var urlListarCriterios = variablesAmbiente.apiUrl + variablesAmbiente.puertoHerramientaEvaluacion + '/herramienta/listarCriterios';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlListarCriterios,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.eliminarCriterio = function(data){
    var urlEliminarCriterio = variablesAmbiente.apiUrl + variablesAmbiente.puertoHerramientaEvaluacion + '/herramienta/eliminarCriterio';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEliminarCriterio,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
