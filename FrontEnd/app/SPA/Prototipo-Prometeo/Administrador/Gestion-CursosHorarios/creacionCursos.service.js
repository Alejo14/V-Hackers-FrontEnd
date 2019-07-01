//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('creacionCursosService', ['$q', '$http','variablesAmbiente',
function($q, $http,variablesAmbiente) {

  var servicio = this;

  servicio.registroCurso = function(data){
    var urlEnviarCurso = variablesAmbiente.apiUrl+variablesAmbiente.puertoCursos+'/cursos/crear';
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
    var urlModificarCurso = variablesAmbiente.apiUrl+variablesAmbiente.puertoCursos+'/cursos/modificar';
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

  servicio.obtenerEspecialidades = function () {
    var urlObtenerEspecialidades = variablesAmbiente.apiUrl+variablesAmbiente.puertoFacultades+'/especialidad';
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
