//-- Anderson
angular.module('vHackersModule').controller('herramientaCtrl', ['$scope', '$state', '$stateParams' , 'entregableAlumnoService', '$uibModal', 'NgTableParams',
function($scope, $state,$stateParams, entregableAlumnoService, $uibModal, NgTableParams){
  var ctrl = this;
  ctrl.tituloNuevo = "Nuevo Entregable";
  ctrl.tituloModificado= "Entregable";
  ctrl.tituloVer="Entregables";
  ctrl.titulo="";
  ctrl.botonGrabar="";
  ctrl.entregableM=[];
  ctrl.entregableG={ };
  ctrl.mensajeFecha = "Complete las fechas correctamente.";
  ctrl.entregablesLista = [];
  $scope.fechaActual = new Date();
  ctrl.mostrarMetodoTrabajo=0; //Se activa en caso sea un entregableCursoCiclo

  ctrl.id=0;

  ctrl.cargarHerramientas = function (id){
    idEntregable =
    {
      "entregableID":id
    }
    entregableAlumnoService.listarHerramientas(idEntregable).then(function (herramientasLista){
      ctrl.herramientasEvaluacion = herramientasLista;
      ctrl.herramientasTabla = new NgTableParams({}, { dataset: ctrl.herramientasEvaluacion });
    });
  };

  ctrl.obtenerInfoArchivo = function (archivo,parametros) {
    console.log(archivo.nombre)
  }

  ctrl.init = function (){
      ctrl.herramientas = "Herramientas de Evaluación";
    // ctrl.cargarEntregables();
    if ($stateParams.id == 0){ //Creación de Entregable
      ctrl.herramientasEvaluacion = [];
      ctrl.entregableCreado=false;
    } else {
        ctrl.entregableCreado=true;
        ctrl.cargarHerramientas($stateParams.id);
    }
  }
  ctrl.init();
}]);
