angular.module("vHackersModule").service('calificacionProyectoService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.listarAvancesEntregables = function (idAvanceProyecto) {
    var urlListarAvancesEntregables = variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable + '/entregables/listarAvancesEntregables/' + idAvanceProyecto;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlListarAvancesEntregables
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

  servicio.obtenerAvanceProyecto = function (idAvanceProyecto) {
    var urlObtenerAvanceProyecto = variablesAmbiente.apiUrl + variablesAmbiente.puertoProyectos + '/proyectos/obtenerAvanceProyecto/' + idAvanceProyecto;
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerAvanceProyecto
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  }

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
