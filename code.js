// Function to convert a string representation of a number from a given base to decimal
function decodeValue(base, value) {
    return BigInt(parseInt(value, parseInt(base)));
}

// Function to perform Lagrange interpolation
function lagrangeInterpolation(points) {
    let n = points.length;
    let c = BigInt(0);

    for (let i = 0; i < n; i++) {
        let xi = points[i][0]; // x value
        let yi = points[i][1]; // y value
        let term = yi;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let xj = points[j][0];
                term *= BigInt(-xj) / BigInt(xi - xj);
            }
        }

        c += term;
    }

    return c;
}

// Input JSON data
const inputJson = {
    "keys": {
        "n": 10,
        "k": 7
    },
    "1": {
        "base": "6",
        "value": "13444211440455345511"
    },
    "2": {
        "base": "15",
        "value": "aed7015a346d63"
    },
    "3": {
        "base": "15",
        "value": "6aeeb69631c227c"
    },
    "4": {
        "base": "16",
        "value": "e1b5e05623d881f"
    },
    "5": {
        "base": "8",
        "value": "316034514573652620673"
    },
    "6": {
        "base": "3",
        "value": "2122212201122002221120200210011020220200"
    },
    "7": {
        "base": "3",
        "value": "20120221122211000100210021102001201112121"
    },
    "8": {
        "base": "6",
        "value": "20220554335330240002224253"
    },
    "9": {
        "base": "12",
        "value": "45153788322a1255483"
    },
    "10": {
        "base": "7",
        "value": "1101613130313526312514143"
    }
};

// Decode the points from the JSON input
let points = [];
for (let i = 1; i <= inputJson.keys.n; i++) {
    const base = inputJson[i.toString()].base;
    const value = inputJson[i.toString()].value;
    const decodedY = decodeValue(base, value);
    points.push([BigInt(i), decodedY]); // (x, y) pairs
}

// Calculate the constant term c
const constantTerm = lagrangeInterpolation(points);
console.log("Constant term (c):", constantTerm.toString());
