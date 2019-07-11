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

                    httpPostFactory(variablesAmbiente.apiUrl + variablesAmbiente.puertoHorarios + '/horarios/cargamasiva/alumnos', formData, function (callback) {                      
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
