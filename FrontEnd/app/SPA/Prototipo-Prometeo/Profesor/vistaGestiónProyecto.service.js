//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('gestiónProyectoService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.listarAlumnos = function(){

    var urlListarAlumnos = '';
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
