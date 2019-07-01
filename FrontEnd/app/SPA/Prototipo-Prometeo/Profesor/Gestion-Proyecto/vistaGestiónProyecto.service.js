angular.module("vHackersModule").service('gestionProyectoService', ['$q', '$http', 'variablesAmbiente',
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

  servicio.obtenerProyecto = function(codigoProyecto){
    var urlObtenerProyecto = variablesAmbiente.apiUrl + variablesAmbiente.puertoProyectos + '/proyectos/' + codigoProyecto;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerProyecto
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

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

  servicio.obtenerGrupos = function(horarioId){
    var urlObtenerGrupos = variablesAmbiente.apiUrl + variablesAmbiente.puertoGrupos + '/grupos/listargruposxhorario/' + horarioId;
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

  servicio.mostrarAvanceProyecto = function(idProyecto, idRolUsuario, idGrupo){
    var urlobtenerAvance = variablesAmbiente.apiUrl + variablesAmbiente.puertoProyectos + '/proyectos/avancecalificar/'
    + idProyecto+"?idRolUsuario=" + idRolUsuario + "&idGrupo=" + idGrupo;
    console.log(urlobtenerAvance);
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlobtenerAvance
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };
}]);
