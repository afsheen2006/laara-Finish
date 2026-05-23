const r1 = 0, g1 = 224, b1 = 170;
const r2 = 0, g2 = 150, b2 = 203;

// Rough conversion using a library or just sticking to closest match
// Since we don't have a library handy, let's just output the hex
console.log(`Primary (Cyan): #${r1.toString(16).padStart(2,'0')}${g1.toString(16).padStart(2,'0')}${b1.toString(16).padStart(2,'0')}`);
console.log(`Secondary (Blue): #${r2.toString(16).padStart(2,'0')}${g2.toString(16).padStart(2,'0')}${b2.toString(16).padStart(2,'0')}`);
