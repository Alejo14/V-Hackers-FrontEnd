angular.module("vHackersModule").service('nuevoAspectoServicio', ['$q', '$http', 'variablesAmbiente',
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
    console.log(data);
    var urlListarNiveles = variablesAmbiente.apiUrl + variablesAmbiente.puertoHerramientaEvaluacion + '/herramienta/listarNiveles';
    var $defer = $q.defer();
    $http({
        method: 'GET',
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
        method: 'GET',
        url: urlListarCriterios,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }
}]);
