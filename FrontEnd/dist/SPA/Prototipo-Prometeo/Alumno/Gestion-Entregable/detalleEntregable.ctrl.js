angular.module('vHackersModule').controller('detalleEntregableCtrl', ['$scope', 'detalleEntregableService', '$uibModal',
function($scope, detalleEntregableService, $uibModal){
  var ctrl = this;
  ctrl.mensaje = "Hola Mundo";
  ctrl.alumnosLista = [];
  ctrl.alumnosListaModal = [];
  ctrl.mensajeNuevo = "Go V-Hackers";
  ctrl.obtenerCalificacionEntregable = function () {
    detalleEntregableService.obtenerCalificacionEntregable().then(function (calificacionEntregableData) {
      ctrl.calificacionEntregable = alumnosListaData;
    });
  };

  ctrl.probarModal = function () {
    //En este caso el controlador del modal se debe declarar en el JSON que pasa como parametro de open
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/modalListarAlumnos.html',
      controller: 'modalListarAlumnosCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
      resolve: {
        parametrosModalAgregarUsuario: function (){
          return "V Hackers"
        }
      }
    });

    //Recibo parametro de retorno
    modalInstance.result.then( function (parametroRetorno) {
      ctrl.alumnosLista.push(parametroRetorno);
    });
  };

  ctrl.probarSwal = function () {
    swal("¡Felicidades!", "Has ejecutado un swal", "success");
  };

  ctrl.init = function () {
    //ctrl.obtenerCalificacionEntregable();
    ctrl.calificacionEntregable = [
      {
        id: '',
        nombre: 'Backlog y estandar de interfaz',
        nota: 14,
        entregable: {
          id: '',
          nombre: 'Backlog y estandar de interfaz',
          fechaEntrega: '04/04/2019',
          tieneAlarma: false,
          ponderacion: 1
        }
      }
    ];
  }

  ctrl.init();
}]);
