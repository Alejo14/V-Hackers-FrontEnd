angular.module('vHackersModule').controller('loginCtrl', ['$scope',
function ($scope) {
  var ctrl = this;

  ctrl.usuario = {
    username: "",
    email: ""
  };
  ctrl.googleLogin = function () {
    var params = {
      "clientid": "844327842205-hr7p49le062oob0ki3t59u89jhd9t2p0.apps.googleusercontent.com",
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
