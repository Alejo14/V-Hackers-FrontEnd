angular.module('vHackersModule').controller('especialidadResponsableCtrl', especialidadResponsableCtrl);

especialidadResponsableCtrl.$inject = ['$scope', '$uibModalInstance', 'NgTableParams','administradorEspecialidadService'];

function especialidadResponsableCtrl ($scope, $uibModalInstance, NgTableParams, administradorEspecialidadService){

  var ctrl = this;

  ctrl.responsable = {
    id : "",
    nombre : ""
  };

  // ctrl.obtenerResponsables = function () {
  //   administradorEspecialidadService.obtenerResponsables().then(function (responsablesListaData) {
  //     ctrl.responsablesLista = responsablesListaData;
  //   });
  // };
  ctrl.responsables =
  [{
    id : "00",
    nombre: "Alejandro Tapia",
    edad: 21,
    correo: "a.tapiat@pucp.pe",
    seleccionado: false
  },
  {
    id : "01",
    nombre: "Diego Paredes",
    edad: 21,
    correo: "a20151107@pucp.pe",
    seleccionado: false
  },
  {
    id : "02",
    nombre: "Leticia Amaya",
    edad: 21,
    correo: "leticia.amaya@pucp.edu.pe",
    seleccionado: false
  }];
  ctrl.tablaResponsables = new NgTableParams({}, { dataset: ctrl.responsables });

  ctrl.seleccionarResponsable = function () {
    swal({
      title: "¿Esta seguro de que desea seleccionar a este responsable?",
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
    }).then(function (responsableConfirmado) {
      if (responsableConfirmado !== "cancelar") {
        //corregir esto:
        ctrl.responsableSeleccionado = {};
        angular.forEach(ctrl.responsables, function (responsable,indice){
          if(responsable.seleccionado) ctrl.responsableSeleccionado = responsable;
        })
        console.log(ctrl.responsableSeleccionado);
        $uibModalInstance.close(ctrl.responsableSeleccionado);
      }
    });
  };
  ctrl.init = function(){
    //ctrl.obtenerResponsables();
  };
  ctrl.cerrar = function () {
    $uibModalInstance.close(0);
  };
  ctrl.init();

};
