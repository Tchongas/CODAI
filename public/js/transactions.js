const myModal = new bootstrap.Modal("#transactionModal")
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-leave").addEventListener("click", logout)

//adicionar Lançamento
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("transactionInputValue").value);
    const desc =  document.getElementById("transactionInputDesc").value;
    const date =  document.getElementById("transactionInputDate").value;
    const type = document.querySelector('input[name="typeInput"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, desc: desc, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();
    getTransactions();
    alert("Lançamento adicionado com sucesso.");

});

checkIfLogged();

function checkIfLogged() {
    if(session) {
        sessionStorage.setItem("logged", session)
        logged = session;
    }

    if(!logged) {
        window.location.href = "index.html"
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser)
    }

    getTransactions();
  
}

function getTransactions() {
    const transaction = data.transactions;
    let transactionHtml = ``;

    if(transaction.length) {
        transaction.forEach((item) => {
            let type = "Entrada"

            if(item.type ==="2") {
                type = "Saída"
            }

            transactionHtml += `<tr>
                                    <th scope="row">${item.date}</th>
                                    <td>${item.value.toFixed(2)}</td>
                                    <td>${type}</td>
                                    <td>${item.desc}</td>
                                </tr>`
        })
    }

    document.getElementById("transactions-list").innerHTML = transactionHtml;
}







function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html"
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}