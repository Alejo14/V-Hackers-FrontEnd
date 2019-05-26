angular.module('vHackersModule').directive('subirArchivo', ['variablesAmbiente',function (variablesAmbiente) {
    return {

        restrict: 'A',
        scope: {
            eventoPostSeleccion: "=?",
            parametros: '=?',
            eventoPostSubida: '=?'
        },
        link: function (scope, element, attr) {

            element.bind('change', function () {

                if (scope.eventoPostSeleccion) {
                    scope.eventoPostSeleccion({ nombre: element[0].files[0].name, tamano: element[0].files[0].size ,fecha: Date.now()}, scope.parametros);
                }

                var formData = new FormData();
                formData.append('file', element[0].files[0]);
                console.log(formData);
                //formData.append('id', element[0].files[0]);scope.parametros

               //agregar referencua a httpPostFactorypara la siguiente sección

                httpPostFactory(variablesAmbiente.apiUrl + + variablesAmbiente.puertoArchivos + '/Cargar', formData, function (callback) {
                  // recieve image name to use in a ng-src
                  //console.log(callback);

                  if (scope.eventoPostSubida) {
                      scope.eventoPostSubida(callback, scope.parametros);
                  }
               });

            });

        }
    };
}]);

app.factory('httpPostFactory', function ($http) {
       return function (file, data, callback) {
           $http({
               url: file,
               method: "POST",
               data: data,
               headers: { 'Content-Type': undefined }
           }).success(function (response) {
               callback(response);
           });
       };
});
