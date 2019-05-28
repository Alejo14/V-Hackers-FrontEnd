//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('creacionCursosService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.registroCurso = function(data){
    var urlEnviarCurso = 'http://localhost:7004/cursos/crear';
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
  }

  servicio.modificarCurso = function(data){
    var urlModificarCurso = 'http://localhost:7004/cursos/modificar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlModificarCurso,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

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

  servicio.obtenerEspecialidades = function () {
    var urlObtenerEspecialidades = 'http://localhost:7005/especialidad';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerEspecialidades,
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

}]);
