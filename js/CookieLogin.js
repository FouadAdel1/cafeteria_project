let cookie = document.cookie;
console.log(cookie);
let error = Cookies.get("error");
if (error) {
  error = JSON.parse(error);
  console.log(error);
  displayError(error);
}

function displayError(obj) {
  for (const key in obj) {
    let input = document.querySelector(`input[name=${key}]`);
    console.log(input);
    let error = input.nextElementSibling;
    error.innerHTML = obj[key];
    error.classList.add("active");
  }
}
