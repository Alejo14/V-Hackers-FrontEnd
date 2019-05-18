angular.module('vHackersModule').controller('hackersTableCtrl', ['$scope',
'NgTableParams','hackersService',function($scope,NgTableParams,hackersService){
    var ctrl = this;
    ctrl.alumnos =
    [{
      nombre: "Alejandro Tapia",
      edad: 21,
      correo: "a.tapiat@pucp.pe"
    },
    {
      nombre: "Diego Paredes",
      edad: 21,
      correo: "a20151107@pucp.pe"
    },
    {
      nombre: "Leticia Amaya",
      edad: 21,
      correo: "leticia.amaya@pucp.edu.pe"
    }];
    ctrl.tablaAlumnos = new NgTableParams({}, { dataset: ctrl.alumnos });
}]);
