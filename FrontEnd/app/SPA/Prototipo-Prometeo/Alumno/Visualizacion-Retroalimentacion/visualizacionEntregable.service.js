angular.module("vHackersModule").service('visualizacionHerramientaEvaluacionServicio', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.obtenerEvaluacion = function(avanceEntregableId){
    var urlObtenerEvaluacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoCalificacion + '/mostrarCalificacion/' + avanceEntregableId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerEvaluacion
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.guardarCalificacion = function(evaluacion){
    var urlGuardarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoCalificacion + '/guardarCalificacion';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlGuardarCalificacion,
        data: evaluacion
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.mostrarAvanceEntregables = function(data){
    var urlListarEntregables =variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/mostrarAvanceEntregable/' + data.idEntregable + "?idRolUsuario=" + data.idRolUsuario + "&idGrupo=0"; //'http://localhost:7002/entregables';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlListarEntregables
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.mostrarArchivosAvanceEntregable = function(id){
    var urlmostrarAvanceEntregable = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/mostrarArchivoAvanceEntregable/' + id;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlmostrarAvanceEntregable
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
       console.log(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.mostrarURLsAvanceEntregable = function(id){
    var urlmostrarAvanceEntregable = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/mostrarArchivoUrlAvanceEntregable/' + id;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlmostrarAvanceEntregable
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
       console.log(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.descargarArchivoEntregable = function(id){
    var urlmostrarAvanceEntregable = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/mostrarArchivo/' + id;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlmostrarAvanceEntregable
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
       console.log(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.enviarCalificacion = function(id){
    var urlmostrarAvanceEntregable = variablesAmbiente.apiUrl + variablesAmbiente.puertoCalificacion +'/cambiarEstadoaEnviado/' + id;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlmostrarAvanceEntregable
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
       console.log(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.publicarCalificacion = function(id){
    var urlmostrarAvanceEntregable = variablesAmbiente.apiUrl + variablesAmbiente.puertoCalificacion +'/cambiarEstadoaCompleto/' + id;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlmostrarAvanceEntregable
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
       console.log(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.obtenerUsuario = function (usuarioId) {
    var urlObtenerUsuario = variablesAmbiente.apiUrl + variablesAmbiente.puertoUsuarios + '/usuarios/obtenerusuario/' + usuarioId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerUsuario
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  // cambiarEstadoaEnviado/:calificacionHerramientaEvaluacionId

}]);
