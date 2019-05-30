angular.module("vHackersModule").service('nuevaRubricaService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.enviarNiveles = function(data){
    var urlEnviarNiveles = 'http://localhost:7008/herramienta/agregarNiveles'; //url a donde se envían los niveles seleccionados
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEnviarNiveles,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
