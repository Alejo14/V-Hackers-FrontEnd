angular.module('vHackersModule').controller('nuevoAspectoRubricaCtrl', ['$scope','$state', '$stateParams','nuevoAspectoRubricaServicio','nuevaRubricaService','$uibModal', 'NgTableParams',
function($scope, $state, $stateParams, nuevoAspectoRubricaServicio, nuevaRubricaService, $uibModal, NgTableParams){
  var ctrl = this;
  ctrl.horarioId = $stateParams.horarioId;

  ctrl.agregarCriterio = function () {
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/Rubrica/Criterio/nuevoCriterioModal.html',
      controller: 'nuevoCriterioRubricaCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
      resolve: {
        parametros:  function(){
          return ctrl.rubricaId;
        }
      }
    });

    modalInstance.result.then( function (parametroRetorno) {
      if (parametroRetorno) {
        var nuevoCriterio = {
          "descripcion": parametroRetorno.descripcion,
          "indicaciones": parametroRetorno.indicaciones,
          "niveles": parametroRetorno.niveles,
          "puntaje_maximo": parametroRetorno.puntaje_maximo
        };
        ctrl.criteriosLista.push(nuevoCriterio);
      }
    });
  };

  ctrl.editarCriterio = function(indiceCriterio){
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/Rubrica/Criterio/nuevoCriterioModal.html',
      controller: 'editarCriterioRubricaModalCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
      resolve: {
        parametros:  function(){
          return {
            idRubrica: ctrl.rubricaId,
            criterio: ctrl.criteriosLista[indiceCriterio]
          };
        }
      }

    });

    modalInstance.result.then( function (parametroRetorno) {
      if (parametroRetorno) {
        ctrl.criteriosLista[indiceCriterio] = parametroRetorno;
        if($stateParams.estado === 'editar'){
          var criterio = {
            "id": parametroRetorno.id,
            "descripcion": parametroRetorno.descripcion,
            "indicaciones": parametroRetorno.indicaciones,
            "nivelesCriterio": parametroRetorno.niveles
          };
          nuevoAspectoRubricaServicio.modificarAspecto(criterio).then(function(modificado){
            swal('Éxito', 'El criterio ha sido modificado','success');
          });
        }else{
          swal('Éxito', 'El criterio ha sido modificado','success');
        }
      }
    });
  }

  ctrl.eliminarCriterio = function (indiceCriterio){
    swal({
      title: "¿Esta seguro de que desea eliminar este criterio?",
      text: "No podrá recuperar el criterio en el futuro",
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
    }).then(function (eliminarCriterioConfirmado) {
      if (eliminarCriterioConfirmado) {
        if($stateParams.estado === 'editar'){
          var data = {
            "criterioID": ctrl.criteriosLista[indiceCriterio].id
          };
          nuevoAspectoRubricaServicio.eliminarCriterio(data).then(function(eliminado){
            ctrl.criteriosLista.splice(indiceCriterio,1);
            $scope.$apply();
            swal('Éxito', 'El aspecto ha sido eliminado', 'success');
          });
        }
      }
    });
  }

  ctrl.guardarAspecto = function(){
    var maximoPuntaje = 0;
    angular.forEach(ctrl.criteriosLista, function (criterio, indice) {
      maximoPuntaje += criterio.puntaje_maximo;
    });
    if($stateParams.estado !== 'editar') ctrl.guardarAspectoNuevo(maximoPuntaje);
    else ctrl.editarAspecto(maximoPuntaje);
  }

  ctrl.guardarAspectoNuevo = function(maximoPuntaje){
    swal({
      title: "¿Esta seguro de que desea guardar el aspecto actual?",
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
    }).then(function (aspectoGuardarConfirmado) {
      if (aspectoGuardarConfirmado) {
        var data = {
          "rubricaID": ctrl.rubricaId,
          "descripcion": ctrl.aspecto.descripcion,
          "puntaje_maximo": maximoPuntaje,
  	      "cant_criterios": ctrl.criteriosLista.length,
  	      "titulo": ctrl.aspecto.titulo,
  	      "criterios": ctrl.criteriosLista
        };
        console.log(data);
        nuevoAspectoRubricaServicio.enviarAspecto(data).then(function(){
           swal("Felicidades","Se guardó su configuración con éxito" ,"success");
           $state.go('nueva-rubrica', {id: ctrl.rubricaId, entregableId:$stateParams.entregableId, nivelesCreados: ctrl.nivelesCreados, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId, estado: $stateParams.estado, horarioId: ctrl.horarioId});
        });
      }
    });
  }

  ctrl.editarAspecto = function (maximoPuntaje) {
    swal({
      title: "¿Esta seguro de que desea editar el aspecto actual?",
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
    }).then(function (aspectoGuardarConfirmado) {
      data = {
        "id":$stateParams.id,
        "rubricaId": ctrl.rubricaId,
        "descripcion": ctrl.aspecto.descripcion,
        "puntaje_maximo": maximoPuntaje,
	      "titulo": ctrl.aspecto.titulo,
      };
      if (aspectoGuardarConfirmado) {
        nuevoAspectoRubricaServicio.modificarAspecto(data).then(function(){
          swal("Felicidades","Se guardó su configuración con éxito" ,"success");
          $state.go('nueva-rubrica', {id: ctrl.rubricaId, entregableId:$stateParams.entregableId, nivelesCreados: ctrl.nivelesCreados, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId, estado: $stateParams.estado, horarioId: ctrl.horarioId});
        });
      }
    });
  }

  ctrl.inicializarTabla = function () {
    ctrl.criteriosTabla = new NgTableParams({}, { dataset: ctrl.criteriosLista });
  }

  ctrl.regresar = function () {
    if($stateParams.estado === 'nuevo')
      $state.go('nueva-rubrica', {id: ctrl.rubricaId, entregableId:$stateParams.entregableId, nivelesCreados: ctrl.nivelesCreados, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId, estado:$stateParams.estado, horarioId: ctrl.horarioId});
    else
      $state.go('editar-rubrica', {id: ctrl.rubricaId, entregableId:$stateParams.entregableId, nivelesCreados: ctrl.nivelesCreados, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId, estado:$stateParams.estado, horarioId: ctrl.horarioId});
  }

  ctrl.inicializarVariables = function () {
    ctrl.titulo = 'Nueva aspecto';
    ctrl.aspecto = {
      titulo: "",
      descripcion: "",
      criterios: []
    };
    ctrl.rubricaId = $stateParams.id;
    ctrl.criteriosLista = [];
    ctrl.nivelesLista = [];
    ctrl.nivelesCreados = 1;
  }

  ctrl.init = function () {
    ctrl.inicializarVariables();
    if($stateParams.estado === 'editar'){
      var dataAspecto = {
        "aspectoID" : $stateParams.idAspecto
      }
      var dataRubrica = {
        "herramientaID": $stateParams.id
      };
      nuevaRubricaService.listarAspectos(dataRubrica).then(function(aspectos) {
        aspectoSeleccionado = aspectos.find(aspecto => aspecto.id == $stateParams.idAspecto);
        ctrl.aspecto.titulo = aspectoSeleccionado.titulo;
        ctrl.aspecto.descripcion = aspectoSeleccionado.descripcion;
      });
      nuevoAspectoRubricaServicio.listarCriteriosXAspecto(dataAspecto).then(function(criterios) {
        var criteriosRecibidos = [];
        angular.forEach(criterios, function (criterio,indice) {
          var criterioRegreso = {
            "id" : criterio.id,
            "descripcion": criterio.descripcion,
            "indicaciones": criterio.indicaciones,
            "niveles": criterio.nivelesCriterio
          };
          criteriosRecibidos.push(criterioRegreso);
        });

        ctrl.criteriosLista = criteriosRecibidos;
        ctrl.aspecto.criterios = criteriosRecibidos;
        ctrl.inicializarTabla();
      });
    }else{
      ctrl.inicializarTabla();
    }
  }

  ctrl.init();
}]);
