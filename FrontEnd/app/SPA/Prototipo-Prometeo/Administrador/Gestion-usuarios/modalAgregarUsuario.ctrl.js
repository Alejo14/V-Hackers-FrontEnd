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
  ctrl.facultadesLista = [
    {
      id: '',
      nombre: 'Ciencias e ingeniería'
    },
    {
      id: '',
      nombre: 'Estudios Generales Ciencias'
    }
  ];
  ctrl.especialidadesLista = [
    {
      id: '',
      nombre: 'Ingenieria Informatica'
    },
    {
      id: '',
      nombre: 'Ingenieria Industrial'
    }
  ];
  ctrl.rolesUsuarioLista = [
    {
      id: "",
      nombre: "Profesor"
    },
    {
      id: "",
      nombre: "Asistente de docencia"
    },
    {
      id: "",
      nombre: "Alumnos"
    }
  ];
  ctrl.registroValido = false;
  ctrl.cargaUnitaria = true;
  ctrl.modo ='c';
  ctrl.cambiarVista = function (indice) {
    ctrl.cargaUnitaria = indice == 0;
  };
  ctrl.facultad = {};

  ctrl.obtenerFacultades = function () {
    gestionUsuariosService.obtenerFacultades().then(function (facultadesListaData) {
      ctrl.facultadesLista = facultadesListaData;
    });
  };

  ctrl.obtenerEspecialidades = function () {
    gestionUsuariosService.obtenerEspecialidades(ctrl.facultad.id).then(function (especialidadesListaData) {
      ctrl.especialidadesLista = especialidadesListaData;
    });
  };

  ctrl.obtenerRoles = function () {
    gestionUsuariosService.obtenerRoles().then(function (rolesListaData) {
      ctrl.rolesUsuarioLista = rolesListaData;
    });
  }

  ctrl.validarRegistroValido = function () {
    ctrl.registroValido = ctrl.usuarioNuevo.nombres !== "" && ctrl.facultad && ctrl.usuarioNuevo.apellidos !== "" && ctrl.especialidad && ctrl.usuarioNuevo.correo !== "" && ctrl.usuarioNuevo.codigo !== "" && ctrl.rolesUsuarioNuevo;
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
  ctrl.init = function(){
    ctrl.obtenerFacultades();
    ctrl.obtenerRoles();
  };
  ctrl.cerrar = function () {
    $uibModalInstance.close(0);
  };
  ctrl.init();
};
