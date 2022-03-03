//DOM
const textInput = document.querySelector("#text-input");
const newItemContainer = document.querySelector(".new-items-container");
const savebtn = document.querySelector("button");
const addedItems = document.getElementsByClassName("new-item");

//variables for local storage
let input = "";
let localStorageArr = [];

checkLocalStorage();

//check if local storage is empty or not
function checkLocalStorage() {
  if (localStorage.getItem("toDo") !== null) {
    const retriveLS = JSON.parse(localStorage.getItem("toDo"));

    //loop through retrived local storage, and push each one individually to localStorageArr
    for (const k of retriveLS) {
      localStorageArr.push(k);
    }
    //add item which stored in local storage in display
    for (const i of localStorageArr) {
      let item = document.createElement("p");
      item.className = "new-item";
      item.innerText = `• ${i}`;
      newItemContainer.appendChild(item);
    }
  }
}

//click button to show input value
savebtn.addEventListener("click", addItems);

function addItems(e) {
  if (textInput.value == "") {
    return;
  } else {
    //create new p and display input value
    let item = document.createElement("p");
    item.className = "new-item";
    item.innerText = `• ${textInput.value}`;
    newItemContainer.appendChild(item);

    //save input value in variable, then push it into array, and then stringify whole array and upload to localstorage
    input = textInput.value;
    localStorageArr.push(input);
    localStorage.setItem("toDo", JSON.stringify(localStorageArr));

    //after saved to local storage, clear text input field to get ready for next input
    textInput.value = "";

    //click to delete and remove and update local storage (newly added items)
    item.addEventListener("click", () => {
      let index = localStorageArr.indexOf(item.textContent);
      localStorageArr.splice(index, 1);
      localStorage.setItem("toDo", JSON.stringify(localStorageArr));
      newItemContainer.removeChild(item);
    });
  }
}

//loop through local storage saved items and click to delete (items retrived from local storage)
for (const j of addedItems) {
  j.addEventListener("click", () => {
    let index = localStorageArr.indexOf(j.textContent);
    localStorageArr.splice(index, 1);
    localStorage.setItem("toDo", JSON.stringify(localStorageArr));
    newItemContainer.removeChild(j);
  });
}
