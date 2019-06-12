//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('raizService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.obtenerUsuarioLogin = function (usuarioId) {
    var urlObtenerUsuario = variablesAmbiente.apiUrl + variablesAmbiente.puertoUsuarios + '/usuarios/obtenerusuario/' + usuarioId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerUsuario
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

}]);
