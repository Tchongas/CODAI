const myModal = new bootstrap.Modal("#registerModal")
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkIfLogged();

// criar conta
document.getElementById("createForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("registerInputEmail").value;
    const password = document.getElementById("registerInputPassword").value;

    if(email.length < 5) {
        alert("Preencha o campo com um e-mail valido.");
        return;
    }

    if(password.length < 4) {
        alert("Preencha a senha com pelo menos 4 digitos.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    })

    myModal.hide();
    alert("Conta criada com sucesso.");
});


//logar

document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("loginEmailInput").value;
    const password = document.getElementById("loginPasswordInput").value;
    const session = document.getElementById("loginSessionInput").checked;

    const account = getAccount(email)
    

    if(!account) {
        alert("Ops!Verifique o usuario ou a senha.");
        return;
    }

    if(account) {
        if(account.password !== password) {
         alert("Ops!Verifique o usuario ou a senha.");
         return;
        }

        saveSession(email, session)

        window.location.href = "home.html"
     }

    
});

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));

}

function saveSession(data, saveSession) {
    if(saveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key)

    if(account) {
        return JSON.parse(account);
    }

    return "";
}

function checkIfLogged() {
    if(session) {
        sessionStorage.setItem("logged", session)
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);
        window.location.href = "home.html"
    }
}