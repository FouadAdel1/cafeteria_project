async function getUserData() {
  let result = await fetch("./php/check_session.php");
  let data = await result.json();
  manpulateResponse(data);
}
getUserData();
function manpulateResponse(data) {
  if (data.login == "notValid") {
    window.open("./index.html", "_self");
  } else {
    addUserData(data);
  }
}

function addUserData(obj) {
  let userName = document.getElementById("user_name");
  userName.innerHTML = obj.name;
  let userPic = document.getElementById("user_img");
  userPic.src = `./images/users/${obj.profile_pic}`;
  console.log( userPic.src)
}

let logOutBtn = document.getElementById("log_out_btn");
logOutBtn.addEventListener("click", () => {
  userLogOut();
});

async function userLogOut() {
  let result = await fetch("./php/log_out.php");
  let data = await result.json();
  manpulateuserData(data);
}

function manpulateuserData(user) {
  if (user.logout == "valid") {
    window.open("./index.html", "_self");
  }
}
