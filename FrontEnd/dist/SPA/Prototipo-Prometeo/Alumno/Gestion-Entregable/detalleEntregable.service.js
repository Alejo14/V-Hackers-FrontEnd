//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('detalleEntregableService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.obtenerCalificacionEntregable = function(){

    var urlListarAlumnos = 'http://200.16.7.187:7000/users';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlListarAlumnos
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
