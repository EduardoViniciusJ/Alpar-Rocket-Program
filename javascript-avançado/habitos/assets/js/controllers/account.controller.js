angular.module('app').controller('AccountController', function($scope, AuthService, $window) {
    $scope.auth = {
        mode: 'login',
        login: { email: '', password: '' },
        register: { username: '', email: '', password: '' },
        reset: { email: '', newPassword: '' },
        feedback: { success: true, message: '' }
    };

    $scope.account = {
        isAuthenticated: false,
        user: null
    };

    function refreshSession() {
        $scope.account.user = AuthService.getCurrentUser();
        $scope.account.isAuthenticated = AuthService.isAuthenticated();
    }

    function setFeedback(success, message) {
        $scope.auth.feedback.success = success;
        $scope.auth.feedback.message = message;
    }

    $scope.setAuthMode = function(mode) {
        $scope.auth.mode = mode;
        $scope.auth.feedback.message = '';
    };

    $scope.register = function() {
        try {
            AuthService.register($scope.auth.register);
            setFeedback(true, 'Conta criada com sucesso. Faça login para continuar.');
            $scope.auth.mode = 'login';
            $scope.auth.register = { username: '', email: '', password: '' };
        } catch (error) {
            setFeedback(false, error.message);
        }
    };

    $scope.login = function() {
        try {
            AuthService.login($scope.auth.login.email, $scope.auth.login.password);
            $scope.auth.login = { email: '', password: '' };
            $scope.auth.feedback.message = '';
            refreshSession();
            $window.location.href = 'daily-record.html';
        } catch (error) {
            setFeedback(false, error.message);
        }
    };

    $scope.resetPassword = function() {
        try {
            AuthService.resetPassword($scope.auth.reset.email, $scope.auth.reset.newPassword);
            setFeedback(true, 'Senha redefinida com sucesso. Agora você já pode entrar.');
            $scope.auth.mode = 'login';
            $scope.auth.reset = { email: '', newPassword: '' };
        } catch (error) {
            setFeedback(false, error.message);
        }
    };

    $scope.logout = function() {
        AuthService.logout();
        refreshSession();
        $scope.auth.mode = 'login';
        $window.location.href = 'index.html';
    };

    refreshSession();

    var path = String($window.location.pathname || '').toLowerCase();
    if (path.indexOf('index.html') !== -1 && AuthService.isAuthenticated()) {
        $window.location.replace('daily-record.html');
    }
});
