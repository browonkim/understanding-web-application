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

interface education {
    elementary: string,
    middle: string,
    high: string
}

interface student {
    name: string,
    money: number,
    education: education
}


async function get_student_data(){
    const OK = 200;
    const url1 = "http://127.0.0.1:3000/data1";
    const url2 = "http://127.0.0.1:3000/data2";
    let request1 = new Request(url1);
    let request2 = new Request(url2);
    const student_data1= fetch(request1)
        .then(response => response.json())
        .catch(e => {console.log("cannot fetch error: data1")});
    const student_data2 = fetch(request2)
        .then(response => response.json())
        .catch(e => {console.log("cannot fetch error: data2")});
    Promise.all([student_data1, student_data2]).then( values => {
            const student_1 = values[0];
            const student_2 = values[1];
            const rich = student_1.money > student_2.money ? student_1.name : student_2.name;
            document.body.appendChild(<p>The richer person is {rich}.</p>);
            document.body.appendChild(<hr/>);
            document.body.appendChild(
                <table>
                    <tr><td>name</td><td>{student_1.name}</td><td>{student_2.name}</td></tr>
                    <tr><td>primary school</td><td>{student_1.education.elementary}</td><td>{student_2.education.elementary}</td></tr>
                    <tr><td>middle school</td><td>{student_1.education.middle}</td><td>{student_2.education.middle}</td></tr>
                    <tr><td>high school</td><td>{student_1.education.high}</td><td>{student_2.education.high}</td></tr>
                </table>
            );}
    );
}

get_student_data()
    .then(success => console.log("success!"));