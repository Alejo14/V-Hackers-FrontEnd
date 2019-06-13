angular.module('vHackersModule').controller('raizCtrl', ['$scope', '$state' , '$stateParams', '$uibModal', '$cookies', 'raizService',

function($scope, $state, $stateParams, $uibModa, $cookies, raizService){
  var ctrl = this;

  ctrl.idUsuario = $cookies.get('usuarioID');
  ctrl.init = function () {
    if (!ctrl.usuario) {
      raizService.obtenerUsuarioLogin(ctrl.idUsuario).then(function (usuario){
        ctrl.usuario = usuario;
        var inicioSesion = $cookies.get('inicioSesion');
        if (inicioSesion && inicioSesion !== 'false') {
          $cookies.put('inicioSesion', false);
          var descripcionRol = ctrl.usuario.roles[0].descripcion;
          var state = '';
          switch (descripcionRol) {
            case 'Alumno':
              state = 'inicioAlumnos';
              break;
            case 'Profesor':
              state = 'inicioProfes';
              break;
            case 'Asistente de Docencia':
              state = 'profesor';
              break;
            case 'Administrador':
              state = 'inicioAdmin';
              break;
            default:
              state = 'principal';
          }
          $state.go(state);
        }
      });
    }
  };

  ctrl.init();
}]);
