//var colors = require('colors');
var fs = require('fs');

function walkSync(dir, filelist) {
    var files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + file).isDirectory()) {
            filelist = walkSync(dir + file + '/', filelist);
        } else {
            if(file !== "getData.js"){
                filelist.push(dir + file);
            }
        }
    });
    return filelist;
}

module.exports = {
    
    selectedBanners : [
        "Scripts/data/brand/default.json"
    ],
    
    getData : function(type, platform){
        
        if(!platform){
            platform = "nodejs";
        }
        
        var banners = [];
        var bannerPaths = [];
        
        switch(type){
            case "release" :
                bannerPaths = walkSync('Scripts/data/');
            break;
            default :
                bannerPaths = this.selectedBanners;
            break;
        }
        
        if(bannerPaths.length == 0){
            //console.error('No banners found!'.red);
            return null;
        }
        
        for(var i = 0; i < bannerPaths.length; i++){
            
            switch(platform){
                case "nodejs" :
                    var bannerData = fs.readFileSync(bannerPaths[i], 'utf8');
                break;
                case "jsx" :
                    var bannerData = bannerPaths[i];
                break;
                default :
                    var bannerData = fs.read(bannerPaths[i]);
                break;
            }
            
            if(platform == "jsx"){
                banners.push(bannerData);
            }else{
                banners.push(JSON.parse(bannerData));
            }
            
        }
        
        //console.log("building banners : ");
        //console.log(bannerPaths.toString().green);
        
        if(banners.length == 0){
            //console.error('No banners found!'.red);
            return null;
        }else{
            return banners;
        }
    }
    
    
}