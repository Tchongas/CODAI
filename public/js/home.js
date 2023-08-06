const myModal = new bootstrap.Modal("#transactionModal")
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-leave").addEventListener("click", logout)
document.getElementById("transaction-button").addEventListener("click", function() {
    window.location.href = "transactions.html"
})

//adicionar lancamento
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
    getCashIn();
    getCashOut();
    getTotal();
    alert("Lancamento adicionado com sucesso.");

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
    getCashIn();
    getCashOut();
    getTotal();
}

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html"
}

function getCashIn() {
    const transactions = data.transactions;

    const cashIn =  transactions.filter((item) => item.type === "1");
    console.log(cashIn)

    if(cashIn.length) {
        let cashHTML = ``;
        let limit = 0;
    

    if(cashIn.length > 5) {
        limit = 5;
    } else {
        limit = cashIn.length
    }

    for (let index = 0; index < limit; index++) {
        cashHTML += `<div class="row mb-4">
                        <div class="col-12">
                            <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                            <div class="container p-0">
                                <div class="row">
                                    <div class="col-12 col-md-8">
                                        <p>${cashIn[index].desc}</p>
                                    </div>
                                    <div class="col-12 col-md-3 d-flex justify-content-end">
                                        ${cashIn[index].date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
        
    }
    document.getElementById("cash-in-list").innerHTML = cashHTML;
}



}

function getCashOut() {
    const transactions = data.transactions;

    const cashIn =  transactions.filter((item) => item.type === "2");
    console.log(cashIn)

    if(cashIn.length) {
        let cashHTML = ``;
        let limit = 0;
    

    if(cashIn.length > 5) {
        limit = 5;
    } else {
        limit = cashIn.length
    }

    for (let index = 0; index < limit; index++) {
        cashHTML += `<div class="row mb-4">
                        <div class="col-12">
                            <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                            <div class="container p-0">
                                <div class="row">
                                    <div class="col-12 col-md-8">
                                        <p>${cashIn[index].desc}</p>
                                    </div>
                                    <div class="col-12 col-md-3 d-flex justify-content-end">
                                        ${cashIn[index].date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
        
    }
    document.getElementById("cash-out-list").innerHTML = cashHTML;
}
}


function getTotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if(item.type === "1") {
            total += item.value;
        }
        if(item.type === "2") {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}