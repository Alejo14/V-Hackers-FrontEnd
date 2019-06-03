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

  // servicio.entregableAlumno = function(){
  //
  //   var urlEntregableAlumno =  variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables'; //'http://localhost:7002/entregables';
  //   var $defer = $q.defer();
  //   $http({
  //       method: 'GET',
  //       url: urlEntregableAlumno
  //    }).then(function (respuesta) {
  //      $defer.resolve(respuesta.data);
  //    }).catch(function (error) {
  //      $defer.reject(error);
  //    });
  //   return $defer.promise;
  // }
  //
  //
  //   servicio.registroentregableAlumno = function(data){
  //     var urlEnviarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/crear';
  //     var $defer = $q.defer();
  //     $http({
  //         method: 'POST',
  //         url: urlEnviarCalificacion,
  //         data: data
  //      }).then(function (respuesta) {
  //        $defer.resolve(respuesta.data);
  //      }).catch(function (error) {
  //        $defer.reject(error);
  //      });
  //     return $defer.promise;
  //   }
  //
  //   servicio.registroentregableAlumnoXCurso = function(data){
  //     var urlEnviarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/crearxcursociclo';
  //     var $defer = $q.defer();
  //     $http({
  //         method: 'POST',
  //         url: urlEnviarCalificacion,
  //         data: data
  //      }).then(function (respuesta) {
  //        $defer.resolve(respuesta.data);
  //      }).catch(function (error) {
  //        $defer.reject(error);
  //      });
  //     return $defer.promise;
  //   }
  //
  //   servicio.registroentregableAlumnoXProyecto = function(data){
  //     var urlEnviarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/crearxproyecto';
  //     var $defer = $q.defer();
  //     $http({
  //         method: 'POST',
  //         url: urlEnviarCalificacion,
  //         data: data
  //      }).then(function (respuesta) {
  //        $defer.resolve(respuesta.data);
  //      }).catch(function (error) {
  //        $defer.reject(error);
  //      });
  //     return $defer.promise;
  //   }
  //
  //   servicio.modificarentregableAlumno = function(data){
  //     var urlEnviarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/modificar';
  //     var $defer = $q.defer();
  //     $http({
  //         method: 'POST',
  //         url: urlEnviarCalificacion,
  //         data: data
  //      }).then(function (respuesta) {
  //        $defer.resolve(respuesta.data);
  //      }).catch(function (error) {
  //        $defer.reject(error);
  //      });
  //     return $defer.promise;
  //   }
  //
  //   servicio.eliminarentregableAlumno = function(data){
  //     var urlEnviarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables/eliminar';
  //     var $defer = $q.defer();
  //     $http({
  //         method: 'POST',
  //         url: urlEnviarCalificacion,
  //         data: data
  //      }).then(function (respuesta) {
  //        $defer.resolve(respuesta.data);
  //      }).catch(function (error) {
  //        $defer.reject(error);
  //      });
  //     return $defer.promise;
  //   }
  //
  //   servicio.listarEntregables = function(){
  //
  //     var urlListarEntregables =variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable +'/entregables'; //'http://localhost:7002/entregables';
  //     var $defer = $q.defer();
  //     $http({
  //         method: 'GET',
  //         url: urlListarEntregables
  //      }).then(function (respuesta) {
  //        $defer.resolve(respuesta.data);
  //      }).catch(function (error) {
  //        $defer.reject(error);
  //      });
  //     return $defer.promise;
  //   }
  //
  //   servicio.listarHerramientas = function(){
  //     //Hay que definir el microservicio para la tabla y también el JSON
  //     var urlListarHerramientas = '';
  //     var $defer = $q.defer();
  //     $http({
  //       method: 'GET',
  //       url: urlListarHerramientas
  //     }).then(function (respuesta){
  //       $defer.resolve(respuesta.data);
  //     }).catch(function(error){
  //       $defer.reject(error);
  //     });
  //     return $defer.promise;
  //   }

}]);
