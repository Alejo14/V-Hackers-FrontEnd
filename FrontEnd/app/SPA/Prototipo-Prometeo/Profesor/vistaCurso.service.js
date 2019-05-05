//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('profesorCursoService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.listarProyectos = function(){

    var urlListarProyectos = './data/proyectos.json';
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
