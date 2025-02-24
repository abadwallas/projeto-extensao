window.onload = function() {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
        window.location.href = "login.html";
    } else {
        const nomeFormatado = usuarioLogado.charAt(0).toUpperCase() + usuarioLogado.slice(1);
        document.getElementById("usuarioBoasVindas").textContent = `👋 Olá, ${nomeFormatado}!`;
        restaurarProgresso();
        resetarProgressoDiario();
    }
};

function verificarConclusao() {
    const aguaManha = document.getElementById('aguaManha').checked;
    const aguaTarde = document.getElementById('aguaTarde').checked;
    const conclusaoContainer = document.getElementById('conclusaoContainer');

    salvarProgresso();

    conclusaoContainer.style.display = (aguaManha && aguaTarde) ? 'block' : 'none';
}

function reiniciarDesafio() {
    document.getElementById('aguaManha').checked = false;
    document.getElementById('aguaTarde').checked = false;
    document.getElementById('conclusaoContainer').style.display = 'none';
    salvarProgresso();
}

function salvarProgresso() {
    const progresso = {
        aguaManha: document.getElementById('aguaManha').checked,
        aguaTarde: document.getElementById('aguaTarde').checked,
        data: new Date().toLocaleDateString()
    };
    localStorage.setItem("progressoHidratacao", JSON.stringify(progresso));
}

function restaurarProgresso() {
    const progressoSalvo = JSON.parse(localStorage.getItem("progressoHidratacao"));
    if (progressoSalvo && progressoSalvo.data === new Date().toLocaleDateString()) {
        document.getElementById('aguaManha').checked = progressoSalvo.aguaManha;
        document.getElementById('aguaTarde').checked = progressoSalvo.aguaTarde;
        verificarConclusao();
    }
}

function resetarProgressoDiario() {
    const progressoSalvo = JSON.parse(localStorage.getItem("progressoHidratacao"));
    const hoje = new Date().toLocaleDateString();
    if (progressoSalvo && progressoSalvo.data !== hoje) {
        localStorage.removeItem("progressoHidratacao");
        reiniciarDesafio();
    }
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
}
