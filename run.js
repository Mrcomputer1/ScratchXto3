var fs = require("fs");
var vm = require("vm");
var nunjucks = require("nunjucks");
var env = nunjucks.configure("templates", {
	autoescape: false
});

// ext: Extension File Name
// opts: { id, image_url }
// success: function(output_file)
// error: function(err)
// finally_: function() || UNDEFINED
module.exports = function(ext, opts, success, error, finally_){
	
	var ctx = vm.createContext({
		ScratchExtensions: {
			register: function(name, info, obj){
				
				for(var menu in info.menus){
					info.menus[menu] = JSON.stringify(info.menus[menu]);
				}
				var render = {
					id: opts.id,
					name: name,
					docs_url: info.url,
					blocks: [],
					menus: info.menus,
					funcs: [],
					_init: obj._init?obj._init.toString():"function(){}"
				};
				if(opts.image_url){
					render.image_url = opts.image_url;
				}
				if(opts.menu_image_url){
					render.image_url_menu = opts.menu_image_url;
				}
				for(var block of info.blocks){
					var type, terminal, isAsync, text, func;
					var args = [];
					if(block[0] == " " || block[0] == "w"){
						type = "command";
						terminal = "false";
						isAsync = block[0] == "w";
					}else if(block[0] == "r" || block[0] == "R"){
						type = "reporter";
						terminal = "false";
						isAsync = block[0] == "R";
					}else if(block[0] == "b"){
						type = "Boolean";
						terminal = "false";
						isAsync = false;
					}else if(block[0] == "h"){
						type = "hat";
						terminal = "false";
						isAsync = false;
					}else if(block[0] == "-"){
						continue;
					}
					text = block[1];
					var textS = text.split(" ");
					text = "";
					func = block[2];
					var i = 0;
					for(var textS1 of textS){
						if(textS1.startsWith("%")){
							textS1 = textS1.replace("%", "");
							if(textS1 == "s"){
								args.push({
									type: "string",
									suggested: block[i+3] ? block[i+3]:"",
									id: args.length
								});
								textS1 = "[ARG_" + (args.length-1) + "]";
							}else if(textS1 == "n"){
								args.push({
									type: "number",
									suggested: block[i+3] ? block[i+3]:"",
									id: args.length
								});
								textS1 = "[ARG_" + (args.length-1) + "]";
							}else if(textS1 == "b"){
								args.push({
									type: "boolean",
									suggested: block[i+3] ? block[i+3]:"",
									id: args.length
								});
								textS1 = "[ARG_" + (args.length-1) + "]";
							}else if(textS1.startsWith("m.")){
								var menu = textS1.replace("m.", "");
								args.push({
									type: "string",
									suggested: block[i+3] ? block[i+3]:"",
									id: args.length,
									menu: menu
								});
								textS1 = "[ARG_" + (args.length-1) + "]";
								//error("Menus can't yet be converted, please remove and retry!");
								//if(finally_) finally_();
								//return;
							}
						}
						text += textS1 + " ";
						i++;
					}
					text = text.slice(0, -1);
					render.blocks.push({
						opcode: func,
						type: type,
						terminal: terminal,
						spec: text,
						args: args,
						func: func,
						isAsync: isAsync
					});
				}
				for(var block of render.blocks){
					var func = {
						opcode: block.opcode,
						source: obj[block.opcode].toString(),
						argstring: ""
					};
					var str = "";
					for(var arg of block.args){
						str += "args.ARG_" + arg.id + ", ";
					}
					str = str.slice(0, -2);
					func.argstring = str;
					render.funcs.push(func);
				}
				
				var out = opts.output_file ? opts.output_file :
					ext.replace(".js", ".3.js");
				fs.writeFileSync(out,
					nunjucks.render("extension.njk", render));
				success(out);
				if(finally_) finally_();
			}
		}
	});
	vm.runInContext(fs.readFileSync(ext), ctx);
	
};