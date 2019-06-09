//-- Anderson
angular.module('vHackersModule').controller('entregableCtrl', ['$scope', '$state', '$stateParams' , 'entregableService', '$uibModal', 'NgTableParams',
function($scope, $state,$stateParams, entregableService, $uibModal, NgTableParams){
  var ctrl = this;
  ctrl.tituloNuevo = "Nuevo Entregable";
  ctrl.tituloModificado= "Entregable";
  ctrl.tituloVer="Entregables";
  ctrl.titulo="";
  ctrl.botonGrabar="";
  ctrl.entregableM=[];
  ctrl.entregableG={ };
  ctrl.mensajeFecha = "Complete las fechas correctamente.";
  ctrl.entregablesLista = [];
  $scope.fechaActual = new Date();

  ctrl.id=0;

  ctrl.fechasCargadas = false;
  $scope.events = [];
  $scope.dt = new Date();
  function getDayClass(data) {
    var date = data.date, mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);
      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  };

  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };

  ctrl.marcarFechaInicio = function(fecha) {
    ctrl.fechasCargadas = false;
    $scope.options.minDate = new Date();
    $scope.events.forEach(function(evento) {
      if (evento.status === 'start') {
        var ind = $scope.events.findIndex(i => i.date === evento.date);
        $scope.events.splice(ind,1);
      }
    });
    try {
      year = fecha.getFullYear();
      month = fecha.getMonth();
      day = fecha.getDate();
      fechaLong = (new Date(year, month, day)) * 1;
      for (var i = 0; i < $scope.events.length; i+=1) {
        if ($scope.events[i].status === 'full' && $scope.events[i].date <= fechaLong) {
          $scope.events.splice(i,1);
          i-=1;
        }
      };
      var dato = {
        date: fechaLong,
        status: "start"
      };
      $scope.events.push(dato);
      $scope.options.minDate = fecha;
      ctrl.fechasCargadas = true;
    } catch (e) {
      ctrl.mensajeFecha = "Completar con una fecha válida mayor a la fecha actual";
    }
  };

  ctrl.marcarFechaFin = function(fecha) {
    ctrl.fechasCargadas = false;
    $scope.options.maxDate = null;
    $scope.events.forEach(function(evento) {
      if (evento.status === 'finish') {
        var ind = $scope.events.findIndex(i => i.date === evento.date);
        $scope.events.splice(ind,1);
      }
    });
    try {
      year = fecha.getFullYear();
      month = fecha.getMonth();
      day = fecha.getDate();
      fechaLong = (new Date(year, month, day)) * 1;
      for (var i = 0; i < $scope.events.length; i+=1) {
        if ($scope.events[i].status === 'full' && $scope.events[i].date >= fechaLong) {
          $scope.events.splice(i,1);
          i-=1;
        }
      };
      var dato = {
        date: fechaLong,
        status: "finish"
      };
      $scope.events.push(dato);
      $scope.options.maxDate = fecha.setDate(fecha.getDate()-1);
      ctrl.entregableG.fechaEntrega = new Date(Number(ctrl.entregableG.fechaEntrega.setDate(fecha.getDate()+1)));
      ctrl.fechasCargadas = true;
    } catch (e) {
      ctrl.mensajeFecha = "Completar con una fecha válida mayor a la fecha de fecha de habilitación";
    }
  };

  ctrl.marcarFecha = function(fecha) {
    // ctrl.fechasCargadas = false;
    year = fecha.getFullYear();
    month = fecha.getMonth();
    day = fecha.getDate();
    fechaLong = (new Date(year, month, day)) * 1;
    var ind = $scope.events.findIndex(i => i.date === fechaLong);
    if (ind === -1) {
      var dato = {
        date: fechaLong,
        status: "full"
      };
      $scope.events.push(dato);
      // ctrl.fechasCargadas = true;
    } else if ($scope.events[ind].status !== 'start') {
      $scope.events.splice(ind,1);
      // ctrl.fechasCargadas = true;
    };
    // ctrl.fechasCargadas = true;
  };

  ctrl.gestionarEntregable = function (entregableG){
    if (!entregableG || !(entregableG.nombre) || !(entregableG.descripcion) || !(entregableG.fechaHabilitacion) || !(entregableG.ponderacion)){
      swal("¡Opss!", "Hay campos obligatorios sin llenar" , "error");
    }else{
      if (entregableG.fechaEntrega < entregableG.fechaHabilitacion){
        swal("¡Opss!", "La fecha de habilitación debe ser menor o igual a la fecha de entrega" , "error");
      }else{
        if ($stateParams.id == 0) {
          ctrl.crearEntregable(entregableG);
        }else {
          ctrl.modificarEntregable(entregableG);
        }
      }
    }
  }

  ctrl.crearEntregable = function (entregable) {
    yearH=entregable.fechaHabilitacion.getFullYear();
    monthH=entregable.fechaHabilitacion.getMonth();
    dateH=entregable.fechaHabilitacion.getDate();
    if (!entregable.horaHabilitacion) {hoursH=0} else {hoursH=entregable.horaHabilitacion.getHours();}
    if (!entregable.horaHabilitacion) {minutesH=0} else {minutesH=entregable.horaHabilitacion.getMinutes();}

    year=entregable.fechaEntrega.getFullYear();
    month=entregable.fechaEntrega.getMonth();
    date=entregable.fechaEntrega.getDate();
    if (!entregable.horaEntrega) {hours=0} else {hours=entregable.horaEntrega.getHours();}
    if (!entregable.horaEntrega) {minutes=0} else {minutes=entregable.horaEntrega.getMinutes();}
    if(entregable.proyectoId != 0){
      data={
        "id": null, //Defecto
        "nombre": entregable.nombre,
        "fechaEntrega": (new Date(year, month, date, hours, minutes,0))*1,//Se da formato a la fecha para que se registre con hora y fecha
        "fechaHabilitacion": (new Date(yearH, monthH, dateH, hoursH, minutesH,0))*1,
        "tieneAlarma": 1,
        "ponderacion": entregable.ponderacion,
        "descripcion": entregable.descripcion,
        "idCursoCiclo": entregable.cursoCicloId,
        "idProyecto": entregable.proyectoId,
        "notificaciones": $scope.events
        }
      console.log(angular.toJson(data));
      entregableService.registroentregableAlumnoXProyecto(angular.toJson(data)).then(function () {
          swal("¡Bien hecho!", "El entregable del proyecto se creó exitosamente" , "success").then(function () {
            $state.go('evaluacion-herramienta-listar', {proyectoId: ctrl.entregableG.proyectoId, proyectoNombre: ctrl.entregableG.proyectoNombre, cursoId: ctrl.entregableG.cursoCicloId});
          });
      });
    }else{
      data={
        "id": null, //Defecto
        "nombre": entregable.nombre,
        "fechaEntrega": (new Date(year, month, date, hours, minutes,0))*1,//Se da formato a la fecha para que se registre con hora y fecha
        "fechaHabilitacion": (new Date(yearH, monthH, dateH, hoursH, minutesH,0))*1,
        "tieneAlarma": 1,
        "ponderacion": entregable.ponderacion,
        "descripcion": entregable.descripcion,
        "idCursoCiclo": entregable.cursoCicloId,
        "idProyecto": null,
        "notificaciones": $scope.events
        }
      console.log(angular.toJson(data));
      entregableService.registroentregableAlumnoXCurso(angular.toJson(data)).then(function () {
          swal("¡Bien hecho!", "El entregable se creó exitosamente" , "success");
      });
    }

    entregable.id=0;
    entregable.tieneAlarma=1;
    entregable.nombre="";
    entregable.fechaHabilitacion="";
    entregable.horaInicio="";
    entregable.fechaEntrega="";
    entregable.horaFin="";
    entregable.descripcion="";
    entregable.ponderacion="";

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
        if (ctrl.entregableG.proyectoId != 0) {
          $state.go('evaluacion-herramienta-listar', {proyectoId: ctrl.entregableG.proyectoId, proyectoNombre: ctrl.entregableG.proyectoNombre, cursoId: ctrl.entregableG.cursoCicloId});
        } else {
          $state.go('curso', {cursoCicloId: ctrl.entregableG.cursoCicloId});
        }
      }
    });
  };

  ctrl.regresarEntregable = function () {
    $state.go('evaluacion-herramienta-gestionar' , {nombre: 0, id: 0, fechaHabilitacion: 0, fechaEntrega: 0,
      descripcion: 0, ponderacion: 0, cursoCicloId: 0, proyectoId: 0});//ctrl.curso.cursoCicloId
  };


  if ($stateParams.nombre){
    ctrl.entregableM.nombre=$stateParams.nombre;
    ctrl.entregableM.id=$stateParams.id;
    ctrl.entregableM.fechaHabilitacion=new Date(Number($stateParams.fechaHabilitacion));
    ctrl.entregableM.fechaEntrega=new Date(Number($stateParams.fechaEntrega));
    ctrl.entregableM.descripcion=$stateParams.descripcion;
  }

  ctrl.modificarEntregable = function (entregableM) {//Se debe colocar un boton y no hacer clik en el nombre y agregar los demas valores
    year=entregableM.fechaEntrega.getFullYear();
    month=entregableM.fechaEntrega.getMonth();
    date=entregableM.fechaEntrega.getDate();
    if (!entregableM.horaHabilitacion) {hoursH=0} else {hoursH=entregableM.horaHabilitacion.getHours();}
    if (!entregableM.horaHabilitacion) {minutesH=0} else {minutesH=entregableM.horaHabilitacion.getMinutes();}

    yearH=entregableM.fechaHabilitacion.getFullYear();
    monthH=entregableM.fechaHabilitacion.getMonth();
    dateH=entregableM.fechaHabilitacion.getDate();
    if (!entregableM.horaEntrega) {hours=0} else {hours=entregableM.horaEntrega.getHours();}
    if (!entregableM.horaEntrega) {minutes=0} else {minutes=entregableM.horaEntrega.getMinutes();}
    data={
      "id": entregableM.id, //Defecto
      "nombre": entregableM.nombre,
      "fechaEntrega": (new Date(year, month, date, hours, minutes,0))*1,//Se da formato a la fecha para que se registre con hora y fecha
      "fechaHabilitacion": (new Date(yearH, monthH, dateH, hoursH, minutesH,0))*1,
      "tieneAlarma": 1,
      "ponderacion": entregableM.ponderacion,
      "descripcion": entregableM.descripcion,
      "notificaciones": $scope.events
      }
    console.log(angular.toJson($scope.events));
    console.log(angular.toJson(data));
    entregableService.modificarentregableAlumno(angular.toJson(data)).then(function () {
      swal("¡Bien hecho!", "El entregable se modificó exitosamente" , "success").then(function () {
        if (ctrl.entregableG.proyectoId != 0) {
            $state.go('evaluacion-herramienta-listar', {proyectoId: ctrl.entregableG.proyectoId, proyectoNombre: ctrl.entregableG.proyectoNombre, cursoId: ctrl.entregableG.cursoCicloId});
        }
      });
    });
    entregableM.id=0;
    entregableM.tieneAlarma=1;
    entregableM.nombre="";
    entregableM.fechaHabilitacion="";
    entregableM.horaInicio="";
    entregableM.fechaEntrega="";
    entregableM.horaFin="";
    entregableM.descripcion="";
    entregableM.ponderacion="";
    entregableM.puntajeMaximo="";
    ctrl.entregableCreado = true;
};

  ctrl.elminarEntregable = function (entregableM) {//Se debe colocar un boton y no hacer clik en el nombre y agregar los demas valores
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

  // ctrl.entregablesLista = [];
  // ctrl.cargarEntregables = function () {
  //   entregableService.listarEntregables().then(function (entregablesListaData) {
  //     ctrl.entregablesLista = entregablesListaData;
  //   });
  // };

  ctrl.verReutilizarHerramienta = function() {
    if (!ctrl.entregableM.id) {
      ctrl.entregableM.id = '074b668b-6a29-4331-bc2d-797795784f3b';
    }
    $state.go('reutilizar-herramienta', {id: ctrl.entregableM.id});
  }

  ctrl.herramientasEvaluacion = [];
  ctrl.cargarHerramientas = function (){
    entregableService.listarHerramientas().then(function (herramientasLista){
      ctrl.herramientasEvaluacion = herramientasLista;
      ctrl.herramientasTabla = new NgTableParams({}, { dataset: ctrl.herramientasEvaluacion });
    });
  };

  ctrl.crearHerramienta = function(){

      if (!ctrl.entregableM.id) {
        ctrl.entregableM.id = '074b668b-6a29-4331-bc2d-797795784f3b';
      }
      $state.go('nueva-herramienta', {id: ctrl.entregableM.id});
  }

  ctrl.obtenerInfoArchivo = function (archivo,parametros) {
    console.log(archivo.nombre)
  }

  ctrl.init = function (){
    ctrl.fechasIniciadas = false;
    // ctrl.cargarEntregables();
    if ($stateParams.id == 0){ //Creación de Entregable
      ctrl.titulo = "Nuevo entregable";
      fecha = new Date();
      year = fecha.getFullYear();
      month = fecha.getMonth();
      day = fecha.getDate();
      ctrl.entregableG.fechaHabilitacion = (new Date(year, month, day));
      ctrl.entregableCreado = false;
      ctrl.modificar = false;
      ctrl.fechasIniciadas = true;
    } else {                  //Modificación de Entregable
      ctrl.titulo = "Modificar entregable";
      //ctrl.botonGrabar="Modificar";
      ctrl.entregableG.nombre=$stateParams.nombre;
      ctrl.entregableG.id=$stateParams.id;
      ctrl.entregableG.fechaHabilitacion=new Date(Number($stateParams.fechaHabilitacion));
      ctrl.entregableG.fechaEntrega=new Date(Number($stateParams.fechaEntrega));
      ctrl.entregableG.descripcion=$stateParams.descripcion;
      ctrl.entregableG.ponderacion=Number($stateParams.ponderacion);
      ctrl.entregableCreado = true;
      ctrl.modificar = true;
    }
    if($stateParams.proyectoId != 0) { //Entregable pertence a un proyecto
      ctrl.titulo = ctrl.titulo + " de un proyecto"
      ctrl.entregableG.proyectoId=$stateParams.proyectoId;
      ctrl.entregableG.proyectoNombre = $stateParams.proyectoNombre;
      if ($stateParams.id != 0){
        entregableService.listarEntregablesXProyecto($stateParams.proyectoId).then(function (entregablesListaData) {
          ctrl.entregablesLista = entregablesListaData;
          var entregableEncontrado = ctrl.entregablesLista.find(i => i.id === $stateParams.id);
          $scope.events = entregableEncontrado.notificaciones;
          ctrl.entregableG.notificaciones = entregableEncontrado.notificaciones;
          // console.log(ctrl.entregableG.notificaciones);
          ctrl.fechasIniciadas = true;
        });
      }
    } else {                            //Entregable pertence a un cursoCiclo
      ctrl.entregableG.proyectoId=0;
      ctrl.entregableG.proyectoNombre = 0;
      if ($stateParams.id != 0){
        entregableService.listarEntregables($stateParams.cursoCicloId).then(function (entregablesListaData) {
          ctrl.entregablesLista = entregablesListaData;
          var entregableEncontrado = ctrl.entregablesLista.find(i => i.id === $stateParams.id);
          $scope.events = entregableEncontrado.notificaciones;
          ctrl.entregableG.notificaciones = entregableEncontrado.notificaciones;
          // console.log(ctrl.entregableG.notificaciones);
          ctrl.fechasIniciadas = true;
        });
      }
    }
    ctrl.entregableG.cursoCicloId=$stateParams.cursoCicloId;
  }
  ctrl.init();
}]);
