let budgetInput = document.querySelector("#budgetInput"),
    expenseTitle = document.querySelector("#expenseInput"),
    expenseAmount = document.querySelector("#expenseAmountInput"),
    totalExpensesList = [],
    budget = 0;

//Budget Entry
document.querySelector("#calcBtn").addEventListener("click", () => {

  // if submiting without a value
  if (budgetInput.value.trim() === "") {
    // error message
    let budgetErrorMsg = document.querySelector("#budget-error-message");
    displayErrorMessage(budgetErrorMsg,"Please, Enter a Valid Number in the Budget Field");
  } else {
    // adding the value
    budget = budgetInput.value;
    document.querySelector("#budgetMoney").innerHTML = "$" + budget;
    budgetInput.value = "";
  }
});

//Expenses List
document.querySelector("#expenseBtn").addEventListener("click", () => {
  let number = expenseAmount.value,
    name = expenseTitle.value;

  // check the two inputes if there isn't any vlaue 
  if (expenseTitle.value.trim() === "" || expenseAmount.value.trim() === "") {
    // display error message
    let expenseErrorMsg = document.querySelector("#expense-error-message");
    displayErrorMessage(expenseErrorMsg,"Please, Enter a Expense Title AND Amount");
  } else {
    // create edit icon
    let editIcon = document.createElement("i");
    editIcon.classList.add("fa", "fa-pencil-square-o", "editBtn");
    editIcon.addEventListener("click", function() {
      editItem(this, number, name);
    }); 

    // create remove icon
    let removeIcon = document.createElement("i");
    removeIcon.classList.add("fa", "fa-trash", "removeBtn");
    removeIcon.addEventListener("click", function() {
      removeItem(this, number);
    });

    // create the items
    const table = document.querySelector("table");
    const new_row = document.createElement("tr");
    const icons_td = document.createElement("td");
    icons_td.appendChild(editIcon);
    icons_td.appendChild(removeIcon);

    totalExpensesList.push(number);
    new_td_title = document.createElement("td");
    new_td_title.classList.add("expense-title");
    new_td_title.innerHTML = expenseTitle.value;

    new_td_amount = document.createElement("td");
    new_td_amount.classList.add("expense-amount");
    new_td_amount.innerHTML = "$" + expenseAmount.value;

    new_td_icons = document.createElement("td");
    new_td_icons.classList.add("icons");
    new_td_icons.appendChild(editIcon);
    new_td_icons.appendChild(removeIcon);

    new_row.appendChild(new_td_title);
    new_row.appendChild(new_td_amount);
    new_row.appendChild(new_td_icons);
    table.appendChild(new_row);

    expenseTitle.value = "";
    expenseAmount.value = "";
  }
});

//ExpensesDisplay
function expensesSum() {
  var expensesSum = 0;
  for (let i = 0; i < totalExpensesList.length; i++) {
    expensesSum += parseInt(totalExpensesList[i]);
  }
  return expensesSum;
}
setInterval(function() {
  document.querySelector("#expensesMoney").innerHTML = "$" + expensesSum();
}, 100);

//Balance Display
function balanceDisplay() {
  var balanceText = document.querySelector("#balanceMoney");
  var balanceValue = budget - expensesSum();
  if (balanceValue > 0) {
    balanceText.style.color = "green";
  } else if (balanceValue < 0) {
    balanceText.style.color = "rgb(180,0,0)";
  } else {
    balanceText.style.color = "black";
  }
  balanceText.innerHTML = "$" + balanceValue;
}

setInterval(balanceDisplay, 10);

//
//Font awesome buttons : Remove and Edit:

//Remove button (Font awesome icon)
function removeItem(object, number) {
  //
  object.parentElement.parentElement.remove(); 
  var newExpensesList = [];
  for (let i = 0; i < totalExpensesList.length; i++) {
    if (totalExpensesList[i] != number) {
      newExpensesList.push(parseInt(totalExpensesList[i]));
    }
  }
  totalExpensesList = newExpensesList; 
}

//Edit button (Font awesome Icon)
function editItem(object, number, name) {
  removeItem(object, number);
  expenseTitle.value = name;
  expenseAmount.value = number;
  document.querySelector("#expenseBtn").focus();
}

function displayErrorMessage(obj, text) {
  obj.classList.add("error-active");
  obj.innerHTML = text;
  setTimeout(function() {
    obj.classList.remove("error-active");
    obj.innerHTML = "";
  }, 2500);
}