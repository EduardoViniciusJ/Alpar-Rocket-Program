angular.module('app', []).service('ValidacaoService', function() {
    const regex = {
        nome: /^[A-Za-z\u00C0-\u024F\s]+$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    };

    this.validarCampo = function(campo, valor) {
        const valorTratado = (valor || '').trim();

        if (!valorTratado || !regex[campo]) {
            return false;
        }

        return regex[campo].test(valorTratado);
    };
});
