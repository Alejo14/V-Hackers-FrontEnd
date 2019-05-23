//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('profesorCursoService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.listarProyectos = function(){

    var urlListarProyectos = 'http://localhost:7001/proyectosxcurso/cde22521-8cc6-4cea-a2d2-802c4b03674a';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlListarProyectos
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.listarEntregables = function(){

    var urlListarEntregables = 'http://localhost:7002/entregables';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlListarEntregables
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.eliminarProyecto = function(data){
    var urlElimProyecto = 'http://localhost:7001/proyectos/eliminar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlElimProyecto,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.eliminarentregableAlumno = function(data){
    var urlEnviarCalificacion = 'http://localhost:7002/entregables/eliminar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEnviarCalificacion,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
