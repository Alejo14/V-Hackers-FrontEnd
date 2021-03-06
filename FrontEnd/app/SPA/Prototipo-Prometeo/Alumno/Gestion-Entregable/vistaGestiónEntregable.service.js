//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('entregableAlumnoService', ['$q', '$http','variablesAmbiente',
function($q, $http,variablesAmbiente) {

  var servicio = this;

  servicio.registroAvanceEntregable = function(data){
    var urlcrearAvanceEntregable = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/guardarArchivoAvanceEntregable';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlcrearAvanceEntregable,
        data:data
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


  servicio.eliminarArchivo = function(id){
    var urlmostrarAvanceEntregable = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/eliminarArchivo/' + id;
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


  servicio.registroURL = function(data){
    var urlcargarAvanceEntregableURL = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/guardarUrl';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlcargarAvanceEntregableURL,
        data:data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.listarEntregablesXProyecto = function(idProyecto){
    var urlListarEntregables =variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregablesxproyecto/' + idProyecto; //'http://localhost:7002/entregables';
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

  servicio.mostrarAvanceEntregables = function(data){
    var urlListarEntregables =variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/mostrarAvanceEntregable/' + data.idEntregable + "?idRolUsuario=" + data.idRolUsuario + "&idGrupo=" + data.idGrupo; //'http://localhost:7002/entregables';
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


  servicio.listarHerramientas = function(data){
    //Hay que definir el microservicio para la tabla y también el JSON
    var urlListarHerramientas = variablesAmbiente.apiUrl + variablesAmbiente.puertoHerramientaEvaluacion + '/herramienta/listarHerramientas';
    var $defer = $q.defer();
    $http({
      method: 'POST',
      url: urlListarHerramientas,
      data: data
    }).then(function (respuesta){
      $defer.resolve(respuesta.data);
    }).catch(function(error){
      $defer.reject(error);
    });
    return $defer.promise;
  }

  servicio.cargarReporteNotasAvancesProyecto = function (usuario) {
    var urlCargarReporteNotasAvancesProyecto = variablesAmbiente.apiUrl + variablesAmbiente.puertoReportes + '/reportes/listarnotasavancesproyecto';
    var $defer = $q.defer();
    $http({
      method: 'POST',
      url: urlCargarReporteNotasAvancesProyecto,
      data: usuario
    }).then(function (respuesta){
      $defer.resolve(respuesta.data);
    }).catch(function(error){
      $defer.reject(error);
    });
    return $defer.promise;
  }

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


  servicio.mostrarGrupoId = function(data){
    var urlListarEntregables =variablesAmbiente.apiUrl + variablesAmbiente.puertoGrupos +'/grupos/obtenergrupoid/' + data.idRolUsuario + "?idHorario=" + data.idHorario; //'http://localhost:7002/entregables';

    //localhost:7011/grupos/obtenergrupoid/fcd07160-f291-4ed6-91b2-5b4973563f3b?idHorario=eecc5f10-b218-4d50-9a31-13ea1cc52de2
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

  servicio.listarEntregables = function(codigoCurso){
    var urlListarEntregables = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable + '/entregablesxcursociclo/' + codigoCurso;
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

  servicio.listarProyectos = function(codigoCurso){
    var urlListarProyectos = variablesAmbiente.apiUrl + variablesAmbiente.puertoProyectos + '/proyectosxcurso/' + codigoCurso;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlListarProyectos
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
