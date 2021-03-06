angular.module('vHackersModule').controller('listarEntregablesXProyectoCtrl', ['$scope','$state','$stateParams' ,'entregableService','gestionProyectoService','$uibModal','NgTableParams', '$cookies',
function($scope, $state,$stateParams, entregableService, gestionProyectoService, $uibModal, NgTableParams, $cookies){
  var ctrl = this;
  ctrl.horarioId = $stateParams.horarioId;

  ctrl.regresarProyectos = function () {
    $state.go('curso', {cursoCicloId:ctrl.cursoCicloId, horarioId:ctrl.horarioId});
  };

  ctrl.crearEntregable = function () {
    //entregable de un proyecto
    $state.go('evaluacion-herramienta-gestionar' , {id: 0, cursoCicloId: ctrl.cursoCicloId, proyectoId: ctrl.proyectoId, horarioId: ctrl.horarioId});//ctrl.curso.cursoCicloId
  };

  ctrl.irModificarEntregable = function (entregable) {
    $state.go('evaluacion-herramienta-gestionar' , {id: entregable.id,cursoCicloId: ctrl.cursoCicloId, proyectoId: ctrl.proyectoId, horarioId: ctrl.horarioId});
  };

  ctrl.elminarEntregable = function (entregable) {
    swal({
      title: "¿Estás seguro que quieres eliminar el entregable?",
      icon: "warning",
      buttons: {
        Cancel: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, eliminar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (respuesta) {
      if (respuesta == "Confirm") {
        data={
          "id": entregable.id, //Defecto
          "nombre": entregable.nombre,
          "fechaEntrega": (new Date(Date.now()))*1,//Se da formato a la fecha para que se registre con hora y fecha
          "tieneAlarma": 1,
          "ponderacion": 1
        };
        entregableService.eliminarentregableAlumno(data).then(function () {
            swal("¡Bien hecho!", "El entregable se elimino exitosamente" , "success");
        });
        ctrl.entregablesLista.splice(ctrl.entregablesLista.indexOf(entregable.id));
      }
    });

  };

  ctrl.cargarEntregables = function (proyectoId) {
    entregableService.listarEntregablesXProyecto(proyectoId).then(function (entregablesListaData) {
      ctrl.entregablesLista = entregablesListaData;
      console.log(ctrl.entregablesLista);
      for(let i = 0; i < ctrl.entregablesLista.length; i++){
        fechCr = new Date(Number(ctrl.entregablesLista[i].fechaHabilitacion));
        fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
        ctrl.entregablesLista[i].fechaHabilitacionStr = fechCrStr;
      };
      for(let i = 0; i < ctrl.entregablesLista.length; i++){
        fechCr = new Date(Number(ctrl.entregablesLista[i].fechaEntrega));
        fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
        ctrl.entregablesLista[i].fechaFinStr = fechCrStr;
      };
    });
    ctrl.entregablesTabla = new NgTableParams({}, { dataset: ctrl.entregablesLista });
  };

  ctrl.obtenerNombreProyecto = function (id) {
    gestionProyectoService.obtenerProyecto(id).then(function(proyecto){
      ctrl.tituloVer = proyecto.nombre;
    });
  }

  ctrl.avancesEntregable = function(entregable){
    $state.go('avances-entregable' , {id: entregable.id, nombre: entregable.nombre, metodo: ctrl.proyecto.metodoTrabajo, horarioId: ctrl.horarioId, cursoCicloId: ctrl.cursoCicloId});
  }
  //avances-entregable/:id/:nombre/:metodo/:horarioId

  ctrl.init = function (){
    ctrl.tituloVer = $stateParams.proyectoNombre;
    ctrl.proyectoId = $stateParams.proyectoId;
    ctrl.cursoCicloId = $stateParams.cursoId;
    ctrl.horarioId = $stateParams.horarioId;
    ctrl.entregablesLista = [];
    ctrl.rolId = $cookies.get('rolActivoId');
    ctrl.idUsuario = $cookies.get('usuarioID');
    entregableService.obtenerRol(ctrl.rolId).then(function (rol) {
      ctrl.usuarioRol = rol.descripcion;
    });

    entregableService.listarProyectos(ctrl.cursoCicloId).then(function (proyectosListaData) {
      ctrl.proyectosLista = proyectosListaData;

      var proyectoEncontrado = ctrl.proyectosLista.find(i => i.id === $stateParams.proyectoId);
      ctrl.proyecto = proyectoEncontrado;

      console.log("Proyecto:");
      console.log(ctrl.proyecto);

      if(ctrl.proyecto.metodoTrabajo == 0) {
        ctrl.metodoTrabajo = "Indiv.";
      }else{
        ctrl.metodoTrabajo = "Grupal";
      }
    });
    ctrl.cargarEntregables(ctrl.proyectoId);
    ctrl.obtenerNombreProyecto(ctrl.proyectoId);

  }

  ctrl.init();
}]);
