var checkMsg = `Welcome to Mrcomputer1's ScratchX to Scratch 3.0 Extension

Before starting please ensure you extension follows these guidelines:
1. Inside your extension file everything should be inside functions except for ScratchExtensions.register. Instead place them at ext._init.
2. Do not use any calls to ScratchExtensions except for ScratchExtensions.register.
3. Not have any important code in _shutdown or _getInfo as they will be removed.
4. All inputs (%s, %n, ...) in your block should have a space before and after.

Once you have completed this press enter to start!`;
var success = `Your extension has been converted and can be found at %0.

Tip: To convert multiple extensions at once use the command-line "node index.js [files...]". The ID will be guessed and no icon will be added.`;
var failure = `Your extension could not be converted!

Error: %0

If you can fix this problem: Fix it and re-run this script.
If you can't fix this problem: Convert manually (Ask in the "Developing Scratch Extensions" forum for help).
If you believe this is a bug please visit: https://github.com/Mrcomputer1/ScratchXto3/issues/new`;


var readline = require("readline");
var input = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
module.exports = function(run){
	console.log(checkMsg);
	input.question("", function(_){
		input.question("What is the file name of the extension you wish to convert?", function(ext){
			input.question("What would you like your extension's ID to be? (valid JS variable)", function(id){
				input.question("URL or Data URI for your extension's icon? (n for none)", function(imgurl){
					run(ext, {
						id: id,
						image_url: imgurl=="n"?imgurl:null
					}, function(output_file){
						console.log(success.replace("%0", output_file));
					}, function(err){
						console.log(failure.replace("%0", err));
					}, function(){
						input.close();
					});
				});
			});
		});
	});
};