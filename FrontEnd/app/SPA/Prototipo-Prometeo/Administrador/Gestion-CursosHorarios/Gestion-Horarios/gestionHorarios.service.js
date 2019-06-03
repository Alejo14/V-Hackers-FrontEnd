//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('gestionHorariosService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.obtenerCursos = function(){

    //var urlObtenerUsuarios = 'data/usuariosLista.json';
    var urlObtenerCursos = 'http://localhost:7004/cursos/cursociclo';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerCursos
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

  servicio.obtenerCiclos = function () {
    var urlObtenerEspecialidades = 'http://localhost:7006/semestres';
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

  servicio.eliminarCursoCiclo = function(data){
    var urlElimCurso = 'http://localhost:7004/cursos/cursociclo/eliminar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlElimCurso,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }



}]);
