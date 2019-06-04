angular.module('vHackersModule').controller('especialidadCargaMasivaCtrl', especialidadCargaMasivaCtrl);

especialidadCargaMasivaCtrl.$inject = ['$scope', '$uibModalInstance', 'administradorEspecialidadService'];
function especialidadCargaMasivaCtrl ($scope , $uibModalInstance, administradorEspecialidadService){

  var ctrl = this;
  ctrl.titulo="Subir archivos o URL";
  ctrl.tipoArchivo="Nombre de Archivo";
  ctrl.registroValido = false;

  ctrl.cargarArchivo=function (){
    var metodo = parseInt($('input[name=metodo]:checked').val());
    if(metodo==1){
      ctrl.descripcion="Ingrese un URL";
      ctrl.tipoCarga=1;
      ctrl.tipoArchivo="URL";
    }else{
      ctrl.descripcion="Nombre del archivo";
      ctrl.tipoCarga=0;
      ctrl.tipoArchivo="Nombre de Archivo";
    }
  }
  arch=[];
  data={};
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
  }

  ctrl.obtenerFacultades = function () {
    // detalleEntregableService.obtenerFacultades().then(function (facultadesListaData) {
    //   ctrl.facultadesLista = facultadesListaData;
    // });
  };

  ctrl.obtenerEspecialidades = function () {
    // detalleEntregableService.obtenerEspecialidades($scope.facultad.id).then(function (especialidadesListaData) {
    //   ctrl.especialidadesLista = especialidadesListaData;
    // });
  };

  ctrl.obtenerRoles = function () {
    // detalleEntregableService.obtenerRoles().then(function (rolesListaData) {
    //   ctrl.rolesUsuarioLista = rolesListaData;
    // });
  }

  ctrl.validarRegistroValido = function () {
    //ctrl.registroValido = ctrl.usuarioNuevo.nombres !== "" && $scope.facultad && ctrl.usuarioNuevo.apellidos !== "" && $scope.especialidad && ctrl.usuarioNuevo.correo !== "" && ctrl.usuarioNuevo.codigo !== "" && $scope.rolesUsuarioNuevo;
  };
  ctrl.idURL="";
  ctrl.guardarArchivo = function () {
    var tipoArch=[];
    var metodo = parseInt($('input[name=metodo]:checked').val());
    if (metodo==0){
      entregableAlumnoService.registroAvanceEntregable(data);
      tipoArch.push(0);
      tipoArch.push(arch);
      $uibModalInstance.close(tipoArch);
    }else {
      //URL
      var urldata=ctrl.archivoURL;
      if (urldata){
        entregableAlumnoService.registroURL(urldata).then(function (idURL) {
            //swal("¡Bien hecho!", "El entregable se creó exitosamente" , "success");
            ctrl.idURL=idURL;
            dataURL={
                  "archivoId":idURL,
                  "entregableId":ctrl.idAvanceEntregable
            }
            entregableAlumnoService.registroAvanceEntregable(dataURL);
            //console.log(idURL);
            linkURL=[];
            linkURL.id=ctrl.idURL;
            linkURL.nombre=urldata;
            linkURL.fecha=Date.now();
            tipoArch.push(1);
            tipoArch.push(linkURL);
            $uibModalInstance.close(tipoArch);
        });

      }
    }

  };
  ctrl.init = function(){
    ctrl.idAvanceEntregable="75e825bc-81d0-11e9-bc42-526af7764f64";
    ctrl.tipoCarga=0;
    ctrl.descripcion="Nombre del archivo";
    ctrl.archivoURL="";
    // ctrl.obtenerFacultades();
    // ctrl.obtenerRoles();
  };
  ctrl.cerrar = function () {
    var metodo = parseInt($('input[name=metodo]:checked').val());
    if (metodo==0){
      entregableAlumnoService.eliminarArchivo(arch.id);//Si cierra lo debo eliminar el archivo
      $uibModalInstance.close(0);
    }else {
        //Eliminar URL si cancela
        entregableAlumnoService.eliminarArchivo(ctrl.idURL);//Si cierra lo debo eliminar el archivo
        $uibModalInstance.close(0);

    }
  };
  ctrl.init();
};
