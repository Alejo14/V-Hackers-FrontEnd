angular.module('vHackersModule').controller('reutilizarHerramientaCtrl', ['$scope','$state', '$stateParams', 'NgTableParams','reutilizarHerramientaService', '$uibModal',
function($scope, $state, $stateParams, NgTableParams, reutilizarHerramientaService, $uibModal){
  var ctrl = this;

  ctrl.herramienta = {};
  ctrl.herramienta.entregableId = $stateParams.id;

  //   Herramienta ^v, Descripción ^v, Docente que lo aplicó, Año\racadémico ^v, Especialidad, Curso, Ver, Seleccionar
  // Rúbrica, Proyecto final - Entregable 1: Product Backlog, Prof. Luis Flores, 2018 - II, Ingeniería Informática, Ingeniería de Software, ,[ ]
  // Lista de cotejo, Entregable: Nombre de la tarea, Prof. Luis Flores, 2018 - II, Ingeniería Informática, Ingeniería de Software, ,[ ]
  // Rúbrica, Entregable: Nombre de la tarea, Prof. Luis Flores, 2018 - II, Ingeniería Informática, Ingeniería de Software, ,[]
  // Escala, Proyecto final - Entregable 2: MockUps, Prof. Luis Flores, 2018 - II, Ingeniería Informática, Ingeniería de Software, ,
  // Lista de cotejos, Entregable: Backlog y Estandar Interfaz, Prof. Luis Flores, 2018 - II, Ingeniería Informática, Ingeniería de Software, , [ ]
  // Rúbrica, Proyecto final - Entregable 1: Proyecto terminado, Prof. Luis Flores, 2018 - I, Ingeniería Informática, Ingeniería de Software, , [ ]
  // {20C, 60L, 20C,15C,20C,20C,7C,10C}

  ctrl.herramientasLista =
  [{
    tipo : "Rúbrica",
    descripcion : "Proyecto final - Entregable 1: Product Backlog",
    docente : "Prof. Luis Flores",
    anio : "2018 - II"
  },
  {
    tipo : "Lista de cotejo",
    descripcion : "Entregable: Nombre de la tarea",
    docente : "Prof. Luis Flores",
    anio : "2018 - II"
  },
  {
    tipo : "Rúbrica",
    descripcion : "Entregable: Nombre de la tarea",
    docente : "Prof. Luis Flores",
    anio : "2018 - II"
  },
  {
    tipo : "Escala",
    descripcion : "Proyecto final - Entregable 2: MockUps",
    docente : "Prof. Luis Flores",
    anio : "2018 - II"
  }];

  ctrl.tablaHerramientas = new NgTableParams({}, { dataset: ctrl.herramientasLista });

  ctrl.verHerramienta = function (herramienta) {
    //En este caso el controlador del modal se debe declarar en el JSON que pasa como parametro de open
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-evaluacion/Reutilizar/modalHerramienta.html',
      controller: 'verReutilizarHerramientaCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
      resolve: {
        parametrosModal: function () {
          return herramienta;
        }
      }
    });
  };

   ctrl.regresarEntregable = function (){
     swal({
       title: "¿Esta seguro de que desea salir?",
       text: "No se guardará los cambios realizados",
       icon: "warning",
       buttons: {
         cancelar: {
           text: "Cancelar",
           className: "btn btn-lg btn-danger"
         },
         confirm: {
           text: "Sí, salir",
           className: "btn btn-lg color-fondo-azul-pucp color-blanco"
         }
       },
       closeModal: false
     }).then(function (regresarConfirmado){
       if(regresarConfirmado !== "cancelar"){
         $state.go('evaluacion-herramienta');
       }
     });
   }

 }]);
