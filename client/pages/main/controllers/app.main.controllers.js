export default function MainCtrl($scope, $location, sessionManager, errorHandler, metaManager, navigator) {
    $scope.isLoggedIn = {};
    var form = $scope.form = {}
    var userInfo = $scope.userInfo = {}

    $scope.isLoggedIn = sessionManager.isLoggedIn;

    $scope.signUp = signUp;
    $scope.logout = logout;
    $scope.login = login;
    $scope.deleteUser = deleteUser;
    $scope.goToSignUp = goToSignUp;
    $scope.goToLogin = goToLogin;
    
    function goToSignUp() {
        navigator.goToSignUp();
    }

    function goToLogin() {
        navigator.goToLogin();
    }

    function signUp(signUpForm) {
        if (signUpForm.$valid) {
            var user = {
                secret: form.pass,
                uid: form.email,
                nick: form.nick,
                agreedEmail: true,
                type: metaManager.std.user.defaultSignUpType
            };
            sessionManager.signup(user, function (status, data) {
                if (status == 201) {
                    console.log(data);
                } else {
                    errorHandler.alertError(status, data);
                }
            });
        } else {
            console.log("회원가입 실패");
        }
    }
    
    function logout() {
        sessionManager.logout(function (status) {
            if (status == 204) {
                goToLogin();
            } else {
                errorHandler.alertError(status);
            }
        });
    }

    function login (loginForm) {
        if(loginForm.$valid) {
            sessionManager.loginWithEmail(form.email, form.pass, function (status, data) {
                if (status == 200) {
                    $scope.form = {};
                    userInfo.email = data.email;
                    userInfo.nick = data.nick;
                    userInfo.id = data.id;
                    navigator.goToHome();
                } else {
                    errorHandler.alertError(status, data);
                }
            });
        } else {
            console.log("로그인 실패");
        }
    } 

    function deleteUser() {
        sessionManager.deleteUser(userInfo.id, function (status, data) {
            console.log(userInfo.email);
            console.log(status);
            if (status == 204) {
                goToLogin();
            } else {
                errorHandler.alertError(status, data);
            }
        });
    }
}
