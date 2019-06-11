//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('gestionUsuariosService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.obtenerUsuarios = function(){

    //var urlObtenerUsuarios = 'data/usuariosLista.json';
    //var urlObtenerUsuarios = 'http://localhost:7003/usuarios';
    var urlObtenerUsuarios = variablesAmbiente.apiUrl + variablesAmbiente.puertoUsuarios + '/usuarios';
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

  servicio.obtenerEspecialidades = function (idFacultadEspecialidad) {
    var urlObtenerEspecialidades = variablesAmbiente.apiUrl + variablesAmbiente.puertoFacultades + '/especialidad/' + idFacultadEspecialidad;
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

  servicio.obtenerRoles = function () {
    var urlObtenerRoles = variablesAmbiente.apiUrl + variablesAmbiente.puertoUsuarios + '/roles';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerRoles,
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.obtenerRolesActivos = function () {
    var urlObtenerRolesActivos = variablesAmbiente.apiUrl + variablesAmbiente.puertoUsuarios + '/roles/rolesactivos';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerRolesActivos,
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };
  servicio.regitstrarUsuario = function (usuarioNuevo) {
    var urlRegistrarUsuario = variablesAmbiente.apiUrl + variablesAmbiente.puertoUsuarios + '/usuarios/crear';
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

  servicio.eliminarUsuario = function (usuarioEliminar) {
    var urlRegistrarUsuario = variablesAmbiente.apiUrl + variablesAmbiente.puertoUsuarios + '/usuarios/eliminar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlRegistrarUsuario,
        data: usuarioEliminar
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.obtenerUsuario = function (idUsuario) {
    var urlRegistrarUsuario = variablesAmbiente.apiUrl + variablesAmbiente.puertoUsuarios + '/usuarios/obtenerusuario/' + idUsuario;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlRegistrarUsuario
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.actualizarRoles = function (usuarioListaNuevosRolesJson) {
    var urlActualizarRoles = variablesAmbiente.apiUrl + variablesAmbiente.puertoUsuarios + '/usuarios/actualizarroles';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlActualizarRoles,
        data: usuarioListaNuevosRolesJson
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

}]);
