//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('administradorEspecialidadService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.registroEspecialidad = function(data){
    var urlRegistroEspecialidad = variablesAmbiente.apiUrl + variablesAmbiente.puertoEspecialidad + '/especialidad/crear';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlRegistroEspecialidad,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
