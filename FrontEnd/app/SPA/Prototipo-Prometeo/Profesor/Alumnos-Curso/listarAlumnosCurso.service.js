angular.module("vHackersModule").service('listarAlumnosService', ['$q', '$http', 'variablesAmbiente',
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

  servicio.obtenerConjuntosGrupo = function(horarioId){
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
  };

  servicio.obtenerConjuntosGrupo = function(horarioId){
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
  };

  servicio.crearConjuntosGrupo = function(data){
    var urlCrearConjuntosGrupo = variablesAmbiente.apiUrl + variablesAmbiente.puertoGrupos + '/grupos/crearconjuntogrupos';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlCrearConjuntosGrupo,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };


}]);
