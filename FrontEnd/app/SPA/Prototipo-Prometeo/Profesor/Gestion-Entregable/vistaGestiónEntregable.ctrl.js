//-- Anderson
angular.module('vHackersModule').controller('entregableCtrl', ['$scope', '$state' , 'entregableService', '$uibModal',
function($scope, $state, entregableService, $uibModal){
  var ctrl = this;
  ctrl.tituloNuevo = "Nuevo Entregable";
  ctrl.tituloModificado= "Entregable";
  ctrl.tituloVer="Entregables";
  ctrl.filas=[1,2,3,4];
  ctrl.dias=['D','L','M','Mi','J','V','S'];
  ctrl.columnas=[1,2,3,4,5,6,7];
  ctrl.entregableM=[];
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
  };


  ctrl.regresarProyectos = function () {
    $state.go('curso');
  };

  ctrl.crearEntregable = function () {
    $state.go('evaluacion-herramienta');
  };

  ctrl.swalEntregableM = function (entregableM) {
    if (entregableM.id==0) {
      entregableM.id=0;
    }
    entregableM.tieneAlarma=1;
    console.log(angular.toJson(entregableM));//Envio el json para crear el entregable
    data={
      "id": "419d9b58-04d0-4732-a64d-450ebafd18f8",
      "nombre": entregableM.nombre,
      "fechaEntrega": 1555822800000,
      "tieneAlarma": 1,
      "ponderacion": 5
      }

      entregableService.registroentregableAlumno(angular.toJson(data)).then(function () {
        ctrl.exitoso="Entregable enviado con éxito";
      });

      entregableM.nombre="";
      entregableM.fechaEntrega="";
      entregableM.horaEntrega="";
      entregableM.fechaFin="";
      entregableM.horaFin="";
      entregableM.descripcion="";
      entregableM.ponderacion="";
      swal("¡Bien hecho!", "El entregable se modificó exitosamente" , "success");



  };

  ctrl.entregablesLista = [];
  ctrl.cargarEntregables = function () {
    entregableService.listarEntregables().then(function (entregablesListaData) {
      ctrl.entregablesLista = entregablesListaData;
    });
  };

  ctrl.init = function (){
    ctrl.cargarEntregables();
  }

  ctrl.init();
}]);
