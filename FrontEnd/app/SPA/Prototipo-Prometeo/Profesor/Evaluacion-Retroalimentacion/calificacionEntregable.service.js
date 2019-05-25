angular.module("vHackersModule").service('calificacionHerramientaEvaluacionServicio', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.obtenerHerramientaEvaluacion = function(){
    var urlObtenerHerramientaEvaluacion = './data/Rubrica.json';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerHerramientaEvaluacion
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.enviarCalificacion = function(evaluacion){
    var urlEnviarCalificacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoCalificacion + '/calificacion';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlEnviarCalificacion,
        data: evaluacion
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
