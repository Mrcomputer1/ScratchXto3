const helpString = `ScratchX to Scratch3
========================
    Converts ScratchX extensions to Scratch 3.0 extensions

Synopsis
============
    $ node index.js [--no-wizard]
    $ node index.js [--help]
    $ node index.js [options...] files...

Options
===========
    -?, --help		Displays this help message
    -o, --output	Changes the output file (one file at a time)
    --id		Changes the extension ID (one file at a time)
    --icon		Changes the extension icon
    --no-wizard		Prevent the wizard mode

Examples
============
    $ node index.js -o ExtensionFor3.js --id MyExt ExtensionForX.js
        Converts ExtensionForX.js into ExtensionFor3.js with ID MyExt
    $ node index.js --no-wizard
        Disables the wizard so the program exits instead of opening the wizard.`;

module.exports = helpString;