//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('administradorEspecialidadService', ['$q', '$http',
'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.registroEspecialidad = function(data){
    var urlRegistroEspecialidad = variablesAmbiente.apiUrl + variablesAmbiente.puertoEspecialidad + '/especialidad/crear';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlRegistroEspecialidad,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.modificoEspecialidad = function(data){
    var urlModificoEspecialidad = variablesAmbiente.apiUrl + variablesAmbiente.puertoEspecialidad + '/especialidad/modificar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlModificoEspecialidad,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.eliminarEspecialidad = function(data){
    var urlEliminarEspecialidad = variablesAmbiente.apiUrl + variablesAmbiente.puertoEspecialidad + '/especialidad/eliminar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEliminarEspecialidad,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }


  servicio.listarEspecialidades = function(){
    var urlListarEspecialidades = variablesAmbiente.apiUrl + variablesAmbiente.puertoEspecialidad + '/especialidad';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlListarEspecialidades
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.obtenerFacultades = function () {
    var urlObtenerFacultades = variablesAmbiente.apiUrl + variablesAmbiente.puertoFacultades + '/facultad';
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

  servicio.listarResponsables = function () {
    var urlObtenerFacultades = variablesAmbiente.apiUrl + variablesAmbiente.puertoEspecialidad + '/especialidad/listar/administradores';
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
