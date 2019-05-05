//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('entregableService', ['$q', '$http',
function($q, $http) {

  var servicio = this;

  servicio.entregableAlumno = function(){

    var urlEntregableAlumno = 'data/entregables.json';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlEntregableAlumno
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }


  servicio.registroentregableAlumno = function(data){

    var urlRegistroEntregableAlumno = 'http://127.0.0.1:5000/';
    var data=JSON.stringify(data);
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlRegistroEntregableAlumno,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

}]);
