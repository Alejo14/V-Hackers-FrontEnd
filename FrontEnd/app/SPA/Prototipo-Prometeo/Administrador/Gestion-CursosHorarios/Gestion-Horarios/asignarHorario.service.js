angular.module("vHackersModule").service('asignarHorarioService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;



  servicio.listarHorarios = function () {
    var urlObtenerHorarios = 'http://localhost:7010/horarios';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerHorarios,
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.obtenerEspecialidades = function (idFacultadEspecialidad) {
    var urlObtenerEspecialidades = variablesAmbiente.apiUrl + variablesAmbiente.puertoFacultades + '/especialidad/' + idFacultadEspecialidad;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerEspecialidades,
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.eliminarHorario = function(data){
    var urlElimHorario = 'http://localhost:7010/horarios/eliminar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlElimHorario,
        data: data
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }






}]);
