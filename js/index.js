let items = [];
let storedItems = localStorage.getItem("todo");
if (storedItems) {
  items = JSON.parse(storedItems);
  displayItems();
}

function addToDoItem() {
  let inputElement = document.querySelector("#TodoInputElement");
  let dateElement = document.querySelector("#dateInputElement");
  let todoItem = inputElement.value.trim();
  let todoDateItem = dateElement.value.trim();
  let fieldAlert = document.querySelector("#field-alert-message");
  if (todoItem !== "" || todoDateItem !== "") {
    if (todoItem.length < 3) {
      if (todoItem === "") {
        fieldAlert.style.display = "block";
        fieldAlert.innerText = "Todo field is empty, please enter value..";
      } else {
        fieldAlert.style.display = "block";
        fieldAlert.innerText =
          "please enter todo item field value more than 3 characters";
      }
    } else if (todoItem.length > 30) {
      fieldAlert.style.display = "block";
      fieldAlert.innerText =
        "please enter todo item field value less than 30 characters";
    } else if (todoDateItem === "") {
      fieldAlert.style.display = "block";
      fieldAlert.innerText = "due date field cannot be blank";
    } else {
      fieldAlert.style.display = "none";
      items.push({ item: todoItem, date: todoDateItem });
      localStorage.setItem("todo", JSON.stringify(items));
      displayItems();
    }
  } else {
    fieldAlert.style.display = "block";
    fieldAlert.innerText = "Todo field and due date field cannot be empty";
  }
  inputElement.value = "";
  dateElement.value = " ";
}

function displayItems() {
  let containerElement = document.querySelector(".containeritems");
  let newhtml = "";
  for (let i = 0; i < items.length; i++) {
    let { item, date } = items[i];
    newhtml += `
        <div class='result-container'>
         <span> ${item}<span>
         <span>${date}</span>
         <button class='delete' onClick = 'items.splice(${i}, 1); 
         localStorage.removeItem(${i},1);
         displayItems();
         '>Delete</button>
         <div>
         `;
  }
  containerElement.innerHTML = newhtml;
}
