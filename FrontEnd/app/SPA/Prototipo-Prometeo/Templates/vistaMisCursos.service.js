angular.module("vHackersModule").service('vistaMisCursosService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.listarMisCursos = function(misCursoInfo){

    var urlListarMisCursos = variablesAmbiente.apiUrl + variablesAmbiente.puertoCursos + '/cursos/listarhorariocursociclorolusuario/'
                              + misCursoInfo.cicloId + '?RolUsuarioID=' + misCursoInfo.rolUsuarioId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlListarMisCursos
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.listarMisCursosAlumno = function(misCursoInfo){

    var urlListarMisCursos = variablesAmbiente.apiUrl + variablesAmbiente.puertoCursos + '/cursos/listarcursosciclorolusuario/'
                              + misCursoInfo.cicloId + '?RolUsuarioID=' + misCursoInfo.rolUsuarioId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlListarMisCursos
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.cicloActual = function(){

    var urlCicloActual = variablesAmbiente.apiUrl + variablesAmbiente.puertoCursos + '/cursos/cicloactual/';
    var $defer = $q.defer();
    $http({
        method: 'POst',
        url: urlCicloActual
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

servicio.listarPromediosEntregablesCursoCiclo = function (usuario) {
  var urlListarPromediosEntregablesCursoCiclo = variablesAmbiente.apiUrl + variablesAmbiente.puertoReportes + '/reportes/listarpromediosentregablescursociclo';
  var $defer = $q.defer();
  $http({
      method: 'POST',
      url: urlListarPromediosEntregablesCursoCiclo,
      data: usuario
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
