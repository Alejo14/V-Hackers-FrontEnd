//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('gestionHorariosService', ['$q', '$http','variablesAmbiente',
function($q, $http,variablesAmbiente) {

  var servicio = this;

  servicio.obtenerCursos = function(){

    //var urlObtenerUsuarios = 'data/usuariosLista.json';
    var urlObtenerCursos = variablesAmbiente.apiUrl+variablesAmbiente.puertoCursos+'/cursos/cursociclo';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerCursos
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

  servicio.obtenerCiclos = function () {
    var urlObtenerEspecialidades = variablesAmbiente.apiUrl+variablesAmbiente.puertoSemestre+'/semestres';
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

  servicio.eliminarCursoCiclo = function(data){
    var urlElimCurso = variablesAmbiente.apiUrl+variablesAmbiente.puertoCursos+'/cursos/cursociclo/eliminar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlElimCurso,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }



}]);
