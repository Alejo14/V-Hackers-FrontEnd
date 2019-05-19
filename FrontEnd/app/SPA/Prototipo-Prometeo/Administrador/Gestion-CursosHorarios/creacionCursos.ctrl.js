angular.module('vHackersModule').controller('creacionCursosCtrl', ['$scope', 'creacionCursosService', '$uibModal', 'NgTableParams',
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
        var usuarioRegistro = {
          "id": parametroRetorno.id,
          "idEspecialidad": parametroRetorno.especialidad.id,
          "codigo": parametroRetorno.codigo,
          "nombres": parametroRetorno.nombres,
          "apellidos": parametroRetorno.apellidos,
          "correo": parametroRetorno.correo
        };
        gestionUsuariosService.regitstrarUsuario(usuarioRegistro).then(function (resultadoRegistro) {
          ctrl.usuariosLista.push(parametroRetorno);
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
          });
        });

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
