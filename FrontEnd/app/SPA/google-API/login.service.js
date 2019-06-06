//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('loginService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.login = function(correo){

    //var urlObtenerUsuarios = 'data/usuariosLista.json';
    //var urlObtenerUsuarios = 'http://localhost:7003/usuarios';
    var urlObtenerUsuarios = variablesAmbiente.apiUrl + variablesAmbiente.puertoUsuarios + '/usuarios/login';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlObtenerUsuarios,
        data: correo
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

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
