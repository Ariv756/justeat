//Script to create multiple sizes from a single responsive html and manifest file

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

function saveHtmlSize(){
    
    var bannerInfo = JSON.parse(JSON.stringify(parsedData[bannerCount]));
    
    var bannerInfo_name = bannerInfo.name;
    var bannerInfo_sizes = bannerInfo.sizes;
    var bannerInfo_files = bannerInfo.files;
    
    var bannerInfo_init_html = bannerInfo_files.init_html;
    var bannerInfo_rich_html = bannerInfo_files.rich_html;
    var bannerInfo_rich_images = bannerInfo_files.rich_images;
    var bannerInfo_init_manifest = bannerInfo_files.manifest;
    var bannerInfo_clicktags = bannerInfo.clicktags;
    var bannerInfo_richLoads = bannerInfo.richLoads;
    var bannerInfo_instantAds = bannerInfo.instantAds;
    
    var sizeLength = bannerInfo_sizes.length;
    var size = helpers.getSize(bannerInfo_sizes[sizeCount]);
    
    //initial html
    
    var rawHtmlString = fs.readFileSync(bannerInfo_init_html.input, 'utf8');
    
    var oldWidth = 'width: 100%;';
    var oldHeight = 'height: 100%;';
    var oldCritical = '../../css/common/initial.css';
    
    var newWidthString = 'width: ' + size['width'] + 'px;';
    var newHeightString = 'height: ' + size['height'] + 'px;';
    var newCriticalString = '../../../../../css/common/flat/initial-' + size['full'] + '.css';
    
    var reWidth = new RegExp(oldWidth, 'g');
    var reHeight = new RegExp(oldHeight, 'g');
    var reCritical = new RegExp(oldCritical, 'g');
    
    rawHtmlString = rawHtmlString.replace(reWidth, newWidthString);
    rawHtmlString = rawHtmlString.replace(reHeight, newHeightString);
    rawHtmlString = rawHtmlString.replace(reCritical, newCriticalString);
    
    var dirsCheckPath = helpers.buildDirs(bannerInfo_init_html.output + size['full'] + "/", size['full']);
    var newHtmlFile = dirsCheckPath + 'index.html';
    
    fs.writeFileSync(newHtmlFile, rawHtmlString);
    
    //return;
    
    //rich html
    
    var rawRichHtmlString = fs.readFileSync(bannerInfo_rich_html.input, 'utf8');
    
    var replaceRaysReg = /ray-anim-(reveal|grow|clear|trans).css/g;
    var replaceRaysMatch = rawRichHtmlString.match(replaceRaysReg);
    if(replaceRaysMatch){
        var replaceRaysName = replaceRaysMatch[0];
    
        var replaceRaysReplace = '<link href="../../css/common/rays/' + replaceRaysName + '" rel="stylesheet" id="revealCss" />';
        var replaceRaysArray = replaceRaysName.split(".");
        var replaceRaysNewName = replaceRaysArray[0] + "-" + size['full'] + ".css";
        var replaceRaysFile = "src/css/common/rays/" + replaceRaysNewName;
        var replaceRaysCss = fs.readFileSync(replaceRaysFile, 'utf8');
        var replaceRayString = '<style id="revealCss">';
            replaceRayString += replaceRaysCss;
            replaceRayString += '</style>';


        rawRichHtmlString = rawRichHtmlString.replace(replaceRaysReplace, replaceRayString);
    }
    
    
    var dirsCheckPath = helpers.buildDirs(bannerInfo_rich_html.output, size['full']);
    var newHtmlFile = dirsCheckPath + 'index.html';
    fs.writeFileSync(newHtmlFile, rawRichHtmlString);
    
    //manifest
    
    var manifestRaw = fs.readFileSync(bannerInfo_init_manifest.input, 'utf8');
    var manifestObj = JSON.parse(manifestRaw);
    
    manifestObj.width = Number(size.width);
    manifestObj.height = Number(size.height);
    manifestObj.clickTagCount = Number(bannerInfo_clicktags);
    manifestObj.instantAds = bannerInfo_instantAds;
    manifestObj.richLoads = bannerInfo_richLoads;
    if(bannerInfo.videos){
        manifestObj.videos = [];
        manifestObj.videos.push(bannerInfo.videos[size["full"]]);
    }
    
    //console.log(manifestObj.richLoads);
    
    var baseManifest = manifestObj;
    var baseManifestData = "FT.manifest(" + JSON.stringify(baseManifest) + ");";
    
    
    for(var i = 0; i < bannerInfo_instantAds.length; i++){
        
        var insantAd = bannerInfo_instantAds[i];
        if(insantAd.type == "image"){
            
            var defaultImageRaw = insantAd.default;
            var defaultImageArray = defaultImageRaw.split("/");
            var defaultImageName = '';
            
            var defaultPath = '';
            for(var ii = 0; ii < defaultImageArray.length; ii++){
                
                if(ii == (defaultImageArray.length - 1)){
                    defaultImageName = defaultImageArray[ii];
                }else{
                    defaultPath += (defaultImageArray[ii] + "/");
                }
                
            }
            
            var append = "";
            var appendType = bannerInfo_rich_images[insantAd.name].type;
            switch(appendType){
                case "size" :
                    append = size.full;
                break;
                case "dpi" :
                    append = helpers.getDpi(size);
                break;
            }
            
            
            defaultImageArray = defaultImageName.split(".");
            var defaultImageType = defaultImageArray[defaultImageArray.length - 1];
            var defaultImageNameOnly = defaultImageArray[0];
            var defaultNewName = defaultImageNameOnly + "-" + append + "." + defaultImageType;
            
            insantAd.default = defaultPath + defaultNewName;
            
        }
        
    }
    
    for(var i = 0; i < manifestObj.richLoads.length; i++){
        
        var editRichLoad = manifestObj.richLoads[i];
        var baseSrc = editRichLoad.src;
        //console.log(manifestObj);
        manifestObj.richLoads[i].src = baseSrc + "_" + size['full'];
        
    }
    
    var dirsCheckPath = helpers.buildDirs(bannerInfo_init_manifest.output, size['full']);
    var newManifestFile = dirsCheckPath + 'manifest.js';
    var stringManifest = JSON.stringify(manifestObj);
    
    //console.log(stringManifest);
    
    //return;
    
    var manifestData = "FT.manifest(" + stringManifest + ");";
    
    fs.writeFileSync(newManifestFile, manifestData);
    
    if(sizeCount == 0){
        
        helpers.buildDirs(bannerInfo_init_manifest.working , size['full']);
        
        fs.writeFileSync(bannerInfo_init_manifest.working + 'manifest.js', baseManifestData);
        
    }
    
    sizeCount++;
    
    if(sizeCount == bannerInfo_sizes.length){
        sizeCount = 0;
        bannerCount++;
        if(bannerCount == bannerLength){
            console.log("done");
            
        }else{
            saveHtmlSize();
        }
    }else{
        saveHtmlSize();
    }
}


saveHtmlSize();