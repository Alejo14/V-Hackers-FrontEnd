angular.module('vHackersModule').controller('herramientaEvaluacionCtrl', ['$scope','$state',
function($scope, $state){
 var ctrl = this;
 ctrl.titulo = 'Nueva Herramienta de Evaluación';
 ctrl.herramienta = {};
 ctrl.herramienta.descripcion = "";
 ctrl.herramienta.puntuacionMaxima = 0;
 ctrl.herramienta.usoOtrosEvaluadores = false;

 ctrl.tipoHerramienta = "";

ctrl.crearHerramienta = function () {
  swal({
    title: "¿Esta seguro de que desea crear esta herramienta?",
    text: "Una vez creada, no podrá modificar el tipo de herramienta",
    icon: "warning",
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
    }).then(function (crearHerramientaConfirmada) {
      if (crearHerramientaConfirmada !== "cancelar") {
        swal({
          title: "¡Listo!",
          text: "Herramienta creada con éxito",
          icon: "success",
          buttons: {
            confirm: {
              text: "ok",
              className: "btn btn-lg color-fondo-azul-pucp color-blanco"
            }
          }
        }).then(function(){
          $state.go('nueva-rubrica');
        });
      }
    });
  }

  ctrl.regresarEntregable = function (){
    $state.go('evaluacion-herramienta');
  }

}]);
