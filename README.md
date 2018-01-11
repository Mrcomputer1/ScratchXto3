# ScratchX to Scratch 3.0

Converts ScratchX extension to Scratch 3.0.

## Status
Should correctly convert into the extension format shown at
https://github.com/LLK/scratch-gui/blob/develop/src/examples/extensions/example-extension.js

If anyone knows how to load an extension into Scratch 3 without
modding it please tell me or if anyone has a up to date fork of
Scratch 3 on GHPages that allows loading an extension easily.

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

`--help`: Displays help message

## License
[MIT License](https://github.com/Mrcomputer1/ScratchXto3/blob/master/LICENSE.md)