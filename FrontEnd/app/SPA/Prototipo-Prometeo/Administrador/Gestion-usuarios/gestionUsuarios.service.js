//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('gestionUsuariosService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.obtenerUsuarios = function(){

    var urlObtenerUsuarios = 'data/usuariosLista.json';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerUsuarios
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
