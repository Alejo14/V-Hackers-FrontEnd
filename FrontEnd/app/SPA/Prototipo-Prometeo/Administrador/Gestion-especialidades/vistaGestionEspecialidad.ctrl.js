angular.module('vHackersModule').controller('administradorEspecialidadCtrl', ['$scope', '$state', '$stateParams', 'administradorEspecialidadService', '$uibModal',

function($scope, $state,$stateParams, administradorEspecialidadService, $uibModal){
  var ctrl = this;
  ctrl.cargaUnitaria = true;
  ctrl.especialidadesArchivoNombre = null;

  ctrl.especialidad = {
    id : "",
    codigo : "",
    nombre : "",
    facultad : {
      id : "",
      codigo : "",
      nombre : ""
    },
    responsableId : "0a00a0aa-00a0-0000-a0a0-0a0000a000a0",
    responsableNombre : ""
  };

  ctrl.cambiarVista = function(indice) {
    if(indice == 0) ctrl.cargaUnitaria = true;
    else ctrl.cargaUnitaria = false;
  }

  ctrl.crearEspecialidad = function(especialidad) {
    data = {
      "id": null,
      "facultadId": especialidad.facultad.id,
      "responsableId": especialidad.responsableId,
      "codigo": especialidad.codigo,
      "nombre": especialidad.nombre
    }
    administradorEspecialidadService.registroEspecialidad(angular.toJson(data)).then(function () {
      swal("¡Bien hecho!", "La especialidad fue creada exitosamente" , "success").then(function () {
        $state.go('inicioAdmin');
      });
    });
  };

  ctrl.agregarResponsable = function () {
    //En este caso el controlador del modal se debe declarar en el JSON que pasa como parametro de open
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-especialidades/modalResponsable.html',
      controller: 'especialidadResponsableCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
      resolve: {
        parametros: function (){
          return {
            responsableNombre: ctrl.especialidad.responsableNombre
          };
        }
      }
    });

    //Recibo parametro de retorno
    modalInstance.result.then( function (parametroRetorno) {
      if (parametroRetorno) {
        ctrl.especialidad.responsableId = parametroRetorno.id;
        ctrl.especialidad.responsableNombre = parametroRetorno.nombreCompleto;
        swal("¡Listo!", "Responsable seleccionado con éxito" , "success");
        ctrl.validarRegistroValido();
      }
    });
  };

  ctrl.agregarCargaMasiva = function () {
    //En este caso el controlador del modal se debe declarar en el JSON que pasa como parametro de open
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-especialidades/modalCargaEspecialidades.html',
      controller: 'especialidadCargaMasivaCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
    });


    //Recibo parametro de retorno
    modalInstance.result.then( function (parametroRetorno) {
      if (parametroRetorno) {
        ctrl.especialidadesArchivoLista = parametroRetorno.info;
        ctrl.especialidadesArchivoNombre = parametroRetorno.nombre;
        swal("¡Bien hecho!", "El archivo se creó exitosamente" , "success");
      }
    });
  }

  ctrl.verEspecialidad = function (especialidad) {
    $state.go('modificar-especialidad', {id : especialidad.id, codigo : especialidad.codigo,
      nombre : especialidad.nombre, facultadId : especialidad.facultadId,
      responsableId : especialidad.responsableId,
      responsableNombre : especialidad.responsableNombre});
  };

  if ($stateParams.id) {
    ctrl.especialidad.id = $stateParams.id;
    ctrl.especialidad.codigo = $stateParams.codigo;
    ctrl.especialidad.nombre = $stateParams.nombre;
    ctrl.especialidad.responsableId = $stateParams.responsableId;
    administradorEspecialidadService.obtenerFacultades().then(function (facultadesListaData) {
      ctrl.especialidad.facultad = facultadesListaData.find(fac => fac.id === $stateParams.facultadId).id;
    });
    if ($stateParams.responsableId !== "0a00a0aa-00a0-0000-a0a0-0a0000a000a0") {
      administradorEspecialidadService.listarResponsables().then(function (responsablesListaData) {
        var responsable = responsablesListaData.find(i => i.id === $stateParams.responsableId);
        ctrl.especialidad.responsableNombre = responsable.nombreCompleto;
      });
    };
    ctrl.registroValido = true;
    console.log(ctrl.especialidad);
    console.log(ctrl.registroValido);
  }

  ctrl.modificarEspecialidad = function (especialidad) {
    //Se debe colocar un boton y no hacer clik en el nombre y agregar los demas valores
    console.log("facultad id");
    data = {
      "id": especialidad.id,
      "facultadId": especialidad.facultad,
      "nombre": especialidad.nombre,
      "codigo": especialidad.codigo,
      "responsableId": especialidad.responsableId
    }
    console.log(data);
    administradorEspecialidadService.modificoEspecialidad(angular.toJson(data)).then(function () {
      swal("¡Bien hecho!", "La especialidad fue modificada exitosamente" , "success").then(function () {
        $state.go('listar-especialidades');
      });
    });
  };
  ctrl.eliminarResponsable = function () {
    ctrl.especialidad.responsableId = "0a00a0aa-00a0-0000-a0a0-0a0000a000a0";
    ctrl.especialidad.responsableNombre = "";
  }
  ctrl.eliminarEspecialidad = function (especialidad) {//Se debe colocar un boton y no hacer clik en el nombre y agregar los demas valores
    swal({
      title: "¿Estás seguro que quieres eliminar la especialidad?",
      text: "La especialidad se eliminará permanentemente",
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
    }).then(function (especialidadEliminaConfirma) {
      if (especialidadEliminaConfirma == "Confirm") {
        administradorEspecialidadService.eliminarEspecialidad(angular.toJson(especialidad)).then(function () {
          swal("¡Bien hecho!", "La especialidad se eliminó exitosamente" , "success");
        });
        ctrl.especialidadesLista.splice(ctrl.especialidadesLista.indexOf(especialidad),1);
      }
    });
  };

  ctrl.validarRegistroValido = function () {
    ctrl.registroValido = ctrl.especialidad.codigo !== "" && ctrl.especialidad.nombre !== "" && ctrl.especialidad.facultad !== "";
  };

  ctrl.regresarAdministradorSwal = function () {
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

  ctrl.regresarAdministrador = function () {
        $state.go('inicioAdmin');
  };

  ctrl.regresarListaEspecialidades = function () {
    swal({
      title: "¿Estás seguro de que quieres volver?",
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
    }).then(function (respuesta) {
      if (respuesta == "Confirm") {
        $state.go('listar-especialidades');
      }
    });
  };

  ctrl.facultadesLista = [ ];
  ctrl.obtenerFacultades = function () {
    administradorEspecialidadService.obtenerFacultades().then(function (facultadesListaData) {
      ctrl.facultadesLista = facultadesListaData;
    });
  };

  ctrl.especialidadesLista = [ ];
  ctrl.cargarEspecialidades = function () {
    administradorEspecialidadService.listarEspecialidades().then(function (especialidadesListaData) {
      ctrl.especialidadesLista = especialidadesListaData;
    });
  };

  ctrl.init = function (){
    ctrl.obtenerFacultades();
    ctrl.cargarEspecialidades();
  };

  ctrl.init();
}]);
