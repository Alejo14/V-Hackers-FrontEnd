angular.module("vHackersModule").service('vistaMisCursosService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.listarMisCursos = function(misCursoInfo){

    var urlListarMisCursos = 'http://localhost:7004/cursos/listarhorariocursociclorolusuario/'
                              + misCursoInfo.cicloId + '?RolUsuarioID=' + misCursoInfo.rolUsuarioId;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlListarMisCursos
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
