angular.module('vHackersModule').controller('modalAgregarHorarioCtrl', modalAgregarHorarioCtrl);

modalAgregarHorarioCtrl.$inject = ['$scope', '$uibModalInstance', 'asignarHorarioService','modo','idCursoCiclo','idCurso','idCiclo','idHorario'];

function modalAgregarHorarioCtrl ($scope, $uibModalInstance, asignarHorarioService,modo,idCursoCiclo,idCurso,idCiclo,idHorario){

  var ctrl = this;
  ctrl.modo = modo;
  ctrl.idCursoCiclo = idCursoCiclo;
  ctrl.idCurso = idCurso;
  ctrl.idCiclo = idCiclo;
  ctrl.listaHorarios = [];
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
      title: "¿Estás seguro de que deseas crear este horario?",
      text: "",
      icon: "warning",
      //buttons: ["Cancelar", "Sí, agregar"],
      buttons: {
        Cancel: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, agregar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (horarioNuevoConfirmado) {
      if (horarioNuevoConfirmado == "Confirm") {
        //armar horarioNuevo para devolver a pantalla anterior
        if( ctrl.horarioNuevo.profesorId!=='' && ctrl.horarioNuevo.codigo !== '' && ctrl.horarioNuevo.cantidadAlumnos !== ''){
          if(ctrl.modo == "c"){
            console.log("Modo crear");
            var horario = {
              "id": uuid(),
              "cursoCicloId": ctrl.horarioNuevo.cursoCicloId,
              "codigo": ctrl.horarioNuevo.codigo,
              "fechaCreacion": (new Date())*1,
              "cantidadAlumnos": ctrl.horarioNuevo.cantidadAlumnos
            }
            //guardar horario
            asignarHorarioService.crearHorario(horario).then(function () {
              var profesorXHorario = {
                "rolUsuarioId": ctrl.horarioNuevo.profesorId,
                "rolUsuarioIDAnt": ctrl.horarioNuevo.profesorId,
                "horarioId": horario.id
              }
              asignarHorarioService.asignarRolUsuario(profesorXHorario).then(function () {
                console.log("Se asignó profesor al horario");
                console.log(profesorXHorario);
              });

              //guardar relacion de cursociclo y rolusuario
              var profesorXCurso = {
                "rolUsuarioId": ctrl.horarioNuevo.profesorId,
                "rolUsuarioIDAnt": ctrl.horarioNuevo.profesorId,
                "cursoCicloId": ctrl.horarioNuevo.cursoCicloId
              }


              //se debe usar el service de curso
              asignarHorarioService.asignarRolUsuarioXCursoCiclo(angular.toJson(profesorXCurso)).then(function () {
                  console.log("Se asignó profesor");
                  console.log(profesorXCurso);
              });
            });
            //guardar relación de horario y rolusuario




            swal("¡Bien hecho!", "El horario se creó exitosamente" , "success");
          } else {
            console.log("Modo modificar");
            var horario = {
              "id": ctrl.horarioNuevo.id,
              "cursoCicloId": ctrl.horarioNuevo.cursoCicloId,
              "codigo": ctrl.horarioNuevo.codigo,
              "fechaCreacion": ctrl.horarioNuevo.fechaCreacion,
              "cantidadAlumnos": ctrl.horarioNuevo.cantidadAlumnos
            }
            //guardar horario
            asignarHorarioService.modificarHorario(horario).then(function () {
              var profesorXHorario = {
                "rolUsuarioId": ctrl.horarioNuevo.profesorId,
                "rolUsuarioIDAnt": modo.profesorId,
                "horarioId": horario.id
              }
              asignarHorarioService.modificarRolUsuario(angular.toJson(profesorXHorario)).then(function () {
                  console.log("Se modificó el profesor por horario");
                  console.log(profesorXHorario);
              });

              //guardar relacion de cursociclo y rolusuario
              var profesorXCurso = {
                "rolUsuarioId": ctrl.horarioNuevo.profesorId,
                "rolUsuarioIDAnt": modo.profesorId,
                "cursoCicloId": ctrl.horarioNuevo.cursoCicloId
              }
              //se debe usar el service de curso
              asignarHorarioService.modificarRolUsuarioXCursoCiclo(angular.toJson(profesorXCurso)).then(function () {
                console.log("Se modificó el profesor por cursociclo");
                console.log(profesorXCurso);
              });
            });
            //guardar relación de horario y rolusuario


            swal("¡Bien hecho!", "El horario se modificó exitosamente" , "success");

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
    console.log(ctrl.modo);
    if(ctrl.modo !== "c"){
      ctrl.horarioNuevo.id = modo.id;
      ctrl.horarioNuevo.cursoCicloId = modo.cursoCicloId;
      ctrl.horarioNuevo.codigo = modo.codigo;
      ctrl.horarioNuevo.fechaCreacion = modo.fechaCreacion;
      ctrl.horarioNuevo.cantidadAlumnos = modo.cantidadAlumnos;
      ctrl.horarioNuevo.profesorId = modo.profesorId;
      ctrl.horarioNuevo.asistenteId = modo.asistenteId;
      console.log("profesor traído:"+modo.profesorId);
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
