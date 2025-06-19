document.addEventListener("DOMContentLoaded", initialize);

const form = document.querySelector("form");
let expenseList = [];
let editingId = null; // Track which item is being edited

function initialize() {
  for (let item of expenseList) {
    display(item);
  }
}

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const amountInput = form.amount;
  const descInput = form.description;
  const typeInput = form.type;

  if (editingId) {
    // Update existing item
    const index = expenseList.findIndex(item => item.id === editingId);
    if (index !== -1) {
      expenseList[index].expenseAmount = amountInput.value;
      expenseList[index].description = descInput.value;
      expenseList[index].type = typeInput.value;
    }
    editingId = null;
    form.querySelector("input[type=submit]").value = "Add";
  } else {
    // Add new item
    const expenseItem = {
      id: Date.now(),
      expenseAmount: amountInput.value,
      description: descInput.value,
      type: typeInput.value,
    };
    addData(expenseList, expenseItem);
  }

  // Clear and re-render list
  document.querySelector("#expense-list").innerHTML = "";
  for (let item of expenseList) {
    display(item);
  }

  // Clear form fields
  amountInput.value = "";
  descInput.value = "";
  typeInput.value = "";
}

function addData(expenseList, item) {
  expenseList.push(item);
}

function deleteData(id, li) {
  const index = expenseList.findIndex(item => item.id === id);
  if (index !== -1) {
    expenseList.splice(index, 1);
  }
  li.remove();
}

function editData(item) {
  const amountInput = document.querySelector("#amount");
  const descInput = document.querySelector("#description");
  const typeInput = document.querySelector("#type");

  amountInput.value = item.expenseAmount;
  descInput.value = item.description;
  typeInput.value = item.type;

  editingId = item.id; // Set the editing id

  const submitBtn = document.querySelector("input[type=submit]");
  submitBtn.value = "Update";
}

function display(item) {
  const ul = document.querySelector("#expense-list");
  const li = document.createElement("li");

  li.textContent = `${item.expenseAmount} ${item.description} ${item.type} `;

  let dltBtn = document.createElement("button");
  dltBtn.textContent = "Delete";
  dltBtn.addEventListener("click", () => {
    deleteData(item.id, li);
    // Re-render list after deletion
    ul.innerHTML = "";
    for (let item of expenseList) {
      display(item);
    }
  });

  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    editData(item);
  });

  li.appendChild(dltBtn);
  li.appendChild(editBtn);
  ul.appendChild(li);
}
