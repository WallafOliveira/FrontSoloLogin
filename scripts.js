document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');
    const mensagemErro = document.getElementById('mensagem-erro');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const usuario = {
            email: emailInput.value,
            senha: senhaInput.value
        };

        fetch('https://dadoscadasolo.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    mensagemSucesso.textContent = 'Login bem-sucedido!';
                    mensagemErro.style.display = 'none';
                    mensagemSucesso.style.display = 'block';
                    localStorage.setItem('usuarioId', data.usuario_id);
                }
            })
            .catch(error => {
                mensagemErro.textContent = 'Erro no login.';
                mensagemSucesso.style.display = 'none';
                mensagemErro.style.display = 'block';
            });
    });
});
