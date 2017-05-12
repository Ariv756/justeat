var fs = require('fs');

var archiver = require('archiver');

var bannerCount = 0;
var sizeCount = 0;
var zipCount = 0;
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

function createZip(){
    
    var banner = parsedData[bannerCount];
    var size = banner.sizes[sizeCount];
    var zipFile = banner.zips[zipCount];
    var zipFileName = helpers.sizeName(zipFile.name + ".zip", size);
    var zipFileInput = helpers.buildDirs(zipFile.input, size);
    var zipFileOutput = zipFile.output;
    
    var finalOutput = helpers.buildDirs(zipFileOutput, size) + zipFileName;
    
    var output = fs.createWriteStream(finalOutput);
    var archive = archiver('zip');
    
    output.on('close', function(){
        console.log("written : " + finalOutput);
        
        zipCount++;
        if(zipCount == banner.zips.length){
            sizeCount++;
            zipCount = 0;
            if(sizeCount == banner.sizes.length){
                sizeCount = 0;
                bannerCount++;
                if(bannerCount == bannerLength){
                    console.log("Done zipping");
                }else{
                    createZip();
                }
            }else{
                createZip();
            }
        }else{
            createZip();
        }
    });
    
    archive.on('error', function(err){
        throw err;
    });
    
    archive.pipe(output);
    archive.bulk([
        { expand: true, cwd: zipFileInput, src: ['**/!(*.jpg|*.png|*.gif)'], dest: ''}
    ]);
    //archive.glob('**/*');
    archive.finalize();

}

createZip();