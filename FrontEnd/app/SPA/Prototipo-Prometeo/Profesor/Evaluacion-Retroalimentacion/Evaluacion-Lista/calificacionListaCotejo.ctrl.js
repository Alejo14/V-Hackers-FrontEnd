angular.module('vHackersModule').controller('calificacionListaCtrl', calificacionListaCtrl);

calificacionListaCtrl.$inject = ['$scope','$state', '$stateParams','calificacionListaService'];

function calificacionListaCtrl ($scope,$state,$stateParams,calificacionListaService){
  var ctrl = this;

  ctrl.entregable = {};
  ctrl.herramientaEvaluacionId = $stateParams.herramientaEvaluacionId;
  ctrl.calificacionHerramientaEvaluacionId = $stateParams.calificacionHerramientaEvaluacionId;
  ctrl.listaCriterios = [];
  ctrl.puntajeAsignado = 0;
  ctrl.obtenerCalificacionListaCotejo = function (){
    calificacionListaService.obtenerCalificacionListaCotejo(ctrl.calificacionHerramientaEvaluacionId, ctrl.herramientaEvaluacionId).then(function(listaCriteriosData){
      ctrl.listaCriterios = listaCriteriosData;
      ctrl.calcularPuntajeCriterio();
      console.log(ctrl.listaCriterios);
    });
  }

  ctrl.regresar = function (){
    swal({
      title: "¿Estás seguro que deseas regresar?",
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
        $state.go('calificacion',{entregableId: ctrl.entregable.id, nombre: ctrl.entregable.nombre, metodo:ctrl.entregable.metodo, horarioId:ctrl.horarioId, cursoCicloId: $stateParams.cursoCicloId, avanceEntregableId: $stateParams.avanceEntregableId});
      }
    });
  }

  ctrl.calcularPuntajeCriterio = function(){
    ctrl.habilitarBotones = true;
    longitud=ctrl.listaCriterios.length;
    ctrl.puntajeAsignado = 0;
    console.log(ctrl.listaCriterios);
    for(let i = 0; i< longitud; i++){
      console.log(ctrl.listaCriterios[i].calificacion);
      if(ctrl.listaCriterios[i].calificacion==1){
        ctrl.puntajeAsignado = ctrl.puntajeAsignado + 1;
      }
    }
    if(longitud!=0) {
      punt = ctrl.puntajeAsignado/longitud;
      ctrl.puntajeAsignado = 1 * punt.toFixed(2);
    }else{
      ctrl.puntajeAsignado = 0;
    }
    console.log(ctrl.puntajeAsignado);
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

  ctrl.guardarcriterios = function(){
    data ={
      "criterios": ctrl.listaCriterios
    }
      calificacionListaService.guardarCalificacionCriterioListaCotejo(data).then(function(){
        swal('Éxito', 'Se guardó la calificación de la herramienta de evaluación','success');
        $state.go('calificacionHerramienta', {entregableId: ctrl.entregable.id, nombre: ctrl.entregable.nombre, metodo:ctrl.entregable.metodo, horarioId:ctrl.horarioId, cursoCicloId: $stateParams.cursoCicloId, avanceEntregableId: $stateParams.avanceEntregableId, calificacionHerramientaEvaluacionId: $stateParams.calificacionHerramientaEvaluacionId, puntajeHerramienta: ctrl.puntajeAsignado});
      });
    }

    ctrl.init = function(){
      ctrl.entregable.id = $stateParams.entregableId;
      ctrl.entregable.nombre = $stateParams.nombre;
      ctrl.entregable.metodo = $stateParams.metodo;
      ctrl.horarioId = $stateParams.horarioId;
      console.log(ctrl.herramientaEvaluacionId);
      console.log(ctrl.calificacionHerramientaEvaluacionId);
      ctrl.habilitarBotones = false;
      ctrl.obtenerCalificacionListaCotejo();
    }

    ctrl.init();
  }
