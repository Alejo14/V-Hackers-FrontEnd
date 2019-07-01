angular.module("vHackersModule").service('calificacionProyectoService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.calificarAvanceProyecto = function (proyectoCalificacion) {
    var urlCalificarProyecto = variablesAmbiente.apiUrl + variablesAmbiente.puertoProyectos + '/proyectos/avance/calificar';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlCalificarProyecto,
        data: proyectoCalificacion
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }
}]);
