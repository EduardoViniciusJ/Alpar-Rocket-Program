angular.module('app').controller('ValidacaoController', [
    '$scope',
    'ValidacaoService',
    function($scope, ValidacaoService) {
        $scope.formData = {
            nome: '',
            email: '',
            cpf: ''
        };

        $scope.resultados = {
            nome: null,
            email: null,
            cpf: null
        };

        $scope.formFoiEnviado = false;
        $scope.formularioValido = false;

        $scope.validarCampo = function(campo) {
            if (!$scope.formFoiEnviado && !$scope.formData[campo]) {
                $scope.resultados[campo] = null;
                return;
            }

            $scope.resultados[campo] = ValidacaoService.validarCampo(campo, $scope.formData[campo]);
        };

        $scope.validarFormulario = function() {
            $scope.formFoiEnviado = true;

            $scope.validarCampo('nome');
            $scope.validarCampo('email');
            $scope.validarCampo('cpf');

            $scope.formularioValido =
                $scope.resultados.nome &&
                $scope.resultados.email &&
                $scope.resultados.cpf;
        };

        $scope.deveMostrarResultado = function() {
            return $scope.formFoiEnviado;
        };

        $scope.textoResultado = function(campo) {
            return $scope.resultados[campo] ? 'V\u00e1lido' : 'Inv\u00e1lido';
        };

        $scope.classeMensagem = function(campo) {
            return $scope.resultados[campo] ? 'text-success' : 'text-danger';
        };

        $scope.classeCampo = function(campo) {
            if (!$scope.deveMostrarResultado(campo)) {
                return '';
            }

            return $scope.resultados[campo] ? 'is-valid' : 'is-invalid';
        };

        const formulario = document.getElementById('form-validacao');

        if (formulario) {
            formulario.addEventListener('submit', function(event) {
                event.preventDefault();
            });
        }
    }
]);
