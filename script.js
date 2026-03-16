const balance = document.getElementById("balance");

const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById("list");
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


// const dummyTransaction = [
//     {id: 1, text: "flower", amount: -20},
//     {id: 2, text: "Salary", amount: 300},
//     {id: 3, text: "Book", amount: -10},
//     {id: 4, text: "Camera", amount: -150},
// ];
const localstoragetransaction = JSON.parse(localStorage.getItem("transactions"))


let Transactions = localStorage.getItem("transactions")!==null? localstoragetransaction :[];



// Add transaction 

function addTrasaction (e){
    e.preventDefault();
    if(text.value.trim()=== "" || amount.value.trim()===""){
        alert("please Enter Text and Value");
    }
    else{
      const transaction   ={
        id:generateId(),
        text:text.value,
        amount: +amount.value,
      };
      Transactions.push(transaction);
      addTransactions(transaction);
      updatelocalstorage();
      updateValues();
      text.value ="";
      amount.value = "";

    }

}
// generate id 
function generateId(){
    return Math.floor(Math.random()*10000000);
}

function addTransactions(transaction){
    const sign = transaction.amount<0 ?"-" : "+";
    const item = document.createElement('li');

    item.classList.add(
        transaction.amount<0 ?"minus" : "plus"
    )
    item .innerHTML = `${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class ="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(item);

}

// remove transaction 

function removeTransaction(id){
    Transactions= Transactions.filter(Transaction => Transaction.id!== id);
    updatelocalstorage();
    Init();
}
// update value

function updateValues(){
   const amount = Transactions.map(transaction=> transaction.amount); 
   const total = amount.reduce((acc,item) => (acc +=item),0).toFixed(2);
   const income = amount.filter(item => item > 0).reduce((acc,item)=>(acc += item),0).toFixed(2);
   const expense = (
    amount.filter (item => item <0).reduce((acc,item) => acc += item,0)*-1
   ).toFixed(2);

   balance.innerHTML =`$${total}`;
   money_plus.innerText= `$${income}`;
   money_minus.innerText = `$${expense}`;
}

// update local storage 
function updatelocalstorage(){
    localStorage.setItem(
        "transactions",
        JSON.stringify(Transactions)
    );
}

// INit App
function Init(){
    list.innerHTML="";
    Transactions.forEach(addTransactions);
    updateValues();
}
Init();

form.addEventListener("submit",addTrasaction);

