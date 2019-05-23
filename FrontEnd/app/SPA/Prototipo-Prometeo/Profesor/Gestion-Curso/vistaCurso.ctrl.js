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
    $state.go('gestion-proyecto' , {id: 0, nombre: 0, fechaCreacion: 0, fechaInicio: 0, fechaFin: 0, ponderacion: 0,
    descripcion: 0, visible: 0, registroHoras: 0,
    metodoTrabajo: 0, cursoCiclo_id: 0});
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
    $state.go('gestion-proyecto' , {id: proyecto.id, nombre: proyecto.nombre, fechaCreacion: proyecto.fechaCreacion,
      fechaInicio: proyecto.fechaInicio, fechaFin: proyecto.fechaFin, ponderacion: proyecto.ponderacion,
      descripcion: proyecto.descripcion, visible: proyecto.visible, registroHoras: proyecto.registroHoras,
      metodoTrabajo: proyecto.metodoTrabajo, cursoCiclo_id: proyecto.cursoCiclo_id});
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

  ctrl.verEntregable = function (entregable) {
    $state.go('evaluacion-herramienta-modificar' , {nombre: entregable.nombre, id: entregable.id ,fechaEntrega: entregable.fechaEntrega,
    fechaHabilitacion: entregable.fechaHabilitacion, descripcion: entregable.descripcion});

  };

  ctrl.elminarEntregable = function (entregableM) {//Se debe colocar un boton y no hacer clik en el nombre y agregar los demas valores
    console.log(angular.toJson(entregableM));//Envio el json para crear el entregable
    swal({
      title: "¿Está seguro que quiere eliminar el entregable?",
      text: "Los cambios no se guardarán",
      icon: "warning",
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, eliminar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (usuarioNuevoConfirmado) {
      if (usuarioNuevoConfirmado !== "cancelar") {
        data={
          "id": entregableM.id, //Defecto
          "nombre": entregableM.nombre,
          "fechaEntrega": (new Date(Date.now()))*1,//Se da formato a la fecha para que se registre con hora y fecha
          "tieneAlarma": 1,
          "ponderacion": 1
          }
          console.log(angular.toJson(data));
        profesorCursoService.eliminarentregableAlumno(angular.toJson(data)).then(function () {
            swal("¡Bien hecho!", "El entregable se elimino exitosamente" , "success");
        });
        ctrl.entregablesLista.splice(ctrl.entregablesLista.indexOf(entregableM.id));
      }
    });

  };

  ctrl.init = function (){
    ctrl.cargarProyectos();
    ctrl.cargarEntregables();
  }

  ctrl.init();
}]);
