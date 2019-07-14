//-- Anderson
angular.module('vHackersModule').controller('entregableCtrl', ['$scope', '$state', '$stateParams' , 'entregableService', '$uibModal', 'NgTableParams', '$cookies',
function($scope, $state,$stateParams, entregableService, $uibModal, NgTableParams, $cookies){
  var ctrl = this;
  ctrl.horarioId = $stateParams.horarioId;

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

  ctrl.marcarFechaInicio = function(fecha) {
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
      ctrl.entregable.fechaEntrega = new Date(Number(ctrl.entregable.fechaEntrega.setDate(fecha.getDate()+1)));
      ctrl.fechasCargadas = true;
    } catch (e) {
      ctrl.mensajeFecha = "Completar con una fecha válida mayor a la fecha de fecha de habilitación";
    }
  };

  ctrl.marcarFecha = function(fecha) {
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
    } else if ($scope.events[ind].status !== 'start') {
      $scope.events.splice(ind,1);
    };
  };

  ctrl.gestionarEntregable = function (entregable){
    if (!entregable || !(entregable.nombre) || !(entregable.descripcion) || !(entregable.fechaHabilitacion) || !(entregable.ponderacion)){
      swal("¡Opss!", "Hay campos obligatorios sin llenar" , "error");
    }else{
      if (entregable.fechaEntrega < entregable.fechaHabilitacion){
        swal("¡Opss!", "La fecha de habilitación debe ser menor o igual a la fecha de entrega" , "error");
      }else{
        if ($stateParams.id == 0) {
          ctrl.crearEntregable(entregable);
        }else {
          ctrl.modificarEntregable(entregable);
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

    if(ctrl.metodoTrabajo != "individual") {
      metodo = 1;
    }else{
      metodo = 0;
    }

    if(entregable.proyectoId != 0){
      var data={
        "id": null, //Defecto
        "nombre": entregable.nombre,
        "fechaEntrega": (new Date(year, month, date, hours, minutes,0))*1,//Se da formato a la fecha para que se registre con hora y fecha
        "fechaHabilitacion": (new Date(yearH, monthH, dateH, hoursH, minutesH,0))*1,
        "tieneAlarma": 1,
        "ponderacion": entregable.ponderacion,
        "descripcion": entregable.descripcion,
        "idCursoCiclo": entregable.cursoCicloId,
        "idProyecto": entregable.proyectoId,
        "notificaciones": $scope.events,
        "metodoTrabajo": metodo
      };
      console.log(data);
      entregableService.registroentregableAlumnoXProyecto(data).then(function () {
          swal("¡Bien hecho!", "El entregable del proyecto se creó exitosamente" , "success");
          $state.go('evaluacion-herramienta-listar', {proyectoId: ctrl.entregable.proyectoId, cursoId: ctrl.entregable.cursoCicloId});
      });
    }else{
      var data={
        "id": null, //Defecto
        "nombre": entregable.nombre,
        "fechaEntrega": (new Date(year, month, date, hours, minutes,0))*1,//Se da formato a la fecha para que se registre con hora y fecha
        "fechaHabilitacion": (new Date(yearH, monthH, dateH, hoursH, minutesH,0))*1,
        "tieneAlarma": 1,
        "ponderacion": entregable.ponderacion,
        "descripcion": entregable.descripcion,
        "idCursoCiclo": entregable.cursoCicloId,
        "idProyecto": null,
        "notificaciones": $scope.events,
        "metodoTrabajo": metodo
      };
      entregableService.registroentregableAlumnoXCurso(data).then(function () {
          swal("¡Bien hecho!", "El entregable se creó exitosamente" , "success");
          $state.go('curso', {cursoCicloId: ctrl.entregable.cursoCicloId, horarioId: ctrl.horarioId});
      });
    }
  };

  ctrl.regresarEntregables = function () {
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
        if (ctrl.entregable.proyectoId != 0) {
          $state.go('evaluacion-herramienta-listar', {proyectoId: ctrl.entregable.proyectoId, cursoId: ctrl.entregable.cursoCicloId, horarioId: ctrl.horarioId});
        } else {
          $state.go('curso', {cursoCicloId: ctrl.entregable.cursoCicloId, horarioId: ctrl.horarioId});
        }
      }
    });
  };

  ctrl.modificarEntregable = function (entregable) {//Se debe colocar un boton y no hacer clik en el nombre y agregar los demas valores
    year=entregable.fechaEntrega.getFullYear();
    month=entregable.fechaEntrega.getMonth();
    date=entregable.fechaEntrega.getDate();
    if (!entregable.horaHabilitacion) {hoursH=0} else {hoursH=entregable.horaHabilitacion.getHours();}
    if (!entregable.horaHabilitacion) {minutesH=0} else {minutesH=entregable.horaHabilitacion.getMinutes();}

    yearH=entregable.fechaHabilitacion.getFullYear();
    monthH=entregable.fechaHabilitacion.getMonth();
    dateH=entregable.fechaHabilitacion.getDate();
    if (!entregable.horaEntrega) {hours=0} else {hours=entregable.horaEntrega.getHours();}
    if (!entregable.horaEntrega) {minutes=0} else {minutes=entregable.horaEntrega.getMinutes();}

    if(ctrl.metodoTrabajo != "individual") {
      metodo = 1;
    }else{
      metodo = 0;
    }

    if (ctrl.entregable.proyectoId == 0) {
        var proyecto = null;
    } else {
      var proyecto = ctrl.entregable.proyectoId;
    }
    var data={
      "id": entregable.id, //Defecto
      "nombre": entregable.nombre,
      "fechaEntrega": (new Date(year, month, date, hours, minutes,0))*1,//Se da formato a la fecha para que se registre con hora y fecha
      "fechaHabilitacion": (new Date(yearH, monthH, dateH, hoursH, minutesH,0))*1,
      "tieneAlarma": 1,
      "ponderacion": entregable.ponderacion,
      "descripcion": entregable.descripcion,
      "idCursoCiclo": ctrl.entregable.cursoCicloId,
      "idProyecto": proyecto,
      "notificaciones": $scope.events,
      "metodoTrabajo": metodo
    };
    entregableService.modificarentregableAlumno(data).then(function () {
      swal("¡Bien hecho!", "El entregable se modificó exitosamente" , "success");
      if (ctrl.entregable.proyectoId != 0) {
        $state.go('evaluacion-herramienta-listar', {proyectoId: ctrl.entregable.proyectoId, cursoId: ctrl.entregable.cursoCicloId});
      }else{
        $state.go('curso', {cursoCicloId: ctrl.entregable.cursoCicloId, horarioId: ctrl.horarioId});
      }
    });
  }

  ctrl.verReutilizarHerramienta = function() {
    if (!ctrl.entregable.id) {
      ctrl.entregable.id = '074b668b-6a29-4331-bc2d-797795784f3b';
    }
    $state.go('reutilizar-herramienta', {id: ctrl.entregable.id});
  }

  ctrl.eliminarHerramienta= function(herramienta,indice){
    console.log(angular.toJson(herramienta));//Envio el json para crear el entregable
    swal({
      title: "¿Estás seguro que quieres eliminar la herramienta?",
      text: "",
      icon: "warning",
      buttons: {
        Cancel: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, eliminar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (respuesta) {
      if (respuesta === "Confirm") {
        var data={
          "herramientaID":herramienta.id
        };
        entregableService.eliminarHerramienta(data).then(function () {
            swal("¡Bien hecho!", "La herramienta se elimino exitosamente" , "success");
        });
        ctrl.herramientasEvaluacion.splice(indice,1);
      }
    });
  }

  ctrl.cargarHerramientas = function (id){
    idEntregable =
    {
      "entregableID":id
    }
    entregableService.listarHerramientas(idEntregable).then(function (herramientasLista){
      ctrl.herramientasEvaluacion = herramientasLista;
      ctrl.herramientasTabla = new NgTableParams({}, { dataset: ctrl.herramientasEvaluacion });
    });
  };

  ctrl.crearHerramienta = function(){
    $state.go('nueva-herramienta', {id: $stateParams.id, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId, horarioId: ctrl.horarioId});
  }

  ctrl.editarCriterio = function(indice){
    switch (ctrl.herramientasEvaluacion[indice].tipo) {
      case 'Rubrica':
        $state.go('editar-rubrica', {id: ctrl.herramientasEvaluacion[indice].id, entregableId: $stateParams.id, nivelesCreados: 1, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId, estado: 'editar', horarioId: ctrl.horarioId})
        break;
      case 'Lista de Cotejo':

        break;
      case 'Escala':

        break;
      default:

    }
  }

  ctrl.inicializarVariables = function () {
    ctrl.id=0;
    ctrl.entregable={};
    ctrl.mensajeFecha = "Complete las fechas correctamente.";
    ctrl.mostrarMetodoTrabajo=0; //Se activa en caso sea un entregableCursoCiclo
    $scope.fechaActual = new Date();
    $scope.events = [];
    $scope.dt = new Date();
    $scope.options = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: false
    };
  }

  ctrl.inicializarEntregable = function () {
    var entregable = ctrl.entregableLista.find(i => i.id === $stateParams.id);
    ctrl.entregable.nombre=entregable.nombre;
    ctrl.entregable.id=entregable.id;
    ctrl.entregable.fechaHabilitacion=new Date(Number(entregable.fechaHabilitacion));
    ctrl.entregable.fechaEntrega=new Date(Number(entregable.fechaEntrega));
    ctrl.entregable.descripcion=entregable.descripcion;
    ctrl.entregable.ponderacion=Number(entregable.ponderacion);
    ctrl.cargarHerramientas($stateParams.id);
    $scope.events = entregable.notificaciones;
    ctrl.entregable.notificaciones = entregable.notificaciones;
    ctrl.marcarFechaInicio(ctrl.entregable.fechaHabilitacion);
    ctrl.marcarFechaFin(ctrl.entregable.fechaEntrega);
    ctrl.fechasIniciadas = true;
    ctrl.fechasCargadas = true;
    ctrl.rolId = $cookies.get('rolActivoId');
    ctrl.idUsuario = $cookies.get('usuarioID');
    entregableService.obtenerRol(ctrl.rolId).then(function (rol) {
      ctrl.usuarioRol = rol.descripcion;
    });
  }

  ctrl.init = function (){
    ctrl.inicializarVariables();
    if ($stateParams.id == 0){ //Creación de Entregable
      ctrl.titulo = "Nuevo entregable";
      fecha = new Date();
      year = fecha.getFullYear();
      month = fecha.getMonth();
      day = fecha.getDate();
      ctrl.entregable.fechaHabilitacion = (new Date(year, month, day));
      ctrl.entregableCreado = false;
      ctrl.modificar = false;
      ctrl.fechasIniciadas = true;
      ctrl.herramientasEvaluacion = [];
      if($stateParams.proyectoId != 0){
        ctrl.titulo = ctrl.titulo + " de un proyecto"
        ctrl.entregable.proyectoId=$stateParams.proyectoId;

        //// Aqui validar si el proyecto es grupal o individual

        entregableService.listarProyectos($stateParams.cursoCicloId).then(function (proyectosListaData) {
          ctrl.proyectosLista = proyectosListaData;
          console.log("listar proyectos");
          console.log(proyectosListaData);
          var proyectoEncontrado = ctrl.proyectosLista.find(i => i.id === $stateParams.proyectoId);
          ctrl.proyecto = proyectoEncontrado;
          console.log(ctrl.proyecto);

          if(ctrl.proyecto.metodoTrabajo == 0) {
            ctrl.metodoTrabajo = "individual";
          }else{
            ctrl.metodoTrabajo = "grupal";
          }
        });

      }else{
        ctrl.entregable.proyectoId=0;
        ctrl.mostrarMetodoTrabajo=1;
        ctrl.metodoTrabajo = "individual";
      }
    } else {                  //Modificación de Entregable
      ctrl.titulo = "Modificar entregable";
      ctrl.entregableCreado = true;
      ctrl.modificar = true;
      if($stateParams.proyectoId != 0){
        ctrl.titulo = ctrl.titulo + " de un proyecto"
        ctrl.entregable.proyectoId=$stateParams.proyectoId;
        entregableService.listarEntregablesXProyecto($stateParams.proyectoId).then(function (entregableLista) {
          ctrl.entregableLista = entregableLista;
          ctrl.inicializarEntregable();
        });

        entregableService.listarProyectos($stateParams.cursoCicloId).then(function (proyectosListaData) {
          ctrl.proyectosLista = proyectosListaData;

          var proyectoEncontrado = ctrl.proyectosLista.find(i => i.id === $stateParams.proyectoId);
          ctrl.proyecto = proyectoEncontrado;

          console.log("Proyecto:");
          console.log(ctrl.proyecto);

          if(ctrl.proyecto.metodoTrabajo == 0) {
            ctrl.metodoTrabajo = "individual";
          }else{
            ctrl.metodoTrabajo = "grupal";
          }
        });
      }else{
        ctrl.entregable.proyectoId=0;
        entregableService.listarEntregables($stateParams.cursoCicloId).then(function (entregableLista) {
          ctrl.entregableLista = entregableLista;
          ctrl.inicializarEntregable();
        });
      }

    }
    ctrl.entregable.cursoCicloId=$stateParams.cursoCicloId;
  }
  ctrl.init();
}]);
