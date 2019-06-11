//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('gestionProyectoService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.registroProyecto = function(data){
    var urlCrearProyecto = 'http://localhost:7001/proyectos/crear';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlCrearProyecto,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.modificarProyecto = function(data){
    var urlModifProyecto = 'http://localhost:7001/proyectos/modificar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlModifProyecto,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.obtenerProyecto = function(codigoProyecto){
    var urlObtenerProyecto = variablesAmbiente.apiUrl + variablesAmbiente.puertoProyectos + '/proyectos/' + codigoProyecto;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerProyecto
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }
}]);
