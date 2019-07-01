angular.module('vHackersModule').controller('raizCtrl', ['$scope', '$state' , '$stateParams', '$uibModal', '$cookies', 'raizService',

function($scope, $state, $stateParams, $uibModa, $cookies, raizService){
  var ctrl = this;
  ctrl.nombreUsuario = '';
  ctrl.state = '';
  ctrl.rolUsuario = '';
  ctrl.idUsuario = $cookies.get('usuarioID');
  ctrl.logOut = function () {
    var token = gapi.auth.getToken();
    if (token) {
      var accessToken = gapi.auth.getToken().access_token;
      if (accessToken) {
        raizService.logOut(accessToken).then(function (respuesta) {
          gapi.auth.setToken(null);
          gapi.auth.signOut();
          $state.go('login');
        });
      }
      else {
        $state.go('login');
      }
    }
    else {
      $state.go('login');
    }

  };

  ctrl.init = function () {
    if (!ctrl.usuario) {
      raizService.obtenerUsuarioLogin(ctrl.idUsuario).then(function (usuario){
        ctrl.usuario = usuario;
        var inicioSesion = $cookies.get('inicioSesion');
        ctrl.usuario.nombreCompleto = ctrl.usuario.nombres + ' ' + ctrl.usuario.apellidos.toUpperCase();
        console.log(ctrl.usuario);
        if (inicioSesion && inicioSesion !== 'false') {
          $cookies.put('inicioSesion', false);
          // var descripcionRol = ctrl.usuario.roles[0];
          ctrl.cargarPestana(ctrl.usuario.roles[0]);
        }
      });
    }
  };

  ctrl.cargarPestana = function(perfil) {
    switch (perfil.descripcion) {
      case 'Administrador':
        ctrl.state = 'inicioAdmin';
        ctrl.rolUsuario = null;
        break;
      case 'Alumno':
        ctrl.state = 'alumnoMisCursos';
        ctrl.rolUsuario = 'A';
        break;
      case 'Profesor':
        ctrl.state = 'profesorMisCursos';
        ctrl.rolUsuario = 'P';
        break;
      case 'Asistente de Docencia':
        ctrl.state = 'profesorMisCursos';
        ctrl.rolUsuario = 'P';
        break;
      default:
        ctrl.state = 'principal';
        ctrl.rolUsuario = null;
    }
    if (ctrl.rolUsuario == null) {
      $state.go(ctrl.state);
    } else {
      $state.go(ctrl.state,{rolUsuario: ctrl.rolUsuario});
    }
  }

  ctrl.init();
}]);
