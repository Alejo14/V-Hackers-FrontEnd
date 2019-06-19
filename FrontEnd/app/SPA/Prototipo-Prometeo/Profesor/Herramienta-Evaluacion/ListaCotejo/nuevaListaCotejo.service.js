angular.module("vHackersModule").service('nuevaListaCotejoService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.guardarRubrica = function(data) {
    var urlConfirmarHerramienta = variablesAmbiente.apiUrl + variablesAmbiente.puertoHerramientaEvaluacion + '/herramienta/confirmarHerramienta';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlConfirmarHerramienta,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.guardarCotejos = function(data) {
    var urlGuardarCotejos = variablesAmbiente.apiUrl + variablesAmbiente.puertoHerramientaEvaluacion + '/herramienta/agregarCotejos';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlGuardarCotejos,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
