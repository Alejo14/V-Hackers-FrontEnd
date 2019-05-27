angular.module('vHackersModule').controller('nuevaRubricaCtrl', ['$scope','$state', '$stateParams','NgTableParams', 'nuevaRubricaService',
function($scope, $state, $stateParams, NgTableParams, nuevaRubricaService){
  var ctrl = this;
  ctrl.titulo = 'Nueva rúbrica';
  ctrl.rubrica = {
    id: $stateParams.id,
    tipo: "seleccion",
    numeroNiveles: 0,
    niveles: [],
    aspecto: []
  };
  ctrl.puedoAgregarNivel = true;

  ctrl.agregarNivel = function () {
    ctrl.rubrica.numeroNiveles += 1;
    var nivel = {
      descripcion: ""
    };
    ctrl.rubrica.niveles.push(nivel);
  };

  ctrl.eliminarNivel = function (indiceNivel) {
    swal({
      title: "¿Esta seguro de que desea eliminar este nivel?",
      text: "No podrá recuperar el nivel en el futuro",
      icon: "warning",
      buttons: {
        cancelar: {
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, eliminar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (eliminarNivelConfirmado) {
      if (eliminarNivelConfirmado !== "cancelar") {
        ctrl.rubrica.numeroNiveles -= 1;
        ctrl.rubrica.niveles.splice(indiceNivel, 1);
        $scope.$apply();
      }
    });
  }

  ctrl.guardarNiveles = function (){
    swal({
      title: "¿Esta seguro de que desea guardar estos niveles?",
      text: "No podrá modificar el número de niveles",
      icon: "warning",
      buttons: {
        cancelar: {
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, guardar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (confirmarNiveles) {
      if (confirmarNiveles !== "cancelar") {
        ctrl.puedoAgregarNivel = false;
        ctrl.nivelesRubrica = {
          "tipo": "seleccion",
          "rubricaId": ctrl.rubrica.id,
          "niveles": ctrl.rubrica.niveles
        }
        $scope.$apply();
        // nuevaRubricaService.enviarNiveles(ctrl.nivelesRubrica).then(function(data){
        //   swal("Feliciades","Se guardó su configuración con éxito","success");
        // });
      }
    });

  }

  ctrl.agregarAspecto = function(){
    $state.go('nuevo-aspecto', {id: ctrl.rubrica.id});
  }

  ctrl.regresarEntregable = function (){
    $state.go('evaluacion-herramienta');
  }
}]);
