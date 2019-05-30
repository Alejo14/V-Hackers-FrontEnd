angular.module("vHackersModule").service('asignarHorarioService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;



  servicio.listarHorarios = function (idcc) {
    console.log(idcc)
    var urlObtenerHorarios = 'http://localhost:7010/horarios/conroles/'+idcc;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerHorarios,
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.listarUsuariosXRol = function (rol) {
    var urlObtenerUsuarios = 'http://localhost:7003/usuarios/listarpor/'+rol;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerUsuarios,
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

  servicio.eliminarHorario = function(data){
    var urlElimHorario = 'http://localhost:7010/horarios/eliminar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlElimHorario,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.crearHorario = function(data){
    var urlCrearHorario = 'http://localhost:7010/horarios/crear';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlCrearHorario,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.asignarRolUsuarioXCursoCiclo = function(data){
    var urlAsignarRolUsuarioXCC = 'http://localhost:7004/cursos/cursociclo/asignarrolusuario';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlAsignarRolUsuarioXCC,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.modificarRolUsuarioXCursoCiclo = function(data){
    var urlModificarRolUsuarioXCC = 'http://localhost:7004/cursos/cursociclo/modificarrolusuario';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlModificarRolUsuarioXCC,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.eliminarRolUsuarioXCursoCiclo = function(data){
    var urlEliminarRolUsuarioXCC = 'http://localhost:7004/cursos/cursociclo/eliminarolusuario';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEliminarRolUsuarioXCC,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.asignarRolUsuario = function(data){
    var urlAsignarRolUsuario = 'http://localhost:7010/horarios/asignarrolusuario';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlAsignarRolUsuario,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.modificarRolUsuario = function(data){
    var urlModificarRolUsuario = 'http://localhost:7010/horarios/modificarrolusuario';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlModificarRolUsuario,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.eliminarRolUsuario = function(data){
    var urlEliminarRolUsuario = 'http://localhost:7010/horarios/eliminarrolusuario';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEliminarRolUsuario,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.modificarHorario = function(data){
    var urlModifHorario = 'http://localhost:7010/horarios/modificar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlModifHorario,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }






}]);
