window.onload=getProducts();
let arr=[];
async function getProducts()
{
    fetch("./php/userHome.php",{
    method:'GET'
    }).then(response => 
        response.json()
        
    ).then((data)=>{
    arr=data;
    numberOfPages(data)
    page(1);
    }) 
}

function numberOfPages(data)
{
    let x=data.length/8;
    NumberOfPages=Math.ceil(x);
    for(let i=1;i<NumberOfPages+1;i++)
    {
        let row=`<li class="page-item"><a onclick=page(${i}) class="page-link">${i}</a></li>`;
        document.getElementById("pagination").innerHTML+=row;
    }
}


function page(x)
{
    let index=x;
    let start=(index-1)*8;
    let end=(index*8);
    let numberOfElementsToDelete=document.getElementsByClassName("product").length;
    
    for(let i=0;i<numberOfElementsToDelete;i++)
    {
      document.getElementsByClassName("product")[0].remove();
    }

    
    for(let k=start;k<end;k++)
    {
       if(k==arr.length)
       {
        return;
       }
        createProduct(arr[k])
    }
}

async function search() {
  let element = document.getElementsByName("word")[0];
  let word = element.value;

  let res = await fetch("./php/search.php", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify({ words: word }),
  });
  let data = await res.json();
  displaySearchedData(data);
}

function displaySearchedData(data)
{
    document.getElementById("hide").style.display='none';
    document.getElementById("hide2").style.display='none';
    document.getElementById("hide4").style.display='none';

    document.getElementsByClassName("pagination-div")[0].classList.add('hidePagination');
    let numberOfElementsToDelete=document.getElementsByClassName("search-product").length;
    
    for(let i=0;i<numberOfElementsToDelete;i++)
    {
      document.getElementsByClassName("search-product")[0].remove();
    }
    
    for(let k=0;k<data.length;k++)
    {
        createSearchProduct(data[k]);
    }

  let input = document.getElementsByName("word")[0].value;

  if (input == "") {
    let numberOfElementsToDelete =
      document.getElementsByClassName("search-product").length;
    for (let i = 0; i < numberOfElementsToDelete; i++) {
      document.getElementsByClassName("search-product")[0].remove();
    }
        document.getElementById("hide").style.display='block';
        document.getElementById("hide2").style.display='block';
        document.getElementById("hide4").style.display='block';


        document.getElementsByClassName("pagination-div")[0].classList.remove('hidePagination');
    }
}

async function getLatestOrder() {
  fetch("./php/getLatestOrder.php")
    .then((response) => response.json())
    .then((data) => {
      lastOrder(data);
    });
}
function lastOrder(data) {
  for (let k = 0; k < data.length; k++) {
    createLatestProduct(data[k]);
  }
}
getLatestOrder();

function createProduct(object)
{
    let parent=document.getElementById("row");
    let div1=document.createElement("div");
    let div2=document.createElement("div");
    let img=document.createElement("img");
    let div3=document.createElement("div");
    
    let h4=document.createElement("h4");
    let p=document.createElement("span");

    let dollar=document.createElement("span");
    let price=document.createElement("span");

    div1.setAttribute("id","cart-div");
    div1.classList.add("product","my-3","col-10","col-sm-8","col-md-6","col-lg-4","col-xl-3","rounded-4","bg-black");
    div2.classList.add("card","rounded-4");
    // div2.style.width="18rem";
    img.setAttribute("src","./images/products/"+object.product_pic);
    img.classList.add("card-img-top");
    div3.classList.add("card-body");
    h4.classList.add("card-title","text-center","text-uppercase","fs-5");
    h4.innerHTML=object.name;
    p.classList.add("card-text","d-flex","justify-content-center","fs-5");
    // p.innerHTML=object.price;
    
    dollar.innerHTML="$";
    price.innerHTML=object.price;

    div1.appendChild(div2);
    div2.appendChild(img);
    div2.appendChild(div3);
    div3.appendChild(h4)
    div3.appendChild(p)
    p.appendChild(price);
    p.appendChild(dollar);
    parent.appendChild(div1)
    let id=object.id;
    div1.addEventListener("click",(e)=>
    {
        let flag=0;
        let numberOfTr=document.getElementById("tbody").childNodes;
        if(numberOfTr.length==0)
        {
            addToCart(e.target.parentNode.children[1].children,id);
        }
        else
        {
           for(let i =0;i<numberOfTr.length;i++)
            {
                if(numberOfTr[i].firstChild.innerHTML==h4.innerHTML)
                {
                    flag=0;
                    return;
                }
                else
                {
                    flag=1;
                }
            }
        }
        if(flag)
        {
            addToCart(e.target.parentNode.children[1].children,id);
        }
    })
    
}

function createLatestProduct(object)
{
    let parent=document.getElementById("row1");
    let div1=document.createElement("div");
    let div2=document.createElement("div");
    let img=document.createElement("img");
    let div3=document.createElement("div");
    let h4=document.createElement("h4");
    let p=document.createElement("span");
    div1.setAttribute("id","cart-div");
    div1.classList.add("col-md-5","my-3","rounded-4","bg-black");
    div2.classList.add("card","rounded-4");
    // div2.style.width="18rem";
    img.setAttribute("src","./images/products/"+object.product_pic);
    img.classList.add("card-img-top");
    div3.classList.add("card-body");
    h4.classList.add("card-title","text-center","text-uppercase","fs-5");
    h4.innerHTML=object.name;
    p.classList.add("card-text","d-flex","justify-content-center","fs-5");
    
    let dollar=document.createElement("span");
    let price=document.createElement("span");

    dollar.innerHTML="$";
    price.innerHTML=object.price;

    p.appendChild(price);
    p.appendChild(dollar);

    div1.appendChild(div2);
    div2.appendChild(img);
    div2.appendChild(div3);
    div3.appendChild(h4)
    div3.appendChild(p)
    parent.appendChild(div1)
    let flag=0;
    let id=object.id;

    div1.addEventListener("click",(e)=>
    {
        let numberOfTr=document.getElementById("tbody").childNodes;
        if(numberOfTr.length==0)
        {
            addToCart(e.target.parentNode.children[1].children,id);
        }
        else
        {
           for(let i =0;i<numberOfTr.length;i++)
            {
                if(numberOfTr[i].firstChild.innerHTML==h4.innerHTML)
                {
                    flag=0;
                    return;
                }
                else
                {
                    flag=1;
                }
            }
        }
        if(flag)
        {
            addToCart(e.target.parentNode.children[1].children,id);
        }
    })
    
}


function createSearchProduct(object)
{
    let parent=document.getElementById("search");
    let div1=document.createElement("div");
    let div2=document.createElement("div");
    let img=document.createElement("img");
    let div3=document.createElement("div");
    let h4=document.createElement("h4");
    let p=document.createElement("span");
    div1.setAttribute("id","cart-div");
    div1.classList.add("col-md-5","my-5","rounded-4","bg-black","search-product");
    div2.classList.add("card","rounded-4");
    // div2.style.width="18rem";
    img.setAttribute("src","./images/products/"+object.product_pic);
    img.classList.add("card-img-top");
    div3.classList.add("card-body");
    h4.classList.add("card-title","text-center","text-uppercase","fs-5");
    h4.innerHTML=object.name;
    p.classList.add("card-text","d-flex","justify-content-center","fs-5");
   
    let dollar=document.createElement("span");
    let price=document.createElement("span");

    dollar.innerHTML="$";
    price.innerHTML=object.price;

    
    div1.appendChild(div2);
    div2.appendChild(img);
    div2.appendChild(div3);
    div3.appendChild(h4);
    div3.appendChild(p);
    parent.appendChild(div1);
    p.appendChild(price);
    p.appendChild(dollar);
    let flag=0;
    let id=object.id;
    div1.addEventListener("click",(e)=>
    {
        let numberOfTr=document.getElementById("tbody").childNodes;
        if(numberOfTr.length==0)
        {
            addToCart(e.target.parentNode.children[1].children,id);
        }
        else
        {
           for(let i =0;i<numberOfTr.length;i++)
            {
                if(numberOfTr[i].firstChild.innerHTML==h4.innerHTML)
                {
                    flag=0;
                    return;
                }
                else
                {
                    flag=1;
                }
            }
        }
        if(flag)
        {
            addToCart(e.target.parentNode.children[1].children,id);
        }
    })
    
}


function addToCart(x,id)
{

    let product_id=id;
    //display order-section
    document.getElementById("submit-order").removeAttribute("disabled");

    let total_price=document.getElementById("total-price");

    let tbody=document.getElementById("tbody");
    let parent=x;
    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let div=document.createElement("div")
    let span1=document.createElement("span");
    let i1=document.createElement("i");
    let span2=document.createElement("span");
    let span3=document.createElement("span");
    let i2=document.createElement("i");
    let td3=document.createElement("td");
    let i3=document.createElement("i");
    let td4=document.createElement("td");
    let dollar=document.createElement("span");
    let price=document.createElement("span");
    let productPrice=parent[1].children[0].innerHTML;

    
    tr.setAttribute("id",product_id);
    tr.setAttribute("product_price",Number(productPrice));



    span2.classList.add("quantity");
    td1.innerHTML=parent[0].innerHTML;
    div.classList.add("rounded","counter");
    i1.classList.add("fa-solid","fa-minus");
    span2.classList.add("mx-3");
    price.innerHTML=parent[1].children[0].innerHTML;
    dollar.innerHTML=parent[1].children[1].innerHTML;
    span2.innerHTML=1;
    i2.classList.add("fa-solid","fa-plus");
    i3.classList.add("fa-solid","fa-xmark");
    //styling
    i3.style.color="red";
    dollar.style.color="green";

    total_price.innerHTML= Number(total_price.innerHTML)+Number(productPrice);
    i1.addEventListener("click",()=>
    {
        if(span2.innerHTML>1)
        {
            span2.innerHTML=Number(span2.innerHTML)-1;
            price.innerHTML=Number(price.innerHTML)-Number(productPrice);
            total_price.innerHTML= Number(total_price.innerHTML)-Number(productPrice);
        }
    })

    i2.addEventListener("click",()=>
    {
        span2.innerHTML=Number(span2.innerHTML)+1;
        price.innerHTML=Number(price.innerHTML)+Number(productPrice);
        total_price.innerHTML= Number(total_price.innerHTML)+Number(productPrice);

    })

    i3.addEventListener("click",()=>
    {
        total_price.innerHTML= Number(total_price.innerHTML)-Number(price.innerHTML);
        if(total_price.innerHTML == "0")
        {
            document.getElementById("submit-order").setAttribute("disabled","");
        }
       tr.remove()
    })

    tr.appendChild(td1);
    tr.appendChild(td2);
    td2.appendChild(div);
    div.appendChild(span1);
    span1.appendChild(i1);
    div.appendChild(span2);
    div.appendChild(span3);
    span3.appendChild(i2);
    tr.appendChild(td3);
    td3.appendChild(price);
    td3.appendChild(dollar);
    tr.appendChild(td4);
    td4.appendChild(i3);
    tbody.appendChild(tr);
    
}

async function getRooms()
{
    fetch("./php/getRooms.php",{
    method:'GET'
    }).then(response => 
        response.json()
    ).then((data)=>{
    data.forEach((index)=>
    {
        createRoom(index);
    })
    }) 
}
getRooms();

function createRoom(obj)
{
    // console.log(obj.Room_number);
    let parent=document.getElementById("checkBox");
    let option=document.createElement("option");
    option.innerHTML=obj.Room_number;
    parent.appendChild(option);
}

let orderArr=[];
async function submitOrder(){   

    //change the id obj.id
    let notes=document.getElementById("notes").value;
    let tbody=document.getElementById("tbody");
    let room_number=document.getElementById("checkBox").value;


    if(room_number)
    {
        for(let i=0;i<tbody.childNodes.length;i++)
        {
            let obj=
            {
                product_id:Number(tbody.childNodes[i].getAttribute("id")),
                productPrice:Number(tbody.childNodes[i].getAttribute("product_price")),
                quantity:Number(document.getElementsByClassName("quantity")[i].innerHTML)
            }
            orderArr.push(obj);
        }
        let orderArrLength=orderArr.length;
        
        let res = await fetch("./php/submitUserOrder.php",{
            method:"post",
            headers:{
          "Content-Type":"application/json",
                    },
        body:JSON.stringify({
              "notes":notes,
              "orderArrlength":orderArrLength,
              "room_number":room_number,
              "orderArr":orderArr
            })
          });
         location.reload();
    }
    
}



// {
//     user_id:123,
//     notes:chilck,
//     lengthOfArray:
//     order:
//     [{
//         order_id:3,
//         product_id:1,
//         quantity:5,
//         productPrice:20;
//         total_prodcut_price(calc);
//     }
//     ]
// }