//-- Anderson
angular.module('vHackersModule').controller('entregableCtrl', ['$scope', 'hackersService', '$uibModal',
function($scope, hackersService, $uibModal){
  var ctrl = this;
  ctrl.titulo = "Nuevo Entregable";
  ctrl.alumnosLista = [];
  ctrl.alumnosListaModal = [];




  ctrl.probar = function () {
    hackersService.listarAlumnos().then(function (alumnosListaData) {
      ctrl.alumnosLista = alumnosListaData;
    });
  };

  ctrl.probarModal = function () {
    //En este caso el controlador del modal se debe declarar en el JSON que pasa como parametro de open
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/Profesor/vistaCrearEntregable.html',
      controller: 'entregableCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
      resolve: {
        parametrosModalListarAlumnos: function (){
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
}]);
