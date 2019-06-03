angular.module('vHackersModule').controller('modalAgregarHorarioCtrl', modalAgregarHorarioCtrl);

modalAgregarHorarioCtrl.$inject = ['$scope', '$uibModalInstance', 'asignarHorarioService','modo','idCursoCiclo','idCurso','idCiclo'];

function modalAgregarHorarioCtrl ($scope, $uibModalInstance, asignarHorarioService,modo,idCursoCiclo,idCurso,idCiclo){

  var ctrl = this;
  ctrl.modo = modo;
  ctrl.idCursoCiclo = idCursoCiclo;
  ctrl.idCurso = idCurso;
  ctrl.idCiclo = idCiclo;
  ctrl.horarioNuevo = {
    "id": "",
    "cursoCicloId": "",
    "codigo": "",
    "fechaCreacion": "",
    "cantidadAlumnos": "",
    "profesorId": "",
    "asistenteId": ""
  };//asegurarse de guardar los datos del profesor y de los asistentes de docencia para agregar data en tabla de rolusuarioXcurso y rolusuarioXhorario
  ctrl.profesoresLista = [];
  ctrl.asistentesLista = [];

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

  ctrl.listarUsuariosXRol = function (rol) {
    asignarHorarioService.listarUsuariosXRol(rol).then(function (usuariosListaData) {
      if(rol=="Profesor"){
        ctrl.profesoresLista = usuariosListaData;
      } else {
        ctrl.asistentesLista = usuariosListaData;
      }
    });
  };


  ctrl.guardarHorario = function () {
    swal({
      title: "¿Está seguro de que desea crear este horario?",
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
    }).then(function (horarioNuevoConfirmado) {
      if (horarioNuevoConfirmado !== "cancelar") {
        //armar horarioNuevo para devolver a pantalla anterior
        if( ctrl.horarioNuevo.profesorId!=='' && ctrl.horarioNuevo.asistenteId!=='' && ctrl.horarioNuevo.codigo !== '' && ctrl.horarioNuevo.cantidadAlumnos !== ''){
          if(ctrl.modo == "c"){
            var horario = {
              "id": uuid(),
              "cursoCicloId": ctrl.horarioNuevo.cursoCicloId,
              "codigo": ctrl.horarioNuevo.codigo,
              "fechaCreacion": (new Date())*1,
              "cantidadAlumnos": ctrl.horarioNuevo.cantidadAlumnos
            }
            //guardar horario
            asignarHorarioService.crearHorario(angular.toJson(horario)).then(function () {
                swal("¡Bien hecho!", "El curso se creó exitosamente" , "success");
            });
            //guardar relación de horario y rolusuario
            var profesorXHorario = {
              "rolUsuarioId": ctrl.horarioNuevo.profesorId,
              "horarioId": horario.id
            }
            var asistenteXHorario = {
              "rolUsuarioId": ctrl.horarioNuevo.asistenteId,
              "horarioId": horario.id
            }
            asignarHorarioService.asignarRolUsuario(profesorXHorario).then(function () {
              console.log("Se asignó al horario");
              console.log(profesorXHorario);
            });
            asignarHorarioService.asignarRolUsuario(asistenteXHorario).then(function () {
            });

            //guardar relacion de cursociclo y rolusuario
            var profesorXCurso = {
              "rolUsuarioId": ctrl.horarioNuevo.profesorId,
              "cursoCicloId": ctrl.horarioNuevo.cursoCicloId
            }
            var asistenteXCurso = {
              "rolUsuarioId": ctrl.horarioNuevo.asistenteId,
              "cursoCicloId": ctrl.horarioNuevo.cursoCicloId
            }
            console.log(profesorXCurso);
            console.log(asistenteXCurso);

            //se debe usar el service de curso
            asignarHorarioService.asignarRolUsuarioXCursoCiclo(angular.toJson(profesorXCurso)).then(function () {
                console.log("Se asignó profesor");
            });
            asignarHorarioService.asignarRolUsuarioXCursoCiclo(angular.toJson(asistenteXCurso)).then(function () {
            });
          } else {
            var horario = {
              "id": ctrl.horarioNuevo.id,
              "cursoCicloId": ctrl.horarioNuevo.cursoCicloId,
              "codigo": ctrl.horarioNuevo.codigo,
              "fechaCreacion": ctrl.horarioNuevo.fechaCreacion,
              "cantidadAlumnos": ctrl.horarioNuevo.cantidadAlumnos
            }
            //guardar horario
            asignarHorarioService.modificarHorario(horario).then(function () {
                swal("¡Bien hecho!", "El curso se creó exitosamente" , "success");
            });
            //guardar relación de horario y rolusuario
            var profesorXHorario = {
              "rolUsuarioId": ctrl.horarioNuevo.profesorId,
              "horarioId": horario.id
            }
            var asistenteXHorario = {
              "rolUsuarioId": ctrl.horarioNuevo.asistenteId,
              "horarioId": horario.id
            }
            asignarHorarioService.modificarRolUsuario(angular.toJson(profesorXHorario)).then(function () {
                console.log("Se modificó el profesor hoorario");
            });
            asignarHorarioService.modificarRolUsuario(angular.toJson(asistenteXHorario)).then(function () {
            });

            //guardar relacion de cursociclo y rolusuario
            var profesorXCurso = {
              "rolUsuarioId": ctrl.horarioNuevo.profesorId,
              "cursoCicloId": ctrl.horarioNuevo.cursoCicloId
            }
            var asistenteXCurso = {
              "rolUsuarioId": ctrl.horarioNuevo.asistenteId,
              "cursoCicloId": ctrl.horarioNuevo.cursoCicloId
            }
            //se debe usar el service de curso
            asignarHorarioService.modificarRolUsuarioXCursoCiclo(angular.toJson(profesorXCurso)).then(function () {
            });
            asignarHorarioService.modificarRolUsuarioXCursoCiclo(angular.toJson(asistenteXCurso)).then(function () {
            });
          }
        }
        else {
          swal("Error", "Por favor llenar todos los campos" , "error");
        }
        $uibModalInstance.close(ctrl.horarioNuevo);
      }
    });
  };
  ctrl.init = function(){
    ctrl.listarUsuariosXRol("Profesor");
    ctrl.listarUsuariosXRol("Asistente de Docencia");
    console.log(ctrl.modo);
    if(ctrl.modo !== "c"){
      ctrl.horarioNuevo.id = modo.id;
      ctrl.horarioNuevo.cursoCicloId = modo.cursoCicloId;
      ctrl.horarioNuevo.codigo = modo.codigo;
      ctrl.horarioNuevo.fechaCreacion = modo.fechaCreacion;
      ctrl.horarioNuevo.cantidadAlumnos = modo.cantidadAlumnos;
      ctrl.horarioNuevo.profesorId = modo.profesorId;
      console.log(modo.profesorId);
      ctrl.horarioNuevo.asistenteId = modo.asistenteId;
    }
    else{
      ctrl.horarioNuevo.cursoCicloId = ctrl.idCursoCiclo;
      //console.log("modo creacion:"+ctrl.idCursoCiclo);
    }
  };
  ctrl.cerrar = function () {
    $uibModalInstance.close(0);
  };
  ctrl.init();
}
