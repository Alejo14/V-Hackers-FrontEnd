angular.module('vHackersModule').controller('nuevaRubricaCtrl', ['$scope','$state', '$stateParams','NgTableParams', 'nuevaRubricaService', 'nuevoAspectoRubricaServicio',
function($scope, $state, $stateParams, NgTableParams, nuevaRubricaService,nuevoAspectoRubricaServicio){
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
    $state.go('nuevo-aspecto', {id: ctrl.rubrica.id, entregableId: $stateParams.entregableId, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId, estado: $stateParams.estado});
  }

  ctrl.regresarEntregable = function (){
    swal({
      title: "¿Esta seguro de que desea regresar?",
      text: "La rúbrica estará guardada pero solo podrá ser vista por usted",
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
    }).then(function (confirmarRegreso) {
      if (confirmarRegreso !== "cancelar") {
        $state.go('evaluacion-herramienta-gestionar', {id: $stateParams.entregableId, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId});
      }
    });
  }

  ctrl.eliminarAspecto = function (indice) {
    swal({
      title: "¿Estás seguro de que deseas eliminar el aspecto?",
      text: "",
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
    }).then(function (confirmarAspectoEliminado) {
      if (confirmarAspectoEliminado) {
        var data = {
          "aspectoID" : ctrl.aspectoLista[indice].id
        };
        nuevaRubricaService.eliminarAspecto(data).then(function(eliminado) {
          ctrl.aspectoLista.splice(indice,1);
          $scope.$apply();
          swal('Éxito', 'El aspecto ha sido eliminado', 'success');
        });
      }
    });
  }

  ctrl.editarAspecto  = function (indice) {
    $state.go('editar-aspecto', {id: ctrl.rubrica.id, entregableId: $stateParams.entregableId, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId, estado: $stateParams.estado, idAspecto: ctrl.aspectoLista[indice].id});
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
          $state.go('evaluacion-herramienta-gestionar', {id: $stateParams.entregableId, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId});
        });
      }
    });
  }

  ctrl.init = function () {
    if($stateParams.estado !== 'editar') ctrl.titulo = 'Nueva rúbrica';
    else ctrl.titulo = 'Editar rúbrica'
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
      nuevoAspectoRubricaServicio.listarNiveles(herramientaId).then(function(niveles){
        ctrl.rubrica.niveles = niveles;
        ctrl.numeroNiveles = niveles.length;
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
