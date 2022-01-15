async function getData() {
  const DONE = 4;
  const OK = 200;
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState === DONE && this.status === OK) {
      let object = JSON.parse(this.responseText);
      console.log(JSON.stringify(object));
      makeTable(object);
    }
  };

  xhttp.open("GET", "http://127.0.0.1:3000/data", true);
  xhttp.send();
}

function makeTable(object) {
  const table = document.getElementById('demo');
  const tr_name = createElement("tr", null, createElement("td", {
    style: "background-color: cyan;"
  }, "name"), createElement("td", null, object.name));
  const tr_money = createElement("tr", null, createElement("td", {
    style: "background-color: cyan;"
  }, "money"), createElement("td", null, object.money));
  table.appendChild(tr_name);
  table.appendChild(tr_money);
}

let a = getData().then(r => {
  console.log("success!");
}).catch(error => {
  console.log("error...");
});
a.then();
export {};
