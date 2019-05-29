angular.module("vHackersModule").service('herramientaEvaluacionService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.crearHerramienta = function(data){
    var urlCrearHerrmienta =  'http://localhost:7008/herramienta/crear';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlCrearHerrmienta,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
