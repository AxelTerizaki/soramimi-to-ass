const parser = require('ass-parser');
const fs = require('fs');
const stringify = require('ass-stringify');
const util = require('util');
const stripTags = require('striptags');
const ass = require('./ass_template');

function asyncExists(file){
	return util.promisify(fs.exists)(file);
}

function asyncRead(...args){
	return util.promisify(fs.readFile)(...args);
}

function convertTimeToASSFormat(str) {
	const pos = str.lastIndexOf(':');
	str[pos] = '.';
	return str;
}

function timeToMs(time) {
	const a = time.split(':'); // split it at the colons	
	// minutes are worth 60 seconds. Seconds are worth 100 miliseconds.
	return (+a[0]) * 60 * 100 + (+a[1]) * 100 + (+a[2]);
}

function isOdd(num) { return (num % 2) == 1;}

async function convertToASS() {
	const file = process.argv[2];
	const soramimi = await asyncRead(file, 'utf8');
	// Removing HTML tags
	const soramimiStripped = stripTags(soramimi);
	const lines = soramimiStripped.split('\n');
	let out = [ass.ScriptInfo, ass.Styles];
	let dialogue = [];
	for (const y in lines) {		
		console.log(y);
		if (lines[y] === '') continue;
		let event = {};
		event = Object.assign(ass.Dialogue);
		const arr = lines[y].replace(/\[/g,'|').replace(/\]/g,'|').split('|');			
		event.value.Start = convertTimeToASSFormat(arr[1]);
		event.value.End = convertTimeToASSFormat(arr[arr.length-2]);
		//Building text
		let textArr = [];
		for (let i = 2; i<arr.length-1; i++) {
			if (!isOdd(i)) {
				const k = timeToMs(arr[i+1]) - timeToMs(arr[i-1]);
				textArr.push(`{\k${k}}${arr[i]}`);
			}
		}
		event.value.Text = textArr.join('');		
		dialogue.push(Object.assign(event));				
	}
	let events = Object.assign(ass.Events);
	events.body = events.body.concat(dialogue);
	out.push(events);
	return stringify(out);
}


convertToASS().then(data => console.log(data));
