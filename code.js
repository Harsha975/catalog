function decodeValue(base, value) {
    return BigInt(parseInt(value, parseInt(base)));
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
                let numerator = xj;
                let denominator = xi - xj;
                
                // Multiply term by (xj / (xi - xj))
                term *= numerator;
                term /= denominator;
            }
        }

        // Accumulate each term in the constant result
        c += term;
    }

    return c;
}

// Process JSON data
const inputJson = {
    "keys": { "n": 4, "k": 3 },
    "1": { "base": "10", "value": "4" },
    "2": { "base": "2", "value": "111" },
    "3": { "base": "10", "value": "12" },
    "6": { "base": "4", "value": "213" }
};

// const inputJson = {
//     "keys": { "n": 10, "k": 7 },
//     "1": { "base": "6", "value": "13444211440455345511" },
//     "2": { "base": "15", "value": "aed7015a346d63" },
//     "3": { "base": "15", "value": "6aeeb69631c227c" },
//     "4": { "base": "16", "value": "e1b5e05623d881f" },
//     "5": { "base": "8", "value": "316034514573652620673" },
//     "6": { "base": "3", "value": "2122212201122002221120200210011020220200" },
//     "7": { "base": "3", "value": "20120221122211000100210021102001201112121" },
//     "8": { "base": "6", "value": "20220554335330240002224253" },
//     "9": { "base": "12", "value": "45153788322a1255483" },
//     "10": { "base": "7", "value": "1101613130313526312514143" }
// };
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
console.log("Constant term (c): " + constantTerm.toString()); // Should output "3"
