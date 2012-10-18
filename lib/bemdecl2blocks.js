(function() {
	var sys 	= require('sys'),
		exec	= require('child_process').exec,
		fs 		= require('fs'),
		program = require('commander');
	
	
	program
		.version('0.1.0')
		.usage('[options]')
		.option('-l, --level <name>', 'Lavel name for')
		.option('-b, --block <name>', 'Block name')
		.parse(process.argv);

	var bemdecl = require('./' + program.level + '/' + program.block + '/' + program.block + '.bemdecl');
	//console.log(bemdecl.blocks);

	bemdecl.blocks.forEach(function(block){
		exec("bem create block " + block.name + " -t css -l blocks", puts);
		block.elems.forEach(function(elem){
			exec("bem create elem " + elem.name + " -t css -l blocks -b " + block.name, puts);
			elem.mods.forEach(function(mod){
				/*mod.vals.forEach(function(val){
					exec("bem create mod " + elem.name + " -t css -l blocks", puts);
				});*/
			});
		
			block.mods.forEach(function(mod){
				mod.vals.forEach(function(val){
					exec("bem create mod " + mod.name + " -t css -l blocks -b " + block.name + " -v " + val, puts);
				});
			});
		});
	
		//console.log(item);
	});
}).call(this)

function puts(error, stdout, stderr) { sys.puts(stdout) }


// Creating levels
//exec("bem create level blocks", puts);
//exec("bem create level pages", puts);