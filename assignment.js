window.onload = () => {
  const form1 = document.querySelector("#addForm");

  let items = document.getElementById("items");

  form1.addEventListener("submit", addItem);
  items.addEventListener("click", removeItem);
};

var objects = [];

function addItem(e) {
  e.preventDefault();

  if (submit.value != "Submit") {
    editItem.target.parentNode.childNodes[0].data =
      document.getElementById("item").value;
    editItem.target.parentNode.childNodes[1].data =
      document.getElementById("item-date").value;

    submit.value = "Submit";
    document.getElementById("item").value = "";

    document.getElementById("lblsuccess").innerHTML =
      "Text edited successfully";

    document.getElementById("lblsuccess").style.display = "block";

    setTimeout(function () {
      document.getElementById("lblsuccess").style.display = "none";
    }, 3000);

    return false;
  }

  let newItem = document.getElementById("item").value;
  let date = document.getElementById("item-date").value;
  document.getElementById("item").value = "";
  document.getElementById("item-date").value = "";

  let li = document.createElement("li");
  li.className = "list-group-item";

  let deleteButton = document.createElement("button");

  deleteButton.className = "btn-danger btn btn-sm float-right delete";

  deleteButton.appendChild(document.createTextNode("Delete"));

  let editButton = document.createElement("button");

  editButton.className = "btn-success btn btn-sm float-right edit";

  editButton.appendChild(document.createTextNode("Edit"));

  li.appendChild(document.createTextNode(newItem));
  li.appendChild(document.createTextNode(date));
  li.appendChild(deleteButton);
  li.appendChild(editButton);

  objects = [li, ...objects];

  sortToDos();
  renderAll();
  // items.appendChild(li);
}

function sortToDos() {
  var presentToDo = [];
  var futureToDo = [];
  var pastToDo = [];

  var today = new Date().toISOString().slice(0, 10);

  objects.forEach((ele) => {
    var element = ele.childNodes;
    if (element[1].data === today) {
      presentToDo.push(ele);
    } else if (element[1].data > today) {
      futureToDo.push(ele);
    } else {
      pastToDo.push(ele);
    }
  });

  console.log(objects);

  objects = [...presentToDo, ...futureToDo, ...pastToDo];

  console.log(objects);
}

function renderAll() {
  let items = document.getElementById("items");
  items.innerHTML = "";
  objects.forEach((ele) => {
    console.log(ele);
    items.appendChild(ele);
  });

  var list = document.querySelector("ul");
  list.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
      }
    },
    false
  );
}

function removeItem(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you Sure?")) {
      let li = e.target.parentNode;
      items.removeChild(li);
      document.getElementById("lblsuccess").innerHTML =
        "Text deleted successfully";

      document.getElementById("lblsuccess").style.display = "block";

      setTimeout(function () {
        document.getElementById("lblsuccess").style.display = "none";
      }, 3000);
    }
  }
  if (e.target.classList.contains("edit")) {
    document.getElementById("item").value =
      e.target.parentNode.childNodes[0].data;
    submit.value = "EDIT";
    editItem = e;
  }
}

function toggleButton(ref, btnID) {
  document.getElementById(btnID).disabled = false;
}
