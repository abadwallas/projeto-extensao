document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const usuarios = [
        {nome: "admin", senha: "123"},
    ];

    const usuarioValido = usuarios.find(user => user.nome === username && user.senha === password);

    if (usuarioValido) {
        localStorage.setItem("usuarioLogado", usuarioValido.nome);
        window.location.href = "index.html";
    } else {
        document.getElementById("errorMsg").style.display = "block";
    }
});
