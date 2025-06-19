document.addEventListener("DOMContentLoaded", intialize);

const form = document.querySelector("form")

let expenseList = [];

function intialize() {
  for (let item of expenseList) {
    display(item);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const expenseAmount = event.target.amount.value;
  const description = event.target.description.value;
  const type = event.target.type.value;

  const expenseItem = {
    id: Date.now(),
    expenseAmount,
    description,
    type,
  };

  addData(expenseList, expenseItem);

  for (let item of expenseList) {
    display(item);
  }

  expenseAmount.value = ""
  description.value = ""
  type.value = ""

}

function addData(expenseList, item) {
  expenseList.push(item);
}

function deleteData(id, li) {
    // Find the index of the item to delete
    const index = expenseList.findIndex(item => item.id === id);
    if (index !== -1) {
        // Remove the item from the array
        expenseList.splice(index, 1);
    }

    // Remove the corresponding DOM element
    li.remove()
}

function display(item){
    const ul = document.querySelector("#expense-list")

    const li = document.createElement("li")

    li.id = "item"
    li.textContent = `${item.expenseAmount} ${item.description} ${item.type}`

    let dltBtn = document.createElement("button")
    dltBtn.id = "delete"
    dltBtn.textContent = "Delete"

    dltBtn.addEventListener("click", () => {
        deleteData(item.id, li)
    })

    li.appendChild(dltBtn)
    ul.appendChild(li)
}
