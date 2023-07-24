let websiteNameInput = document.getElementById("websiteNameInput");
let URLInput = document.getElementById("URLInput");
let btnSubmit = document.getElementById("btnSubmit");
let tableBody = document.getElementById("tableBody");
let model = document.getElementById("model");
let overlay = document.getElementById("overlay");
let modelContentForValidation = document.getElementById(
  "modelContentForValidation"
);
let modelCotentForSameName = document.getElementById("modelCotentForSameName");

let regWebsiteName = /\w{3,}/;
var regURL =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

let list = [];

if (window.localStorage.getItem("list") !== null) {
  list = JSON.parse(window.localStorage.getItem("list"));
  displayList();
}

websiteNameInput.oninput = function () {
  if (regWebsiteName.test(websiteNameInput.value) === true) {
    websiteNameInput.classList.add("is-valid");
    websiteNameInput.classList.remove("is-invalid");
  } else {
    websiteNameInput.classList.remove("is-valid");
    websiteNameInput.classList.add("is-invalid");
  }
};

URLInput.oninput = function () {
  if (regURL.test(URLInput.value) === true) {
    URLInput.classList.add("is-valid");
    URLInput.classList.remove("is-invalid");
  } else {
    URLInput.classList.remove("is-valid");
    URLInput.classList.add("is-invalid");
  }
};

btnSubmit.addEventListener("click", function () {
  if (
    regWebsiteName.test(websiteNameInput.value) === true &&
    regURL.test(URLInput.value) === true
  ) {
    for (let i = 0; i < list.length; i++) {
      if (websiteNameInput.value === list[i].websiteName) {
        console.log("this name is already exist"); // message

        overlay.classList.replace("d-none", "d-block");
        model.classList.replace("d-none", "d-block");
        modelCotentForSameName.classList.replace("d-none", "d-block");

        return;
      }
    }

    let data = {
      websiteName: websiteNameInput.value,
      url: URLInput.value,
    };

    list.push(data);
    window.localStorage.setItem("list", JSON.stringify(list));
    displayList();

    websiteNameInput.value = "";
    URLInput.value = "";
    websiteNameInput.classList.remove("is-valid");
    URLInput.classList.remove("is-valid");
    return true;
  } else {
    overlay.classList.replace("d-none", "d-block");
    model.classList.replace("d-none", "d-block");
    modelContentForValidation.classList.replace("d-none", "d-block");

    return false;
  }
});

function displayList() {
  let temp = "";
  for (let i = 0; i < list.length; i++) {
    temp += `
       <tr>
            <td>${i + 1}</td>
            <td>${list[i].websiteName}</td>
            <td>
              <button class="btn btn-outline-success" onclick="visit(${i})">
                <i class="fa-solid fa-eye fa-sm"></i> Visit
              </button>
            </td>
            <td>
              <button class="btn btn-outline-danger" onclick="deleteItem(${i})">
                <i class="fa-solid fa-trash-can fa-sm"></i> Delete
              </button>
            </td>
          </tr>`;
  }
  tableBody.innerHTML = temp;
}

function deleteItem(i) {
  list.splice(i, 1);
  window.localStorage.setItem("list", JSON.stringify(list));
  displayList();
}

function visit(i) {
  console.log(list[i].url);
  window.open(`${list[i].url}`);
}

// for show model
function closeModel() {
  overlay.classList.remove("d-block");
  model.classList.remove("d-block");
  modelContentForValidation.classList.remove("d-block");
  modelCotentForSameName.classList.remove("d-block");

  overlay.classList.add("d-none");
  model.classList.add("d-none");
  modelContentForValidation.classList.add("d-none");
  modelCotentForSameName.classList.add("d-none");
}
