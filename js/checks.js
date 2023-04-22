// get user data
getUserData();
let allDataUsers = [];
let allData = [];

// get user data
async function getUserData() {
    let result = await fetch("php/getUserOrderDone.php");
    let data = await result.json();
    allDataUsers = data;
    allData = data;
    numberOfPages(data);
    createOptions(data);
}

// get date from 
let rejexDate = /^(?:(?:1[6-9]|[2-9]\d)?\d{2})(?:(?:(\/|-|\.)(?:0?[13578]|1[02])\1(?:31))|(?:(\/|-|\.)(?:0?[13-9]|1[0-2])\2(?:29|30)))$|^(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-|\.)0?2\3(?:29)$|^(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:0?[1-9]|1\d|2[0-8])$/;
let from = document.getElementById("from");
let dateFrom;
let dateFormatFrom;
from.addEventListener("focusout", function (e) {
    dateFrom = e.target.value;
    let arr = dateFrom.split("/");
    dateFormatFrom = arr[2] + "-" + arr[1] + "-" + arr[0];
    getUserDataIndex(1)
});

// get date to 
let to = document.getElementById("to");
let dateTo;
let dateFormatTo;
to.addEventListener("focusout", function (e) {
    dateTo = e.target.value;
    let arr = dateTo.split("/");
    dateFormatTo = arr[2] + "-" + arr[1] + "-" + arr[0];
    getUserDataIndex(1)
});


// get data by index pagination
async function getUserDataIndex(index) {
    // check date filter here
    let data = [];
    if (document.getElementsByClassName("pagination-div")[0].classList.contains('d-none')) {
        document.getElementsByClassName("pagination-div")[0].classList.remove('d-none');
    }

    if (dateFormatFrom && dateFormatFrom.match(rejexDate) && dateFormatTo && dateFormatTo.match(rejexDate)) {
        let res = await fetch("php/filterDateFromToChecks.php", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "from": dateFormatFrom,
                "to": dateFormatTo,
                "index": index,
            })

        });
        data = await res.json();

        // get all data from to
        let resAll = await fetch("php/getUserOrderFromToAll.php", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "from": dateFormatFrom,
                "to": dateFormatTo,
                "index": index,
            })
        });
        allData = await resAll.json();
        numberOfPages(allData);
    } else if (dateFormatFrom && dateFormatFrom.match(rejexDate)) {
        let res = await fetch("php/filterDateFromChecks.php", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "from": dateFormatFrom,
                "index": index,
            })

        });
        data = await res.json();
        console.log("from")
        // get all data from to
        let resAll = await fetch("php/getUserOrderFromAll.php", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "from": dateFormatFrom,
                "index": index,
            })
        });
        allData = await resAll.json();
        numberOfPages(allData);
        console.log(allData)
    } else if (dateFormatTo && dateFormatTo.match(rejexDate)) {
        let res = await fetch("php/filterDateToChecks.php", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "to": dateFormatTo,
                "index": index,
            })

        });
        data = await res.json();
        console.log("from")
        // get all data from to
        let resAll = await fetch("php/getUserOrderToAll.php", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "to": dateFormatTo,
                "index": index,
            })
        });
        allData = await resAll.json();
        numberOfPages(allData);
        console.log(allData)
    } else {
        let res = await fetch("php/getUserTotalPriceIndex.php", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "index": index,
            })

        });
        data = await res.json();

    }

    // numberOfPages(allData);
    let fatherOfElementsToDelete = document.getElementById("table-check");

    while (fatherOfElementsToDelete.firstChild) {
        fatherOfElementsToDelete.firstChild.remove();
    }
    data.forEach((element) => {
        createTable(element);

    })
    createAction();
}
getUserDataIndex(1);

// get single user for filter user
async function getSingleUserData(user_id) {
    let res = await fetch("php/getSingleUserTotalPrice.php", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id": user_id
        })
    });
    let data = await res.json();

    let fatherOfElementsToDelete = document.getElementById("table-check");

    while (fatherOfElementsToDelete.firstChild) {
        fatherOfElementsToDelete.firstChild.remove();
    }
    createTable(data);
    createAction();
}

// create filter users
function createOptions(data) {
    data.forEach((element) => {
        let selected = document.querySelector("select");
        let newOptin = document.createElement("option");
        newOptin.value = element.id;
        newOptin.text = element.name;
        selected.appendChild(newOptin);
    })
}

// number of pages pagination
function numberOfPages(data) {

    while (document.getElementById("pagination").firstChild) {
        document.getElementById("pagination").firstChild.remove()
    }

    console.log(data);
    let x = data.length / 2;
    let NumberOfPages = Math.ceil(x);
    for (let i = 1; i < NumberOfPages + 1; i++) {
        let row = `<li class="page-item my-3"><a onclick=getUserDataIndex(${i}) class="page-link bg-black " style="color:#fff;">${i}</a></li>`;
        document.getElementById("pagination").innerHTML += row;
    }
}

// create table users
function createTable(element) {

    let plus = document.createElement("tr");
    plus.classList.add("view");
    plus.setAttribute("user_id", element.id);

    let empty = document.createElement("td");
    let userName = document.createElement("td");
    userName.className = "pcs"
    userName.innerHTML = element.name;
    let totalAmount = document.createElement("td");
    totalAmount.classList.add("cur");
    totalAmount.innerHTML = element.total_price;
    plus.appendChild(empty);
    plus.appendChild(userName);
    plus.appendChild(totalAmount);

    let newRow = document.createElement("tr");
    newRow.className = "fold"
    newRow.setAttribute("user_id_fold", element.id);

    document.querySelector("tbody").appendChild(plus);
    document.querySelector("tbody").appendChild(newRow);

    let orders = document.createElement("td");
    orders.setAttribute("colspan", "7");
    newRow.appendChild(orders);

    let divTable = document.createElement("div");
    divTable.className = "fold-content";
    orders.appendChild(divTable);

    let hOrder = document.createElement("h3");
    hOrder.innerHTML = "Orders";
    hOrder.classList.add("text-black")
    divTable.appendChild(hOrder);

    // show user orders 
    // send request
    plus.addEventListener("click", () => {

        let numberOfElementsToDelete = document.querySelectorAll(".fold-table-order").length;
        if (numberOfElementsToDelete) {
            for (let i = 0; i < numberOfElementsToDelete; i++) {
                document.querySelectorAll(".fold-table-order")[0].remove();
            }
        }

        createOrdersUser(divTable, element.id);

    })

}

// create table orders
function createOrdersUser(divTable, user_id) {
    const userOrders = async () => {
        let newTable = document.createElement("table");
        newTable.classList.add("fold-table-order");
        divTable.appendChild(newTable);

        let tableHead = document.createElement("thead");
        newTable.appendChild(tableHead);

        let newTableTR = document.createElement("tr");
        tableHead.appendChild(newTableTR);

        let newTRth1 = document.createElement("th");

        let newTRth2 = document.createElement("th");
        newTRth2.innerHTML = "Order Date";
        let newTRth3 = document.createElement("th");
        newTRth3.innerHTML = "Amount";

        newTableTR.appendChild(newTRth1);
        newTableTR.appendChild(newTRth2);
        newTableTR.appendChild(newTRth3);

        let userOrder;
        if (dateFormatFrom && dateFormatFrom.match(rejexDate) && dateFormatTo && dateFormatTo.match(rejexDate)) {
            userOrder = await getUserordesFilter(user_id,dateFormatFrom,dateFormatTo);
        } else if(dateFormatFrom && dateFormatFrom.match(rejexDate)){
            userOrder = await getUserordesFilterFrom(user_id,dateFormatFrom);
        } else if(dateFormatTo && dateFormatTo.match(rejexDate)){
            userOrder = await getUserordesFilterTo(user_id,dateFormatTo);
        } else {
            userOrder = await getUserordes(user_id);
        }


        newTbody = document.createElement("tbody");
        newTable.appendChild(newTbody);

        userOrder.forEach((item) => {
            createRowOrdersTime(newTbody, item)
        })
        createActionOrder();

    }
    userOrders();
}

// create order row
function createRowOrdersTime(newTbody, item) {
    let newOrdertr = document.createElement("tr");
    newOrdertr.classList.add("view-order");
    newTbody.appendChild(newOrdertr);

    let newTrEmpty = document.createElement("tr");
    let newTrTd = document.createElement("td");
    newTrTd.classList.add("pcs");

    let date = item.created_at.split(/[- :]/);
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
    newTrTd.innerHTML = date[0] + '-' + date[1] + '-' + date[2] + "  " + strTime;

    let newTrTd2 = document.createElement("td");
    newTrTd2.classList.add("cur");
    newTrTd2.innerHTML = item.total_price;
    newOrdertr.appendChild(newTrEmpty);
    newOrdertr.appendChild(newTrTd);
    newOrdertr.appendChild(newTrTd2);

    let newOrdertr2 = document.createElement("tr");
    newOrdertr2.classList.add("fold-order");
    newTbody.appendChild(newOrdertr2);

    let newOrdertr2td = document.createElement("td");
    newOrdertr2td.setAttribute("colspan", "7");
    newOrdertr2.appendChild(newOrdertr2td);

    let CardDiv = document.createElement('div');
    CardDiv.classList.add("d-flex", "flex-wrap")
    newOrdertr2td.appendChild(CardDiv);

    const userOrderDetails = async () => {
        let details = await getordeDetails(item.id);
        details.forEach((detail) => {

            const userOrderProduct = async () => {
                let products = await getProductDetails(detail.product_id);
                products.forEach((product) => {

                    let card = document.createElement("div");
                    card.classList.add("card", "rounded-4", "col-4", "m-2", "bg-white");
                    card.style.width = "15rem";
                    CardDiv.appendChild(card);

                    let img = document.createElement("img");
                    img.setAttribute("src", "./images/products/" + product.product_pic);
                    img.classList.add("card-img-top");
                    img.height= 200;
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
                    cardp.innerHTML = "Amount";
                    let pSpan = document.createElement("span");
                    pSpan.classList.add("float-end");
                    pSpan.innerHTML = detail.quantity;
                    cardp.appendChild(pSpan);

                    cardDiv.appendChild(cardh5);
                    cardDiv.appendChild(cardp);

                })
            }
            userOrderProduct();
        })
    }

    userOrderDetails();

}

// create user action button
function createAction() {
    let action = document.querySelectorAll(".fold-table tr.view")
    for (let i = 0; i < action.length; i++) {
        action[i].addEventListener("click", function () {
            if ($(this).hasClass("open")) {
                $(this).removeClass("open").next(".fold").removeClass("open");
            } else {
                $(".fold-table tr.view").removeClass("open").next(".fold").removeClass("open");
                $(this).addClass("open").next(".fold").addClass("open");
            }
        });
    }

}

// create order action button
function createActionOrder() {
    let action2 = document.querySelectorAll(".fold-table .fold-table-order tr.view-order")
    for (let i = 0; i < action2.length; i++) {
        action2[i].addEventListener("click", function () {
            if ($(this).hasClass("open-order")) {
                $(this).removeClass("open-order").next(".fold-order").removeClass("open-order");
            } else {
                $(".fold-table .fold-table-order tr.view-order").removeClass("open-order").next(".fold-order").removeClass("open-order");
                $(this).addClass("open-order").next(".fold-order").addClass("open-order");
            }
        });
    }
}

// get users Orders
async function getUserordes(id) {
    let res = await fetch("php/getSingleUserOrder.php", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id": id
        })

    });
    let data = await res.json();
    return data;
}

// get users Orders filter
async function getUserordesFilter(id, from, to) {
    let res = await fetch("php/getOrdersFromTo.php", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id": id,
            "from": from,
            "to": to
        })

    });
    let data = await res.json();
    return data;
}

// get users Orders filter from
async function getUserordesFilterFrom(id, from) {
    let res = await fetch("php/getOrdersFrom.php", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id": id,
            "from": from
        })

    });
    let data = await res.json();
    return data;
}

// get users Orders filter to
async function getUserordesFilterTo(id, to) {
    let res = await fetch("php/getOrdersTo.php", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id": id,
            "to": to
        })

    });
    let data = await res.json();
    return data;
}

// get order details
async function getordeDetails(id) {
    let res = await fetch("php/getOrderDetailsChecks.php", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "order_id": id
        })

    });
    let data = await res.json();
    return data;
}

// get Product Details
async function getProductDetails(id) {
    let res = await fetch("php/productOrderDetailsChecks.php", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "product_id": id
        })

    });
    let data = await res.json();
    return data;
}

// filter users
let select = document.getElementById("select");
select.addEventListener("change", function (e) {
    let value = select.value;
    if (value == "Users") {
        document.getElementsByClassName("pagination-div")[0].classList.remove('d-none');
        numberOfPages(allDataUsers);
        dateFormatFrom = '';
        from.value = '';
        dateFormatTo = '';
        to.value = '';

        getUserDataIndex(1);
    } else {
        document.getElementsByClassName("pagination-div")[0].classList.add('d-none');
        getSingleUserData(value);
    }
});
