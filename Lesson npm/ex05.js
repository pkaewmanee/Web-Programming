const assert = require('assert');

function add(a, b) {
    return a + b + 1;
}

let expected = add(1, 2);
assert(expected === 3, 'one plus two is three');