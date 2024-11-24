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

        fetch('https://dadoscadasolo.onrender.com/login', { // API de login
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao fazer login.');
                }
                return response.json();
            })
            .then(data => {
                // Verifica se há um identificador único no retorno da API
                if (data.id || data.email) {
                    const userId = data.id || data.email; // Use o identificador retornado
                    mensagemSucesso.textContent = 'Login bem-sucedido!';
                    mensagemErro.style.display = 'none';
                    mensagemSucesso.style.display = 'block';

                    // Salvar dados do usuário ou token no localStorage
                    localStorage.setItem('usuarioLogado', JSON.stringify(data));

                    // Redirecionar para a página do usuário específico
                    window.location.href = `https://front-solo-prob.vercel.app/${userId}`;
                } else {
                    throw new Error('Identificador de usuário não encontrado.');
                }
            })
            .catch(error => {
                mensagemErro.textContent = 'Erro ao fazer login.';
                mensagemSucesso.style.display = 'none';
                mensagemErro.style.display = 'block';
                console.error(error);
            });
    });
});
