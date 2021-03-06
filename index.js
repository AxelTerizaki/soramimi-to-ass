#!/usr/bin/env node
'use strict';
const fs = require('fs');
const stringify = require('ass-stringify');
const util = require('util');
const ass = require('./ass_template');

function asyncExists(file){
	return util.promisify(fs.exists)(file);
}

function asyncRead(...args){
	return util.promisify(fs.readFile)(...args);
}

function clone(a) {
	return JSON.parse(JSON.stringify(a));
}

function convertTimeToASSFormat(str) {
	return '0:' + str.replace(/:([^:]*)$/,'.$1');
}

function timeToMs(time) {
	const a = time.split(':'); // split it at the colons
	// minutes are worth 60 seconds. Seconds are worth 100 miliseconds.
	return (+a[0]) * 60 * 100 + (+a[1]) * 100 + (+a[2]);
}

function isOdd(num) {
	return (num % 2) == 1;
}

async function mainCLI() {
	if (!process.argv[2]) {
		throw `Soramimi-to-ass - Convert Soramimi karaoke to ASS files
		Usage: soramimi-to-ass myfile.txt [myfile.ass]
		If no output file specified, the script outputs to stdout
		`;
	}
	const file = process.argv[2];
	if (!await asyncExists(file)) throw `File ${file} does not exist`;
	const soramimi = await asyncRead(file, 'utf8');
	return convertToASS(soramimi);
}

function convertToASS(soramimi) {
	// Removing HTML tags
	const soramimiStripped = soramimi.replace(/<(.|\n)*?>/g, '');
	const lines = soramimiStripped.split('\n');
	let dialogue = [];
	for (const y in lines) {
		// Lines not starting with a timestamp are ignored
		if (!lines[y].startsWith('[')) continue;
		let event = {};
		event = clone(ass.Dialogue);
		const arr = lines[y].replace(/\[/g,'|').replace(/\]/g,'|').split('|');
		event.value.Start = convertTimeToASSFormat(arr[1]);
		event.value.End = convertTimeToASSFormat(arr[arr.length-2]);
		//Building text
		let textArr = [];
		for (let i = 2; i<arr.length-1; i++) {
			if (!isOdd(i)) {
				const k = timeToMs(arr[i+1]) - timeToMs(arr[i-1]);
				textArr.push(`{\\k${k}}${arr[i]}`);
			}
		}
		event.value.Text = textArr.join('');
		dialogue.push(clone(event));
	}
	let events = clone(ass.Events);
	events.body = events.body.concat(dialogue);
	return stringify([ass.ScriptInfo, ass.Styles, events]);
}

if (require.main === module) mainCLI()
	.then(data => {
		if (process.argv[3]) {
			console.log(process.argv[2]);
			fs.writeFileSync(process.argv[3],data,'utf-8');
		} else {
			console.log(data);
		}
	})
	.catch(err => console.log(err));

module.exports = convertToASS;