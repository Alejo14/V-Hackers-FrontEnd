angular.module('vHackersModule').controller('vistaActualizarGrupoCtrl', ['$scope', '$state', '$stateParams', '$uibModal', 'vistaGruposService', 'NgTableParams',
function($scope, $state, $stateParams, $uibModal, vistaGruposService, NgTableParams){
  var ctrl = this;
  ctrl.horario = {};
  ctrl.alumnosGrupo = [];
  ctrl.grupo = {};
  ctrl.alumnosSinGrupo = [];
  ctrl.nombreAgrupacionNueva = "";

  ctrl.obtenerAlumnosGrupo = function (grupoId) {
    console.log(grupoId);
    vistaGruposService.obtenerAlumnosGrupo(grupoId).then(function (alumnosGrupoData) {
      ctrl.alumnosGrupo = alumnosGrupoData;
      for(let i = 0; i < ctrl.alumnosGrupo.length; i++){
        ctrl.alumnosGrupo[i].marcado = false;
      }
      console.log(alumnosGrupoData);
      ctrl.alumnosTabla = new NgTableParams({}, { dataset: ctrl.alumnosGrupo });
    });
  };

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

  ctrl.actualizarGrupo = function(){
    console.log("hola");
      if (ctrl.grupo.nombre==""){
        swal("¡Opss! Ingresa un nombre para el grupo", "" , "error");
      }
      else{
        swal({
          title: "¿Estás seguro de que deseas modificar el grupo " + ctrl.grupo.nombre + "?",
          text: "",
          icon: "warning",
          //buttons: ["Cancelar", "Sí, agregar"],
          buttons: {
            cancelar: {
              text: "Cancelar",
              className: "btn btn-lg btn-danger"
            },
            confirm: {
              text: "Sí, modificar",
              className: "btn btn-lg color-fondo-azul-pucp color-blanco"
            }
          },
          closeModal: false
        }).then(function (agrupacionNuevoConfirmado) {
          if (agrupacionNuevoConfirmado !== "cancelar") {


            listaAlumnos = [];
            for(let i = 0; i < ctrl.alumnosGrupo.length; i++){
              idRolUsuarioAlumno = {
                "idRolUsuario": ctrl.alumnosGrupo[i].idRolUsuario
              }
              listaAlumnos.push(idRolUsuarioAlumno);
            }
            console.log(listaAlumnos);

            data={
              "id": ctrl.grupo.id,
              "rolUsuarioIds": listaAlumnos
              }
              console.log(angular.toJson(data));

              vistaGruposService.actualizarGrupo(data).then(function () {
                if(ctrl.grupo.nombre != ctrl.grupo.nombreOriginal){
                  ctrl.grupo.nombreOriginal = ctrl.grupo.nombre;
                  data={
                    "id": ctrl.grupo.id,
                    "nombre": ctrl.grupo.nombre,
                    "fechaCreacion": (new Date())*1,
                    "conjuntoGrupos_id": uuid(),
                    "horario_id": ctrl.horario.horarioId
                    }
                    console.log(angular.toJson(data));
                    vistaGruposService.modificarNombreGrupo(angular.toJson(data)).then(function () {
                        swal("¡Bien hecho!", "El grupo "+ ctrl.grupo.nombre + " se actualizó correctamente" , "success");
                    });
                }else{
                  swal("¡Bien hecho!", "El grupo "+ ctrl.grupo.nombre + " se actualizó correctamente" , "success");
                }
              });
              //$state.go('grupos',  {cursoNombre: ctrl.horario.cursoNombre, horarioNombre: ctrl.horario.horarioNombre, horarioId: ctrl.horario.horarioId});
          }
        });
      }
  }

  ctrl.obtenerAlumnosSinGrupo = function (horarioId) {
    vistaGruposService.obtenerAlumnosSinGrupo(horarioId).then(function (alumnosListaData) {
      ctrl.alumnosSinGrupo = alumnosListaData;
      for(let i = 0; i < ctrl.alumnosSinGrupo.length; i++){
        ctrl.alumnosSinGrupo[i].marcado = false;
      }
      console.log(alumnosListaData);
      ctrl.alumnosSinGrupoTabla = new NgTableParams({}, { dataset: ctrl.alumnosSinGrupo });
    });
  };

  ctrl.agregarAlGrupo = function () {
    for(let i = 0; i < ctrl.alumnosSinGrupo.length; i++){
      if(ctrl.alumnosSinGrupo[i].marcado == true){
        alumnoNuevo = ctrl.alumnosSinGrupo[i];
        ctrl.alumnosSinGrupo.splice(ctrl.alumnosSinGrupo.indexOf(alumnoNuevo),1);
        alumnoNuevo.marcado=false;
        ctrl.alumnosGrupo.push(alumnoNuevo);
        i=i-1;
      }
    }
  };

  ctrl.sacarDelGrupo = function () {
    for(let i = 0; i < ctrl.alumnosGrupo.length; i++){
      if(ctrl.alumnosGrupo[i].marcado == true){
        alumnoNuevo = ctrl.alumnosGrupo[i];
        ctrl.alumnosGrupo.splice(ctrl.alumnosGrupo.indexOf(alumnoNuevo),1);
        alumnoNuevo.marcado=false;
        ctrl.alumnosSinGrupo.push(alumnoNuevo);
        i=i-1;
      }
    }
  };

  ctrl.init = function () {
    ctrl.horario.cursoNombre = $stateParams.cursoNombre;
    ctrl.horario.horarioNombre = $stateParams.horarioNombre;
    ctrl.horario.horarioId = $stateParams.horarioId;

    ctrl.grupo.nombre = $stateParams.grupoNombre;
    ctrl.grupo.nombreOriginal = $stateParams.grupoNombre;
    ctrl.grupo.id = $stateParams.grupoId;


    ctrl.obtenerAlumnosGrupo(ctrl.grupo.id);
    ctrl.obtenerAlumnosSinGrupo(ctrl.horario.horarioId);
    //ctrl.obtenerConjuntosGrupo(ctrl.horario.horarioId);
    //ctrl.obtenerGrupos("6398aeef-e27f-4d9c-b8ef-52e6e4d48142");
  }

  ctrl.init();
}]);
