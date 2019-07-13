angular.module("vHackersModule").service('asignarHorarioService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;



  servicio.listarHorarios = function (idcc) {
    // console.log(idcc)
    var urlObtenerHorarios = variablesAmbiente.apiUrl+variablesAmbiente.puertoHorarios+'/horarios/conroles/'+idcc;
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
    var urlObtenerUsuarios = variablesAmbiente.apiUrl+variablesAmbiente.puertoUsuarios+'/usuarios/listarpor/'+rol;
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

  servicio.eliminarHorario = function(data){
    var urlElimHorario = variablesAmbiente.apiUrl+variablesAmbiente.puertoHorarios+'/horarios/eliminar';
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
    var urlCrearHorario = variablesAmbiente.apiUrl+variablesAmbiente.puertoHorarios+'/horarios/crear';
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
    var urlAsignarRolUsuarioXCC = variablesAmbiente.apiUrl+variablesAmbiente.puertoCursos+'/cursos/cursociclo/asignarrolusuario';
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
    var urlModificarRolUsuarioXCC = variablesAmbiente.apiUrl+variablesAmbiente.puertoCursos+'/cursos/cursociclo/modificarrolusuario';
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
    var urlEliminarRolUsuarioXCC = variablesAmbiente.apiUrl+variablesAmbiente.puertoCursos+'/cursos/cursociclo/eliminarolusuario';
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
    var urlAsignarRolUsuario = variablesAmbiente.apiUrl+variablesAmbiente.puertoHorarios+'/horarios/asignarrolusuario';
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
    var urlModificarRolUsuario = variablesAmbiente.apiUrl+variablesAmbiente.puertoHorarios+'/horarios/modificarrolusuario';
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
    var urlEliminarRolUsuario = variablesAmbiente.apiUrl+variablesAmbiente.puertoHorarios+'/horarios/eliminarrolusuario';
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
    var urlModifHorario = variablesAmbiente.apiUrl+variablesAmbiente.puertoHorarios+'/horarios/modificar';
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

  servicio.obtenerAsistentesHorario = function(data){
    var urlObtenerUsuarios = variablesAmbiente.apiUrl+variablesAmbiente.puertoHorarios+'/horarios/listarasistenteshorario/'+data;
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
  }

  servicio.obtenerAsistentesNoHorario = function(data){
    var urlObtenerUsuarios = variablesAmbiente.apiUrl+variablesAmbiente.puertoHorarios+'/horarios/listarasistentesnohorario/'+data;
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
  }

  servicio.actualizarAsistentesHorario = function(data){
    //ACTUALIZAR
    var urlActualizarHorario = variablesAmbiente.apiUrl+variablesAmbiente.puertoHorarios+'/horarios/actualizarasistenteshorario';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlActualizarHorario,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
