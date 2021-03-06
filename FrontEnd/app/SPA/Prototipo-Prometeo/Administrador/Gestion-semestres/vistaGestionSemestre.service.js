//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('administradorSemestreService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.registroSemestre = function(data){
    var urlRegistroSemestre = variablesAmbiente.apiUrl + variablesAmbiente.puertoSemestre + '/semestres/crear';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlRegistroSemestre,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.listarSemestres = function(){
    var urllistarSemestres = variablesAmbiente.apiUrl + variablesAmbiente.puertoSemestre + '/semestres';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urllistarSemestres
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
