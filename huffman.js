let fs = require('fs');//переменная fs-работа с файловой системой
let inputData = fs.readFileSync('input.txt').toString();
console.log(inputData);
let i = 0, j = 0;

function Node(letter, freq, used, father, code) {
    this.letter = letter
    this.freq = freq;
	this.used = used;
    this.father = father;
    this.code = code;
}
let alph = new Array();
let tree = new Array();
for (i = 0; i < inputData.length; i++) {
    alph[inputData.charAt(i)] = 0;
}
for (i = 0; i < inputData.length; i++) {
    alph[inputData.charAt(i)]++;
}
for (i in alph) {
    let n = new Node(i, alph[i], false, null, '');
    tree.push(n);
}
let lenTree = tree.length;
for (i = 0; i < lenTree - 1; i++) {
    let index1, index2;
    let min1 = inputData.length;
	let min2 = inputData.length;
    for (j = 0; j < tree.length; j++) {
        if (min1 > tree[j].freq && !tree[j].used) {
            min1 = tree[j].freq;
            index1 = j;
        }
    }
    tree[index1].code = '0';
    tree[index1].used = true;
    tree[index1].father = tree.length;
    for (j = 0; j < tree.length; j++) {
        if (min2 > tree[j].freq && !tree[j].used) {
            min2 = tree[j].freq;
            index2 = j;
        }
    }
    tree[index2].code = '1';
    tree[index2].used = true;
    tree[index2].father = tree.length;
    let N = new Node(tree[index1].letter + tree[index2].letter,
					 tree[index1].freq + tree[index2].freq,
					 false, null, '');
    tree.push(N);
}
let codes = [];
for (i = 0; i < lenTree; i++) {
    let index3 = i;
    codes[tree[index3].letter] = '';
    while (tree[index3].father != null) {
        codes[tree[i].letter] = tree[index3].code + codes[tree[i].letter];
        index3 = tree[index3].father;
    }
}
console.log(codes);
let outputData = '';
for (i = 0; i < lenTree; i++) {
    let x = inputData[i];
    outputData += codes[x];
}
fs.writeFile('output.txt', outputData, (err) => {
		if (err){
			console.err(err);
			return;
		}
	});
console.log(outputData);