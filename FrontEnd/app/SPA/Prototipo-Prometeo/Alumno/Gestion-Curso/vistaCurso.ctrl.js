angular.module('vHackersModule').controller('alumnoCursoCtrl', ['$scope', '$state' , '$stateParams' ,'alumnoCursoService', '$uibModal', 'NgTableParams', '$cookies',

function($scope, $state, $stateParams, alumnoCursoService, $uibModal, NgTableParams, $cookies){
  var ctrl = this;
  ctrl.curso = {};
  ctrl.proyectosLista = [];

  ctrl.fechasCargadas = false;
  ctrl.proyectosLista = [];
  $scope.events = [];
  $scope.dt = new Date();

  ctrl.cargarProyectos = function () {
    var idCursoCiclo = ctrl.curso.cursoCicloId;
    alumnoCursoService.listarProyectos(idCursoCiclo).then(function (proyectosListaData) {
      ctrl.proyectosLista = proyectosListaData;
      for(let i = 0; i < ctrl.proyectosLista.length; i++){
        fechCr = new Date(Number(ctrl.proyectosLista[i].fechaCreacion));
        fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
        ctrl.proyectosLista[i].fechaCreacionStr = fechCrStr;
      };
      for(let i = 0; i < ctrl.proyectosLista.length; i++){
        fechCr = new Date(Number(ctrl.proyectosLista[i].fechaFin));
        fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
        ctrl.proyectosLista[i].fechaFinStr = fechCrStr;
      };
      ctrl.proyectosLista.forEach(function(proyecto) {
        var ind = $scope.events.findIndex(i => i.date === proyecto.fechaFin);
        if (ind === -1 && (($scope.dt * 1) <= proyecto.fechaFin)) {
          var dato = {
            date: proyecto.fechaFin,
            status: "full"
          };
          $scope.events.push(dato);
        }
      });
      // ctrl.fechasCargadas = true;
    });
  };


  ctrl.entregablesLista = [];
  ctrl.cargarEntregables = function () {
    var idCursoCiclo = ctrl.curso.cursoCicloId;
    var alumnoEntregable = {
      "usuarioId": $cookies.get('usuarioID'),
      "rolId": $cookies.get('rolActivoId')
    };
    alumnoCursoService.listarEntregables(idCursoCiclo).then(function (entregablesListaData) {
      ctrl.entregablesLista = entregablesListaData;
      for(let i = 0; i < ctrl.entregablesLista.length; i++){
        fechCr = new Date(Number(ctrl.entregablesLista[i].fechaHabilitacion));
        fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
        ctrl.entregablesLista[i].fechaCreacionStr = fechCrStr;
      };
      for(let i = 0; i < ctrl.entregablesLista.length; i++){
        fechCr = new Date(Number(ctrl.entregablesLista[i].fechaEntrega));
        fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
        ctrl.entregablesLista[i].fechaFinStr = fechCrStr;
      };
      ctrl.entregablesLista.forEach(function(entregable) {
        var ind = $scope.events.findIndex(i => i.date === entregable.fechaEntrega);
        if (ind === -1 && (($scope.dt * 1) <= entregable.fechaEntrega)) {
          var dato = {
            date: entregable.fechaEntrega,
            status: "full"
          };
          $scope.events.push(dato);
        }
      });
      ctrl.fechasCargadas = true;
    });
    // alumnoCursoService.listarEntregablesAlumno(idCursoCiclo, alumnoEntregable).then(function (entregablesListaData) {
    //   ctrl.entregablesLista = entregablesListaData;
    //   for(let i = 0; i < ctrl.entregablesLista.length; i++){
    //     fechCr = new Date(Number(ctrl.entregablesLista[i].fechaHabilitacion));
    //     fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
    //     ctrl.entregablesLista[i].fechaCreacionStr = fechCrStr;
    //   };
    //   for(let i = 0; i < ctrl.entregablesLista.length; i++){
    //     fechCr = new Date(Number(ctrl.entregablesLista[i].fechaEntrega));
    //     fechCrStr = fechCr.getDate().toString() + "-" + (fechCr.getMonth()+1).toString() + "-" + fechCr.getFullYear().toString();
    //     ctrl.entregablesLista[i].fechaFinStr = fechCrStr;
    //   };
    //   ctrl.entregablesLista.forEach(function(entregable) {
    //     var ind = $scope.events.findIndex(i => i.date === entregable.fechaEntrega);
    //     if (ind === -1 && (($scope.dt * 1) <= entregable.fechaEntrega)) {
    //       var dato = {
    //         date: entregable.fechaEntrega,
    //         status: "full"
    //       };
    //       $scope.events.push(dato);
    //     }
    //   });
    //   ctrl.fechasCargadas = true;
    // });
  };

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
    // minDate: new Date(),
    showWeeks: false
  };

  ctrl.verProyecto = function (proyecto) {
    data={
      "idProyecto": proyecto.id,
  		"idRolUsuario": ctrl.idRolusuario
    }
    // data={
    //   "idProyecto": "8d0c38f4-64aa-4c43-9e5e-4fe096462319",
  	// 	"idRolUsuario": "cd2b6dd9-370b-42b7-bdb4-f7ee293289c4"
    // }
    alumnoCursoService.mostrarAvanceProyecto(data).then(function (avanceProyectoId) {
      //console.log(avanceProyectoId);
    })
    $state.go('listar-entregables-alumno', {proyectoId: proyecto.id, proyectoNombre:proyecto.nombre,rolusuarioId: ctrl.idRolusuario,
      cursoCicloId:$stateParams.cursoCicloId,nombreCurso:$stateParams.nombreCurso,codigoCurso:$stateParams.codigoCurso, horario:$stateParams.horario  });
  };

  ctrl.verEntregable = function (entregable) {
    $state.go('detalle-entregable' , {nombre: entregable.nombre, id: entregable.id ,fechaEntrega: entregable.fechaEntrega,
    fechaHabilitacion: entregable.fechaHabilitacion, descripcion: entregable.descripcion, ponderacion: entregable.ponderacion, cursoCicloId: ctrl.curso.cursoCicloId, proyectoId: 0,
    nombreCurso: $stateParams.nombreCurso,codigoCurso:$stateParams.codigoCurso ,horario: $stateParams.horario,idRolUsuario: ctrl.idRolusuario, estadoEntregable: "I"}); //Temporal, deberia usar un servicio para traerme esa info

  };


  ctrl.cargaUnitaria0 = true;

  ctrl.cambiarVista = function(indice) {
    if(indice == 0){
      ctrl.cargaUnitaria0 = true;
      ctrl.cargaUnitaria1 = false;
      ctrl.cargaUnitaria2 = false;
    }else{
      if(indice == 1){
        ctrl.cargaUnitaria0 = false;
        ctrl.cargaUnitaria1 = true;
        ctrl.cargaUnitaria2 = false;
      }else {
        ctrl.cargaUnitaria1 = false;
        ctrl.cargaUnitaria0 = false;
        ctrl.cargaUnitaria2 = true;
      }
  }
}

  ctrl.volverCurso = function () {
        $state.go('alumnoMisCursos',{rolUsuario: 'A'});
  };

  ctrl.init = function (){
    ctrl.curso.cursoCicloId=$stateParams.cursoCicloId;
    ctrl.curso.nombreCurso=$stateParams.nombreCurso;
    ctrl.curso.codigoCurso=$stateParams.codigoCurso;
    ctrl.curso.creditos=//$stateParams.creditos;
    ctrl.curso.cantidadAlumnos=//$stateParams.cantidadAlumnos;
    ctrl.curso.horario=$stateParams.horario;
    ctrl.idRolusuario=$stateParams.rolusuarioId;

    ctrl.cargarProyectos();
    ctrl.cargarEntregables();
  }

  ctrl.ingresarProyecto = function(proyecto){
    $state.go('listar-entregables-alumno', {proyectoId: proyecto.id, proyectoNombre:proyecto.nombre});
  }

  ctrl.init();
}]);
