let cookies = document.cookie.split("=");
let errors = Cookies.get("errors");
if (errors) {
  errors = JSON.parse(errors);
  insertErrorMessages(errors);
}

function insertErrorMessages(ob) {
  for (const key in ob) {
    let input = document.querySelector(`input[name=${key}`);
    let error = input.nextElementSibling;
    error.textContent = errors[key];
    input.nextElementSibling.classList.add("active");
  }
}
