let allData = [];

async function getAllProducts() {
  let result = await fetch("./php/list_product.php");
  let data = await result.json();
  numberOfPages(data);
}
getAllProducts();

manpulateResponseData(1);
async function manpulateResponseData(index) {
  let res = await fetch("./php/product_pagination.php", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      'index': index,
    }),
  });
  let data = await res.json();
  let fatherOfElementsToDelete = document.getElementById("all_product");
  while (fatherOfElementsToDelete.firstChild) {
    fatherOfElementsToDelete.firstChild.remove();
  }
  console.log(data);
  data.forEach((obj) => {
    console.log("hhh")
    createRow(obj);
  });
}


let tableBody = document.querySelector("tbody");
function createRow(obj) {
  let newRow = document.createElement("tr");
  let productName = document.createElement("td");
  let productPrice = document.createElement("td");
  let productImg = document.createElement("td");
  let productStatues = document.createElement("td");
  let events = document.createElement("td");
  let updateImg = createUpdateElement();
  let deleteImg = createDeleteElement();
  let img = document.createElement("img");
  img.setAttribute("src", `./images/products/${obj.product_pic}`);
  img.style.width = "30px";
  img.height.width = "30px";
  console.log(`${obj.product_pic}`);
  productName.innerHTML = obj.name;
  productPrice.innerHTML = obj.price;
  productStatues.innerHTML = obj.status;
  productImg.appendChild(img);
  events.appendChild(updateImg);
  events.appendChild(deleteImg);
  newRow.appendChild(productName);
  newRow.appendChild(productPrice);
  newRow.appendChild(productImg);
  newRow.appendChild(productStatues);
  newRow.appendChild(events);
  tableBody.appendChild(newRow);

  updateImg.addEventListener("click", () => {
    document.getElementsByName("name")[0].value = obj.name;
    document.getElementsByName("price")[0].value = obj.price;
    document.getElementsByName("status")[0].value = obj.status;
    document.getElementsByName("img")[0].value = obj.product_pic;
    // console.log((src = `./images/products/${obj.product_pic}`));

    document.getElementsByName("id")[0].value = obj.id;
    getAllCategory();
  });

  deleteImg.addEventListener("click", () => {
    deletProduct(obj.id);
  });
  let btnUpload=document.getElementById('button-upload');
  btnUpload.addEventListener("change",(e)=>{
  const file = e.target.files[0];
  document.getElementsByName("img")[0].value = file?.name;
  });
}

function createUpdateElement() {
  let updateImg = document.createElement("i");
  updateImg.classList.add("btn", "editBtn", "mx-2");
  updateImg.innerHTML = "edit";
  updateImg.setAttribute("data-bs-target", "#exampleModal");
  updateImg.setAttribute("data-bs-toggle", "modal");
  return updateImg;
}

function createDeleteElement() {
  let deleteImg = document.createElement("i");
  deleteImg.classList.add("btn", "btn-danger", "mx-2");
  deleteImg.innerHTML = "delete";
  return deleteImg;
}

async function deletProduct(productId) {
  let product = {
    productToDelete: `${productId}`,
  };
  let result = await fetch("./php/delete_product.php", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  let data = await result.json();
  cheackIFdeletedElement(data);
}

function cheackIFdeletedElement(obj) {
  if (obj.status == "deleted successfully") {
    location.reload();
  }
}

let select = document.getElementById("category");
async function getAllCategory() {
  let result = await fetch("./php/getAllCategory.php");
  let data = await result.json();
  console.log(data);
  for (const key in data) {
    let opteion = document.createElement("option");
    console.log(key);
    opteion.innerHTML = data[key].name;
    opteion.setAttribute("value", data[key].id);
    select.appendChild(opteion);
  }
}

let addBtn = document.getElementById("add_btn");
addBtn.addEventListener("click", () => {
  window.open("./add_product.html", "_self");
});

// number of pages pagination
function numberOfPages(data) {
  let x = data.length / 4;
  let NumberOfPages = Math.ceil(x);
  for (let i = 1; i < NumberOfPages + 1; i++) {
    let row = `<li class="page-item my-3"><a onclick=manpulateResponseData(${i}) class="page-link bg-black " style="color:#CA8E46;">${i}</a></li>`;
    document.getElementById("pagination").innerHTML += row;
  }
}
