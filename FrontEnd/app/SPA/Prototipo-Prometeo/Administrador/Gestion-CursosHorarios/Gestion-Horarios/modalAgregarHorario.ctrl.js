angular.module('vHackersModule').controller('modalAgregarHorarioCtrl', modalAgregarHorarioCtrl);

modalAgregarHorarioCtrl.$inject = ['$scope', '$uibModalInstance', 'asignarHorarioService','modo'];

function modalAgregarHorarioCtrl ($scope, $uibModalInstance, asignarHorarioService,modo){

  var ctrl = this;
  ctrl.modo = modo;
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

  ctrl.obtenerProfesores = function () {

  };

  ctrl.obtenerAsistentes = function () {

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
        //guardar horario
        //guardar relación de horario y rolusuario
        //guardar relacion de cursociclo y rolusuario
        //guardar relacion de curso y horario
        $uibModalInstance.close(ctrl.horarioNuevo);
      }
    });
  };
  ctrl.init = function(){
    ctrl.obtenerProfesores();
    ctrl.obtenerAsistentes();
    console.log(ctrl.modo);
    if(ctrl.modo !== "c"){
      ctrl.horarioNuevo.id = modo.id;
      ctrl.horarioNuevo.cursoCicloId = modo.cursoCicloId;
      ctrl.horarioNuevo.codigo = modo.codigo;
      ctrl.horarioNuevo.fechaCreacion = modo.fechaCreacion;
      ctrl.horarioNuevo.cantidadAlumnos = modo.cantidadAlumnos;
    }
  };
  ctrl.cerrar = function () {
    $uibModalInstance.close(0);
  };
  ctrl.init();
}
