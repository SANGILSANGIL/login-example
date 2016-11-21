
navigator.$inject = ['$document', '$state'];

export default function navigator($document, $state) {
    this.setBeforeCallback = null;
    this.setCompleteCallback = null;
    this.goToSignUp = goToSignUp;
    this.goToHome = goToHome;
    this.goToLogin = goToLogin;
    this.goToFindPass = goToFindPass;

    var self = this;

    function goTo (name, param, reload, callback) {
        if (self.setBeforeCallback) {
            self.setBeforeCallback();
        }

        $state.go(name, param, {
            reload: reload
        }).then(function () {
            if (self.setCompleteCallback) {
                self.setCompleteCallback();
            }
            if (callback) {
                callback();
            }
        });
    }

    function goToSignUp() {
        goTo("tutorial.signUp");
    }

    function goToHome() {
        goTo("tutorial.home");
    }

    function goToLogin() {
        goTo("tutorial.login");
    }

    function goToFindPass() {
        goTo("tutorial.findPass");
    }
}