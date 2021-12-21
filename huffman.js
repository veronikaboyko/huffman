let fs = require('fs');
let arg = process.argv;
let inputData = fs.readFileSync(arg[2], 'utf8');
console.log('input string: ' + inputData)

function Node(letter, freq, used, parent, code){
	this.letter = letter;
	this.freq = freq;
	this.used = used;
	this.parent = parent;
	this.code = code;

}

function power(alph) {
    for (let i = 0; i < alph.length - 1; i++) {
        if (alph[i] != alph[i + 1]) 
            return false;
    }   
    return true;
}

let alph = new Array();
let tree = new Array();
let codes = new Array();

let codedString = '';
let decodedString = '';
let flag = power(inputData);

if (flag){
	for (i = 0; i < inputData.length; i++) 
        codedString += "0";
        
    codes = `${inputData[0]}: '0'`
    for (i = 0; i < inputData.length; i++) 
        decodedString += inputData[0];
	console.log(codes);
	console.log('coded string: ' + codedString);
	console.log('decoded string: ' + decodedString);
}

else{ 

	let  powerAlph = 0;

	for (i = 0; i < inputData.length; i++)
		alph[inputData.charAt(i)] = 0;

	for (i = 0; i < inputData.length; i++)
		alph[inputData.charAt(i)]++;

	for (i in alph) {
		let n = new Node(i, alph[i], false, null, '');
		tree.push(n);
		powerAlph++;
	}

	let t = 0;
	while (tree[tree.length - 1].freq != inputData.length) {
		let min1 = inputData.length + 1, min2 = inputData.length + 1;
		let index1 = 0, index2 = 0;
		for (let i = 0; i < tree.length; i++) {
			if (tree[i].freq < min1 && tree[i].used == false) {
				min2 = min1
				min1 = tree[i].freq
				index2 = index1
				index1 = i
			} 
			else if (tree[i].freq < min2 && tree[i].used == false) {
				min2 = tree[i].freq;
				index2 = i;
			}
		}
		let n = new Node(tree[index1].letter + tree[index2].letter,
                    tree[index1].freq + tree[index2].freq,
                    false,
                    null,
                    '');
		tree.push(n);
		tree[index1].used = true;
		tree[index2].used = true;
		tree[index1].parent = tree.length - 1
		tree[index2].parent = tree.length - 1
		t++
	}	

	let n = 0
	let currentCode = 0
	for (i = 0; i < t; i++) {
		for (let j = 0; j < tree.length; j++) {
			if (tree[j].parent == tree.length - i - 1){
				currentCode = n % 2
				tree[j].code += tree[tree[j].parent].code + currentCode.toString()
				n++
			}

		}
	}

	for (i = 0; i < powerAlph; i++)
		codes[tree[i].letter] = tree[i].code;
	console.log(codes);

	let codedData = new Array();
	for (i in inputData)
		codedData[i] = codes[inputData.charAt(i)]
	
	for (i = 0; i < codedData.length; i ++)
		codedString += codedData[i];
	console.log('coded string: ' + codedString)

	for (i in codedData){
		for (let j = 0; j < tree.length; j++) {
			if (tree[j].code === codedData[i])
				decodedString += tree[j].letter
		}
	}
	console.log('decoded string: ' + decodedString)
}
