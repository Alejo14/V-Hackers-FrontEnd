angular.module('vHackersModule').controller('profesorCursoCtrl', ['$scope', '$state' , '$stateParams', '$cookies' ,'profesorCursoService', '$uibModal', 'NgTableParams',

function($scope, $state, $stateParams, $cookies, profesorCursoService, $uibModal ,NgTableParams){
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
    ctrl.proyectosTabla = new NgTableParams({}, { dataset: ctrl.proyectosLista });
  };

  ctrl.crearEntregable = function(entregable){
    $state.go('evaluacion-herramienta-gestionar' , {id: 0,cursoCicloId: ctrl.curso.cursoCicloId, proyectoId: 0, horarioId: ctrl.curso.idHorario});
  }
  ctrl.crearProyecto = function () {
    $state.go('gestion-proyecto' , {id: 0, nombre: 0, fechaCreacion: 0, fechaInicio: 0, fechaFin: 0, ponderacion: 0,
    descripcion: 0, visible: 0, registroHoras: 0, metodoTrabajo: 0, cursoCiclo_id: ctrl.curso.cursoCicloId});
  };

  ctrl.crearCoEvaluacion = function () {
      $state.go('nueva-herramienta', {id: 0, cursoCicloId: $stateParams.cursoCicloId, proyectoId: 0});
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
    ctrl.entregablesTabla = new NgTableParams({}, { dataset: ctrl.entregablesLista });
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
    $state.go('evaluacion-herramienta-gestionar' , {id: entregable.id, cursoCicloId: ctrl.curso.cursoCicloId, proyectoId: 0, horarioId: ctrl.curso.idHorario});
  };

  ctrl.avancesEntregable = function (entregable) {
    $state.go('avances-entregable' , {id: entregable.id, nombre: entregable.nombre, metodo: entregable.metodoTrabajo, horarioId: ctrl.curso.idHorario, cursoCicloId:ctrl.curso.cursoCicloId });
  };

  ctrl.calificarProyecto = function (proyecto) {
    $state.go('avances-proyecto' , {id: proyecto.id, nombre: proyecto.nombre, metodo: proyecto.metodoTrabajo, horarioId: ctrl.curso.idHorario, cursoCicloId:ctrl.curso.cursoCicloId });
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

  ctrl.misCursosInfo = {};


  ctrl.init = function (){
    ctrl.idUsuario = $cookies.get('usuarioID');
    ctrl.rolId = $cookies.get('rolActivoId');

    profesorCursoService.obtenerRol(ctrl.rolId).then(function (rol) {
      ctrl.usuarioRol = rol.descripcion;
      profesorCursoService.obtenerRolUsuario(ctrl.idUsuario, ctrl.usuarioRol).then(function(rolUsuario){
        ctrl.rolUsuarioId=rolUsuario;
        ctrl.curso.cursoCicloId=$stateParams.cursoCicloId;

        profesorCursoService.cicloActual().then(function(ciclo){
          ctrl.cicloActual=ciclo;
          ctrl.misCursosInfo = {
            "cicloId" : ctrl.cicloActual,
            "rolUsuarioId" : ctrl.rolUsuarioId
          };
          console.log(ctrl.misCursosInfo);
          profesorCursoService.listarMisCursos(ctrl.misCursosInfo).then(function (misCursosListaData) {
            ctrl.listaMisCursos = misCursosListaData;
            console.log("listar cursos");
            console.log(misCursosListaData);
            var cursoEncontrado = ctrl.listaMisCursos.find(i => i.cursoCicloId === $stateParams.cursoCicloId);
            ctrl.curso = cursoEncontrado;
            console.log("curso");
            console.log(ctrl.curso);
          });
          ctrl.cargarProyectos();
          ctrl.cargarEntregables();
        });
      });
    });


  }

  ctrl.listaAlumnos = function () {
    $state.go('listar-alumnos',  {cursoCicloId: ctrl.curso.cursoCicloId, cursoNombre: ctrl.curso.nombreCurso, horarioNombre: ctrl.curso.horario, horarioId: ctrl.curso.idHorario});
  };

  ctrl.ingresarProyecto = function(proyecto){
    $state.go('evaluacion-herramienta-listar', {cursoId:ctrl.curso.cursoCicloId, proyectoId: proyecto.id, proyectoNombre:proyecto.nombre, horarioId: ctrl.curso.idHorario});
  }

  ctrl.init();
}]);
