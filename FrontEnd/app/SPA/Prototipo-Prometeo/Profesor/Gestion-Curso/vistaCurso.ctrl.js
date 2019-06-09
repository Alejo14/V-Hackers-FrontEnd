angular.module('vHackersModule').controller('profesorCursoCtrl', ['$scope', '$state' , '$stateParams' ,'profesorCursoService', '$uibModal',

function($scope, $state, $stateParams, profesorCursoService, $uibModal){
  var ctrl = this;
  ctrl.curso = {};
  ctrl.proyectosLista = [];

  ctrl.cargarProyectos = function () {
    var idCursoCiclo = ctrl.curso.cursoCicloId;
    profesorCursoService.listarProyectos(idCursoCiclo).then(function (proyectosListaData) {
      ctrl.proyectosLista = proyectosListaData;
      for(let i = 0; i < ctrl.proyectosLista.length; i++){
        fechCr = new Date(Number(ctrl.proyectosLista[i].fechaCreacion));
        fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
        ctrl.proyectosLista[i].fechaCreacionStr = fechCrStr;
      }
      for(let i = 0; i < ctrl.proyectosLista.length; i++){
        fechCr = new Date(Number(ctrl.proyectosLista[i].fechaFin));
        fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
        ctrl.proyectosLista[i].fechaFinStr = fechCrStr;
      };
      console.log(ctrl.proyectosLista);
    });
  };

  ctrl.crearEntregable = function(entregable){
    $state.go('evaluacion-herramienta-gestionar' , {nombre: 0, id: 0, fechaHabilitacion: 0, fechaEntrega: 0,
      descripcion: 0, ponderacion: 0, cursoCicloId: ctrl.curso.cursoCicloId, proyectoId: 0, proyectoNombre: 0});
  }
  ctrl.crearProyecto = function () {
    $state.go('gestion-proyecto' , {id: 0, nombre: 0, fechaCreacion: 0, fechaInicio: 0, fechaFin: 0, ponderacion: 0,
    descripcion: 0, visible: 0, registroHoras: 0, metodoTrabajo: 0, cursoCiclo_id: ctrl.curso.cursoCicloId});
  };

  ctrl.entregablesLista = [];
  ctrl.cargarEntregables = function () {
    var idCursoCiclo = ctrl.curso.cursoCicloId;
    profesorCursoService.listarEntregables(idCursoCiclo).then(function (entregablesListaData) {
      ctrl.entregablesLista = entregablesListaData;
      for(let i = 0; i < ctrl.entregablesLista.length; i++){
        fechCr = new Date(Number(ctrl.entregablesLista[i].fechaHabilitacion));
        fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
        ctrl.entregablesLista[i].fechaCreacionStr = fechCrStr;
      }
      for(let i = 0; i < ctrl.entregablesLista.length; i++){
        fechCr = new Date(Number(ctrl.entregablesLista[i].fechaEntrega));
        fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
        ctrl.entregablesLista[i].fechaFinStr = fechCrStr;
      };
      console.log(ctrl.entregablesLista);
    });
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
            swal("¡Listo!", "El Proyecto se elimino exitosamente" , "success");
          });
          ctrl.proyectosLista.splice(ctrl.proyectosLista.indexOf(proyectoElim),1);
      }
    });
  }

  ctrl.verEntregable = function (entregable) {
    $state.go('evaluacion-herramienta-gestionar' , {nombre: entregable.nombre, id: entregable.id ,fechaHabilitacion: entregable.fechaHabilitacion,
       fechaEntrega: entregable.fechaEntrega, descripcion: entregable.descripcion, ponderacion: entregable.ponderacion,
       cursoCicloId: ctrl.curso.cursoCicloId, proyectoId: 0, proyectoNombre: 0});
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
          ctrl.entregablesLista.splice(ctrl.entregablesLista.indexOf(entregableM),1);
      }
    });

  };

  ctrl.cargaUnitaria = true;

  ctrl.cambiarVista = function(indice) {
    if(indice == 0) ctrl.cargaUnitaria = true;
    else ctrl.cargaUnitaria = false;
  }

  ctrl.volverCurso = function () {
        $state.go('profesorMisCursos', {rolUsuario: "P"});
  };

  ctrl.init = function (){
    ctrl.curso.cursoCicloId=$stateParams.cursoCicloId;
    ctrl.curso.nombreCurso=$stateParams.nombreCurso;
    ctrl.curso.codigoCurso=$stateParams.codigoCurso;
    ctrl.curso.creditos=$stateParams.creditos;
    ctrl.curso.cantidadAlumnos=$stateParams.cantidadAlumnos;
    ctrl.curso.horario=$stateParams.horario;
    ctrl.curso.horarioId=$stateParams.idHorario;

    ctrl.cargarProyectos();
    ctrl.cargarEntregables();
  }

  ctrl.listaAlumnos = function () {
    $state.go('listar-alumnos',  {cursoNombre: ctrl.curso.nombreCurso, horarioNombre: ctrl.curso.horario, horarioId: ctrl.curso.horarioId});
  };

  ctrl.ingresarProyecto = function(proyecto){
    $state.go('evaluacion-herramienta-listar', {cursoId:ctrl.curso.cursoCicloId, proyectoId: proyecto.id, proyectoNombre:proyecto.nombre});
  }

  ctrl.init();
}]);
