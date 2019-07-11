angular.module("vHackersModule").service('herramientaEvaluacionService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.crearHerramienta = function(data){
    var urlCrearHerrmienta = variablesAmbiente.apiUrl + variablesAmbiente.puertoHerramientaEvaluacion + '/herramienta/crear';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlCrearHerrmienta,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.obtenerRolUsuario = function(idUsuario, descripcionRol){

    var urlObtenerRolUsuario = variablesAmbiente.apiUrl + variablesAmbiente.puertoUsuarios + '/roles/rolusuario/'+ idUsuario + '?descripcionrol=' + descripcionRol;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerRolUsuario
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
