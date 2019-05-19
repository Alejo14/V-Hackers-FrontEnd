//-- Anderson
angular.module('vHackersModule').controller('entregableCtrl', ['$scope', '$state', '$stateParams' , 'entregableService', '$uibModal',
function($scope, $state,$stateParams, entregableService, $uibModal){
  var ctrl = this;
  ctrl.tituloNuevo = "Nuevo Entregable";
  ctrl.tituloModificado= "Entregable";
  ctrl.tituloVer="Entregables";
  ctrl.filas=[1,2,3,4];
  ctrl.dias=['L','M','Mi','J','V','S'];
  ctrl.columnas=[1,2,3,4,5,6];
  ctrl.entregableM=[];
  ctrl.id=0;
  // var d=new Date("5/11/2020");
  // $scope.entregable={nombEntrg: 'Entregable 1', fechaI:new Date("2/05/2019"), horaI:new Date("2/05/2019 20:08"),
  //                     descrEntrg: 'Entregable 1', fechaF:new Date("2/05/2019"),horaF:new Date("2/05/2019 20:08"),
  //                   puntaje: 200};





  // $scope.init = function () {
  //   entregableService.entregableAlumno().then(function (entregableData) {
  //     ctrl.entregableM = entregableData[0];
  //     ctrl.entregableM.fechaEntrega=new Date(entregableData[0].fechaEntrega);
  //     ctrl.entregableM.fechaFin=new Date(entregableData[0].fechaFin);
  //   });
  // };

  // ctrl.entregableM =function() { entregableService.entregableAlumno() };

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


  ctrl.crearEntregable = function (entregable) {
    console.log(angular.toJson(entregable));//Envio el json para crear el entregable
    if (!entregable || !(entregable.nombre) || !(entregable.descripcion) || !(entregable.fechaEntrega) || !(entregable.ponderacion)){
      swal("¡Opss!", "Debe ingresar los campos obligatorios" , "error");
    }else {
      year=entregable.fechaEntrega.getFullYear();
      month=entregable.fechaEntrega.getMonth();
      date=entregable.fechaEntrega.getDate();
      hours=entregable.horaEntrega.getHours();
      minutes=entregable.horaEntrega.getMinutes();
      data={
        "id": uuid(), //Defecto
        "nombre": entregable.nombre,
        "fechaEntrega": (new Date(year, month, date, hours, minutes,0))*1,//Se da formato a la fecha para que se registre con hora y fecha
        "tieneAlarma": 1,
        "ponderacion": 1
        }
      entregableService.registroentregableAlumno(angular.toJson(data)).then(function () {
          swal("¡Bien hecho!", "El entregable se creo exitosamente" , "success");
      });
      entregable.id=0;
      entregable.tieneAlarma=1;
      entregable.nombre="";
      entregable.fechaEntrega="";
      entregable.horaEntrega="";
      entregable.fechaFin="";
      entregable.horaFin="";
      entregable.descripcion="";
      entregable.ponderacion="";
    }
  };


  ctrl.regresarProyectos = function () {
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

  ctrl.regresarEntregables = function () {
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
        $state.go('evaluacion-herramienta-listar');
        //herramientaEvaluacionServicio.enviarCalificacion(ctrl.enviarCalificacion);
      }
    });
  };

  ctrl.regresarEntregable = function () {
    $state.go('evaluacion-herramienta');
  };

  ctrl.verEntregable = function (entregable) {
    $state.go('evaluacion-herramienta-modificar' , {nombre: entregable.nombre, id: entregable.id ,fechaEntrega: entregable.fechaEntrega});

  };


  if ($stateParams.nombre){
    ctrl.entregableM.nombre=$stateParams.nombre;
    ctrl.entregableM.id=$stateParams.id;
    ctrl.entregableM.fechaEntrega=new Date(Number($stateParams.fechaEntrega));

  }




  ctrl.modificarEntregable = function (entregableM) {//Se debe colocar un boton y no hacer clik en el nombre y agregar los demas valores
    console.log(angular.toJson(entregableM));//Envio el json para crear el entregable
    year=entregableM.fechaEntrega.getFullYear();
    month=entregableM.fechaEntrega.getMonth();
    date=entregableM.fechaEntrega.getDate();
    data={
      "id": entregableM.id, //Defecto
      "nombre": entregableM.nombre,
      "fechaEntrega": (new Date(year, month, date))*1,//Se da formato a la fecha para que se registre con hora y fecha
      "tieneAlarma": 1,
      "ponderacion": 1
      }
      console.log(angular.toJson(data));
    entregableService.modificarentregableAlumno(angular.toJson(data)).then(function () {
        swal("¡Bien hecho!", "El entregable se modifico exitosamente" , "success");
    });
    entregableM.id=0;
    entregableM.tieneAlarma=1;
    entregableM.nombre="";
    entregableM.fechaEntrega="";
    entregableM.horaEntrega="";
    entregableM.fechaFin="";
    entregableM.horaFin="";
    entregableM.descripcion="";
    entregableM.ponderacion="";
  };

  ctrl.elminarEntregable = function (entregableM) {//Se debe colocar un boton y no hacer clik en el nombre y agregar los demas valores
    console.log(angular.toJson(entregableM));//Envio el json para crear el entregable
    // year=entregableM.fechaEntrega.getFullYear();
    // month=entregableM.fechaEntrega.getMonth();
    // date=entregableM.fechaEntrega.getDate();
    data={
      "id": entregableM.id, //Defecto
      "nombre": entregableM.nombre,
      "fechaEntrega": (new Date(Date.now()))*1,//Se da formato a la fecha para que se registre con hora y fecha
      "tieneAlarma": 1,
      "ponderacion": 1
      }
      console.log(angular.toJson(data));
    entregableService.eliminarentregableAlumno(angular.toJson(data)).then(function () {
        swal("¡Bien hecho!", "El entregable se elimino exitosamente" , "success");
        $state.go('curso');
    });

  };

  ctrl.entregablesLista = [];
  ctrl.cargarEntregables = function () {
    entregableService.listarEntregables().then(function (entregablesListaData) {
      ctrl.entregablesLista = entregablesListaData;
    });
  };

  ctrl.obtenerInfoArchivo = function (archivo,parametros) {
    console.log(archivo.nombre)
  }

  ctrl.init = function (){
    ctrl.cargarEntregables();
  }

  ctrl.init();
}]);
