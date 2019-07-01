angular.module('vHackersModule').directive('cargaMasiva', ['httpPostFactory','variablesAmbiente',function (httpPostFactory,variablesAmbiente) {
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
                //console.log(scope.parametros);
                swal({
                  title: "¿Estás seguro de que quieres cargar este archivo?",
                  icon: "warning",
                  buttons: {
                    Cancel: {
                      text: "Cancelar",
                      className: "btn btn-lg btn-danger"
                    },
                    Confirm: {
                      text: "Sí, cargar",
                      className: "btn btn-lg color-fondo-azul-pucp color-blanco"
                    }
                  }
                }).then(function (respuesta) {
                  if (respuesta == "Confirm") {

                    httpPostFactory(variablesAmbiente.apiUrl + variablesAmbiente.puertoCursos + '/cursos/cargamasiva', formData, function (callback) {
                      scope.parametros=callback;
                      if (scope.eventoPostSeleccion) {
                          scope.eventoPostSeleccion({ nombre: element[0].files[0].name, tamano: element[0].files[0].size ,fechaCreacion: Date.now()}, scope.parametros);
                           swal("¡Bien hecho!", "El archivo se envió exitosamente" , "success");
                      }
                   });

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
