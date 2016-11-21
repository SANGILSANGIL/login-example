export default function MainCtrl($scope, $location, sessionManager, errorHandler, metaManager, navigator, accountsManager) {
    $scope.isLoggedIn = {};
    var form = $scope.form = {};
    var userInfo = $scope.userInfo = {};
    var tempKey = "";

    $scope.duplicateFlag = {
        nick: {
            error: true
        },
        email: {
            error: true
        }
    };
    
    $scope.isLoggedIn = sessionManager.isLoggedIn;

    $scope.signUp = signUp;
    $scope.logout = logout;
    $scope.login = login;
    $scope.findPass = findPass;
    $scope.deleteUser = deleteUser;
    $scope.goToSignUp = goToSignUp;
    $scope.goToLogin = goToLogin;
    $scope.goToHome = goToHome;
    $scope.goToFindPass = goToFindPass;
    $scope.checkDuplication = checkDuplication;
    $scope.getError = getError;
    
    function getError(error) {
        if(angular.isDefined(error)) {
            if (error.required || error.minlength || error.maxlength) {
                if (tempKey == 'nick') {
                    return "닉네임은 2자 이상 10자 이하여야 합니다.";
                } else {
                    "이메일 형식이 아닙니다.";
                }
            } else {
                return "이미 존재하는 " + (tempKey == 'nick' ? '닉네임' : '이메일') + "입니다.";
            }
        }
    }

    function goToSignUp() {
        navigator.goToSignUp();
    }

    function goToFindPass() {
        navigator.goToFindPass();
    }

    function goToLogin() {
        navigator.goToLogin();
    }

    function goToHome() {
        navigator.goToHome();
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
                    userInfo.email = data.email;
                    userInfo.nick = data.nick;
                    userInfo.id = data.id;
                    goToHome();
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
                $scope.form = {};
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

    function findPass() {
        var email = form.email;

        sessionManager.sendFindPassEmail(email, function (status, data) {
            if (status == 200) {
                $rootScope.$broadcast("core.session.callback", {
                    type: 'findPass'
                });
            } else {
                errorHandler.alertError(status, data);
            }
        });
    }

    function deleteUser() {
        sessionManager.deleteUser(userInfo.id, function (status, data) {
            if (status == 204) {
                $scope.form = {};
                goToLogin();
            } else {
                errorHandler.alertError(status, data);
            }
        });
    }

    function checkDuplication (key) {

        tempKey = key;

        var body = {
            key: key,
            value: angular.copy(form[key])
        };

        accountsManager.checkDuplication(body, function (status, data) {
            if (status == 204) {
                $scope.duplicateFlag[key].error = false;
            } else {
                $scope.duplicateFlag[key].error = true;
            }
        });
    }
}
