angular.module('vHackersModule').controller('nuevaRubricaCtrl', ['$scope','$state', '$stateParams','NgTableParams', 'nuevaRubricaService', 'nuevoAspectoServicio',
function($scope, $state, $stateParams, NgTableParams, nuevaRubricaService,nuevoAspectoServicio){
  var ctrl = this;

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

        console.log(ctrl.rubrica.niveles);
        ctrl.nivelesRubrica = {
          "tipo": "seleccion",
          "rubricaID": ctrl.rubrica.id,
          "niveles": ctrl.rubrica.niveles
        }

        nuevaRubricaService.enviarNiveles(ctrl.nivelesRubrica).then(function(){
           swal("Felicidades","Se guardó su configuración con éxito","success");
        });
        $scope.$apply();
      }
    });

  }

  ctrl.agregarAspecto = function(){
    $state.go('nuevo-aspecto', {id: ctrl.rubrica.id});
  }

  ctrl.regresarEntregable = function (){
    $state.go('evaluacion-herramienta');
  }

  ctrl.eliminarAspecto = function (indice) {

  }

  ctrl.editarAspecto  = function (indice) {

  }

  ctrl.guardarRubrica = function(){
    swal({
      title: "¿Esta seguro de que desea guardar la rúbrica?",
      text: "",
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
    }).then(function (guardarRubricaConfirmado) {
      if (guardarRubricaConfirmado !== "cancelar") {
        confirmarRubrica = {
          "rubricaID" : ctrl.rubrica.id,
          "estado": "publico"
        };
        nuevaRubricaService.guardarRubrica(confirmarRubrica).then(function(){
          $state.go('inicioProfes');
        });
      }
    });
  }

  ctrl.init = function () {  ctrl.titulo = 'Nueva rúbrica';
    ctrl.rubrica = {
      id: $stateParams.id,
      tipo: "seleccion",
      numeroNiveles: 0,
      niveles: [],
      aspecto: []
    };
    ctrl.puedoAgregarNivel = true;
    if(parseInt($stateParams.nivelesCreados)){
      ctrl.puedoAgregarNivel = false;
      herramientaId = {
        "herramientaID": ctrl.rubrica.id
      }
      nuevoAspectoServicio.listarNiveles(herramientaId).then(function(niveles){
        ctrl.rubrica.niveles = niveles;
      });
      nuevaRubricaService.listarAspectos(herramientaId).then(function(aspectos){
        ctrl.aspectoLista = aspectos;
        ctrl.aspectoTabla = new NgTableParams({}, { dataset: ctrl.aspectoLista });
        console.log(ctrl.aspectoLista);
      });
    }
  }

  ctrl.init();
}]);
