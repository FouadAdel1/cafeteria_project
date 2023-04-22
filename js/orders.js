//********* function  for get  users_orders data  ***********************  */
async function data_orders() {
    let res = await fetch("php/total_orders.php");
    let data = await res.json();
    console.log(data);
    data.forEach((element) => {
        createTable(element);
    })
    createAction();
}
data_orders();

// create table users
function createTable(element) {
    let plus = document.createElement("tr");
    plus.classList.add("view");
    plus.setAttribute("order_id", element.id);

    let empty = document.createElement("td");
    let orderDate = document.createElement("td");
    orderDate.className = "pcs";

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

    let userName = document.createElement("td");
    userName.classList.add("cur");
    userName.innerHTML = element.name;

    let room = document.createElement("td");
    room.classList.add("per");
    room.innerHTML = element.Room_number;

    let status = document.createElement("td");
    status.classList.add("per");
    status.innerHTML = element.status;

    let action = document.createElement("td");
    action.classList.add("per");

    // select box
    let selectBox = document.createElement("select");
    selectBox.classList.add("form-select", "text-black");
    action.appendChild(selectBox);
    selectBox.addEventListener("click", (e)=>{
        e.stopPropagation();
    })

    let option = document.createElement("option");
    option.innerHTML = "Change Status";
    option.setAttribute("selected", "true");
    selectBox.appendChild(option);

    let option1 = document.createElement("option");
    option1.innerHTML = "Out for delivery";
    selectBox.appendChild(option1);
    let option2 = document.createElement("option");
    option2.innerHTML = "Done";
    selectBox.appendChild(option2);
    let option3 = document.createElement("option");
    option3.innerHTML = "Cancel";
    selectBox.appendChild(option3);

    selectBox.addEventListener("change", function () {
        change_status(selectBox.value, element.id);
    })

    plus.appendChild(empty);
    plus.appendChild(orderDate);
    plus.appendChild(userName);
    plus.appendChild(room);
    plus.appendChild(status);
    plus.appendChild(action);

    let newRow = document.createElement("tr");
    newRow.classList.add("fold");

    document.querySelector("tbody").appendChild(plus);
    document.querySelector("tbody").appendChild(newRow);

    let orders = document.createElement("td");
    orders.setAttribute("colspan", "7");
    newRow.appendChild(orders);


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

            let showTotal = document.createElement("div");
            let showSpan = document.createElement("span");
            showTotal.classList.add("d-flex", "justify-content-end", "fw-bold", "me-4");
            showSpan.innerHTML = "Total Amount = " + element.total_price;

            divTable.appendChild(showTotal);
            showTotal.appendChild(showSpan);

            let userOrders = await userOrder(element.id);

            userOrders.forEach((product) => {
                let card = document.createElement("div");
                card.classList.add("card", "rounded-4", "col-4", "m-2", "bg-white");
                card.style.width = "15rem";
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
                cardp.innerHTML = "Amount";
                let pSpan = document.createElement("span");
                pSpan.classList.add("float-end");
                pSpan.innerHTML = product.quantity;
                cardp.appendChild(pSpan);

                cardDiv.appendChild(cardh5);
                cardDiv.appendChild(cardp);

            })

        }
        userOrderDetail();
    })

}

async function userOrder(order_id) {
    let id_users = new FormData();
    id_users.append("user", order_id);
    let result = await fetch("php/user_order.php", {
        method: "post",
        body: id_users,
    });
    let data = await result.json();
    console.log(data);
    return data;
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

//**********************function for change status of order  */
async function change_status(status, order_id) {
    let change = new FormData();
    change.append("status", status);
    change.append("order_id", order_id);
    let res = await fetch("php/change_status.php", {
        method: "post",
        body: change,
    });
    let data = await res.json();
    console.log(data);
    location.reload();
}