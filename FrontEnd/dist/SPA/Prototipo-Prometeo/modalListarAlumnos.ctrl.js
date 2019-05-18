angular.module('vHackersModule').controller('modalListarAlumnosCtrl', modalListarAlumnosCtrl);

modalListarAlumnosCtrl.$inject = ['$scope', '$uibModalInstance','parametrosModalListarAlumnos', 'hackersService'];

function modalListarAlumnosCtrl ($scope, $uibModalInstance, parametrosModalListarAlumnos, hackersService){
  var ctrl = this;
  ctrl.alumnosLista = "";
  ctrl.alumnoDevuelta = {
    nombre: 'Carlos Carrillo',
    carrera: 'Ingenieria informatica'
  };
  hackersService.listarAlumnos().then(function (alumnosListaData) {
    ctrl.alumnosLista = alumnosListaData;
  });

  ctrl.devolverAlumno = function(){
    //Devuelvo el parametro ctrl.alumnoDevuelta
    $uibModalInstance.close(ctrl.alumnoDevuelta);
  }
};
