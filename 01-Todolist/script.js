const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let editFlag = false;
let editElement;

// menambah todo jika di klik enter
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// menambahkan todo list
function addTask() {
  if (inputBox.value === "") {
    alert("Please write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

// edit todo list
listContainer.addEventListener(
  "dblclick",
  function (e) {
    if (e.target.tagName === "LI") {
      let currentText = e.target.innerText.replace("\u00d7", "").trim();
      let newText = prompt("Edit your task:", currentText);
      if (newText !== null && newText !== "") {
        e.target.childNodes[0].nodeValue = newText + " ";
        saveData();
      }
    }
  },
  false
);

// hapus list
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

// localStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
