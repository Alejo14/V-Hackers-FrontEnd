angular.module('vHackersModule').controller('listarEntregablesXProyectoCtrl', ['$scope', '$state', '$stateParams' , 'entregableService', '$uibModal', 'NgTableParams',
function($scope, $state,$stateParams, entregableService, $uibModal, NgTableParams){
  var ctrl = this;
  ctrl.tituloNuevo = "Nuevo Entregable";
  ctrl.tituloModificado= "Entregable";
  ctrl.tituloVer="Entregables";
  ctrl.titulo="";
  ctrl.botonGrabar="";
  ctrl.filas=[1,2,3,4];
  ctrl.dias=['L','M','Mi','J','V','S'];
  ctrl.columnas=[1,2,3,4,5,6];
  ctrl.entregableM=[];
  ctrl.entregableG=[];
  $scope.fechaActual=new Date();
  ctrl.id=0;
  ctrl.proyectoId="";

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

  ctrl.gestionarEntregable = function (entregableG){
    if (!entregableG || !(entregableG.nombre) || !(entregableG.descripcion) || !(entregableG.fechaHabilitacion) || !(entregableG.ponderacion)){
      swal("¡Opss!", "Hay campos obligatorios sin llenar" , "error");
    }else{
      if ($stateParams.id==0) {
        ctrl.crearEntregable(entregableG);
      }else {
        ctrl.modificarEntregable(entregableG);
      }
    }
  }

  ctrl.crearEntregable = function (entregable) {
    console.log(angular.toJson(entregable));//Envio el json para crear el entregable
    year=entregable.fechaHabilitacion.getFullYear();
    month=entregable.fechaHabilitacion.getMonth();
    date=entregable.fechaHabilitacion.getDate();
    if (!entregable.horaHabilitacion) {hoursH=0} else {hoursH=entregable.horaHabilitacion.getHours();}
    if (!entregable.horaHabilitacion) {minutesH=0} else {minutesH=entregable.horaHabilitacion.getMinutes();}

    yearH=entregable.fechaEntrega.getFullYear();
    monthH=entregable.fechaEntrega.getMonth();
    dateH=entregable.fechaEntrega.getDate();
    if (!entregable.horaEntrega) {hours=0} else {hours=entregable.horaEntrega.getHours();}
    if (!entregable.horaEntrega) {minutes=0} else {minutes=entregable.horaEntrega.getMinutes();}

    if(entregable.cursoCicloId==0){
      data={
        "id": uuid(), //Defecto
        "nombre": entregable.nombre,
        "fechaEntrega": (new Date(year, month, date, hours, minutes,0))*1,//Se da formato a la fecha para que se registre con hora y fecha
        "fechaHabilitacion": (new Date(yearH, monthH, dateH, hoursH, minutesH,0))*1,
        "tieneAlarma": 1,
        "ponderacion": 1,
        "descripcion": entregable.descripcion,
        "idCursoCiclo": uuid(),
        "idProyecto": entregable.proyectoId
        }

      entregableService.registroentregableAlumnoXProyecto(angular.toJson(data)).then(function () {
          swal("¡Bien hecho!", "El entregable se creó exitosamente" , "success");
      });
    }else{
      data={
        "id": uuid(), //Defecto
        "nombre": entregable.nombre,
        "fechaEntrega": (new Date(year, month, date, hours, minutes,0))*1,//Se da formato a la fecha para que se registre con hora y fecha
        "fechaHabilitacion": (new Date(yearH, monthH, dateH, hoursH, minutesH,0))*1,
        "tieneAlarma": 1,
        "ponderacion": 1,
        "descripcion": entregable.descripcion,
        "idCursoCiclo": entregable.cursoCicloId,
        "idProyecto": uuid()
        }

      entregableService.registroentregableAlumnoXCurso(angular.toJson(data)).then(function () {
          swal("¡Bien hecho!", "El entregable se creó exitosamente" , "success");
      });
    }

    entregable.id=0;
    entregable.tieneAlarma=1;
    entregable.nombre="";
    entregable.fechaHabilitacion="";
    entregable.horaHabilitacion="";
    entregable.fechaEntrega="";
    entregable.horaEntrega="";
    entregable.descripcion="";
    entregable.ponderacion="";

  };


  ctrl.regresarProyectos = function () {
        $state.go('profesorMisCursos');//curso, {cursoCicloId: 0, nombreCurso: 0, codigoCurso: 0, creditos: 0,cantidadAlumnos: 0, horario: 0 } );
  };

  ctrl.regresarEntregables = function () {
    swal({
      title: "¿Está seguro de que quieres volver?",
      text: "Los cambios no se guardarán",
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

  ctrl.crearEntregable = function () {
    //entregable de un proyecto
    $state.go('evaluacion-herramienta-gestionar' , {cursoCicloId: 0, proyectoId: ctrl.proyectoId, proyectoNombre: ctrl.proyectoNombre});//ctrl.curso.cursoCicloId
  };

  ctrl.irModificarEntregable = function (entregable) {
    $state.go('evaluacion-herramienta-modificar' , {nombre: entregable.nombre, id: entregable.id ,fechaHabilitacion: entregable.fechaHabilitacion,
    fechaEntrega: entregable.fechaEntrega, descripcion: entregable.descripcion, ponderacion: entregable.ponderacion,
    cursoCicloId: 0, proyectoId: ctrl.proyectoId, proyectoNombre: ctrl.proyectoNombre});
  };


  if ($stateParams.nombre){
    ctrl.entregableM.nombre=$stateParams.nombre;
    ctrl.entregableM.id=$stateParams.id;
    ctrl.entregableM.fechaHabilitacion=new Date(Number($stateParams.fechaHabilitacion));
    ctrl.entregableM.fechaEntrega=new Date(Number($stateParams.fechaEntrega));
    ctrl.entregableM.descripcion=$stateParams.descripcion;
  }

  ctrl.modificarEntregable = function (entregableM) {//Se debe colocar un boton y no hacer clik en el nombre y agregar los demas valores
    console.log(angular.toJson(entregableM));//Envio el json para crear el entregable
    year=entregableM.fechaHabilitacion.getFullYear();
    month=entregableM.fechaHabilitacion.getMonth();
    date=entregableM.fechaHabilitacion.getDate();
    if (!entregableM.horaHabilitacion) {hoursH=0} else {hoursH=entregableM.horaHabilitacion.getHours();}
    if (!entregableM.horaHabilitacion) {minutesH=0} else {minutesH=entregableM.horaHabilitacion.getMinutes();}

    yearH=entregableM.fechaEntrega.getFullYear();
    monthH=entregableM.fechaEntrega.getMonth();
    dateH=entregableM.fechaEntrega.getDate();
    if (!entregableM.horaEntrega) {hours=0} else {hours=entregableM.horaEntrega.getHours();}
    if (!entregableM.horaEntrega) {minutes=0} else {minutes=entregableM.horaEntrega.getMinutes();}
    data={
      "id": entregableM.id, //Defecto
      "nombre": entregableM.nombre,
      "fechaEntrega": (new Date(year, month, date, hours, minutes,0))*1,//Se da formato a la fecha para que se registre con hora y fecha
      "fechaHabilitacion": (new Date(yearH, monthH, dateH, hoursH, minutesH,0))*1,
      "tieneAlarma": 1,
      "ponderacion": 1,
      "descripcion": entregableM.descripcion
      }
    console.log(angular.toJson(data));
  entregableService.modificarentregableAlumno(angular.toJson(data)).then(function () {
      swal("¡Bien hecho!", "El entregable se modificó exitosamente" , "success");
  });
  entregableM.id=0;
  entregableM.tieneAlarma=1;
  entregableM.nombre="";
  entregableM.fechaHabilitacion="";
  entregableM.horaHabilitacion="";
  entregableM.fechaEntrega="";
  entregableM.horaEntrega="";
  entregableM.descripcion="";
  entregableM.ponderacion="";
  entregableM.puntajeMaximo="";
};

  ctrl.elminarEntregable = function (entregableM) {//Se debe colocar un boton y no hacer clik en el nombre y agregar los demas valores
    console.log(angular.toJson(entregableM));//Envio el json para crear el entregable
    swal({
      title: "¿Está seguro que quiere eliminar el entregable?",
      text: "Los cambios no se guardarán",
      icon: "warning",
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, eliminar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (usuarioNuevoConfirmado) {
      if (usuarioNuevoConfirmado !== "cancelar") {
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
        });
        ctrl.entregablesLista.splice(ctrl.entregablesLista.indexOf(entregableM.id));
      }
    });

  };

  ctrl.entregablesLista = [];
  ctrl.cargarEntregables = function (proyectoId) {
    entregableService.listarEntregablesXProyecto(proyectoId).then(function (entregablesListaData) {
      ctrl.entregablesLista = entregablesListaData;
    });
  };

  ctrl.herramientasEvaluacion = [];
  ctrl.cargarHerramientas = function (){
    entregableService.listarHerramientas().then(function (herramientasLista){
      ctrl.herramientasEvaluacion = herramientasLista;
      ctrl.herramientasTabla = new NgTableParams({}, { dataset: ctrl.herramientasEvaluacion });
    });
  };

  ctrl.crearHerramienta = function(){

      if (!ctrl.entregableM.id) {
        ctrl.entregableM.id = '859e054f-ae56-4e68-9a40-cfee27cf8b2a';
      }
      $state.go('nueva-herramienta', {id: ctrl.entregableM.id});
  }

  ctrl.obtenerInfoArchivo = function (archivo,parametros) {
    console.log(archivo.nombre)
  }

  ctrl.init = function (){
    ctrl.tituloVer = $stateParams.proyectoNombre;
    ctrl.proyectoNombre = $stateParams.proyectoNombre;
    ctrl.proyectoId = $stateParams.proyectoId;
    ctrl.cargarEntregables(ctrl.proyectoId);

    }


  ctrl.init();
}]);
