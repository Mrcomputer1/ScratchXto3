var run = require("./run");

const options = [
	{name: "files", type: String, multiple: true, defaultOption: true},
	{name: "icon", type: String},
	{name: "output", alias: "o", type: String},
	{name: "id", type: String},
	{name: "no-wizard", type: Boolean, defaultValue: false},
	{name: "help", type: Boolean, alias:"?", defaultValue: false}
];

const args = require("command-line-args")(options);

if(args.help){
	console.log(require("./help"));
	process.exit(0);
}

if(args.files){
	if(args.output && args.files.length > 1){
		console.error("You can't provide a output file name for more then one file!");
		process.exit(1);
	}
	if(args.id && args.files.length > 1){
		console.error("You can't provide an ID for more then one file!");
		process.exit(1);
	}
	for(var file of args.files){
		run(file, {
			id: args.id?args.id:file.replace(".js", ""),
			image_url: args.icon?args.icon:null,
			output_file: args.output
		}, function(output_file){
			console.log("Processed " + file + " as " + output_file);
		}, function(err){
			console.error("Couldn't process " + file + " `" + err + "`");
		});
	}
}else{
	if(args["no-wizard"]){
		console.warn("No command chosen! Use --help for a list of commands.");
		console.log("Remove --no-wizard to use the wizard");
		process.exit(0);
	}
	require("./wizard")(run);	
}