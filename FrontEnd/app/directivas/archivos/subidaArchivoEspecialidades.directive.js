angular.module('vHackersModule').directive('subirArchivoEspecialidad', ['httpPostFactory','variablesAmbiente',function (httpPostFactory,variablesAmbiente) {
    return {
      restrict: 'A',
      scope: {
        eventoPostSeleccion: "=?",
        parametros: '=?',
        eventoPostSubida: '=?'
      },
      link: function (scope, element, attr) {
        element.bind('change', function () {
          var formData = new FormData();
          formData.append('files', element[0].files[0]);
          //formData.append('id',scope.parametros);
          console.log(formData);
          //formData.append('id', element[0].files[0]);scope.parametros

          //agregar referencua a httpPostFactorypara la siguiente sección

          httpPostFactory(variablesAmbiente.apiUrl + variablesAmbiente.puertoEntregable + '/entregables/guardar', formData, function (callback) {
          // httpPostFactory(variablesAmbiente.apiUrl + variablesAmbiente.puertoEspecialidad + '/especialidad/cargaMasiva', formData, function (callback) {
          // recieve image name to use in a ng-src
          console.log(callback);
          scope.parametros=callback;
          // if (scope.eventoPostSubida) {
          //     scope.eventoPostSubida(scope.parametros);
          //
          // }

          if (scope.eventoPostSeleccion) {
            scope.eventoPostSeleccion({ nombre: element[0].files[0].name, tamano: element[0].files[0].size ,fechaCreacion: Date.now()}, scope.parametros);
            // swal("¡Bien hecho!", "El archivo se guardo exitosamente" , "success");
          }
        });
      });
    }
  };
}])

angular.module('vHackersModule').factory('httpPostFactory', function ($http) {
  return function (file, data, callback) {
    $http({
      url: file,
      method: "POST",
      data: data,
      headers: { 'Content-Type': undefined }
    }).then(function (response) {
      callback(response);
    });
  };
});