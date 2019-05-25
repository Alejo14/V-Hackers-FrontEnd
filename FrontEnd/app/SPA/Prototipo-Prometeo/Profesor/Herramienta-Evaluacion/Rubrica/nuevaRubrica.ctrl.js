angular.module('vHackersModule').controller('nuevaRubricaCtrl', ['$scope','$state', 'NgTableParams',
function($scope, $state, NgTableParams){
  var ctrl = this;
  ctrl.titulo = 'Nueva rúbrica';
  ctrl.rubrica = {
    numeroNiveles: 0,
    niveles: [],
    aspecto: []
  };

  ctrl.agregarNivel = function () {
    ctrl.rubrica.numeroNiveles += 1;
    var nivel = {
      descripcion: "",
      puntaje: 0
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
          text: "Cancelar",
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

  ctrl.agregarAspecto = function(){
    $state.go('nuevo-aspecto');
  }

  ctrl.regresarEntregable = function (){
    $state.go('evaluacion-herramienta');
  }
}]);
