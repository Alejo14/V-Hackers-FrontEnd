angular.module('vHackersModule').controller('asignarAsistentesCtrl', ['$scope', '$state', '$stateParams', '$uibModal', 'asignarHorarioService', 'NgTableParams',
function($scope, $state, $stateParams, $uibModal, asignarHorarioService, NgTableParams){
  var ctrl = this;

  ctrl.idHorario = "";
  ctrl.horario = "";
  ctrl.nombreCurso = "";
  ctrl.asistentesHorario = [];
  ctrl.asistentesNoHorario = [];
  ctrl.asistentesHorarioTabla;
  ctrl.asistentesNoHorarioTabla;


  ctrl.actualizarAsistentes = function(){
    console.log("hola");
      if (ctrl.grupo.nombre==""){
        swal("¡Opss!", "Ingrese un nombre para el grupo por favor" , "error");
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
              text: "Sí",
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

    asignarHorarioService.obtenerAsistentesHorario(ctrl.horarioId).then(function (asistentesHorarioData) {
      ctrl.asistentesHorario = asistentesHorarioData;
      for(let i = 0; i < ctrl.asistentesHorario.length; i++){
        ctrl.asistentesHorario[i].marcado = false;
      }
      ctrl.asistentesTabla = new NgTableParams({}, { dataset: ctrl.asistentesHorario });
    });
  };

  ctrl.obtenerAsistentesNoHorario = function(){
    asignarHorarioService.obtenerAsistenteNoHorario(ctrl.horarioId).then(function (asistentesNoHorarioData) {
      ctrl.asistentesNoHorario = asistentesNoHorarioData;
      for(let i = 0; i < ctrl.asistentesNoHorario.length; i++){
        ctrl.asistentesNoHorario[i].marcado = false;
      }
      ctrl.asistentesNoHorarioTabla = new NgTableParams({}, { dataset: ctrl.asistentesNoHorario });
    });
  };

  ctrl.init = function () {
    ctrl.nombreCurso = $stateParams.nombre;
    ctrl.horario = $stateParams.horario;
    ctrl.idHorario = $stateParams.idHorario;

    //ctrl.obtenerAsistentesHorario(ctrl.idHorario);
    //ctrl.obtenerAsistentesNoHorario(ctrl.idHorario);

  }

  ctrl.init();
}]);
