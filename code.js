const fs = require('fs');

// Function to decode a value given its base
function decodeValue(base, value) {
    return BigInt(parseInt(value, parseInt(base)));
}

// Function for Lagrange Interpolation
function lagrangeInterpolation(points) {
    let n = points.length;
    let result = BigInt(0); // Accumulated result

    for (let i = 0; i < n; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let term = yi;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let xj = points[j][0];
                term *= xj;
                term /= (xi - xj);
            }
        }

        result += term;
    }

    return result;
}

// Read the JSON file synchronously
const jsonData = fs.readFileSync('testcase1.json', 'utf8');
const inputJson = JSON.parse(jsonData);

// Prepare points for interpolation
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
console.log("Constant term (c): " + constantTerm.toString()); // Output the constant term
