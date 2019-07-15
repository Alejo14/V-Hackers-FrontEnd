angular.module('vHackersModule').controller('calificacionEscalaCtrl', calificacionEscalaCtrl);

calificacionEscalaCtrl.$inject = ['$scope','$state', '$stateParams','calificacionEscalaService'];

function calificacionEscalaCtrl ($scope,$state,$stateParams,calificacionEscalaService){
  var ctrl = this;
  ctrl.detalleE = {};

  ctrl.herramientaEvaluacionId = $stateParams.herramientaEvaluacionId;
  ctrl.calificacionHerramientaEvaluacionId = $stateParams.calificacionHerramientaEvaluacionId;
  ctrl.evaluacionAspecto = {};
  ctrl.evaluacionAspectoEnviar = {};
  ctrl.nivelesRubrica = {};
  $scope.$on('NO-MOSTRAR-CALIFICACION', function () {
    ctrl.noMostrarCalificacion = true;
  });
  $scope.$on('MOSTRAR-CALIFICACION', function () {
    ctrl.noMostrarCalificacion = false;
  })

  ctrl.obtenerEvaluacionCriterios = function (){//SE DEBE QUEDAR
    calificacionEscalaService.obtenerNivelesEscala(ctrl.herramientaEvaluacionId).then(function(nivelesEscala){
      ctrl.nivelesEscala = nivelesEscala;
      console.log(ctrl.nivelesEscala);
    });
    console.log("Herramienta Evaluacion ID",ctrl.herramientaEvaluacionId);
    console.log("Calificacion Herramienta Evaluacion ID",ctrl.calificacionHerramientaEvaluacionId);
    calificacionEscalaService.obtenerEvaluacionEscala(ctrl.herramientaEvaluacionId, ctrl.calificacionHerramientaEvaluacionId).then(function(evaluacionEscala){
      ctrl.evaluacionAspecto=evaluacionEscala;//Para guardar la informacion obtenida
      console.log("EVALUACION",evaluacionEscala);
      ctrl.evaluacionEscala = evaluacionEscala[0].criterios;
      //ctrl.calcularPuntajeCriterio();
      ctrl.puntajeAsignado = 0;
      angular.forEach(ctrl.evaluacionEscala, function(criterio,indice){
        ctrl.puntajeAsignado += criterio.puntajeAsignado;
      });

      console.log("ASPECTO INICIAL",ctrl.evaluacionAspecto);
      // angular.forEach(ctrl.evaluacionEscala, function(criterio,indice){
      //   criterio.activarPuntajeManual = false;
      // });
      //console.log(ctrl.evaluacionAspecto);

      for (var i = 0; i < ctrl.nivelesEscala.length; i++) {
        for (var j = 0; j < ctrl.evaluacionEscala.length; j++) {
          for (var k = 0; k < ctrl.evaluacionEscala[j].nivelesCriterios.length; k++) {
            if (ctrl.evaluacionEscala[j].nivelesCriterios[k].nivelRubricaId==ctrl.nivelesEscala[i].id) {
              ctrl.evaluacionEscala[j].nivelesCriterios[k].descripcion=ctrl.nivelesEscala[i].descripcion;
            }
          }
        }
      }
    });
  }

  ctrl.regresar = function (){
    swal({
      title: "¿Esta seguro de que desea regresar?",
      icon: "warning",
      buttons: {
        Cancel: {
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, regresar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function(confirmarRegreso){
      if(confirmarRegreso == "Confirm"){
        $state.go('visualizacion',{nombre: ctrl.detalleE.nombre, id: ctrl.detalleE.id ,fechaEntrega: ctrl.detalleE.fechaEntrega,
        fechaHabilitacion: ctrl.detalleE.fechaHabilitacion, descripcion: ctrl.detalleE.descripcion, ponderacion: $stateParams.ponderacion, cursoCicloId: ctrl.idCursoCiclo, proyectoId: $stateParams.proyectoId,
        nombreCurso: $stateParams.nombreCurso,codigoCurso:$stateParams.codigoCurso ,horario: $stateParams.horario,idRolUsuario: ctrl.detalleE.idRolUsuario, estadoEntregable: $stateParams.estadoEntregable, avanceEntregableId: $stateParams.avanceEntregableId});
      }
    });
  }

  ctrl.init = function(){
    //ctrl.obtenerEvaluacionAspecto();
    ctrl.titulo = $stateParams.nombre;
    ctrl.detalleE.nombre=$stateParams.nombre;
    ctrl.detalleE.id=$stateParams.id;
    ctrl.detalleE.fechaEntrega=new Date(Number($stateParams.fechaEntrega));
    ctrl.detalleE.fechaHabilitacion=new Date(Number($stateParams.fechaHabilitacion));
    ctrl.detalleE.descripcion=$stateParams.descripcion;
    ctrl.detalleE.idRolUsuario=$stateParams.idRolUsuario;
    ctrl.idCursoCiclo = $stateParams.cursoCicloId;
    ctrl.habilitarBotones = false;
    ctrl.obtenerEvaluacionCriterios();
  }

  ctrl.init();
}
