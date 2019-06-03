angular.module("vHackersModule").service('calificacionAspectoService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.obtenerEvaluacionAspecto = function(herramientaEvaluacionId){
    var urlObtenerEvaluacionAspecto = variablesAmbiente.apiUrl + variablesAmbiente.puertoCalificacion + '/mostrarNivelesRubricaPorHerramienta/' + herramientaEvaluacionId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerEvaluacionAspecto
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
