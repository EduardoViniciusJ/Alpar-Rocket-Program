const formulario = document.getElementById('meuFormulario');
const alerta = document.getElementById('alertaSucesso');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    alerta.classList.remove('d-none');
});