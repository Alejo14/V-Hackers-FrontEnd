angular.module('vHackersModule').controller('gestionProyectoCtrl', ['$scope', '$state', '$stateParams', 'gestionProyectoService', '$uibModal',
function($scope, $state, $stateParams, gestionProyectoService, $uibModal){
  var ctrl = this;
  ctrl.titulo = "fafa";
  ctrl.alumnosLista = [];
  ctrl.alumnosListaModal = [];
  ctrl.mensajeNuevo = "Go V-Hackers";
  ctrl.probar = function () {
    hackersService.listarAlumnos().then(function (alumnosListaData) {
      ctrl.alumnosLista = alumnosListaData;
    });
  };

  ctrl.probarModal = function () {
    //En este caso el controlador del modal se debe declarar en el JSON que pasa como parametro de open
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/modalListarAlumnos.html',
      controller: 'modalListarAlumnosCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
      resolve: {
        parametrosModalListarAlumnos: function (){
          return "V Hackers"
        }
      }
    });

    //Recibo parametro de retorno
    modalInstance.result.then( function (parametroRetorno) {
      ctrl.alumnosLista.push(parametroRetorno);
    });
  };

  ctrl.volverCurso = function () {
    // swal({
    //   title: "¿Está seguro de que quieres volver?",
    //   text: "Los cambios no se guardaran",
    //   icon: "warning",
    //   buttons: {
    //     cancelar: {
    //       text: "Cancelar",
    //       className: "btn btn-lg btn-danger"
    //     },
    //     confirm: {
    //       text: "Sí, volver",
    //       className: "btn btn-lg color-fondo-azul-pucp color-blanco"
    //     }
    //   }
    // }).then(function (usuarioNuevoConfirmado) {
    //   if (usuarioNuevoConfirmado !== "cancelar") {
    //     // $state.go('profesorMisCursos', {rolUsuario: "P"});
    //     //herramientaEvaluacionServicio.enviarCalificacion(ctrl.enviarCalificacion);
    //   }
    // });
  };

  ctrl.proyectoG = {};

  ctrl.gestionarProyecto = function (proyectoG){
    if (!proyectoG || !(proyectoG.nombre) || !(proyectoG.fechaInicio) || !(proyectoG.fechaFin) || !(proyectoG.ponderacion)){
      swal("¡Opss!", "Hay campos obligatorios sin llenar" , "error");
    }else{
      if ($stateParams.id==0) {
        ctrl.guardarProyecto(proyectoG);
      }else {
        ctrl.modificarProyecto(proyectoG);
      }
    }
  }

  ctrl.guardarProyecto = function (proyectoNuevo) {
    swal({
      title: "¿Esta seguro de que desea agregar este Proyecto?",
      text: "",
      icon: "warning",
      //buttons: ["Cancelar", "Sí, agregar"],
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, agregar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (proyectoNuevoConfirmado) {
      if (proyectoNuevoConfirmado !== "cancelar") {
        yearI=proyectoNuevo.fechaInicio.getFullYear();
        monthI=proyectoNuevo.fechaInicio.getMonth();
        dateI=proyectoNuevo.fechaInicio.getDate();
        hoursI=proyectoNuevo.fechaInicio.getHours();
        minutesI=proyectoNuevo.fechaInicio.getMinutes();

        yearF=proyectoNuevo.fechaFin.getFullYear();
        monthF=proyectoNuevo.fechaFin.getMonth();
        dateF=proyectoNuevo.fechaFin.getDate();
        hoursF=proyectoNuevo.fechaFin.getHours();
        minutesF=proyectoNuevo.fechaFin.getMinutes();

        if($('#ts1').is(':checked')){
            var vis = 1
        }else{
            var vis = 0;
        }

        if($('#ts2').is(':checked')){
            var horas = 1
        }else{
            var horas = 0;
        }

        var descripcion = $('textarea#desTA').val()

        var metodo = parseInt($('input[name=metodo]:checked').val())

        console.log(angular.toJson(proyectoNuevo));//Envio el json para crear el entregable
        data={
          "id": null,
          "nombre": proyectoNuevo.nombre,
          "fechaCreacion": (new Date())*1,
          "fechaInicio": (new Date(yearI, monthI, dateI, hoursI, minutesI,0))*1,
          "fechaFin": (new Date(yearF, monthF, dateF, hoursF, minutesF,0))*1,
          "ponderacion": parseInt(proyectoNuevo.ponderacion),
          "descripcion": descripcion,
          "visible": vis,
          "registroHoras": horas,
          "metodoTrabajo": metodo,
          "cursoCiclo_id": ctrl.proyectoG.cursoCicloId
          }
          console.log(angular.toJson(data));
          console.log(data);
          gestionProyectoService.registroProyecto(angular.toJson(data)).then(function () {
            swal("¡Bien hecho!", "El proyecto fue creado exitosamente" , "success");
          });

          proyectoNuevo.nombre="";
          proyectoNuevo.fechaCreacion="";
          proyectoNuevo.fechaInicio="";
          proyectoNuevo.fechaFin="";
          proyectoNuevo.ponderacion="";
          $("textarea#desTA").val("");
          $("#ts1").attr("checked", false);
          $("#ts2").attr("checked", false);
          $("input[name=metodo][value=0]").prop('checked', true);
      }
    });
  }

  ctrl.modificarProyecto = function (proyectoModif) {
    swal({
      title: "¿Esta seguro de que desea guardar los cambios al Proyecto?",
      text: "",
      icon: "warning",
      //buttons: ["Cancelar", "Sí, agregar"],
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, guardar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (proyectoModifConfirmado) {
      if (proyectoModifConfirmado !== "cancelar") {
        yearI=proyectoModif.fechaInicio.getFullYear();
        monthI=proyectoModif.fechaInicio.getMonth();
        dateI=proyectoModif.fechaInicio.getDate();
        hoursI=proyectoModif.fechaInicio.getHours();
        minutesI=proyectoModif.fechaInicio.getMinutes();

        yearF=proyectoModif.fechaFin.getFullYear();
        monthF=proyectoModif.fechaFin.getMonth();
        dateF=proyectoModif.fechaFin.getDate();
        hoursF=proyectoModif.fechaFin.getHours();
        minutesF=proyectoModif.fechaFin.getMinutes();

        if($('#ts1').is(':checked')){
            var vis = 1
        }else{
            var vis = 0;
        }

        if($('#ts2').is(':checked')){
            var horas = 1
        }else{
            var horas = 0;
        }

        var descripcion = $('textarea#desTA').val()

        var metodo = parseInt($('input[name=metodo]:checked').val())

        console.log(angular.toJson(proyectoModif));//Envio el json para crear el entregable
        data={
          "id": proyectoModif.id,
          "nombre": proyectoModif.nombre,
          "fechaCreacion": (new Date())*1,
          "fechaInicio": (new Date(yearI, monthI, dateI, hoursI, minutesI,0))*1,
          "fechaFin": (new Date(yearF, monthF, dateF, hoursF, minutesF,0))*1,
          "ponderacion": parseInt(proyectoModif.ponderacion),
          "descripcion": descripcion,
          "visible": vis,
          "registroHoras": horas,
          "metodoTrabajo": metodo,
          "cursoCiclo_id": ctrl.proyectoG.cursoCicloId
          }
          console.log(angular.toJson(data));
          gestionProyectoService.modificarProyecto(angular.toJson(data)).then(function () {
            swal("¡Bien hecho!", "El proyecto fue modificado exitosamente" , "success");
          });

          proyectoModif.nombre="";
          proyectoModif.fechaCreacion="";
          proyectoModif.fechaInicio="";
          proyectoModif.fechaFin="";
          proyectoModif.ponderacion="";
          $("textarea#desTA").val("");
      }
    });
  }

  ctrl.init = function (){
    if ($stateParams.id==0){
      ctrl.titulo = "Nuevo Proyecto";
      ctrl.proyectoG.cursoCicloId=$stateParams.cursoCiclo_id;
    }else{
      ctrl.titulo = "Modificar Proyecto";
      ctrl.proyectoG.id=$stateParams.id;
      ctrl.proyectoG.nombre=$stateParams.nombre;
      ctrl.proyectoG.fechaCreacion=new Date(Number($stateParams.fechaCreacion));
      ctrl.proyectoG.fechaInicio=new Date(Number($stateParams.fechaInicio));;
      ctrl.proyectoG.fechaFin=new Date(Number($stateParams.fechaFin));;
      ctrl.proyectoG.ponderacion=$stateParams.ponderacion;
      ctrl.proyectoG.cursoCicloId=$stateParams.cursoCiclo_id;


      if($stateParams.visible==1){
        $("#ts1").attr("checked", true);
      }else{
        $("#ts1").attr("checked", false);
      }

      if($stateParams.registroHoras==1){
        $("#ts2").attr("checked", true);
      }else{
        $("#ts2").attr("checked", false);
      }

      if($stateParams.metodoTrabajo==1){
        $("input[name=metodo][value=1]").prop('checked', true);
      }else{
        $("input[name=metodo][value=0]").prop('checked', true);
      }
      $("textarea#desTA").val($stateParams.descripcion);
    }
  }

  ctrl.init();



}]);
