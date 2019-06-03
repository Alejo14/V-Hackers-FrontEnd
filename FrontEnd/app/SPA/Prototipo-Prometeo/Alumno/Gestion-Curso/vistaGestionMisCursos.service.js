angular.module("vHackersModule").service('alumnoMisCursosService', ['$q', '$http',
'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.listarMisCursos = function(misCursoInfo){
    var urlListarMisCursos = variablesAmbiente.apiUrl + variablesAmbiente.puertoCursos + '/cursos/listarhorariocursociclorolusuario/'
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
