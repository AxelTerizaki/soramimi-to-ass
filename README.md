# Soramimi karaoke to ASS converter

This nodeJS module converts Soramimi karaoke files (.txt) to Substation Alpha/Aegisub files (.ass).

Soramimi karaoke's software and lyrics files can be found at their official site

* [http://www.soramimi.nl/](http://www.soramimi.nl/)

It applies a basic style to it which can be modified later.

## Install

### Command-line

`npm install -g soramimi-to-ass`

### Module

`npm install soramimi-to-ass`

## Usage

### Command-line

Just supply the name of a .txt Soramimi file as your first argument, wether you call it in command line or as a module.

```sh
soramimi-to-ass myfile.txt [myfile.ass]
```

In command-line, second argument is optional : if it's not provided, output will be made to stdout.

### Module

Supply the main function with the Soramimi karaoke contents.

```JS
import convertToASS from 'soramimi-to-ass';
const file = 'karaoke.txt';
const soramimiData = await fs.readFile(file, 'utf8');
const ass = convertToASS(soramimiData);
console.log(ass);
```

## TODO

* Write a better/simpler converter
* Make default style variable
* Also convert HTML font color tags and apply them via a style. (for now it's ignored)
* Add checks for format
* Other ideas? PR/MRs and issues are welcome.