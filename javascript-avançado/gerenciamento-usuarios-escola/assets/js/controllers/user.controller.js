angular.module('app').controller('AppController', [
  '$scope',
  'UsuarioService',
  function($scope, UsuarioService) {
    function usuarioPadrao() {
      return {
        nome: '',
        tipo: 'Aluno',
        email: ''
      };
    }

    $scope.mensagemBoasVindas = 'Bem-vindo ao sistema de gerenciamento de usuarios da escola!';
    $scope.usuarios = UsuarioService.listar();
    $scope.novoUsuario = usuarioPadrao();
    $scope.salvando = false;
    $scope.mensagemSucesso = '';
    $scope.mensagemErro = '';

    $scope.prepararFormulario = function() {
      $scope.mensagemErro = '';
    };

    $scope.limparFormulario = function(formulario) {
      $scope.novoUsuario = usuarioPadrao();

      if (formulario) {
        formulario.$setPristine();
        formulario.$setUntouched();
      }
    };

    $scope.fecharModalCadastro = function() {
      const modalElement = document.getElementById('registrarUsuarioModal');

      if (!modalElement || !window.bootstrap) {
        return;
      }

      window.bootstrap.Modal.getOrCreateInstance(modalElement).hide();
    };

    $scope.adicionarUsuario = async function(formulario) {
      $scope.mensagemSucesso = '';
      $scope.mensagemErro = '';

      if (formulario.$invalid) {
        formulario.nome.$setTouched();
        formulario.email.$setTouched();
        return;
      }

      $scope.salvando = true;
      $scope.$applyAsync();

      try {
        const usuarioSalvo = await UsuarioService.salvar({
          nome: $scope.novoUsuario.nome.trim(),
          tipo: $scope.novoUsuario.tipo,
          email: $scope.novoUsuario.email.trim(),
          dataCadastro: new Date()
        });

        $scope.mensagemSucesso = 'Usuario ' + usuarioSalvo.nome + ' cadastrado com sucesso.';
        $scope.limparFormulario(formulario);
        $scope.fecharModalCadastro();
      } catch (erro) {
        $scope.mensagemErro = erro.message || 'Nao foi possivel salvar o usuario.';
      } finally {
        $scope.salvando = false;
        $scope.$applyAsync();
      }
    };

    $scope.removerUsuario = async function(index) {
      await UsuarioService.remover(index);
      $scope.$applyAsync();
    };
  }
]);
