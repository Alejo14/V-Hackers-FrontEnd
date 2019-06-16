angular.module("vHackersModule").service('calificacionAspectoService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.obtenerNivelesRubrica = function(herramientaEvaluacionId){
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

  servicio.obtenerEvaluacionAspecto = function(herramientaEvaluacionId, calificacionHerramientaEvaluacionId){
    var urlObtenerEvaluacionAspecto = variablesAmbiente.apiUrl + variablesAmbiente.puertoCalificacion + '/mostrarCalificacionRubrica/' + calificacionHerramientaEvaluacionId + '?herramientaEvaluacionId=' + herramientaEvaluacionId;
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

  servicio.guardarAspecto = function(aspectos){
     var urlGuardarAspectoCalificado = variablesAmbiente.apiUrl + variablesAmbiente.puertoCalificacion + '/guardarCalificacion'
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
