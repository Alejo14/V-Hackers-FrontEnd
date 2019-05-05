angular.module('vHackersModule').controller('modalAgregarUsuarioCtrl', modalAgregarUsuarioCtrl);

modalAgregarUsuarioCtrl.$inject = ['$scope', '$uibModalInstance'];

function modalAgregarUsuarioCtrl ($scope, $uibModalInstance){

  var ctrl = this;
  ctrl.usuarioNuevo = {};
  ctrl.facultades = [
    {
      id: '',
      nombre: 'Ciencias e ingeniería'
    },
    {
      id: '',
      nombre: 'Estudios Generales Ciencias'
    }
  ];
  ctrl.especialidades = [
    {
      id: '',
      nombre: 'Ingenieria Informatica'
    },
    {
      id: '',
      nombre: 'Ingenieria Industrial'
    }
  ];
  ctrl.tiposUsuario = [
    {
      id: "",
      descripcion: "Alumno",
      fechaCreacion: ""
    },
    {
      id: "",
      descripcion: "Profesor",
      fechaCreacion: ""
    }
  ]

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
        ctrl.usuarioNuevo.especialidad = ctrl.especialidad;
        ctrl.usuarioNuevo.especialidad.facultad = ctrl.facultad;
        $uibModalInstance.close(ctrl.usuarioNuevo);
      }
    });
  }

  ctrl.cerrar = function () {
    $uibModalInstance.close(0);
  }
};
