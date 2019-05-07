//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('entregableService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.entregableAlumno = function(){

    var urlEntregableAlumno = 'http://localhost:7002/entregables';
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
      var urlEnviarCalificacion = './data/entregable.json';
      var $defer = $q.defer();
      $http({
          method: 'POST',
          url: urlEnviarCalificacion,
          data: evaluacion
       }).then(function (respuesta) {
         $defer.resolve(respuesta.data);
       }).catch(function (error) {
         $defer.reject(error);
       });
      return $defer.promise;
    }

}]);
