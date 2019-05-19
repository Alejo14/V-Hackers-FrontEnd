angular.module('vHackersModule').controller('modalAgregarUsuarioCtrl', modalAgregarUsuarioCtrl);

modalAgregarUsuarioCtrl.$inject = ['$scope', '$uibModalInstance', 'gestionUsuariosService'];

function modalAgregarUsuarioCtrl ($scope, $uibModalInstance, gestionUsuariosService){

  var ctrl = this;
  ctrl.usuarioNuevo = {};
  ctrl.facultadesLista = [
    {
      id: '',
      nombre: 'Ciencias e ingeniería'
    },
    {
      id: '',
      nombre: 'Estudios Generales Ciencias'
    }
  ];
  ctrl.especialidadesLista = [
    {
      id: '',
      nombre: 'Ingenieria Informatica'
    },
    {
      id: '',
      nombre: 'Ingenieria Industrial'
    }
  ];
  ctrl.tipoUsuarioLista = [
    {
      id: "",
      nombre: "Profesor"
    },
    {
      id: "",
      nombre: "Asistente de docencia"
    },
    {
      id: "",
      nombre: "Alumnos"
    }
  ];

  ctrl.obtenerFacultades = function () {
    gestionUsuariosService.obtenerFacultades().then(function (facultadesListaData) {
      ctrl.facultadesLista = facultadesListaData;
    });
  };

  ctrl.obtenerEspecialidades = function () {
    gestionUsuariosService.obtenerEspecialidades($scope.facultad.id).then(function (especialidadesListaData) {
      ctrl.especialidadesLista = especialidadesListaData;
    });
  };
  ctrl.guardarUsuario = function () {
    swal({
      title: "¿Esta seguro de que desea agregar a este usuario?",
      text: "",
      icon: "warning",
      //buttons: ["Cancelar", "Sí, agregar"],
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, agregar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (usuarioNuevoConfirmado) {
      if (usuarioNuevoConfirmado !== "cancelar") {
        ctrl.usuarioNuevo.especialidad = $scope.especialidad;
        ctrl.usuarioNuevo.especialidad.facultad = $scope.facultad;
        ctrl.usuarioNuevo.rolesUsuario = [];
        var numRoles = $scope.rolesUsuarioNuevo.length;
        for (var i = 0; i < numRoles; i++) {
          var usuarioRol = {rol: $scope.rolesUsuarioNuevo[i]};
          ctrl.usuarioNuevo.rolesUsuario.push(usuarioRol);
        }
        $uibModalInstance.close(ctrl.usuarioNuevo);
      }
    });
  };
  ctrl.init = function(){
    ctrl.obtenerFacultades();
  };
  ctrl.cerrar = function () {
    $uibModalInstance.close(0);
  };
  ctrl.init();
};
