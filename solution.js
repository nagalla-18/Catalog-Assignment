const fs = require('fs');

// Function to parse and decode the x, y values from the JSON input
function parseInput(jsonData) {
    const keys = jsonData.keys;
    const points = [];

    for (const [key, val] of Object.entries(jsonData)) {
        if (key === 'keys') continue;

        const x = parseInt(key);
        const base = parseInt(val.base);
        const y = parseInt(val.value, base);

        points.push([x, y]);
    }

    return {
        k: keys.k,
        points: points.slice(0, keys.k) // Use only first k points
    };
}

// Function to calculate Lagrange basis polynomial Li(0)
function lagrangeInterpolation(points) {
    let result = 0;

    for (let i = 0; i < points.length; i++) {
        let xi = points[i][0];
        let yi = points[i][1];

        let term = yi;
        for (let j = 0; j < points.length; j++) {
            if (i === j) continue;

            let xj = points[j][0];
            term *= (0 - xj) / (xi - xj);
        }

        result += term;
    }

    return Math.round(result); // Return integer constant term
}

// Load and process both testcases
function processTestcase(filePath) {
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { k, points } = parseInput(jsonData);
    const secret = lagrangeInterpolation(points);
    return secret;
}

// Main
const secret1 = processTestcase('testcase1.json');
const secret2 = processTestcase('testcase2.json');

console.log("Secret 1:", secret1);
console.log("Secret 2:", secret2);