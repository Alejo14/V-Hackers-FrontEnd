angular.module('vHackersModule').controller('gestionUsuariosCtrl', ['$scope', 'gestionUsuariosService', '$uibModal', 'NgTableParams',
function($scope, gestionUsuariosService, $uibModal, NgTableParams){
  var ctrl = this;
  ctrl.usuariosLista = [];
  ctrl.obtenerUsuarios = function () {
    gestionUsuariosService.obtenerUsuarios().then(function (usuariosListaData) {
      ctrl.usuariosLista = usuariosListaData;
      ctrl.usuariosTabla = new NgTableParams({}, { dataset: ctrl.usuariosLista });
    });
  };

  ctrl.agregarUsuario = function () {
    //En este caso el controlador del modal se debe declarar en el JSON que pasa como parametro de open
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-usuarios/modalAgregarUsuario.html',
      controller: 'modalAgregarUsuarioCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
    });

    //Recibo parametro de retorno
    modalInstance.result.then( function (parametroRetorno) {
      if (parametroRetorno) {
        ctrl.usuariosLista.push(parametroRetorno);
        swal("¡Listo!", "Usuario agregado con éxito", "success");
        swal({
          title: "¡Listo!",
          text: "Usuario agregado con éxito",
          icon: "success",
          //buttons: ["Cancelar", "Sí, agregar"],
          buttons: {
            confirm: {
              text: "ok",
              className: "btn btn-lg color-fondo-azul-pucp color-blanco"
            }
          }
        })
      }
    });
  };

  ctrl.verDetalleUsuario = function (usuario) {

  }

  ctrl.init = function () {
    ctrl.obtenerUsuarios();

  }

  ctrl.init();
}]);
