angular.module('vHackersModule').controller('calificacionEscalaCtrl', calificacionEscalaCtrl);

calificacionEscalaCtrl.$inject = ['$scope','$state', '$stateParams','calificacionEscalaService'];

function calificacionEscalaCtrl ($scope,$state,$stateParams,calificacionEscalaService){
  var ctrl = this;

  ctrl.herramientaEvaluacionId = $stateParams.herramientaEvaluacionId;
  ctrl.calificacionHerramientaEvaluacionId = $stateParams.calificacionHerramientaEvaluacionId;
  ctrl.evaluacionAspecto = {};
  ctrl.evaluacionAspectoEnviar = {};
  ctrl.nivelesRubrica = {};

  ctrl.obtenerEvaluacionAspecto = function (){//SE DEBE BORRAR Y REEMPLAZAR
    calificacionEscalaService.obtenerNivelesRubrica(ctrl.herramientaEvaluacionId).then(function(nivelesRubrica){
      ctrl.nivelesRubrica = nivelesRubrica;
      console.log(ctrl.nivelesRubrica);
    });
    calificacionEscalaService.obtenerEvaluacionAspecto(ctrl.herramientaEvaluacionId, ctrl.calificacionHerramientaEvaluacionId).then(function(evaluacionAspecto){
      ctrl.evaluacionAspecto = evaluacionAspecto;
      angular.forEach(ctrl.evaluacionAspecto, function(aspecto,indice){
        aspecto.accordionOpen = false;
        aspecto.activarPuntajeManual = false;
      });
      console.log(ctrl.evaluacionAspecto);
    });
  }

  ctrl.obtenerEvaluacionCriterios = function (){//SE DEBE QUEDAR
    calificacionEscalaService.obtenerNivelesEscala(ctrl.herramientaEvaluacionId).then(function(nivelesEscala){
      ctrl.nivelesEscala = nivelesEscala;
      console.log(ctrl.nivelesEscala);
    });
    calificacionEscalaService.obtenerEvaluacionEscala(ctrl.herramientaEvaluacionId, ctrl.calificacionHerramientaEvaluacionId).then(function(evaluacionEscala){
      ctrl.evaluacionEscala = evaluacionEscala;
      console.log(evaluacionEscala);
      // angular.forEach(ctrl.evaluacionAspecto, function(aspecto,indice){
      //   aspecto.accordionOpen = false;
      //   aspecto.activarPuntajeManual = false;
      // });
      // console.log(ctrl.evaluacionAspecto);
    });
  }



  ctrl.editarPuntaje = function (indice) {
    ctrl.evaluacionAspecto[indice].activarPuntajeManual = !ctrl.evaluacionAspecto[indice].activarPuntajeManual;
  }

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
        $state.go('calificacion',{avanceEntregableId: $stateParams.avanceEntregableId, herramientaCalificada: 0});
      }
    });
  }

  ctrl.buscarAspecto = function(id){
    var n = ctrl.evaluacionAspecto.length;
    for(let i = 0; i < n; i++){
      if(ctrl.evaluacionAspecto[i].id === id) return i;
    }
    return -1;
  }

  ctrl.calcularPuntajeCriterio = function(aspectoId){
    var posicion = ctrl.buscarAspecto(aspectoId);
    if(posicion !== -1){
      ctrl.evaluacionAspecto[posicion].puntajeAsignado = 0;
      angular.forEach(ctrl.evaluacionAspecto[posicion].criterios, function(criterio,indice){
        ctrl.evaluacionAspecto[posicion].puntajeAsignado += criterio.puntajeAsignado;
      });
      ctrl.evaluacionAspecto[posicion].puntajeManual = ctrl.evaluacionAspecto[posicion].puntajeAsignado;
    }else{
      swal("Error","No se ha encontrado el aspecto","error");
    }
  }

  ctrl.crearMensaje = function (longitud) {
    var mensaje = "Los puntajes de los aspectos ";
    if(longitud === 1) mensaje = mensaje + indices[0] + " ha sido modificado, pero no hay explicación alguna.";
    else{
      for(let i = 0; i < longitud; i++){
        var j = i + 1;
        if(i === longitud - 2) mensaje = mensaje + j + " y ";
        else if (i === longitud - 1) mensaje = mensaje + j + ", ";
        else mensaje = mensaje + j + " han sido modificados pero no hay explicación alguna."
      }
    }
    return mensaje;
  }

  ctrl.hayPuntajesManuales = function () {
    var puntajesManuales = true;
    var indices = [];
    var contador = 0;
    angular.forEach(ctrl.evaluacionAspecto, function (aspecto,indice) {
      if(aspecto.activarPuntajeManual){
        if (aspecto.descripcionPuntajeManual === null || aspecto.descripcionPuntajeManual === ''){
          indices.push(indice);
        }else{
          contador++;
        }
      }
    });
    var n = indices.length;
    if(n > 0){
      var mensaje = ctrl.crearMensaje(n);
      swal("¡Opss!", mensaje , "error");
    }
    if(contador > 0) return puntajesManuales;
    return !puntajesManuales;
  }

  ctrl.guardarAspecto = function(){
    ctrl.puntajeHerramienta = 0;
    angular.forEach(ctrl.evaluacionAspecto, function(aspecto,indice){
      var puntajesManuales = ctrl.hayPuntajesManuales;
      var puntaje = 0;
      angular.forEach(aspecto.criterios, function(criterio,indice){
        puntaje += criterio.puntajeAsignado;
      });
      aspecto.puntajeAsignado = puntaje;
      if(!puntajesManuales){
        ctrl.puntajeHerramienta += aspecto.puntajeAsignado;
        aspecto.puntajeManual = 0;
        angular.forEach(aspecto.criterios, function(criterio,indice){
          criterio.puntajeManual = 0;
        });
      }else{
        ctrl.puntajeHerramienta += aspecto.puntajeManual;
      }
    });
    var data = {
      "aspectos":ctrl.evaluacionAspecto
    }
    console.log(data);
    calificacionEscalaService.guardarAspecto(data).then(function(){
      swal('Éxito', 'Se guardó la calificación de la herramienta de Evaluación','success');
      $state.go('calificacionHerramienta', {avanceEntregableId: $stateParams.avanceEntregableId, herramientaCalificada:1, calificacionHerramientaEvaluacionId: $stateParams.calificacionHerramientaEvaluacionId, puntajeHerramienta: ctrl.puntajeHerramienta});
    });
  }

  ctrl.init = function(){
    //ctrl.obtenerEvaluacionAspecto();
    ctrl.obtenerEvaluacionCriterios();
  }

  ctrl.init();
}
