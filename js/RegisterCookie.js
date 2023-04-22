//***********************for massages errors */

var errors = Cookies.get("errors");
Cookies.remove("errors");
//console.log(errors);

if (errors) {
  errors = JSON.parse(errors);
  insertErrorMessages(errors);
}
function insertErrorMessages(ob) {
  for (const key in ob) {
    let input = document.querySelector(`input[name=${key}]`);
    console.log(ob[key]);
    let error = input.nextElementSibling;
    error.textContent = ob[key];
    error.classList.add("active");
  }
}
//******************** for massages success register*/
let cookiesuccess = document.cookie;
var success = Cookies.get("success");
console.log(success);
if (success) {
  success = JSON.parse(success);
  console.log(success);
  insertSuccessMessages(success);
}
function insertSuccessMessages(obj) {
  for (const key in obj) {
    let div = document.querySelector(`div[name=${key}]`);
    console.log(div);
    div.innerHTML = obj[key];
    div.classList.add("active");
  }
}
