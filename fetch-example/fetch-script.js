function getData(){
    const DONE = 4;
    const OK = 200;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === DONE && this.status === OK){
            document.getElementById('demo').innerHTML = xhttp.responseText;
            }
        };
    const url = "http://127.0.0.1:3000";
    xhttp.open("GET", url, true);
    xhttp.send();
}

getData();