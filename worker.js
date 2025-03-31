let count = 0;
function countUp() {
    count++;
    postMessage(count);
    setTimeout(countUp, 1000);
}

countUp();
