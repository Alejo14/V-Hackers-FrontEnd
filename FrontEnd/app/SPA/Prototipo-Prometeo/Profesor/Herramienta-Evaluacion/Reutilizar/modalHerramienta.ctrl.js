angular.module('vHackersModule').controller('verReutilizarHerramientaCtrl', verReutilizarHerramientaCtrl);
verReutilizarHerramientaCtrl.$inject = ['$scope', '$uibModalInstance', 'NgTableParams','reutilizarHerramientaService','parametrosModal'];
function verReutilizarHerramientaCtrl ($scope, $uibModalInstance, NgTableParams, reutilizarHerramientaService, parametrosModal){

  var ctrl = this;

  ctrl.herramienta = parametrosModal;

  ctrl.criteriosLista = ['Conoce el lenguaje de programacion', 'Orden en la programacion', 'Conocimiento de UX', 'Trabaja en equipo', 'Liderazgo'];

  ctrl.tablaHerramientas = new NgTableParams({}, { dataset: ctrl.criteriosLista });


  // ctrl.init();

  ctrl.cerrar = function () {
    $uibModalInstance.close(0);
  };
};
