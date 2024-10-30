const fs = require('fs');
const MODULUS = BigInt("170141183460469231731687303715884105727"); // Large prime modulus

function mod(n, modulus) {
    return ((n % modulus) + modulus) % modulus;
}

function decodeValue(base, value) {
    return BigInt(parseInt(value, parseInt(base)));
}

function modInverse(a, modulus) {
    let m0 = modulus, y = BigInt(0), x = BigInt(1);
    if (modulus === BigInt(1)) return BigInt(0);

    while (a > 1) {
        let q = a / modulus;
        let t = modulus;

        modulus = a % modulus;
        a = t;
        t = y;

        y = x - q * y;
        x = t;
    }

    if (x < 0) x += m0;
    return x;
}

function lagrangeInterpolation(points) {
    let n = points.length;
    let c = BigInt(0);

    for (let i = 0; i < n; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let term = yi;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let xj = points[j][0];
                let numerator = mod(-xj, MODULUS);
                let denominator = mod(xi - xj, MODULUS);

                term = mod(term * numerator, MODULUS);
                term = mod(term * modInverse(denominator, MODULUS), MODULUS);
            }
        }
        c = mod(c + term, MODULUS);
    }

    return c;
}

// Read JSON data from input.json
fs.readFile('testcase2.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputJson = JSON.parse(data);
    let points = [];
    for (let i = 1; i <= inputJson.keys.n; i++) {
        const key = i.toString();
        if (inputJson[key]) {
            const base = inputJson[key].base;
            const value = inputJson[key].value;
            const decodedY = decodeValue(base, value);
            points.push([BigInt(i), decodedY]);
        }
    }

    // Calculate the constant term
    const constantTerm = lagrangeInterpolation(points);
    console.log("Constant term (c): " + constantTerm.toString()); // Expected output: 48948403210270700
});
