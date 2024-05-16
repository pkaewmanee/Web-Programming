let count = 0;
let id = setInterval(counter, 2000);

function counter() {
    console.log(++count);
}

setTimeout(()=>{
    clearInterval(id);
}, 10000)