//Script to copy images and javascript for richloads

var fs = require('fs');
var helpers = require('./helpers.js');

var bannerData = require('./data/getData.js');
var args = process.argv;
var buildType = "dev";
for(var i = 0; i < args.length; i++){
    if(args[i] == "release"){
        buildType = "release";
        break;
    }
}
var parsedData = bannerData.getData(buildType);

var bannerLength = parsedData.length;
var bannerCount = 0;
var sizeCount = 0;

var bannerInfo_rich_images;
var bannerInfo_sizes ;

function copyImageJs(){
    
    var bannerInfo = parsedData[bannerCount];
    
    bannerInfo_sizes = bannerInfo.sizes;
    var bannerInfo_files = bannerInfo.files;
    var size = bannerInfo_sizes[sizeCount];
    
    var name = bannerInfo.name;
    var nameParts = name.split("-");
    
    var bannerInfo_rich_js = bannerInfo_files.rich_js;
    var rawJs = fs.readFileSync(bannerInfo_rich_js.input, 'utf8');
    var dirsCheckPath = helpers.buildDirs(bannerInfo_rich_js.output, size);
    var copiedJs = dirsCheckPath + 'main.js';
    fs.writeFileSync(copiedJs, rawJs);
    console.log("Done : " + copiedJs);
    
    //richload images
    
    bannerInfo_rich_images = bannerInfo_files.rich_images;
    //console.log(bannerInfo_rich_images);
    
    if(bannerInfo_rich_images){
        
        
        var sizeObj = helpers.getSize(size);
        var dpi = helpers.getDpi(sizeObj)
        
        for (var key in bannerInfo_rich_images) {
            var image = bannerInfo_rich_images[key];
            var imageInput = helpers.dpiName(image.input, dpi);
            imageInput = helpers.sizeName(imageInput, size);
            var imageOutput = helpers.dpiName(image.output, dpi);
            imageOutput = helpers.sizeName(imageOutput, size);
            
            var outputArray = imageOutput.split("/");
            var outputDir = "";
            var fileName = '';
            
            console.log("--------------");
            console.log(imageOutput);
            console.log(imageInput);
            console.log(size);
            console.log("--------------");
            
            for(var i = 0; i < outputArray.length; i++){
                if(i < (outputArray.length - 1)){
                    outputDir += (outputArray[i] + "/");
                }else{
                    fileName = outputArray[i];
                }

            }

            var outputFile = helpers.buildDirs(outputDir, size) + fileName;

            fs.createReadStream(imageInput).pipe(fs.createWriteStream(outputFile).on('close', function(){

                console.log(outputFile + " created");

            }));
            
            var outputDirec = "bin/outputs/" + nameParts[0] + "/" + nameParts[1] + "/images/";
            outputDirec = helpers.buildDirs(outputDirec, '') + fileName;
            
            fs.createReadStream(imageInput).pipe(fs.createWriteStream(outputDirec).on('close', function(){

                console.log(outputFile + " created in images folder");

            }));
            
        }
        
        nextCopy();
        
    }else{
        nextCopy();
    }
}

function nextCopy(){
    
    sizeCount++;
    if(bannerInfo_sizes.length == sizeCount){
        sizeCount = 0;
        bannerCount++;
        if(bannerLength == bannerCount){
            console.log("Images copied");
            return;
        }else{
            copyImageJs();
        }
    }else{
        copyImageJs();
    }
    
}

copyImageJs();