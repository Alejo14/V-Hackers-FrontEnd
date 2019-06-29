angular.module('vHackersModule').controller('herramientaEvaluacionCtrl', ['$scope','$state', '$stateParams','herramientaEvaluacionService','$cookies',
function($scope, $state, $stateParams, herramientaEvaluacionService, $cookies) {
 var ctrl = this;
 ctrl.titulo = 'Nueva Herramienta de Evaluación';

 if ($stateParams.id==0){
  ctrl.titulo = 'Nueva co-evaluación';
 }

 ctrl.herramienta = {};
 ctrl.herramienta.descripcion = "";
 ctrl.herramienta.puntajeMax = 0;
 //ctrl.herramienta.usoOtrosEvaluadores = false;
 ctrl.herramienta.tipo = "";
 ctrl.herramienta.entregableId = $stateParams.id;
//Esta variable sirve para ejecutar el servicio de listar Niveles
 ctrl.nivelesCreados = 0;
 //Después de crear, se llama al servicio para guardarlo en el BackEnd y este envía un id
 //ctrl.herramienta.id = 'b52a8c24-318b-45cf-b339-e81253d013c2';

 function uuid() {
     function randomDigit() {
         if (crypto && crypto.getRandomValues) {
             var rands = new Uint8Array(1);
             crypto.getRandomValues(rands);
             return (rands[0] % 16).toString(16);
         } else {
             return ((Math.random() * 16) | 0).toString(16);
         }
     }
     var crypto = window.crypto || window.msCrypto;
     return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
 }

 ctrl.crearHerramienta = function () {
   if (!ctrl.herramienta.descripcion || !ctrl.herramienta.puntajeMax){
     swal("¡Opss!", "Hay campos obligatorios sin llenar" , "error");
   }else{
  swal({
    title: "¿Estás seguro de que quieres crear esta herramienta?",
    text: "Una vez creada, no podrá modificar el tipo de herramienta",
    icon: "warning",
    buttons: {
      Cancel: {
        text: "Cancelar",
        className: "btn btn-lg btn-danger"
      },
      Confirm: {
        text: "Sí, agregar",
        className: "btn btn-lg color-fondo-azul-pucp color-blanco"
      }
    },
    closeModal: false
    }).then(function (respuesta) {
      if (respuesta == "Confirm") {
        //Obtener RolUsuarioId
        ctrl.idUsuario = $cookies.get('usuarioID');

        var descripcionRol="Profesor";
        //Obtener RolUsuarioId
        ctrl.rolUsuarioId="";
        herramientaEvaluacionService.obtenerRolUsuario(ctrl.idUsuario, descripcionRol).then(function(rolUsuario){
          ctrl.rolUsuarioId=rolUsuario;
        });

        //Llamada al servicio parar crear herramienta de evaluación
        ctrl.herramienta.id = uuid();

        ctrl.herramienta.rolUsuarioId=ctrl.rolUsuarioId;
        herramientaEvaluacionService.crearHerramienta(angular.toJson(ctrl.herramienta)).then(function(id){
          ctrl.herramienta.id = id.herramientaID;
        });
        swal("¡Listo!", "Herramienta creada con éxito", "success").then(function(){
          console.log("Id herramienta: "+ ctrl.herramienta.id);
          if (ctrl.herramienta.tipo=="Rubrica"){
            $state.go('nueva-rubrica', {id: ctrl.herramienta.id, entregableId: $stateParams.id, nivelesCreados: ctrl.nivelesCreados, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId, estado: 'nuevo'});
          }else if(ctrl.herramienta.tipo=="Escala") {
            $state.go('nueva-escala', {id: ctrl.herramienta.id, entregableId: $stateParams.id, nivelesCreados: ctrl.nivelesCreados, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId, estado: 'nuevo'});
          }else if(ctrl.herramienta.tipo=="Lista de Cotejo") {
            $state.go('nueva-lista-cotejo', {id: ctrl.herramienta.id, entregableId: $stateParams.id, nivelesCreados: ctrl.nivelesCreados, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId, estado: 'nuevo'});
          }
        });




      }
    });
  }
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
        $state.go('evaluacion-herramienta-gestionar',{id: $stateParams.id ,cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId});
      }
    });
  }

}]);
