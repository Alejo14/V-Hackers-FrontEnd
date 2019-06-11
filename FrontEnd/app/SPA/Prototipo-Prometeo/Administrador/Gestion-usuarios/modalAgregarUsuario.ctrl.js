angular.module('vHackersModule').controller('modalAgregarUsuarioCtrl', modalAgregarUsuarioCtrl);

modalAgregarUsuarioCtrl.$inject = ['$scope', '$uibModalInstance','gestionUsuariosService', 'parametrosModalUsuario'];

function modalAgregarUsuarioCtrl ($scope, $uibModalInstance, gestionUsuariosService, parametrosModalUsuario){

  var ctrl = this;
  arch=[];
  data={};
  ctrl.masivo = false;
  ctrl.obtenerInfoArchivo = function (archivo,parametros) {
    //console.log(parametros);
    var id=parametros.data;
    data={
          "archivoId":id,
        	"entregableId":ctrl.idAvanceEntregable
    }
    //console.log(ctrl.idAvanceEntregable);
    arch.id=parametros.data;
    arch.nombre=archivo.nombre;
    arch.fecha=archivo.fechaCreacion;
    arch.tamano=archivo.tamano;


    ctrl.archivoURL=arch.nombre;
    //console.log(arch);
    //ctrl.listaArchivos.push(arch);

    // //$state.go('cargar-archivos');
    ctrl.registroValido = true;
    ctrl.masivo = true;
  }


  ctrl.usuarioNuevo = {
    nombres: "",
    apellidos: "",
    correo: "",
    codigo: ""
  };
  ctrl.registroValido = false;
  ctrl.cargaUnitaria = true;
  ctrl.modo ='c';
  ctrl.cambiarVista = function (indice) {
    ctrl.cargaUnitaria = indice == 0;
  };
  ctrl.facultad = {};
  ctrl.rolesUsuarioNuevo = [];
  ctrl.modoSoloLectura = false;
  ctrl.obtenerFacultades = function () {
    gestionUsuariosService.obtenerFacultades().then(function (facultadesListaData) {
      ctrl.facultadesLista = facultadesListaData;
      if (parametrosModalUsuario.actualizarRoles){
        ctrl.inicializarFacultadEspecialidadUsuario();
      }
    });
  };

  ctrl.obtenerEspecialidades = function () {
    gestionUsuariosService.obtenerEspecialidades(ctrl.facultad.id).then(function (especialidadesListaData) {
      ctrl.especialidadesLista = especialidadesListaData;
    });
  };

  ctrl.obtenerRoles = function () {
    if (parametrosModalUsuario.actualizarRoles){
      gestionUsuariosService.obtenerRolesActivos().then(function (rolesListaData) {
        ctrl.rolesUsuarioLista = rolesListaData;
        ctrl.inicializarRolesUsuario();
      });
    }
    else {
      gestionUsuariosService.obtenerRoles().then(function (rolesListaData) {
        ctrl.rolesUsuarioLista = rolesListaData;
      });
    }
  }

  ctrl.validarRegistroValido = function () {
    ctrl.registroValido = ctrl.usuarioNuevo.nombres !== "" && ctrl.facultad && ctrl.usuarioNuevo.apellidos !== "" && ctrl.especialidad && ctrl.usuarioNuevo.correo !== "" && ctrl.usuarioNuevo.codigo !== "" && ctrl.rolesUsuarioNuevo && ctrl.rolesUsuarioNuevo.length;
  };

  ctrl.guardarUsuario = function () {
    swal({
      title: "¿Esta seguro de que desea agregar a este usuario?",
      text: "",
      icon: "warning",
      //buttons: ["Cancelar", "Sí, agregar"],
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, agregar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (usuarioNuevoConfirmado) {
      if(!ctrl.masivo){
        if (usuarioNuevoConfirmado !== "cancelar") {
          ctrl.usuarioNuevo.id = "859e054f-ae56-4e68-9a40-cfee27cf8b2a";
          ctrl.usuarioNuevo.especialidad = ctrl.especialidad;
          ctrl.usuarioNuevo.especialidad.facultad = ctrl.facultad;
          ctrl.usuarioNuevo.roles = [];
          var numRoles = ctrl.rolesUsuarioNuevo.length;
          for (var i = 0; i < numRoles; i++) {
            var usuarioRol =  ctrl.rolesUsuarioNuevo[i];
            ctrl.usuarioNuevo.roles.push(usuarioRol);
          }
          $uibModalInstance.close(ctrl.usuarioNuevo);
        }
      }
      else{
        console.log("masivo?");
        $uibModalInstance.close("masivo");
      }
    });
  };

  ctrl.inicializarUsuario = function () {
    if (parametrosModalUsuario.actualizarRoles) {
      ctrl.usuarioNuevo = parametrosModalUsuario.usuarioModificar;
      ctrl.modoSoloLectura = true;
    }
  }

  ctrl.inicializarFacultadEspecialidadUsuario = function () {
    var numFacultades = ctrl.facultadesLista.length;
    for (var i = 0; i < numFacultades; i++) {
      if (ctrl.facultadesLista[i].id == ctrl.usuarioNuevo.idFacultad){
        ctrl.facultad = ctrl.facultadesLista[i];
        gestionUsuariosService.obtenerEspecialidades(ctrl.facultad.id).then(function (especialidadesListaData) {
          ctrl.especialidadesLista = especialidadesListaData;
          var numEspecialidades = ctrl.especialidadesLista.length;
          for (var i = 0; i < numEspecialidades; i++){
            if (ctrl.especialidadesLista[i].id == ctrl.usuarioNuevo.idEspecialidad){
              ctrl.especialidad = ctrl.especialidadesLista[i];
            }
          }
        });
        break;
      }
    }
  }

  ctrl.inicializarRolesUsuario = function () {
    var numRoles = ctrl.rolesUsuarioLista.length;
    var numRolesUsuario = ctrl.usuarioNuevo.roles.length;
    for (var i = 0; i < numRoles; i++) {
      for (var j = 0; j < numRolesUsuario; j++) {
        if (ctrl.rolesUsuarioLista[i].id == ctrl.usuarioNuevo.roles[j].id) {
          ctrl.rolesUsuarioNuevo.push(ctrl.usuarioNuevo.roles[j]);
        }
      }
    }
  };

  ctrl.actualizarRoles = function () {
    swal({
      title: "¿Esta seguro de que desea actualizar los roles de este usuario?",
      text: "",
      icon: "warning",
      //buttons: ["Cancelar", "Sí, agregar"],
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, actualizar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (usuarioActualizadoConfirmado) {
      if (usuarioActualizadoConfirmado !== "cancelar") {
        var numRoles = ctrl.rolesUsuarioNuevo.length;
        var numRolesUsuario = ctrl.usuarioNuevo.roles.length;
        for (var i = 0; i < numRolesUsuario; i++) {
          var rolUsuarioMantenido = false;
          for (var j = 0; j < numRoles; j++) {
            rolUsuarioMantenido = ctrl.usuarioNuevo.roles[i].id === ctrl.rolesUsuarioNuevo[j].id;
            if (rolUsuarioMantenido) {
              ctrl.rolesUsuarioNuevo[j].activo = false;
              break;
            }
          }
          ctrl.usuarioNuevo.roles[i].activo = rolUsuarioMantenido;
        }

        var usuarioListaNuevosRolesJson = {
          "usuario": ctrl.usuarioNuevo,
          "rolesNuevos": ctrl.rolesUsuarioNuevo
        };
        $uibModalInstance.close(usuarioListaNuevosRolesJson);
      }
    });
  };

  ctrl.init = function(){
    ctrl.inicializarUsuario();
    ctrl.obtenerFacultades();
    ctrl.obtenerRoles();
  };
  ctrl.cerrar = function () {
    $uibModalInstance.close(0);
  };
  ctrl.init();
};
