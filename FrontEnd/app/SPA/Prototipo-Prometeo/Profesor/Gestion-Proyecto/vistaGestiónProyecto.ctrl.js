angular.module('vHackersModule').controller('gestiónProyectoCtrl', ['$scope', '$state', 'gestiónProyectoService', '$uibModal',
function($scope, $state, gestiónProyectoService, $uibModal){
  var ctrl = this;
  ctrl.nuevo = "Nuevo Proyecto";
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
    swal({
      title: "¿Está seguro de que quieres volver?",
      text: "Los cambios no se guardaran",
      icon: "warning",
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, volver",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (usuarioNuevoConfirmado) {
      if (usuarioNuevoConfirmado !== "cancelar") {
        $state.go('curso');
        //herramientaEvaluacionServicio.enviarCalificacion(ctrl.enviarCalificacion);
      }
    });
  };

  ctrl.proyectoNuevo = {};
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
        proyectoNuevo.id="8ec4885e-3627-4ec8-aa3d-545ffb9e8bec";
        proyectoNuevo.fechaCreacion=
        console.log(angular.toJson(proyectoNuevo));//Envio el json para crear el entregable
        data={
          "id": proyectoNuevo.id,
          "nombre": proyectoNuevo.nombre,
          "fechaCreacion": 1555822800000,
          "fechaInicio": 1555822800000,
          "fechaFin": 1555822800000,
          "ponderacion": parseInt(proyectoNuevo.ponderacion)
          }
          console.log(angular.toJson(data));
          gestiónProyectoService.registroProyecto(angular.toJson(data)).then(function () {
            ctrl.exitoso="Proyecto enviado con éxito";
          });

          proyectoNuevo.nombre="";
          proyectoNuevo.fechaCreacion="";
          proyectoNuevo.fechaInicio="";
          proyectoNuevo.fechaFin="";
          proyectoNuevo.ponderacion="";

          swal("¡Bien hecho!", "El Proyecto se genero exitosamente" , "success");
      }
    });
  }

}]);
