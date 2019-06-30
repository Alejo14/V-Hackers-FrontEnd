angular.module("vHackersModule").service('calificacionEscalaService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.obtenerNivelesEscala = function(herramientaEvaluacionId){
    var urlObtenerNivelesRubrica = variablesAmbiente.apiUrl + variablesAmbiente.puertoCalificacion + '/mostrarNivelesRubricaPorHerramienta/' + herramientaEvaluacionId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerNivelesRubrica
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.obtenerEvaluacionEscala = function(herramientaEvaluacionId, calificacionHerramientaEvaluacionId){
    var urlObtenerEvaluacionEscala = variablesAmbiente.apiUrl + variablesAmbiente.puertoCalificacion + '/mostrarCalificacionRubrica/' + calificacionHerramientaEvaluacionId + '?herramientaEvaluacionId=' + herramientaEvaluacionId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerEvaluacionEscala
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.guardarAspecto = function(aspectos){
     var urlGuardarAspectoCalificado = variablesAmbiente.apiUrl + variablesAmbiente.puertoCalificacion + '/guardarCalificacionAspectosCriterioRubrica'
     var $defer = $q.defer();
     $http({
       method: 'POST',
       url: urlGuardarAspectoCalificado,
       data: aspectos
    }).then(function (respuesta) {
      $defer.resolve(respuesta.data);
    }).catch(function (error) {
        $defer.reject(error);
    });
   return $defer.promise;
  }
}]);
