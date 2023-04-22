getUserOrders();

let currentPage = 1;
let itemsPerPage = 5;
//users will recive the data from the server
let users = [];
let dataWithImg = [];
let manyOrders = [];

let rejexDate = /^(?:(?:1[6-9]|[2-9]\d)?\d{2})(?:(?:(\/|-|\.)(?:0?[13578]|1[02])\1(?:31))|(?:(\/|-|\.)(?:0?[13-9]|1[0-2])\2(?:29|30)))$|^(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-|\.)0?2\3(?:29)$|^(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:0?[1-9]|1\d|2[0-8])$/;
let from = document.getElementById("from");
let dateFrom;
let dateFormatFrom;
let to = document.getElementById("to");
let dateTo;
let dateFormatTo;
let flage = 0;

//getuserorders () to return promise 
async function getUserOrders() {
  let res = await fetch("./php/userOrder.php");
  let data = await res.json();
  users = data;
  numberOfPages(data);
  page(1);

}

function numberOfPages(data) {

  while (document.getElementById("pagination").firstChild) {
    document.getElementById("pagination").firstChild.remove()
  }

  let x = data.length / 4;
  let NumberOfPages = Math.ceil(x);
  for (let i = 1; i < NumberOfPages + 1; i++) {
    let row = `<li class="page-item my-3"><a onclick=page(${i}) class="page-link bg-black " style="color:#fff;">${i}</a></li>`;
    document.getElementById("pagination").innerHTML += row;
  }
}

function page(x) {
  let index = x;
  let start = (index - 1) * 4;
  let end = (index * 4);
  let numberOfElementsToDelete = document.getElementById("table-data");
  while (numberOfElementsToDelete.firstChild) {
    numberOfElementsToDelete.firstChild.remove();
  }

  if (flage == 1 && dateFormatFrom && dateFormatFrom.match(rejexDate) && dateFormatTo && dateFormatTo.match(rejexDate)) {
    let startDate = dateFormatFrom + " 00:00:00";
    let endDate = dateFormatTo + " 00:00:00";
    let tableData = [];

    users.forEach((user) => {
      if (user.created_at >= startDate && user.created_at <= endDate) {
        tableData.push(user);
      }
    });
    numberOfPages(tableData);
    for (let k = start; k < end; k++) {
      if (k == tableData.length) {
        createAction();
        return;
      }
      userOrderTable(tableData[k]);
    }
    
  } else {
    for (let k = start; k < end; k++) {
      if (k == users.length) {
        return;
      }
      userOrderTable(users[k]);
    }
  }
  createAction();
}

var indexoforder = 1;

function displayUserOrders() {
  let startDate = document.getElementById("start").value + " 00:00:00";
  let endDate = document.getElementById("end").value + " 00:00:00";
  let tableData = "";

  usersToDisplay.forEach((user) => {
    if (user.created_at >= startDate && user.created_at <= endDate) {
      tableData += userOrderRawData(user);
      // createPagination();
    }
  });
  document.querySelector("#table-data").innerHTML = tableData;
}

var userindex = 0;

function userOrderTable(element) {
  let actionButton = '';
  if (element.status == 'Processing') {
    actionButton = `<button onclick="cancelOrder(${element.id})" class="btn btn-danger" >Cancel</button>`
  }

  let plus = document.createElement("tr");
  plus.classList.add("view");
  plus.setAttribute("order_id", element.id);

  let empty = document.createElement("td");
  let orderDate = document.createElement("td");
  orderDate.className = "pcs"

  let date = element.created_at.split(/[- :]/);
  var strTime;
  hours = date[3];
  minutes = date[4];
  var ampm = hours >= 12 ? 'pm' : 'am';
  if (hours >= 12) {
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? minutes : minutes;
    if (hours >= 10) {
      strTime = hours + ':' + minutes + ' ' + ampm;
    } else {
      strTime = '0' + hours + ':' + minutes + ' ' + ampm;
    }
  } else {
    strTime = date[3] + ":" + date[4] + " " + ampm;
  }
  orderDate.innerHTML = date[0] + '-' + date[1] + '-' + date[2] + "  " + strTime;

  let status = document.createElement("td");
  status.classList.add("cur");
  status.innerHTML = element.status;

  let total_price = document.createElement("td");
  total_price.classList.add("per");
  total_price.innerHTML = element.total_price;

  let action = document.createElement("td");
  action.classList.add("per");
  action.innerHTML = actionButton;


  plus.appendChild(empty);
  plus.appendChild(orderDate);
  plus.appendChild(status);
  plus.appendChild(total_price);
  plus.appendChild(action);

  let newRow = document.createElement("tr");
  newRow.classList.add("fold");

  document.querySelector("tbody").appendChild(plus);
  document.querySelector("tbody").appendChild(newRow);

  let orders = document.createElement("td");
  orders.setAttribute("colspan", "7");
  newRow.appendChild(orders);
  // ------show data

  plus.addEventListener("click", function (e) {

    let numberOfElementsToDelete = document.querySelectorAll(".fold-content").length;
    if (numberOfElementsToDelete) {
      for (let i = 0; i < numberOfElementsToDelete - 1; i++) {
        document.querySelectorAll(".fold-content")[0].remove();
      }
    }

    let divTable = document.createElement("div");
    divTable.className = "fold-content";
    orders.appendChild(divTable);

    // create Card
    const userOrderDetail = async () => {
      let CardDiv = document.createElement('div');
      CardDiv.classList.add("d-flex", "flex-wrap", "fold-content")
      divTable.appendChild(CardDiv);

      let userOrders = await getOrderDetails(element.id);

      userOrders.forEach((product) => {
        let card = document.createElement("div");
        card.classList.add("card", "rounded-4", "col-4", "m-2", "bg-white");
        card.style.width = "12rem";
        CardDiv.appendChild(card);

        let img = document.createElement("img");
        img.setAttribute("src", "./images/products/" + product.product_pic);
        img.classList.add("card-img-top");
        img.height = 200;
        card.appendChild(img);

        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card-body");
        card.appendChild(cardDiv);

        let cardh5 = document.createElement("h5");
        cardh5.classList.add("card-title", "text-black");
        cardh5.innerHTML = product.name;
        let h5Span = document.createElement("span");
        h5Span.classList.add("float-end");
        h5Span.innerHTML = product.price;
        cardh5.appendChild(h5Span);

        let cardp = document.createElement("p");
        cardp.classList.add("card-text", "text-black");
        // cardp.innerHTML = "Amount";
        let pSpan = document.createElement("span");
        pSpan.classList.add("float-end");
        // pSpan.innerHTML = product.quantity;
        cardp.appendChild(pSpan);

        cardDiv.appendChild(cardh5);
        cardDiv.appendChild(cardp);

      })

    }
    userOrderDetail();
  })
}

// create order action button
function createAction() {
  $(function () {
    $(".fold-table tr.view").on("click", function () {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open").next(".fold").removeClass("open");
      } else {
        $(".fold-table tr.view").removeClass("open").next(".fold").removeClass("open");
        $(this).addClass("open").next(".fold").addClass("open");
      }
    });
  });
}

///////////////////////////////////////img////////////////////////////////////

async function getOrderDetails(order_id) {
  let user = { id: order_id }
  let fetcH = await fetch('./php/getAllOrder.php', {
    method: 'POST',
    body: JSON.stringify(user),
  })

  let data = await fetcH.json();
  manyOrders = data;
  return data;
}
////////////cancel order////////////

async function cancelOrder(order_id) {
  let user = { id: order_id }
  let result = await fetch('./php/cancelOrder.php', {
    method: 'POST',
    body: JSON.stringify(user),
  })
  let data = await result.json();
  location.reload();
}

from.addEventListener("focusout", function (e) {
  dateFrom = e.target.value;
  let arr = dateFrom.split("/");
  dateFormatFrom = arr[2] + "-" + arr[1] + "-" + arr[0];
  flage = 1;

  if (flage == 1 && dateFormatFrom && dateFormatFrom.match(rejexDate) && dateFormatTo && dateFormatTo.match(rejexDate)) {
    page(1);
  }
});



to.addEventListener("focusout", function (e) {
  dateTo = e.target.value;
  let arr = dateTo.split("/");
  dateFormatTo = arr[2] + "-" + arr[1] + "-" + arr[0];

  if (flage == 1 && dateFormatFrom && dateFormatFrom.match(rejexDate) && dateFormatTo && dateFormatTo.match(rejexDate)) {
    page(1);
  }
});

