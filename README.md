# ScratchX to Scratch 3.0

Converts ScratchX extension to Scratch 3.0.

## Status
Should correctly convert into the extension format shown at
https://github.com/LLK/scratch-gui/blob/develop/src/examples/extensions/example-extension.js and https://github.com/LLK/scratch-vm/wiki/Scratch-3.0-Extensions-Specification

This Scratch 3.0 mod should be able to load extensions by URL: https://sheeptester.github.io/scratch-gui/ by Sheep_maker/SheepTester.

## Setup
1. `git clone https://github.com/Mrcomputer1/ScratchXto3`
2. `cd ScratchXto3`
2. `npm install`

## How to convert (Easy Way)
Run `node index.js` and follow the instructions.

## How to convert (Quick Way)
Run `node index.js files...`

## How to convert (Not Easy Way)
Use `node index.js options... files...`

### Valid Options
`--icon`: Change the icon for all converted extensions

`--output or -o`: Change the output file name (can only convert one extension at a time)

`--id`: Change the ID of the extension (can only convert one extension at a time)

`--no-wizard`: Disables the wizard allowing only command line arguments.

`--menu-icon`: Change the menu icon for all converted extensions

`--help`: Displays help message

## Contributing

### Files

`index.js`: Main File

`wizard.js`: Wizard

`run.js`: The core of the converter

`help.js`: Message shown for --help

`templates/extension.njk`: Scratch 3 extension template

`templates/block.njk`: Block template

`templates/arg.njk`: Block arg template

`templates/func.njk`: Block function template

## License
[MIT License](https://github.com/Mrcomputer1/ScratchXto3/blob/master/LICENSE.md)
