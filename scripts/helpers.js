var fs = require('fs');

module.exports = { 
    getSize : function(size){
        var sizeSplit = size.split("x");
        var newWidth = sizeSplit[0];
        var newHeight = sizeSplit[1];

        return {
            "full" : size,
            "width" : newWidth,
            "height" : newHeight
        }
    },

    buildDirs : function(dir, size){
        
        //console.log(dir);

        if(dir.indexOf("{size}") > -1){
            dir = dir.replace("{size}", size);
        }

        var dirFolders = dir.split('/');
        var dirsCheckPath = "";
        for(var i = 0; i < dirFolders.length; i++){

            dirsCheckPath += dirFolders[i];
            if(i < (dirFolders.length - 1)){
                dirsCheckPath += '/';
            }
            if(!fs.existsSync(dirsCheckPath)){
                fs.mkdirSync(dirsCheckPath);
            }

        }

        return dirsCheckPath;

    },
    
    sizeName : function(name, size){
        
        if(name.indexOf("{size}") > -1){
            name = name.replace(/{size}/g, size);
        }
        return name;
    },
    
    getDpi : function(sizeObj) {
        
        var width = sizeObj.width;
        var height = sizeObj.height;
        
        //TODO : Dpi from data options
        
        
        var dpi = 'lo';
        
        if(height >= 60){
            dpi = 'md';
        }
        if(height >= 250 && width >= 900){
            dpi = 'hi';
        }
        if(height >= 400 && width >= 300){
            dpi = 'xhi';
        }
        if(height >= 700){
            dpi = 'xxhi';
        }
        
        
        return dpi;
        
    },
    dpiName : function(name, dpi){
        
        if(name.indexOf("{dpi}") > -1){
            name = name.replace(/{dpi}/g, dpi);
        }
        return name;
    },
}