angular.module("vHackersModule").service('nuevaEscalaService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.enviarNiveles = function(data){
    var urlEnviarNiveles = 'http://localhost:7008/herramienta/agregarNiveles'; //url a donde se envían los niveles seleccionados
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEnviarNiveles,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.listarAspectos = function(data){
    console.log(data);
    var urlListarAspectos = variablesAmbiente.apiUrl + variablesAmbiente.puertoHerramientaEvaluacion + '/herramienta/listarAspectos';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlListarAspectos,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.guardarRubrica = function(data) {
    var urlConfirmarHerramienta = variablesAmbiente.apiUrl + variablesAmbiente.puertoHerramientaEvaluacion + '/herramienta/confirmarHerramienta';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlConfirmarHerramienta,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }


  /* Servicios de Criterios*/
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

  servicio.agregarCriterios = function(data){
    var urlEnviarCriterios = 'http://localhost:7008/herramienta/agregarCriterios'; //url a donde se envían los niveles seleccionados
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEnviarCriterios,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }
  /*------------*/

}]);
