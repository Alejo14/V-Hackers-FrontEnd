//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('administradorSemestreService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

//  servicio.listarEntregables = function(){

//    var urlListarEntregables = 'http://localhost:7002/entregables';
//    var $defer = $q.defer();
//    $http({
//        method: 'GET',
//        url: urlListarEntregables
//     }).then(function (respuesta) {
//       $defer.resolve(respuesta.data);
//     }).catch(function (error) {
//       $defer.reject(error);
//     });
//    return $defer.promise;
//  }

}]);
