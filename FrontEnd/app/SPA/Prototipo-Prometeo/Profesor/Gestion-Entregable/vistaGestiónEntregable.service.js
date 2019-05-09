//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('entregableService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.entregableAlumno = function(){

    var urlEntregableAlumno =  'http://localhost:7002/entregables'; //'http://localhost:7002/entregables';
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
      var urlEnviarCalificacion = 'http://localhost:7002/entregables/crear';
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
      var urlEnviarCalificacion = 'http://localhost:7002/entregables/modificar';
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
      var urlEnviarCalificacion = 'http://localhost:7002/entregables/eliminar';
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
    servicio.listarEntregables = function(){

      var urlListarEntregables = 'http://localhost:7002/entregables'; //'http://localhost:7002/entregables';
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

}]);
