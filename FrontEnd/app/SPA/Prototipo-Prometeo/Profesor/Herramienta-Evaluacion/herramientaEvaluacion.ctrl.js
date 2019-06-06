angular.module('vHackersModule').controller('herramientaEvaluacionCtrl', ['$scope','$state', '$stateParams','herramientaEvaluacionService',
function($scope, $state, $stateParams, herramientaEvaluacionService){
 var ctrl = this;
 ctrl.titulo = 'Nueva Herramienta de Evaluación';
 ctrl.herramienta = {};
 ctrl.herramienta.descripcion = "";
 ctrl.herramienta.puntajeMax = 0;
 //ctrl.herramienta.usoOtrosEvaluadores = false;
 ctrl.herramienta.tipo = "";
 ctrl.herramienta.entregableId = $stateParams.id;
 console.log(ctrl.herramienta.entregableId);
 //Después de crear, se llama al servicio para guardarlo en el BackEnd y este envía un id
 //ctrl.herramienta.id = 'b52a8c24-318b-45cf-b339-e81253d013c2';

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
        //Llamada al servicio parar crear herramienta de evaluación
        console.log(ctrl.herramienta);
        herramientaEvaluacionService.crearHerramienta(angular.toJson(ctrl.herramienta)).then(function(id){
          ctrl.herramienta.id = id.herramientaID;
        });
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
          console.log("Id herramienta: "+ ctrl.herramienta.id);
          $state.go('nueva-rubrica', {id: ctrl.herramienta.id});
        });
      }
    });
  }

  ctrl.regresarEntregable = function (){
    swal({
      title: "¿Esta seguro de que desea salir?",
      text: "No se guardará los cambios realizados",
      icon: "warning",
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, salir",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (regresarConfirmado){
      if(regresarConfirmado !== "cancelar"){
        $state.go('evaluacion-herramienta');
      }
    });
  }

}]);
