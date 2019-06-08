angular.module("vHackersModule").service('vistaGruposService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.obtenerAlumnos = function(horarioId){
    var urlObtenerAlumnos = variablesAmbiente.apiUrl + variablesAmbiente.puertoHorarios + '/horarios/listaralumnosxhorario/' + horarioId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerAlumnos
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  /*servicio.obtenerConjuntosGrupo = function(horarioId){
    var urlObtenerConjuntosGrupo = variablesAmbiente.apiUrl + variablesAmbiente.puertoGrupos + '/grupos/listarconjuntogruposxhorario/' + horarioId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerConjuntosGrupo
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };*/

  servicio.obtenerGrupos = function(horarioId){
    var urlObtenerGrupos = variablesAmbiente.apiUrl + variablesAmbiente.puertoGrupos + '/grupos/listargruposxconjunto/' + horarioId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerGrupos
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.crearGrupo = function(data){
    var urlCrearGrupo = variablesAmbiente.apiUrl + variablesAmbiente.puertoGrupos + '/grupos/creargrupo';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlCrearGrupo,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.eliminarGrupo = function(data){
    var urlEliminarGrupo = variablesAmbiente.apiUrl + variablesAmbiente.puertoGrupos + '/grupos/eliminargrupo';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEliminarGrupo,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.obtenerAlumnosGrupo = function(grupoId){
    var urlListarGrupoAlumnos = variablesAmbiente.apiUrl + variablesAmbiente.puertoGrupos + '/grupos/listargrupodealumnos/' + grupoId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlListarGrupoAlumnos
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

}]);
