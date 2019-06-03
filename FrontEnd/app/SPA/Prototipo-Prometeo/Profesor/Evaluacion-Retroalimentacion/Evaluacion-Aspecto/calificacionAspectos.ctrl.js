angular.module('vHackersModule').controller('calificacionAspectosCtrl', calificacionAspectosCtrl);

calificacionAspectosCtrl.$inject = ['$scope','$state', '$stateParams','NgTableParams','calificacionAspectoService'];

function calificacionAspectosCtrl ($scope,$state,$stateParams,NgTableParams,calificacionAspectoService){
  var ctrl = this;

  ctrl.herramientaEvaluacionId = $stateParams.herramientaEvaluacionId;
  ctrl.evaluacionAspecto = {};
  ctrl.criteriosLista = [];

  ctrl.obtenerEvaluacionAspecto = function (){
    ctrl.criteriosTabla = new NgTableParams({}, { dataset: ctrl.criteriosLista });
    calificacionAspectoService.obtenerEvaluacionAspecto(ctrl.herramientaEvaluacionId).then(function(evaluacionAspecto){
      ctrl.evaluacionAspecto = evaluacionAspecto;
      console.log(ctrl.evaluacionAspecto);
    });
  }

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1',
      accordionOpen: false
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2',
      accordion: false
    }
  ];

  ctrl.regresar = function (){
    swal({
      title: "¿Esta seguro de que desea regresar?",
      text: "No se guardarán los cambios efectuados",
      icon: "warning",
      buttons: {
        cancelar: {
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, regresar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function(confirmarRegreso){
      if(confirmarRegreso !== "cancelar"){
        $state.go('calificacion',{avanceEntregableId: $stateParams.avanceEntregableId});
      }
    });
  }

  ctrl.init = function(){
    ctrl.obtenerEvaluacionAspecto();
  }

  ctrl.init();
}
