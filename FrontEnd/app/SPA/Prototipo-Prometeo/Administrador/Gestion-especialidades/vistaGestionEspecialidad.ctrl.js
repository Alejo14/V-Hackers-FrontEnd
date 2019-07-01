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
    responsableId : "",
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
        swal("¡Bien hecho!", "El archivo se creo exitosamente" , "success");
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
    administradorEspecialidadService.listarResponsables().then(function (responsablesListaData) {
      var responsable = responsablesListaData.find(i => i.id === $stateParams.responsableId);
      ctrl.especialidad.responsableNombre = responsable.nombreCompleto;
    });
  }

  ctrl.modificarEspecialidad = function (especialidad) {//Se debe colocar un boton y no hacer clik en el nombre y agregar los demas valores
    data = {
      "id": especialidad.id,
      "facultadId": especialidad.facultad.id,
      "nombre": especialidad.nombre,
      "codigo": especialidad.codigo,
      "responsableId": especialidad.responsableId
    }
    administradorEspecialidadService.modificoEspecialidad(angular.toJson(data)).then(function () {
      swal("¡Bien hecho!", "La especialidad fue modificada exitosamente" , "success").then(function () {
        $state.go('listar-especialidades');
      });
    });
  };

  ctrl.eliminarEspecialidad = function (especialidad) {//Se debe colocar un boton y no hacer clik en el nombre y agregar los demas valores
    swal({
      title: "¿Está seguro que quiere eliminar la especialidad?",
      text: "La especialidad se eliminará permanentemente",
      icon: "warning",
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí. Eliminar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (especialidadEliminaConfirma) {
      if (especialidadEliminaConfirma !== "cancelar") {
        administradorEspecialidadService.eliminarEspecialidad(angular.toJson(especialidad)).then(function () {
          swal("¡Bien hecho!", "La especialidad se eliminó exitosamente" , "success");
        });
        ctrl.especialidadesLista.splice(ctrl.especialidadesLista.indexOf(especialidad),1);
      }
    });
  };

  ctrl.validarRegistroValido = function () {
    ctrl.registroValido = ctrl.especialidad.codigo !== "" && ctrl.especialidad.nombre !== "" && ctrl.especialidad.facultad.id !== "" && ctrl.especialidad.responsableId !== "";
  };

  ctrl.regresarAdministradorSwal = function () {
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
    }).then(function (especialidadNuevaConfirma) {
      if (especialidadNuevaConfirma !== "cancelar") {
        $state.go('inicioAdmin');
      }
    });
  };

  ctrl.regresarAdministrador = function () {
        $state.go('inicioAdmin');
  };

  ctrl.regresarListaEspecialidades = function () {
    swal({
      title: "¿Está seguro de que quieres volver?",
      text: "No se guardarán los cambios",
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
    }).then(function (especialidadNuevaConfirma) {
      if (especialidadNuevaConfirma !== "cancelar") {
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
