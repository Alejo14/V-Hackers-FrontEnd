angular.module('vHackersModule').controller('loginCtrl', ['$scope', 'variablesAmbiente', '$cookies', 'loginService',
function ($scope, variablesAmbiente, $cookies, loginService) {
  var ctrl = this;

  ctrl.usuario = {
    username: "",
    email: ""
  };
  ctrl.googleLogin = function () {
    var params = {
      "clientid": variablesAmbiente.clienteLogin,
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
                $cookies.put('usuarioID', respuestaCookie);
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
