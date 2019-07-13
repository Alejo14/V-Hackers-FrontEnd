angular.module('vHackersModule').controller('listarEntrgxProyAlumnoCtrl', ['$scope', '$state', '$stateParams' , 'entregableAlumnoService', '$uibModal', 'NgTableParams', '$cookies',
function($scope, $state,$stateParams, entregableAlumnoService, $uibModal, NgTableParams, $cookies){
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
  ctrl.opcionesReporteEntregables = {};
  ctrl.nombresEntregablesReporte = [];
  ctrl.notasEntregablesReporte = [];

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

      entregableAlumnoService.registroentregableAlumnoXProyecto(angular.toJson(data)).then(function () {
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

      entregableAlumnoService.registroentregableAlumnoXCurso(angular.toJson(data)).then(function () {
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


  ctrl.regresarCurso = function () {
        $state.go('alumnoCursos', {cursoCicloId:$stateParams.cursoCicloId,nombreCurso:$stateParams.nombreCurso,
          codigoCurso:$stateParams.codigoCurso,horario:$stateParams.horario , rolusuarioId:$stateParams.rolusuarioId});
  };


  ctrl.regresarEntregables = function () {
    swal({
      title: "¿Estás seguro de que quieres volver?",
      text: "Los cambios no se guardarán",
      icon: "warning",
      buttons: {
        Cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, volver",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (usuarioNuevoConfirmado) {
      if (usuarioNuevoConfirmado == "Confirm") {
        $state.go('evaluacion-herramienta-listar');
        //herramientaEvaluacionServicio.enviarCalificacion(ctrl.enviarCalificacion);
      }
    });
  };

  ctrl.crearEntregable = function () {
    //entregable de un proyecto
    $state.go('evaluacion-herramienta-gestionar' , {nombre: 0, id: 0 ,fechaHabilitacion: 0,
    fechaEntrega: 0, descripcion: 0, ponderacion: 0,
    cursoCicloId: 0, proyectoId: ctrl.proyectoId, proyectoNombre: ctrl.proyectoNombre});//ctrl.curso.cursoCicloId
  };

  ctrl.irModificarEntregable = function (entregable) {
    $state.go('evaluacion-herramienta-gestionar' , {nombre: entregable.nombre, id: entregable.id ,fechaHabilitacion: entregable.fechaHabilitacion,
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
  entregableAlumnoService.modificarentregableAlumno(angular.toJson(data)).then(function () {
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
      title: "¿Estás seguro que quieres eliminar el entregable?",
      text: "Los cambios no se guardarán",
      icon: "warning",
      buttons: {
        Cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, eliminar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (usuarioNuevoConfirmado) {
      if (usuarioNuevoConfirmado !== "Confirm") {
        data={
          "id": entregableM.id, //Defecto
          "nombre": entregableM.nombre,
          "fechaEntrega": (new Date(Date.now()))*1,//Se da formato a la fecha para que se registre con hora y fecha
          "tieneAlarma": 1,
          "ponderacion": 1
          }
          console.log(angular.toJson(data));
        entregableAlumnoService.eliminarentregableAlumno(angular.toJson(data)).then(function () {
            swal("¡Bien hecho!", "El entregable se eliminó exitosamente" , "success");
        });
        ctrl.entregablesLista.splice(ctrl.entregablesLista.indexOf(entregableM.id));
      }
    });

  };

  ctrl.entregablesLista = [];
  ctrl.cargarEntregables = function (proyectoId) {
    entregableAlumnoService.listarEntregablesXProyecto(proyectoId).then(function (entregablesListaData) {
      ctrl.entregablesLista = entregablesListaData;
      angular.forEach(ctrl.entregablesLista, function(entrgbAccordion){
        entrgbAccordion.AccordionOpen=False;
      });
    });
  };

  ctrl.herramientasEvaluacion = [];
  ctrl.cargarHerramientas = function (){
    entregableAlumnoService.listarHerramientas().then(function (herramientasLista){
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


  ctrl.verArchivos = function (entregable) {
    $state.go('detalle-entregable' , {nombre: entregable.nombre, id: entregable.id ,fechaEntrega: entregable.fechaEntrega,
    fechaHabilitacion: entregable.fechaHabilitacion, descripcion: entregable.descripcion, ponderacion: entregable.ponderacion, cursoCicloId: $stateParams.cursoCicloId, proyectoId: 0,
    nombreCurso: $stateParams.nombreCurso,codigoCurso:$stateParams.codigoCurso ,horario: $stateParams.horario,idRolUsuario: $stateParams.rolusuarioId, estadoEntregable: "D"}); //Temporal, deberia usar un servicio para traerme esa info

  };

//Herramienta de Evaluacion//
  ctrl.verHerramientas = function (entregable) {
    //$state.go('detalle-herramientas' , {id: entregable.id}); //Temporal, deberia usar un servicio para traerme esa info
    data={
      "idEntregable":entregable.id,
      "idRolUsuario":$stateParams.rolusuarioId
    }
    // console.log("EntregableId y RolUsuarioIdUsuario");
    // console.log(data);
    entregableAlumnoService.mostrarAvanceEntregables(data).then(function (respuesta) {
        ctrl.idAvanceEntregable=respuesta;
        //console.log(ctrl.idAvanceEntregable);
        $state.go('visualizacion' , {avanceEntregableId: ctrl.idAvanceEntregable.id });
    });

  };

  ctrl.cargarReporteNotasAvancesProyecto = function () {
    var idsUsuario = {
      "idUsuario": $cookies.get('usuarioID'),
      "idRol": $cookies.get('rolActivoId'),
      "idProyecto": ctrl.proyectoId
    };

    entregableAlumnoService.cargarReporteNotasAvancesProyecto(idsUsuario).then(function (respuesta) {
      ctrl.nombresEntregablesReporte = [];
      ctrl.notasEntregablesReporte = [];
      var numEntregables = respuesta.length;
      for (var i = 0; i < numEntregables; i++) {
        ctrl.nombresEntregablesReporte.push(respuesta[i].nombreEntregable);
        ctrl.notasEntregablesReporte.push(respuesta[i].notaEntregable);
      }

      ctrl.opcionesReporteEntregables = {
        title: {
          text: 'Notas de entregables calificados del curso'
        },

        xAxis: {
          categories: ctrl.nombresEntregablesReporte
        },

        lang: {
          noData: 'No hay notas disponibles en los entregables',
          viewFullscreen: 'Ver en pantalla completa',
          printChart: 'Imprimir',
          downloadPNG: 'Descargar PNG',
          downloadCSV: 'Descargar CSV',
          downloadJPEG: 'Descargar JPEG',
          downloadPDF: 'Descargar PDF',
          downloadSVG: 'Descargar SVG'
        },

        yAxis: {
          allowDecimals: true,
          title: {
              text: 'Nota'
          }
        },

        series: [{
          name: 'Notas',
          data: ctrl.notasEntregablesReporte
        }]
      };
    });
  }

  ctrl.init = function (){

    ctrl.idAvanceEntregable="";


    ctrl.tituloVer = $stateParams.proyectoNombre;
    ctrl.proyectoNombre = $stateParams.proyectoNombre;
    ctrl.proyectoId = $stateParams.proyectoId;
    ctrl.rolusuarioId=$stateParams.rolusuarioId;
    ctrl.cargarEntregables(ctrl.proyectoId);
    ctrl.cargarReporteNotasAvancesProyecto();

    }


  ctrl.init();
}]);
