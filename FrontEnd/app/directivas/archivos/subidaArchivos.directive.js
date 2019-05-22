angular.module('vHackersModule').directive('subirArchivo', [function () {
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

                //var formData = new FormData();
                //formData.append('file', element[0].files[0]);

                // agregar referencua a httpPostFactorypara la siguiente sección

                //httpPostFactory(appSettings.apiBaseUri + 'api/OADataSource/UploadData', formData, function (callback) {
                //    // recieve image name to use in a ng-src
                //    //console.log(callback);

                //    if (scope.afterUploadEvent) {

                //        scope.afterUploadEvent(callback, scope.params);
                //    }
                //});
            });

        }
    };
}]);
