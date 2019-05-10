//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('gestionUsuariosService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.obtenerUsuarios = function(){

    //var urlObtenerUsuarios = 'data/usuariosLista.json';
    var urlObtenerUsuarios = 'http://localhost:7003/usuarios';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerUsuarios
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.obtenerFacultades = function () {
    var urlObtenerFacultades = 'http://localhost:7005/facultad';
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

  servicio.obtenerEspecialidades = function (idFacultadEspecialidad) {
    var urlObtenerEspecialidades = 'http://localhost:7005/especialidad/' + idFacultadEspecialidad;
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

  servicio.regitstrarUsuario = function (usuarioNuevo) {
    var urlRegistrarUsuario = 'http://localhost:7003/usuarios/crear';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlRegistrarUsuario,
        data: usuarioNuevo
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

}]);
