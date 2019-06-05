//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('profesorCursoService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.listarProyectos = function(codigoCurso){
    var urlListarProyectos = variablesAmbiente.apiUrl + variablesAmbiente.puertoProyectos + '/proyectosxcurso/' + codigoCurso;
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

  servicio.listarEntregables = function(codigoCurso){

    var urlListarEntregables = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable + '/entregablesxcursociclo/' + codigoCurso;
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
    var urlElimProyecto =  variablesAmbiente.apiUrl + variablesAmbiente.puertoProyectos + '/proyectos/eliminar';
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
    var urlEnviarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable + '/entregables/eliminar';
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
