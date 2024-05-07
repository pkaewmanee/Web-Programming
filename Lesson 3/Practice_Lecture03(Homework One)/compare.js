function comparenum(a, b) {
    a = a.value;
    b = b.value;
    let diff = a - b;
    if (diff < 0) mode = 0;
    else if (diff > 0) mode = 1;
    else mode = 2;

    let msg = ["A < B", "A > B", "A = B"][mode];
    document.querySelector("#c").value = msg;
    document.querySelector("#d").value = diff < 0 ? -diff : diff;
}