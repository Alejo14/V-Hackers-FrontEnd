angular.module('vHackersModule').controller('loginCtrl', ['$scope', '$state', 'variablesAmbiente', '$cookies', 'loginService',
function ($scope, $state, variablesAmbiente, $cookies, loginService) {
  var ctrl = this;

  ctrl.usuario = {
    username: "",
    email: ""
  };
  ctrl.googleLogin = function () {
    var params = {
      "clientid": variablesAmbiente.clienteLogin,
      "apiKey": variablesAmbiente.llaveApiLogin,
      "cookiepolicy": "single_host_origin",
      "callback": function (result) {
        if (result['status']['signed_in']) {
          var request = gapi.client.plus.people.get(
            {
              "userId": "me"
            }
          );
          request.execute(function (resp) {
            $scope.$apply(function () {
              ctrl.usuario.username = resp.displayName;
              ctrl.usuario.email = resp.emails[0].value;
              var correoLogin = {
                "correo": ctrl.usuario.email
              };

              loginService.login(correoLogin).then(function (respuestaCookie) {
                if (respuestaCookie === 'Usuario no existe') {
                  swal("¡Opss!", "El usuario no se encuentra en base de datos" , "error");
                }
                else {
                  $cookies.put('usuarioID', respuestaCookie);
                  $cookies.put('inicioSesion', true);
                  $state.go('raiz');
                }
              });
            });
          });
        }
      },
      "approvalprompt": "force",
      "scope": "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read "
    };

    gapi.auth.signIn(params);
  }

  ctrl.probarCookie = function () {
    var idUsuario = $cookies.get('usuarioID');
    loginService.obtenerUsuarioLogin(idUsuario).then(function (usuario){
      ctrl.usuario.email = usuario.correo;
    });
  }
}]);
