angular.module('vHackersModule').controller('loginCtrl', ['$scope', 'variablesAmbiente',
function ($scope, variablesAmbiente) {
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
            });
          });
        }
      },
      "approvalprompt": "force",
      "scope": "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read "
    };

    gapi.auth.signIn(params);
  }
}]);
