angular.module("vHackersModule").service('nuevoAspectoServicio', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.enviarAspecto = function(data){
    var urlEnviarAspecto = 'http://localhost:7008/herramienta/asignarAspecto'; //url a donde se envían los niveles seleccionados
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEnviarAspecto,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
