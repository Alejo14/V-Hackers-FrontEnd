angular.module('vHackersModule').controller('profesorCursoCtrl', ['$scope', '$state' , '$stateParams' ,'profesorCursoService', '$uibModal',

function($scope, $state,$stateParams, profesorCursoService, $uibModal){
  var ctrl = this;
  ctrl.nombreCurso = "Ingeniería de Software";
  ctrl.mensajeNuevo = "Go V-Hackers";
  ctrl.proyectosLista = [];
  ctrl.cargarProyectos = function () {
    profesorCursoService.listarProyectos().then(function (proyectosListaData) {
      ctrl.proyectosLista = proyectosListaData;
    });
  };
  ctrl.crearEntregable = function(entregable){

    $state.go('evaluacion-herramienta');
  }
  ctrl.swalProyecto = function () {
    $state.go('gestion-proyecto' , {id: 0, nombre: 0, fechaCreacion: 0, fechaInicio: 0, fechaFin: 0, ponderacion: 0});
  };
  ctrl.entregablesLista = [];
  ctrl.cargarEntregables = function () {
    profesorCursoService.listarEntregables().then(function (entregablesListaData) {
      ctrl.entregablesLista = entregablesListaData;
    });
  };
  ctrl.swalEntregable = function () {
    swal("¡Bien hecho!", "El entregable se creo exitosamente", "success");
  };

  ctrl.verProyecto = function (proyecto) {
    $state.go('gestion-proyecto' , {id: proyecto.id, nombre: proyecto.nombre, fechaCreacion: proyecto.fechaCreacion, fechaInicio: proyecto.fechaInicio, fechaFin: proyecto.fechaFin, ponderacion: proyecto.ponderacion});
  };

  ctrl.eliminarProyecto = function (proyectoElim) {
    swal({
      title: "¿Esta seguro de que desea eliminar el Proyecto?",
      text: "",
      icon: "warning",
      //buttons: ["Cancelar", "Sí, agregar"],
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, eliminar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (proyectoElimConfirmado) {
      if (proyectoElimConfirmado !== "cancelar") {

        console.log(angular.toJson(proyectoElim));//Envio el json para crear el entregable
        data={
          "id": proyectoElim.id,
          "nombre": proyectoElim.nombre,
          "fechaCreacion": (new Date())*1,
          "fechaInicio": (new Date())*1,
          "fechaFin": (new Date())*1,
          "ponderacion": parseInt(proyectoElim.ponderacion)
          }
          console.log(angular.toJson(data));
          profesorCursoService.eliminarProyecto(angular.toJson(data)).then(function () {
            ctrl.exitoso="Proyecto enviado con éxito";
          });

          proyectoElim.nombre="";
          proyectoElim.fechaCreacion="";
          proyectoElim.fechaInicio="";
          proyectoElim.fechaFin="";
          proyectoElim.ponderacion="";

          swal("¡Listo!", "El Proyecto se elimino exitosamente" , "success");
          $state.go('curso');
      }
    });
  }

  ctrl.init = function (){
    ctrl.cargarProyectos();
    ctrl.cargarEntregables();
  }

  ctrl.init();
}]);
