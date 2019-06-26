angular.module("vHackersModule").service('creacionFacultadService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.registroFacultad = function(data){
    var urlEnviarCurso = 'http://localhost:7005/facultad/crear';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEnviarCurso,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.modificarFacultad = function(data){
    var urlEnviarCurso = 'http://localhost:7005/facultad/modificar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEnviarCurso,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.eliminarFacultad = function(data){
    var urlEnviarCurso = 'http://localhost:7005/facultad/eliminar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEnviarCurso,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.obtenerFacultades = function () {
    var urlObtenerFacultades = 'http://localhost:7005/facultad';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerFacultades
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

}]);
