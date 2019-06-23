angular.module("vHackersModule").service('entregableService', ['$q', '$http','variablesAmbiente',
function($q, $http,variablesAmbiente) {

  var servicio = this;

  servicio.entregableAlumno = function(){

    var urlEntregableAlumno =  variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables'; //'http://localhost:7002/entregables';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlEntregableAlumno
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }


    servicio.registroentregableAlumno = function(data){
      var urlEnviarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/crear';
      var $defer = $q.defer();
      $http({
          method: 'POST',
          url: urlEnviarCalificacion,
          data: data
       }).then(function (respuesta) {
         $defer.resolve(respuesta.data);
       }).catch(function (error) {
         $defer.reject(error);
       });
      return $defer.promise;
    }

    servicio.registroentregableAlumnoXCurso = function(data){
      var urlEnviarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/crearxcursociclo';
      var $defer = $q.defer();
      $http({
          method: 'POST',
          url: urlEnviarCalificacion,
          data: data
       }).then(function (respuesta) {
         $defer.resolve(respuesta.data);
       }).catch(function (error) {
         $defer.reject(error);
       });
      return $defer.promise;
    }

    servicio.registroentregableAlumnoXProyecto = function(data){
      var urlEnviarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/crearxproyecto';
      var $defer = $q.defer();
      $http({
          method: 'POST',
          url: urlEnviarCalificacion,
          data: data
       }).then(function (respuesta) {
         $defer.resolve(respuesta.data);
       }).catch(function (error) {
         $defer.reject(error);
       });
      return $defer.promise;
    }

    servicio.modificarentregableAlumno = function(data){
      var urlEnviarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/modificar';
      var $defer = $q.defer();
      $http({
          method: 'POST',
          url: urlEnviarCalificacion,
          data: data
       }).then(function (respuesta) {
         $defer.resolve(respuesta.data);
       }).catch(function (error) {
         $defer.reject(error);
       });
      return $defer.promise;
    }

    servicio.eliminarentregableAlumno = function(data){
      var urlEnviarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/eliminar';
      var $defer = $q.defer();
      $http({
          method: 'POST',
          url: urlEnviarCalificacion,
          data: data
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

    servicio.listarEntregablesXProyecto = function(idProyecto){
      var urlListarEntregables =variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregablesxproyecto/' + idProyecto;
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

    servicio.mostrarEntregable = function(idEntregable){
      var urlEntregableAlumno =  variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/' + idEntregable;
      var $defer = $q.defer();
      $http({
          method: 'GET',
          url: urlEntregableAlumno
       }).then(function (respuesta) {
         $defer.resolve(respuesta.data);
       }).catch(function (error) {
         $defer.reject(error);
       });
      return $defer.promise;
    }

    servicio.eliminarHerramienta = function(data){
      var urlEnviarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoHerramientaEvaluacion +'/herramienta/eliminar';
      var $defer = $q.defer();
      $http({
          method: 'POST',
          url: urlEnviarCalificacion,
          data: data
       }).then(function (respuesta) {
         $defer.resolve(respuesta.data);
       }).catch(function (error) {
         $defer.reject(error);
       });
      return $defer.promise;
    }

}]);
