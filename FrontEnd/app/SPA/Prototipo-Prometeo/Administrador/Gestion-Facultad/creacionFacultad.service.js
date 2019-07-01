angular.module("vHackersModule").service('creacionFacultadService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.registroFacultad = function(data){

      var urlEnviarCurso = variablesAmbiente.apiUrl+variablesAmbiente.puertoFacultades+'/facultad/crear';
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
    var urlEnviarCurso = variablesAmbiente.apiUrl+variablesAmbiente.puertoFacultades+'/facultad/modificar';
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
    var urlEnviarCurso = variablesAmbiente.apiUrl+variablesAmbiente.puertoFacultades+'/facultad/eliminar';
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
    var urlObtenerFacultades = variablesAmbiente.apiUrl+variablesAmbiente.puertoFacultades+'/facultad';
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
