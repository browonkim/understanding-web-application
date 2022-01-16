const createElement = (tag, props, ...children) => {
    if (typeof tag === "function") return tag(props, ...children);
    const element = document.createElement(tag);

    Object.entries(props || {}).forEach(([name, value]) => {
        if (name.startsWith("on") && name.toLowerCase() in window)
            element.addEventListener(name.toLowerCase().substr(2), value);
        else element.setAttribute(name, value.toString());
    });

    children.forEach(child => {
        appendChild(element, child);
    });

    return element;
};

const appendChild = (parent, child) => {
    if (Array.isArray(child))
        child.forEach(nestedChild => appendChild(parent, nestedChild));
    else
        parent.appendChild(child.nodeType ? child : document.createTextNode(child));
};

interface student{
    name: string;
    money: number;
}

async function getData(){
    const DONE = 4;
    const OK = 200;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (function(): void{
        if (this.readyState === DONE && this.status === OK){
            let object: student = JSON.parse(this.responseText);
            console.log(JSON.stringify(object));
            makeTable(object);
        }
    });
    xhttp.open("GET", "http://127.0.0.1:3000/data", true);
    xhttp.send();
}

function makeTable(object: student): void{
    const table = document.getElementById('demo');
    const tr_name =(
        <tr>
            <td style="background-color: cyan;">name</td><td>{object.name}</td>
        </tr>
    );
    const tr_money = (
        <tr>
            <td style="background-color: cyan;">money</td><td>{object.money}</td>
        </tr>
    );
    table.appendChild(tr_name);
    table.appendChild(tr_money);

}

let a = getData().then(r => {
    console.log("success!");
}).catch(error => {
    console.log("error...");
});
