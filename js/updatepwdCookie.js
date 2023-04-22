let cookie = document.cookie;
console.log(cookie);
var errors = Cookies.get("errors");
console.log(errors);

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
