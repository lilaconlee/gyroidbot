const syllable = require('syllable');
const singular = require('pluralize').singular;
const fs = require('fs');

const eek = fs.readFileSync('eek.txt', 'utf-8').split('\n');

console.log(eek.length);
const lilWords = eek.filter(w => {
return syllable(w) <= 1
}).map(w => singular(w));

fs.writeFileSync('manywords.json', JSON.stringify(lilWords));
