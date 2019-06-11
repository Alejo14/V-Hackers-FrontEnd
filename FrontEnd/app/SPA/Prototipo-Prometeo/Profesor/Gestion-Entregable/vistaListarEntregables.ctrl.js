angular.module('vHackersModule').controller('listarEntregablesXProyectoCtrl', ['$scope', '$state', '$stateParams' , 'entregableService', '$uibModal', 'NgTableParams',
function($scope, $state,$stateParams, entregableService, $uibModal, NgTableParams){
  var ctrl = this;
  ctrl.tituloNuevo = "Nuevo Entregable";
  ctrl.tituloModificado= "Entregable";
  ctrl.tituloVer="Entregables";
  ctrl.titulo="";
  ctrl.botonGrabar="";
  ctrl.filas=[1,2,3,4];
  ctrl.dias=['L','M','Mi','J','V','S'];
  ctrl.columnas=[1,2,3,4,5,6];
  ctrl.entregableM=[];
  ctrl.entregableG=[];
  $scope.fechaActual=new Date();
  ctrl.id=0;
  ctrl.proyectoId="";

  ctrl.regresarProyectos = function () {
        $state.go('curso', {cursoCicloId:ctrl.cursoCicloId});
  };

  ctrl.regresarEntregables = function () {
    swal({
      title: "¿Está seguro de que quieres volver?",
      text: "Los cambios no se guardarán",
      icon: "warning",
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, volver",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (usuarioNuevoConfirmado) {
      if (usuarioNuevoConfirmado !== "cancelar") {
        $state.go('evaluacion-herramienta-listar');
        //herramientaEvaluacionServicio.enviarCalificacion(ctrl.enviarCalificacion);
      }
    });
  };

  ctrl.crearEntregable = function () {
    //entregable de un proyecto
    $state.go('evaluacion-herramienta-gestionar' , {id: 0, cursoCicloId: ctrl.cursoCicloId, proyectoId: ctrl.proyectoId});//ctrl.curso.cursoCicloId
  };

  ctrl.irModificarEntregable = function (entregable) {
    $state.go('evaluacion-herramienta-gestionar' , {id: entregable.id,cursoCicloId: ctrl.cursoCicloId, proyectoId: ctrl.proyectoId});
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
        entregableService.eliminarentregableAlumno(angular.toJson(data)).then(function () {
            swal("¡Bien hecho!", "El entregable se elimino exitosamente" , "success");
        });
        ctrl.entregablesLista.splice(ctrl.entregablesLista.indexOf(entregableM.id));
      }
    });

  };

  ctrl.entregablesLista = [];
  ctrl.cargarEntregables = function (proyectoId) {
    entregableService.listarEntregablesXProyecto(proyectoId).then(function (entregablesListaData) {
      ctrl.entregablesLista = entregablesListaData;
      console.log(ctrl.entregablesLista);
    });
  };

  // ctrl.herramientasEvaluacion = [];
  // ctrl.cargarHerramientas = function (){
  //   entregableService.listarHerramientas().then(function (herramientasLista){
  //     ctrl.herramientasEvaluacion = herramientasLista;
  //     ctrl.herramientasTabla = new NgTableParams({}, { dataset: ctrl.herramientasEvaluacion });
  //   });
  // };
  //
  // ctrl.crearHerramienta = function(){
  //     if (!ctrl.entregableM.id) {
  //       ctrl.entregableM.id = '859e054f-ae56-4e68-9a40-cfee27cf8b2a';
  //     }
  //     $state.go('nueva-herramienta', {id: ctrl.entregableM.id});
  // }

  ctrl.obtenerInfoArchivo = function (archivo,parametros) {
    console.log(archivo.nombre)
  }

  ctrl.init = function (){
    ctrl.tituloVer = $stateParams.proyectoNombre;
    ctrl.proyectoNombre = $stateParams.proyectoNombre;
    ctrl.proyectoId = $stateParams.proyectoId;
    ctrl.cursoCicloId = $stateParams.cursoId;
    ctrl.cargarEntregables(ctrl.proyectoId);
    }


  ctrl.init();
}]);
