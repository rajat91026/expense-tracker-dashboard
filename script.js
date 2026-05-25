let transactions = [];

const incomeEl =
document.getElementById("income");

const expenseEl =
document.getElementById("expense");

const balanceEl =
document.getElementById("balance");

const transactionsEl =
document.getElementById("transactions");

const chartCanvas =
document.getElementById("chart");

let chart = new Chart(chartCanvas, {

  type:'doughnut',

  data:{
    labels:['Income','Expense'],
    datasets:[{
      data:[0,0],
      backgroundColor:[
        '#22c55e',
        '#ef4444'
      ]
    }]
  }

});

function addTransaction(){

  const title =
  document.getElementById("title").value;

  const amount =
  Number(document.getElementById("amount").value);

  const type =
  document.getElementById("type").value;

  if(title === "" || amount === 0){

    alert("Please fill all fields");
    return;

  }

  const transaction = {

    id:Date.now(),
    title,
    amount,
    type

  };

  transactions.push(transaction);

  updateUI();

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";

}

function updateUI(){

  transactionsEl.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach((t)=>{

    if(t.type === "income"){
      income += t.amount;
    }
    else{
      expense += t.amount;
    }

    const div =
    document.createElement("div");

    div.classList.add("transaction");

    div.innerHTML = `

      <div class="transaction-left">

        <i class="fa-solid fa-arrow-trend-${
          t.type === "income"
          ? "up income-color"
          : "down expense-color"
        }"></i>

        <div>
          <h3>${t.title}</h3>
          <p>₹${t.amount}</p>
        </div>

      </div>

      <button class="delete-btn"
      onclick="deleteTransaction(${t.id})">

      <i class="fa-solid fa-trash"></i>

      </button>

    `;

    transactionsEl.appendChild(div);

  });

  incomeEl.innerText = `₹${income}`;

  expenseEl.innerText = `₹${expense}`;

  balanceEl.innerText =
  `₹${income - expense}`;

  chart.data.datasets[0].data =
  [income,expense];

  chart.update();

}

function deleteTransaction(id){

  transactions =
  transactions.filter(
    (t)=> t.id !== id
  );

  updateUI();

}