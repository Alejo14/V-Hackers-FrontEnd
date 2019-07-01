angular.module('vHackersModule').controller('asignarAsistentesCtrl', ['$scope', '$state', '$stateParams', '$uibModal', 'asignarHorarioService', 'NgTableParams',
function($scope, $state, $stateParams, $uibModal, asignarHorarioService, NgTableParams){
  var ctrl = this;

  ctrl.idHorario = "";
  ctrl.horario = "";
  ctrl.nombreCurso = "";
  ctrl.codigoCurso = "";
  ctrl.idCurso = "";
  ctrl.idCursoCiclo = "";
  ctrl.idSemestre = "";
  ctrl.asistentesHorario = [];
  ctrl.asistentesNoHorario = [];
  ctrl.asistentesHorarioTabla;
  ctrl.asistentesNoHorarioTabla;


  ctrl.actualizarAsistentes = function(){
        swal({
          title: "¿Estás seguro de que deseas modificar a los asistentes de docencia?",
          text: "",
          icon: "warning",
          //buttons: ["Cancelar", "Sí, agregar"],
          buttons: {
            cancelar: {
              text: "Cancelar",
              className: "btn btn-lg btn-danger"
            },
            confirm: {
              text: "Sí",
              className: "btn btn-lg color-fondo-azul-pucp color-blanco"
            }
          },
          closeModal: false
        }).then(function (agrupacionNuevoConfirmado) {
          if (agrupacionNuevoConfirmado !== "cancelar") {


            listaAsistentes = [];
            for(let i = 0; i < ctrl.asistentesHorario.length; i++){
              idRolUsuarioAsistente = {
                "idRolUsuario": ctrl.asistentesHorario[i].idRolUsuario
              }
              listaAsistentes.push(idRolUsuarioAsistente);

            }

            data={
              "horarioId": ctrl.idHorario,
              "listaAsistentes": listaAsistentes
              }

              asignarHorarioService.actualizarAsistentesHorario(data).then(function () {
                swal("¡Bien hecho!", "Los asistentes se han actualizado correctamente" , "success");
              });
          }
        });

  }


  ctrl.agregarAlGrupo = function () {
    for(let i = 0; i < ctrl.asistentesNoHorario.length; i++){
      if(ctrl.asistentesNoHorario[i].marcado == true){
        asistente = ctrl.asistentesNoHorario[i];
        ctrl.asistentesNoHorario.splice(ctrl.asistentesNoHorario.indexOf(asistente),1);
        asistente.marcado=false;
        ctrl.asistentesHorario.push(asistente);
        i=i-1;
      }
    }
  };

  ctrl.sacarDelGrupo = function () {
    for(let i = 0; i < ctrl.asistentesHorario.length; i++){
      if(ctrl.asistentesHorario[i].marcado == true){
        asistenteNuevo = ctrl.asistentesHorario[i];
        ctrl.asistentesHorario.splice(ctrl.asistentesHorario.indexOf(asistenteNuevo),1);
        asistenteNuevo.marcado=false;
        ctrl.asistentesNoHorario.push(asistenteNuevo);
        i=i-1;
      }
    }
  };

  ctrl.obtenerAsistentesHorario = function(){

    asignarHorarioService.obtenerAsistentesHorario(ctrl.idHorario).then(function (asistentesHorarioData) {
      ctrl.asistentesHorario = asistentesHorarioData;
      for(let i = 0; i < ctrl.asistentesHorario.length; i++){
        ctrl.asistentesHorario[i].marcado = false;
      }
      ctrl.asistentesTabla = new NgTableParams({}, { dataset: ctrl.asistentesHorario });
    });
  };

  ctrl.obtenerAsistentesNoHorario = function(){
    asignarHorarioService.obtenerAsistentesNoHorario(ctrl.idHorario).then(function (asistentesNoHorarioData) {
      ctrl.asistentesNoHorario = asistentesNoHorarioData;
      for(let i = 0; i < ctrl.asistentesNoHorario.length; i++){
        ctrl.asistentesNoHorario[i].marcado = false;
      }
      ctrl.asistentesNoHorarioTabla = new NgTableParams({}, { dataset: ctrl.asistentesNoHorario });
    });
  };

  ctrl.volverCursoCiclo = function(){
    $state.go('asignar-horarios',{idCursoCiclo:ctrl.idCursoCiclo,idCurso:ctrl.idCurso,idSemestre:ctrl.idSemestre,nombreCurso:ctrl.nombreCurso,codigoCurso:ctrl.codigoCurso});
  }

  ctrl.init = function () {

    ctrl.nombreCurso = $stateParams.nombre;
    ctrl.horario = $stateParams.horario;
    ctrl.idHorario = $stateParams.idHorario;
    ctrl.codigoCurso = $stateParams.codigoCurso;
    ctrl.idCurso = $stateParams.idCurso;
    ctrl.idCursoCiclo = $stateParams.idCursoCiclo;
    ctrl.idSemestre = $stateParams.idSemestre;
    ctrl.obtenerAsistentesHorario(ctrl.idHorario);
    ctrl.obtenerAsistentesNoHorario(ctrl.idHorario);
    console.log(ctrl.idHorario);

  }

  ctrl.init();
}]);
