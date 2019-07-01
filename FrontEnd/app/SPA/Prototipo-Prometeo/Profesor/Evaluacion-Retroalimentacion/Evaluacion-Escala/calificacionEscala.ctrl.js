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

  ctrl.calcularPuntajeCriterio = function(){
    var posicion = 1;
    if(posicion !== -1){
      ctrl.puntajeAsignado = 0;
      angular.forEach(ctrl.evaluacionEscala, function(criterio,indice){
        ctrl.puntajeAsignado += criterio.puntajeAsignado;
      });
      ctrl.habilitarBotones = true;
      //ctrl.evaluacionAspecto[posicion].puntajeManual = ctrl.evaluacionAspecto[posicion].puntajeAsignado;
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

  ctrl.guardarAspecto = function(){//Se debe BORRAR
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
      swal('Éxito', 'Se guardó la calificación de la herramienta de evaluación','success');
      $state.go('calificacionHerramienta', {avanceEntregableId: $stateParams.avanceEntregableId, herramientaCalificada:1, calificacionHerramientaEvaluacionId: $stateParams.calificacionHerramientaEvaluacionId, puntajeHerramienta: ctrl.puntajeHerramienta});
    });
  }


  ctrl.guardarcriterios = function(){//Se debe QUEDAR
    //ctrl.calcularPuntajeCriterio();

    if (ctrl.puntajeAsignado>ctrl.evaluacionAspecto[0].puntajeMaximo) {
      swal("¡Opss!", "El puntaje asignado supera el puntaje máximo" , "error");
    }else {

      //ctrl.puntajeHerramienta = 0;
      // angular.forEach(ctrl.evaluacionAspecto, function(aspecto,indice){
      //   var puntajesManuales = ctrl.hayPuntajesManuales;
      //   var puntaje = 0;
      //   angular.forEach(aspecto.criterios, function(criterio,indice){
      //     puntaje += criterio.puntajeAsignado;
      //   });
      //   aspecto.puntajeAsignado = puntaje;
      //   if(!puntajesManuales){
      //     ctrl.puntajeHerramienta += aspecto.puntajeAsignado;
      //     aspecto.puntajeManual = 0;
      //     angular.forEach(aspecto.criterios, function(criterio,indice){
      //       criterio.puntajeManual = 0;
      //     });
      //   }else{
      //     ctrl.puntajeHerramienta += aspecto.puntajeManual;
      //   }
      // });
      ctrl.evaluacionAspecto[0].puntajeAsignado=ctrl.puntajeAsignado;
      ctrl.evaluacionAspecto[0].criterios=ctrl.evaluacionEscala;
      var data = { //Se manda un ASpecto Vacio para mantener la estructura pero con los criterios
        "aspectos":ctrl.evaluacionAspecto
      }
      console.log("ASPECTO FINAL",ctrl.evaluacionAspecto);
      calificacionEscalaService.guardarEscala(data).then(function(){
        swal('Éxito', 'Se guardó la calificación de la herramienta de evaluación','success');
        $state.go('calificacionHerramienta', {avanceEntregableId: $stateParams.avanceEntregableId, herramientaCalificada:1, calificacionHerramientaEvaluacionId: $stateParams.calificacionHerramientaEvaluacionId, puntajeHerramienta: ctrl.puntajeAsignado});
      });


    }






  }




  ctrl.init = function(){
    //ctrl.obtenerEvaluacionAspecto();
    ctrl.habilitarBotones = false;
    ctrl.obtenerEvaluacionCriterios();
  }

  ctrl.init();
}
