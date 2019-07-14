angular.module('vHackersModule').controller('calificacionAspectosCtrl', calificacionAspectosCtrl);

calificacionAspectosCtrl.$inject = ['$scope','$state', '$stateParams','calificacionAspectoService'];

function calificacionAspectosCtrl ($scope,$state,$stateParams,calificacionAspectoService){
  var ctrl = this;

  ctrl.herramientaEvaluacionId = $stateParams.herramientaEvaluacionId;
  ctrl.calificacionHerramientaEvaluacionId = $stateParams.calificacionHerramientaEvaluacionId;
  ctrl.evaluacionAspecto = {};
  ctrl.evaluacionAspectoEnviar = {};
  ctrl.nivelesRubrica = {};

  ctrl.obtenerEvaluacionAspecto = function (){
    calificacionAspectoService.obtenerNivelesRubrica(ctrl.herramientaEvaluacionId).then(function(nivelesRubrica){
      ctrl.nivelesRubrica = nivelesRubrica;
      console.log(ctrl.nivelesRubrica);
    });
    calificacionAspectoService.obtenerEvaluacionAspecto(ctrl.herramientaEvaluacionId, ctrl.calificacionHerramientaEvaluacionId).then(function(evaluacionAspecto){
      ctrl.evaluacionAspecto = evaluacionAspecto;
      angular.forEach(ctrl.evaluacionAspecto, function(aspecto,indice){
        aspecto.accordionOpen = false;
        if(aspecto.descripcionPuntajeManual !== "" && aspecto.descripcionPuntajeManual !== null){
          aspecto.activarPuntajeManual = true;
        }else{
          aspecto.activarPuntajeManual = false;
        }
      });
      console.log(ctrl.evaluacionAspecto);
    });
  }

  ctrl.editarPuntaje = function (indice) {
    ctrl.evaluacionAspecto[indice].activarPuntajeManual = !ctrl.evaluacionAspecto[indice].activarPuntajeManual;
  }

  ctrl.regresar = function (){
    swal({
      title: "¿Estás seguro de que deseas regresar?",
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
        $state.go('calificacion',{avanceEntregableId: $stateParams.avanceEntregableId});
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
      ctrl.evaluacionAspecto[posicion].activarPuntajeManual = false;
      ctrl.evaluacionAspecto[posicion].descripcionPuntajeManual = '';
    }else{
      swal("Error","No se ha encontrado el aspecto","error");
    }
  }

  ctrl.crearMensaje = function (longitud) {
    var mensaje = "";
    if(longitud === 1) mensaje = "El puntaje del aspecto " + ctrl.indices[0] + " ha sido modificado, pero no hay explicación alguna.";
    else{
      mensaje = "Los puntajes de los aspectos ";
      for(let i = 0; i < longitud; i++){
        if(i === longitud - 2) mensaje = mensaje + ctrl.indices[i] + " y ";
        else if (i === longitud - 1) mensaje = mensaje + ctrl.indices[i] + ", ";
        else mensaje = mensaje + ctrl.indices[i] + " han sido modificados pero no hay explicación alguna."
      }
    }
    return mensaje;
  }

  ctrl.hayPuntajesManuales = function () {
    ctrl.indices = [];
    var contador = 0;
    angular.forEach(ctrl.evaluacionAspecto, function (aspecto,indice) {
      if(aspecto.activarPuntajeManual){
        if (aspecto.descripcionPuntajeManual === null || aspecto.descripcionPuntajeManual === ''){
          ctrl.indices.push(indice+1);
        }else{
          contador++;
        }
      }
    });
    if(ctrl.indices.length) return 2;
    if(contador > 0) return 1;
    return 0;
  }

  ctrl.guardarAspecto = function(){
    ctrl.puntajeHerramienta = 0;
    var puntajesManuales = ctrl.hayPuntajesManuales();
    if(puntajesManuales !== 2){
      angular.forEach(ctrl.evaluacionAspecto, function(aspecto,indice){
        var puntaje = 0;
        angular.forEach(aspecto.criterios, function(criterio,indice){
          puntaje += criterio.puntajeAsignado;
        });
        aspecto.puntajeAsignado = puntaje;
        if(puntajesManuales === 0){
          ctrl.puntajeHerramienta += aspecto.puntajeAsignado;
          aspecto.puntajeManual = 0;
          angular.forEach(aspecto.criterios, function(criterio,indice){
            criterio.puntajeManual = 0;
          });
        }else if(puntajesManuales === 1){
          if(aspecto.activarPuntajeManual) ctrl.puntajeHerramienta += aspecto.puntajeManual;
          else ctrl.puntajeHerramienta += aspecto.puntajeAsignado;
        }
      });
      var data = {
        "aspectos":ctrl.evaluacionAspecto
      }
      console.log(data);
      calificacionAspectoService.guardarAspecto(data).then(function(){
        swal('Éxito', 'Se guardó la calificación de la herramienta de evaluación','success');
        $state.go('calificacionHerramienta', {avanceEntregableId: $stateParams.avanceEntregableId, calificacionHerramientaEvaluacionId: $stateParams.calificacionHerramientaEvaluacionId, puntajeHerramienta: ctrl.puntajeHerramienta});
      });
    }else{
      var mensaje = ctrl.crearMensaje(ctrl.indices.length);
      swal("¡Opss!", mensaje , "error");
    }
  }

  ctrl.init = function(){
    ctrl.obtenerEvaluacionAspecto();
  }

  ctrl.init();
}
