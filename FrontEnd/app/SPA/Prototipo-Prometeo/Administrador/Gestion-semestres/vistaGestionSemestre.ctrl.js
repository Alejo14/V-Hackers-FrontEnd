angular.module('vHackersModule').controller('administradorSemestreCtrl', ['$scope', '$state' , '$stateParams' ,'administradorSemestreService', '$uibModal',

function($scope, $state,$stateParams, administradorSemestreService, $uibModal){
  var ctrl = this;
  ctrl.semestre={
    anioCiclo : "",
    ciclo : "",
    tipoCiclo : "",
    nombreCiclo : "",
    fechaInicio : "",
    fechaFin : ""
  };


  arch=[];

  ctrl.obtenerInfoArchivo = function (archivo,parametros) {
    //console.log(parametros);
    var id=parametros.data;

    ctrl.archivoURL=arch.nombre;
    //console.log(arch);
    //ctrl.listaArchivos.push(arch);

    // //$state.go('cargar-archivos');
  }

  ctrl.crearSemestre = function(semestre){
    yearI = semestre.fechaInicio.getFullYear();
    monthI = semestre.fechaInicio.getMonth();
    dateI = semestre.fechaInicio.getDate();
    yearF = semestre.fechaFin.getFullYear();
    monthF = semestre.fechaFin.getMonth();
    dateF = semestre.fechaFin.getDate();
    data = {
      "id": null,
      "cicloAcademico": semestre.anioCiclo + semestre.ciclo + semestre.tipoCiclo,
      "nombreCiclo": semestre.nombreCiclo,
      "fechaInicio": (new Date(yearI, monthI, dateI))*1,//Se da formato a la fecha para que se registre
      "fechaFin": (new Date(yearF, monthF, dateF))*1,//Se da formato a la fecha para que se registre
    }
    if (((new Date(yearI, monthI, dateI))*1) < ((new Date(yearF, monthF, dateF))*1)) {
      administradorSemestreService.registroSemestre(angular.toJson(data)).then(function () {
        swal("¡Bien hecho!", "El semestre fue creado exitosamente" , "success").then(function () {
          $state.go('inicioAdmin');
        });
      });
    } else {
      swal("¡Error!", "Seleccione una fecha fin mayor a la fecha inicio", "error");
    }
  };

  ctrl.validarRegistroValido = function () {
    ctrl.registroValido = ctrl.semestre.anioCiclo !== "" && ctrl.semestre.ciclo !== "" && ctrl.semestre.tipoCiclo !== "" && ctrl.semestre.nombreCiclo !== "" &&  ctrl.semestre.fechaInicio !== "" && ctrl.semestre.fechaFin !== "";
  };


  ctrl.regresarAdministrador = function () {
    swal({
      title: "¿Estás seguro de que quieres volver?",
      icon: "warning",
      buttons: {
        Cancel: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, volver",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (respuesta) {
      if (respuesta == "Confirm") {
        $state.go('inicioAdmin');
      }
    });
  };

  ctrl.semestresLista = [ ];
  ctrl.cargarSemestres = function () {
    administradorSemestreService.listarSemestres().then(function (semestresListaData) {
      ctrl.semestresLista = semestresListaData;
      console.log(ctrl.semestresLista);
      for(let i = 0; i < ctrl.semestresLista.length; i++){
        fechCr = new Date(Number(ctrl.semestresLista[i].fechaCreacion));
        fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
        ctrl.semestresLista[i].fechaCreacionStr = fechCrStr;
      }
      for(let i = 0; i < ctrl.semestresLista.length; i++){
        fechCr = new Date(Number(ctrl.semestresLista[i].fechaInicio));
        fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
        ctrl.semestresLista[i].fechaInicioStr = fechCrStr;
      }
      for(let i = 0; i < ctrl.semestresLista.length; i++){
        fechCr = new Date(Number(ctrl.semestresLista[i].fechaFin));
        fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
        ctrl.semestresLista[i].fechaFinStr = fechCrStr;
      };
      ctrl.semestresTabla = new NgTableParams({}, { dataset: ctrl.semestresLista });
    });
  };

  ctrl.init = function (){
    ctrl.cargarSemestres();
  };

  ctrl.init();

}]);
