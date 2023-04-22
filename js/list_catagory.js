async function getAllCategory() {
  let result = await fetch("./php/getAllCategory.php");
  let data = await result.json();

  manpulateResponseCategory(data);
}
getAllCategory();   

function manpulateResponseCategory(data) {
  data.forEach((obj) => {
    createNewOption(obj);
  });
}
let select = document.getElementById("category");
function createNewOption(obj) {
  let opteion = document.createElement("option");
  opteion.innerHTML = obj.name;
  opteion.setAttribute("value", obj.id);
  select.appendChild(opteion);
}
