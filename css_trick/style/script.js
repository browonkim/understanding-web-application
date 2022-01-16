let myInputs = document.querySelectorAll('input'),
    op = document.querySelector('output'),
    body = document.body;

body.style.backgroundColor = 'transparent';
if (op) op.innerHTML = 'transparent';

for (let i of myInputs) {
    (function (i) {
        i.addEventListener('focus', function () {
            body.style.backgroundColor = this.value;
            if (op) op.innerHTML = this.value;
        });
    })(i);
}
document.querySelector('output2').innerHTML = document.body.style.backgroundColor;