(function() {
	var sys 	= require('sys'),
		exec	  = require('child_process').exec,
		fs 		  = require('fs'),
		program = require('commander');
	
	
    program
        .version('0.1.0')
        .usage('[options]')
        .option('-i, --input <name>', 'Input bemdecl file')
        .option('-l, --level <name>', 'Level for generated blocks')
        .parse(process.argv);
    
    var bemdecl = require(fs.realpathSync(program.input).replace(/\.js$/, ''));
    var puts = function (error, stdout, stderr) {
        sys.puts(stdout);
    }
    
    bemdecl.blocks.forEach(function(block){
        exec("bem create block " + block.name + " -t css -l " + program.level, puts);
        
        if (block.elems) {
            block.elems.forEach(function(elem){
                exec("bem create elem " + elem.name + " -t css -l " + program.level + " -b " + block.name, puts);
                if (elem.mods) {
                    elem.mods.forEach(function(mod){
                        mod.vals.forEach(function(val){
                            exec("bem create mod " + elem.name + " -t css -l " + program.level + " -b " + block.name + " -v " + val, puts);
                        });
                    });
                }
                
                if (block.mods) {
                    block.mods.forEach(function(mod){
                        mod.vals.forEach(function(val){
                            exec("bem create mod " + mod.name + " -t css -l " + program.level + " -b " + block.name + " -v " + val, puts);
                        });
                    });
                }
            });
        }
    });
}).call(this)

function puts(error, stdout, stderr) { sys.puts(stdout) }