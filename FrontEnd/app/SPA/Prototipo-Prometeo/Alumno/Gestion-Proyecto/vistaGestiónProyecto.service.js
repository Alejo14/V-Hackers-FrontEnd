//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('gestionProyectoServiceAlumno', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.registroProyecto = function(data){
    var urlCrearProyecto = variablesAmbiente.apiUrl + variablesAmbiente.puertoProyectos + '/proyectos/crear';
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
    var urlModifProyecto = variablesAmbiente.apiUrl + variablesAmbiente.puertoProyectos + '/proyectos/modificar';
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
}]);
