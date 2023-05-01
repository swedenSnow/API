const { ChildProcess } = require('child_process');
const fs = require('fs/promises');
const path = require('path');

//!Blocking code (synchronous)
// const result = fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8');
//! Async
const read = async () => {
	const result = fs.readFile(path.join(__dirname, '../../package.json'), 'utf-8');
	console.log(result);
	return result;
}

read().then(file => console.log(file));
// console.log(result);
console.log('2nd ');
// console.log(first)