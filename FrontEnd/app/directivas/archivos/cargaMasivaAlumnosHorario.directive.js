angular.module('vHackersModule').directive('cargaMasivaAlumnosHorario', ['httpPostFactory','variablesAmbiente',function (httpPostFactory,variablesAmbiente) {
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
                console.log(scope.parametros.id);
                formData.append('id',scope.parametros.id);
                formData.append('files', element[0].files[0]);


                //formData.append('id',scope.parametros);
                console.log(formData);
                //formData.append('id', element[0].files[0]);scope.parametros

               //agregar referencua a httpPostFactorypara la siguiente sección
                //console.log(scope.parametros);
                httpPostFactory(variablesAmbiente.apiUrl + variablesAmbiente.puertoHorarios + '/horarios/cargamasiva/alumnos', formData, function (callback) {
                  // recieve image name to use in a ng-src
                  //console.log(callback);
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