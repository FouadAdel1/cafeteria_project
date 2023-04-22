
// get data
async function test(number){
    
  let index=number;
  let res = await fetch("./php/all_users.php",{
  method:"post",
  headers:{
    "Content-Type":"application/json",
  },
  body:JSON.stringify({
    "index":index
  })

});
let data = await res.json();
let numberOfElementsToDelete=document.getElementsByClassName("add").length;
for(let i=0;i<numberOfElementsToDelete;i++)
{
  document.getElementsByClassName("add")[0].remove();
}
  data.forEach((obj) => {
    createRow(obj);
})
}
test(1);
// numbers in pagination
async function numberOfUsers(){
  let res = await fetch("./php/countUsers.php");
  let data = await res.json();
numberOfPages(data);
}
numberOfUsers();
// number of pages
function numberOfPages(data)
{
    let x=data.length/4;
    numberOfPages=Math.ceil(x);
    for(let i=1;i<numberOfPages+1;i++)
    {
        let row=`<li class="page-item"><a onclick="test(${i})" class="page-link">${i}</a></li>`;
        document.getElementById("pagination").innerHTML+=row;
        
    }
}

// create row in table
function createRow(obj) {
  let tableBody = document.querySelector("tbody");
  let newRow = document.createElement("tr");
  newRow.classList.add("add");
  let userName = document.createElement("td");
  let userRoom = document.createElement("td");
  let userImg = document.createElement("td");
  let action = document.createElement("td");
  let img = document.createElement("img");
  let editBtn = document.createElement("button");
  let deleteBtn = document.createElement("button");
  editBtn.classList.add("btn","editBtn","mx-0","mx-md-2","my-1","my-md-0");
  deleteBtn.classList.add("btn","btn-danger","mx-0","mx-md-2","my-1","my-md-0");
  userName.innerHTML = obj.name;
  userRoom.innerHTML = obj.Room_number;
  img.src = `./images/users/${obj.profile_pic}`;
  img.width="30";
  img.height="30";
  editBtn.innerHTML="Edit";
  deleteBtn.innerHTML="Delete";
  editBtn.setAttribute("data-bs-target","#exampleModal");
  editBtn.setAttribute("data-bs-toggle","modal");

  editBtn.addEventListener("click",()=>{
    document.getElementById("email").value = obj.email;
    document.getElementById("name").value = obj.name;
    document.getElementById("room").value = obj.Room_number;
    document.getElementById("imageName").value = obj.profile_pic;
    document.getElementById("submit").value = obj.id;
    // window.location.replace("../all_users.html");
  });
  deleteBtn.addEventListener("click", () => {
    console.log(obj.id);
    deleteUser(obj.id);
    newRow.remove();
  });
  let btnUpload=document.getElementById('button-upload');
  btnUpload.addEventListener("change",(e)=>{
  const file = e.target.files[0];
  document.getElementById('imageName').value = file?.name;
});
// document.getElementById("submit").addEventListener("click",()=>{
//   submit(obj.email,obj.room);
  
// })
  userImg.appendChild(img);
  action.appendChild(editBtn);
  action.appendChild(deleteBtn);
  newRow.appendChild(userName);
  newRow.appendChild(userRoom);
  newRow.appendChild(userImg);
  newRow.appendChild(action);
  tableBody.appendChild(newRow);
}



// // return data
// async function submit(email,room){
//   let userdata=
//   { email:email,
//    room:room}
//   let res = await fetch("/php/user_form.php",{
//   method:"post",
//   headers:{
//     "Content-Type":"application/json",
//   },
//   body:JSON.stringify(userdata)

// });
// let data = await res.json();
// }




// Delete one user
async function deleteUser(number){
    
  let index=number;
  let res = await fetch("./php/deleteOneUser.php",{
  method:"post",
  headers:{
    "Content-Type":"application/json",
  },
  body:JSON.stringify({
    "index":index
  })

});
let data = await res.json();
location.reload();
}

// let cookies = document.cookie.split("=");
// let errors = cookies.get("errors");
// console.log(errors);
// if (errors) {
//   errors = JSON.parse(errors);
//   insertErrorMessages(errors);
// }

// function insertErrorMessages(ob) {
//   for (const key in ob) {
//     let input = document.querySelector(`input[name=${key}`);
//     let error = input.nextElementSibling;
//     error.textContent = errors[key];
//     input.nextElementSibling.classList.add("active");
//   }
// }