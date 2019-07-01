angular.module("vHackersModule").service('visualizacionListaService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.obtenerCalificacionListaCotejo = function(calificacionHerramientaEvaluacionId, herramientaEvaluacionId){
    var urlObtenerCalificacionListaCotejo = variablesAmbiente.apiUrl + variablesAmbiente.puertoCalificacion + '/mostrarCalificacionListaCotejo/' + calificacionHerramientaEvaluacionId + "?herramientaEvaluacionId=" + herramientaEvaluacionId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerCalificacionListaCotejo
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.guardarCalificacionCriterioListaCotejo = function(CriteriosListaCotejo){
     var urlGuardarCalificacionCriterioListaCotejo = variablesAmbiente.apiUrl + variablesAmbiente.puertoCalificacion + '/guardarCalificacionCriterioListaCotejo';
     var $defer = $q.defer();
     $http({
       method: 'POST',
       url: urlGuardarCalificacionCriterioListaCotejo,
       data: CriteriosListaCotejo
    }).then(function (respuesta) {
      $defer.resolve(respuesta.data);
    }).catch(function (error) {
        $defer.reject(error);
    });
   return $defer.promise;
  }
}]);
