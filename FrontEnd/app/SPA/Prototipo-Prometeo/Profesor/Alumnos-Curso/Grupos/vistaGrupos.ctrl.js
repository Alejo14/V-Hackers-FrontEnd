angular.module('vHackersModule').controller('vistaGruposCtrl', ['$scope', '$state', '$stateParams', '$uibModal', 'vistaGruposService', 'NgTableParams',
function($scope, $state, $stateParams, $uibModal, vistaGruposService, NgTableParams){
  var ctrl = this;
  ctrl.horario = {};
  ctrl.alumnosLista = [];
  ctrl.conjuntosLista = [];
  ctrl.gruposLista = [];
  ctrl.nombreAgrupacionNueva = ""

  ctrl.obtenerAlumnos = function (horarioId) {
    vistaGruposService.obtenerAlumnos(horarioId).then(function (alumnosListaData) {
      ctrl.alumnosLista = alumnosListaData;
      console.log(alumnosListaData);
      ctrl.alumnosTabla = new NgTableParams({}, { dataset: ctrl.alumnosLista });
    });
  };

/*
  ctrl.obtenerConjuntosGrupo = function (horarioId) {
    vistaGruposService.obtenerConjuntosGrupo(horarioId).then(function (conjuntosListaData) {
      ctrl.conjuntosLista = conjuntosListaData;
      console.log(conjuntosListaData);
      ctrl.conjuntosTabla = new NgTableParams({}, { dataset: ctrl.conjuntosLista });
    });
  };
*/

  ctrl.obtenerGrupos = function (horarioId) {
    vistaGruposService.obtenerGrupos(horarioId).then(function (gruposListaData) {
      ctrl.gruposLista = gruposListaData;
      console.log(gruposListaData);
      ctrl.gruposTabla = new NgTableParams({}, { dataset: ctrl.gruposLista });
    });
  };


  ctrl.eliminarGrupo = function (grupoElim) {
    console.log(grupoElim);
    swal({
      title: "¿Esta seguro de que desea eliminar al grupo "+ grupoElim.nombre+"?",
      text: "",
      icon: "warning",
      //buttons: ["Cancelar", "Sí, agregar"],
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, eliminar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (grupoElimConfirmado) {
      if (grupoElimConfirmado !== "cancelar") {

        console.log(angular.toJson(grupoElim));//Envio el json para crear el entregable
        data={
          "id": grupoElim.id,
          "nombre": "grupoNuevo",
          "fechaCreacion": (new Date())*1,
          "conjuntoGrupos_id": "6398aeef-e27f-4d9c-b8ef-52e6e4d48142",
          "horario_id": ctrl.horario.horarioId
          }
          console.log(angular.toJson(data));
          vistaGruposService.eliminarGrupo(angular.toJson(data)).then(function () {
            swal("¡Bien hecho!", "El nuevo grupo se elimino exitosamente" , "success");
          });
          ctrl.gruposLista.splice(ctrl.gruposLista.indexOf(grupoElim),1);
      }
    });
  }

  ctrl.verDetalleAlumno = function (alumno) {
  }

  function uuid() {
      function randomDigit() {
          if (crypto && crypto.getRandomValues) {
              var rands = new Uint8Array(1);
              crypto.getRandomValues(rands);
              return (rands[0] % 16).toString(16);
          } else {
              return ((Math.random() * 16) | 0).toString(16);
          }
      }
      var crypto = window.crypto || window.msCrypto;
      return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
  }


/*  ctrl.crearConjuntosGrupo = function (grupoNuevo) {
    if (grupoNuevo==""){
      swal("¡Opss!", "Ingrese un nombre para la nueva agrupacion por favor" , "error");
    }
    else{
      swal({
        title: "¿Esta seguro de que desea crear esta agrupación?",
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
      }).then(function (agrupacionNuevoConfirmado) {
        if (agrupacionNuevoConfirmado !== "cancelar") {

          console.log(angular.toJson(grupoNuevo));//Envio el json para crear el entregable
          data={
            "id": uuid(),
            "nombre": grupoNuevo,
            "fechaCreacion": (new Date())*1,
            "conjuntoGrupos_id": uuid(),
            "horario_id": ctrl.horario.horarioId
            }
            console.log(angular.toJson(data));
            vistaGruposService.crearConjuntosGrupo(angular.toJson(data)).then(function () {
              swal("¡Bien hecho!", "La agrupación se genero exitosamente" , "success");
            });
        }
      });
    }
  }*/

  ctrl.crearGrupo = function (grupoNuevo) {
      if (grupoNuevo==""){
        swal("¡Opss!", "Ingrese un nombre para la nueva agrupacion por favor" , "error");
      }
      else{
        swal({
          title: "¿Esta seguro de que desea crear el grupo " + grupoNuevo + "?",
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
        }).then(function (agrupacionNuevoConfirmado) {
          if (agrupacionNuevoConfirmado !== "cancelar") {

            console.log(angular.toJson(grupoNuevo));//Envio el json para crear el entregable
            data={
              "id": uuid(),
              "nombre": grupoNuevo,
              "fechaCreacion": (new Date())*1,
              "conjuntoGrupos_id": "6398aeef-e27f-4d9c-b8ef-52e6e4d48142",
              "horario_id": ctrl.horario.horarioId
              }
              console.log(angular.toJson(data));
              vistaGruposService.crearGrupo(angular.toJson(data)).then(function () {
                swal("¡Bien hecho!", "El nuevo grupo se genero exitosamente" , "success");
              });
              $state.go('grupos',  {cursoNombre: ctrl.horario.cursoNombre, horarioNombre: ctrl.horario.horarioNombre, horarioId: ctrl.horario.horarioId});
          }
        });
      }
    }

  ctrl.actualizarGrupo = function(grupo){
    $state.go('actualizarGrupo',  {cursoNombre: ctrl.horario.cursoNombre, horarioId: ctrl.horario.horarioId, horarioNombre: ctrl.horario.horarioNombre, grupoId: grupo.id, grupoNombre: grupo.nombre});
  }

  ctrl.init = function () {
    ctrl.horario.cursoNombre = $stateParams.cursoNombre;
    ctrl.horario.horarioNombre = $stateParams.horarioNombre;
    ctrl.horario.horarioId = $stateParams.horarioId;

    ctrl.obtenerAlumnos(ctrl.horario.horarioId);
    //ctrl.obtenerConjuntosGrupo(ctrl.horario.horarioId);
    ctrl.obtenerGrupos("6398aeef-e27f-4d9c-b8ef-52e6e4d48142");
  }

  ctrl.init();
}]);
