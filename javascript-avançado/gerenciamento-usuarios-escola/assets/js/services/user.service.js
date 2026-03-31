angular.module('app', []).service('UsuarioService', function() {
    const usuarios = [
        { nome: 'Eduardo Vinicius', tipo: 'Aluno', email: 'eduardo.vinicius@example.com', dataCadastro: new Date(2026, 2, 15) },
        { nome: 'Ana Costa', tipo: 'Professor', email: 'ana.costa@example.com', dataCadastro: new Date(2026, 1, 10) },
        { nome: 'Carlos Silva', tipo: 'Aluno', email: 'carlos.silva@example.com', dataCadastro: new Date(2026, 2, 20) },
        { nome: 'Marta Souza', tipo: 'Professor', email: 'marta.souza@example.com', dataCadastro: new Date(2025, 11, 5) },
        { nome: 'Joao Pedro', tipo: 'Aluno', email: 'joao.pedro@example.com', dataCadastro: new Date() }
    ];

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    this.listar = function() {
        return usuarios;
    };

    this.salvar = async function(usuario) {
        await delay(1500);

        if (!usuario.nome || !usuario.nome.trim()) {
            throw new Error('O nome do usuario e obrigatorio.');
        }

        if (!usuario.email || !usuario.email.trim()) {
            throw new Error('O email do usuario e obrigatorio.');
        }

        usuarios.push(usuario);
        return usuario;
    };

    this.adicionar = async function(usuario) {
        return this.salvar(usuario);
    };

    this.remover = async function(index) {
        if (index < 0 || index >= usuarios.length) {
            throw new Error('Usuario invalido.');
        }

        usuarios.splice(index, 1);
        return usuarios;
    };
});
