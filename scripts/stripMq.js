var fs = require('fs');
var cssparser = require("cssparser");
var cssstats = require("cssstats");
var css = require('css');
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
var allFilesJson = bannerData.getData(buildType);

var generalRules = [];
var mediaRules = [];
var keyRules = {};
var fontRules = {};
var mediaSelectors = [];

var sizePos = 0;
var sizeLength = 0;
var bannerPos = 0;
var bannerLength = allFilesJson.length;

var styleTypes = ['inline', 'richload'];
//var styleTypes = ['inline'];
var styleTypesPos = 0;
var styleTypesLength = styleTypes.length;

function nextBanner(){
    
    var mqFiles = allFilesJson[bannerPos];
    var bannerFiles = mqFiles.files;
    var checkSize = mqFiles.sizes[sizePos];
    sizeLength = mqFiles.sizes.length;
    
    var styleType = styleTypes[styleTypesPos];
    
    if(styleType == 'inline'){
        readCssFile(bannerFiles.init_css, 'initial-' + checkSize, checkSize, loopBanners);
    }else{
        readCssFile(bannerFiles.rich_css, 'main', checkSize, loopBanners);
    }
}

var additionSizes = [
    "300x50",
    "320x50",
    "300x250",
    "120x600"
];
var additionFiles = [
    { "input" : "src/css/common/rays/ray-anim-reveal-combined.css", "output" : "src/css/common/rays/", "name" : "ray-anim-reveal" }
]
var additionPos = 0;

function runAdditionals(){
    
    sizeLength = additionSizes.length;
    
    var checkSize = additionSizes[sizePos];
    var addition = additionFiles[additionPos];
    
    readCssFile(addition, addition.name + '-' + checkSize, checkSize, loopAdditions);
    
}

function readCssFile(cssFiles, saveName, checkSize, callBack){
    
    var rawData = fs.readFileSync(cssFiles.input, 'utf8');
    
    var json = cssstats( rawData );
    var obj = css.parse(rawData, {});
    var allRules = obj.stylesheet.rules;
    
    generalRules = [];
    mediaRules = [];
    keyRules = {};
    fontRules = [];
    
    for(var i = 0; i < allRules.length; i++){
        
        var rule = allRules[i];
        var ruleType = rule.type;
        
        
        switch(ruleType){
            
            case 'rule' : {
                
                var selectors = rule.selectors;
                var declarationsRaw = rule.declarations;
                
                var newDeclaration = {};
            
                for(var ii = 0; ii < declarationsRaw.length; ii++){
                    var declaration = declarationsRaw[ii];
                    newDeclaration[declaration.property] = declaration.value;
                }
                
                for(var ii = 0; ii < selectors.length; ii++){
                    
                    var newRule = {
                        'selector' : selectors[ii],
                        'declarations' : newDeclaration
                    };
                    
                    generalRules.push(newRule);
                }
                break;
            }
            
            case 'media' : {
                
                var ruleParams = rule.media;
                
                var matches = [];

                var pattern = /\((.*?)\)/g;
                var match;
                while ((match = pattern.exec(ruleParams)) != null) {
                    matches.push(match[1]);
                }
            
                var matchesLength = matches.length;
                var mediaMatchCount = 0;
                
                var newMqRule = {
                    'sizes' : []
                };
            
                for(var iii = 0; iii < matches.length; iii++){
                    var checkMatch = matches[iii];
                
                    var numberPattern = /\d+/g;
                    var mqValue = checkMatch.match( numberPattern );
                    var mqNumber = Number(mqValue[0]);
                    
                    
                    if(checkMatch.indexOf('min-width') > -1){
                    
                        newMqRule['sizes'].push( {'min-width' : mqNumber} );

                    }else if(checkMatch.indexOf('max-width') > -1){

                        newMqRule['sizes'].push( {'max-width' : mqNumber} );
                        
                    }else if(checkMatch.indexOf('min-height') > -1){

                        newMqRule['sizes'].push( {'min-height' : mqNumber} );
                        
                    }else if(checkMatch.indexOf('max-height') > -1){

                        newMqRule['sizes'].push( {'max-height' : mqNumber} );
                        
                    }
                    
                }
                
                newMqRule['rules'] = rule.rules;
                
                mediaRules.push(newMqRule);
                
                break;
            }
                
            case 'keyframes' : {
                
                
                if(rule.vendor == undefined){
                    
                    var newRule = {
                        keyFrames : []
                    };
                    
                    for(var ii = 0; ii < rule.keyframes.length; ii++){
                        
                        var newKey = {
                            value : null,
                            declarations : {}
                        };
                        var key = rule.keyframes[ii];
                        
                        newKey.value = key.values[0];
                        var keyDeclarations =  key.declarations;
                        
                        for(var iii = 0; iii < keyDeclarations.length; iii++){
                            
                            var declaration = keyDeclarations[iii];
                            newKey.declarations[declaration.property] = declaration.value;
                            
                        }
                        newRule.keyFrames.push(newKey);
                        
                    }
                    
                    keyRules[rule.name] = newRule;
                }
                
                break;
            }
                
            case 'font-face' : {
                
                console.log(rule);
                if(rule.declarations){
                    fontRules.push(rule);
                }
                
            }
        }
    }
    
    var checkSizeSplit = checkSize.split('x');
    var checkWidth = Number(checkSizeSplit[0]);
    var checkHeight = Number(checkSizeSplit[1]);
    var addRules = [];
    
    for(var i = 0; i < mediaRules.length; i++){
        
        var mqRule = mediaRules[i];
        var mqRuleSizes = mqRule.sizes;
        var mqRuleCount = 0;
        
        for(var ii = 0; ii < mqRuleSizes.length; ii++){
            
            var mqRuleCheck = mqRuleSizes[ii];
            
            if(mqRuleCheck['min-width']){
                if(checkWidth >= mqRuleCheck['min-width']){
                    mqRuleCount++;
                }
            }else if(mqRuleCheck['min-height']){
                if(checkHeight >= mqRuleCheck['min-height']){
                    mqRuleCount++;
                }
            }else if(mqRuleCheck['max-width']){
                if(checkWidth <= mqRuleCheck['max-width']){
                    mqRuleCount++;
                }
            }else if(mqRuleCheck['max-height']){
                if(checkHeight <= mqRuleCheck['max-height']){
                    mqRuleCount++;
                }
            }
        }
        
        if(mqRuleCount == mqRuleSizes.length){
            addRules.push(mqRule);
        }
        
    }
    
    
    mediaSelectors = [];
    
    for(i = 0; i < addRules.length; i++){
        var addRule = addRules[i];
        
        var addRuleRules = addRule.rules;
        for(ii = 0; ii < addRuleRules.length; ii++){
            
            var rule = addRuleRules[ii];
            var selectors = rule.selectors;
            var declarationsRaw = rule.declarations;
            var newDeclaration = {};
            
            for(var iii = 0; iii < declarationsRaw.length; iii++){
                var declaration = declarationsRaw[iii];
                 newDeclaration[declaration.property] = declaration.value;
            }
            var newSizes = {}
            for(var iii = 0; iii < addRule.sizes.length; iii++){
                var newSize = addRule.sizes[iii];
                for (var key in newSize){
                    newSizes[key] = newSize[key];
                }
            }
            for(var iii = 0; iii < selectors.length; iii++){
                var selector = selectors[iii];
                
                var assigner = {
                    'selector' : selector,
                    'declarations' : newDeclaration,
                    'sizes' : newSizes
                }
                
                var addAssigner = true;
                
                
                for(var iv = 0; iv < mediaSelectors.length; iv++){
                    
                    var mediaSelector = mediaSelectors[iv];
                    
                    
                    if(mediaSelector.selector == selector){
                        
                        addAssigner = false;
                        
                        var compareMinHeight = mediaSelector['sizes']['min-height'] == undefined ? undefined : mediaSelector['sizes']['min-height'];
                        var compareMinWidth  = mediaSelector['sizes']['min-width'] == undefined  ? undefined : mediaSelector['sizes']['min-width'];
                        var compareMaxHeight = mediaSelector['sizes']['max-height'] == undefined  ? undefined : mediaSelector['sizes']['max-height'];
                        var compareMaxWidth  = mediaSelector['sizes']['max-width'] == undefined  ? undefined : mediaSelector['sizes']['max-width'];
                        
                        var newMinHeight = assigner['sizes']['min-height'] == undefined  ? undefined : assigner['sizes']['min-height'];
                        var newMinWidth  = assigner['sizes']['min-width'] == undefined  ? undefined : assigner['sizes']['min-width'];
                        var newMaxHeight = assigner['sizes']['max-height'] == undefined  ? undefined : assigner['sizes']['max-height'];
                        var newMaxWidth  = assigner['sizes']['max-width'] == undefined  ? undefined : assigner['sizes']['max-width'];                        
                        
                        var shouldReplace = false;
                        
                        if(newMinWidth){
                            if(newMinWidth >= compareMinWidth || !compareMinWidth){
                                if(newMinHeight){
                                    if(newMinHeight >= compareMinHeight || !compareMinHeight){
                                        if(newMaxWidth){
                                            
                                        }else{
                                            if(newMaxHeight){
                                                if(checkHeight <= newMaxHeight){
                                                    shouldReplace = true;
                                                }
                                            }else{
                                                shouldReplace = true;
                                            }
                                        }
                                    }else if(newMaxWidth){
                                        
                                    }else if(newMaxHeight){
                                        
                                    }else{
                                        shouldReplace = true;
                                    }
                                }else if(newMaxWidth){
                                    
                                }else if(newMaxHeight){
                                    
                                }else{
                                    if(compareMinHeight){
                                        if(checkHeight >= compareMinHeight){
                                            if(compareMaxWidth){
                                                
                                            }else if(compareMaxHeight){
                                                if(checkHeight <= compareMaxHeight){
                                                    shouldReplace = true;
                                                }
                                            }else{
                                                shouldReplace = true;
                                            }
                                        }
                                    }else if(compareMaxWidth){
                                        
                                    }else if(compareMaxHeight){
                                        
                                    }else{
                                        shouldReplace = true;
                                    }
                                }
                            }else if(newMinHeight){
                                if(newMinHeight >= compareMinHeight || !compareMinHeight){
                                    if(newMaxWidth){
                                        
                                    }else{
                                        if(newMaxHeight){
                                            if(checkHeight <= newMaxHeight){
                                                shouldReplace = true;
                                            }
                                        }else{
                                            shouldReplace = true;
                                        }
                                    }
                                }
                            }
                        }else if(newMinHeight){
                            if(newMinHeight >= compareMinHeight || !compareMinHeight){
                                if(newMaxWidth){
                                    if(newMaxWidth >= compareMaxWidth || !compareMaxWidth ){
                                        if(checkWidth < newMaxWidth){
                                            if(newMaxHeight){
                                                if(newMaxHeight >= compareMaxHeight || !compareMaxWidth ){
                                                    if(checkHeight < newMaxHeight){
                                                        shouldReplace = true;
                                                    }
                                                }
                                            }
                                        }
                                        
                                    }
                                }else{
                                    if(newMaxHeight){
                                        if(newMaxHeight >= compareMaxHeight || !compareMaxWidth ){
                                            if(checkHeight < newMaxHeight){
                                                shouldReplace = true;
                                            }
                                        }
                                    }else{
                                        shouldReplace = true;
                                    }
                                }
                            }else if(newMaxWidth){
                                if(newMaxWidth >= compareMaxWidth || !compareMaxWidth ){
                                    if(newMaxHeight){
                                        
                                    }else{
                                        shouldReplace = true;
                                    }
                                }
                            }
                        }else if(newMaxWidth){
                            
                        }else if(newMaxHeight){
                            
                        }
                        
                        if(shouldReplace){
                            for(var key in assigner.declarations){
                                mediaSelector['declarations'][key] = assigner['declarations'][key];
                            }
                            for(var key in assigner.sizes){
                                mediaSelector['sizes'][key] = assigner['sizes'][key];
                            }
                        }
                    }
                }
                
                if(addAssigner){
                    
                    
                    mediaSelectors.push(assigner);
                }
                
            }
            
            
        }
    }
    
    
    var newRules = [];
    for(var i =0; i < generalRules.length; i++){
        var cloneObj = {};
        for(var key in generalRules[i]){
            cloneObj[key] = generalRules[i][key];
        }
        newRules.push(cloneObj);
    }
    
    for(var i =0; i < newRules.length; i++){
        
        var rule = newRules[i];
        var ruleSelector = rule.selector;
        
        for(var ii = 0; ii < mediaSelectors.length; ii++){
            
            var mediaRule = mediaSelectors[ii];
            var mediaSelector = mediaRule.selector;
            if(mediaSelector == ruleSelector){

                for(var key in mediaRule.declarations){
                    newRules[i]['declarations'][key] = mediaSelectors[ii]['declarations'][key];
                }
                
            }
            
        }
        
    }
    
    var cssString = "";
    var addKeyFrames = [];
    
    for(i = 0; i < newRules.length; i++){
        
        var rule = newRules[i];
        var ruleSelector = rule.selector;
        var ruleDeclaration = rule.declarations;
        
        
        cssString += ruleSelector + '{';
        
        for(var key in ruleDeclaration){
            var value = ruleDeclaration[key];
            cssString += key + ":" + value + ";";
            
            if(key == 'animation-name'){
                if(value !== "none"){
                    addKeyFrames.push(value);
                }
                
            }
            
        }
        cssString += '}';
    }

    
    for(var i = 0; i < addKeyFrames.length; i++){
        var keyName = addKeyFrames[i];
        var keyRule = keyRules[keyName];
        
        if(keyRule){
        
            var keyString = "@keyframes " + keyName + "{";
            var webKitString  = "@-webkit-keyframes " + keyName + "{";

            for(var ii = 0; ii < keyRule.keyFrames.length; ii++){

                var keyFramePos = keyRule.keyFrames[ii];


                keyString += keyFramePos.value + "{";
                webKitString += keyFramePos.value + "{";
                for(var key in keyFramePos.declarations){
                    keyString += key + ":" + keyFramePos.declarations[key] + ";";
                    webKitString += key + ":" + keyFramePos.declarations[key] + ";";
                }

                keyString += "}";
                webKitString += "}";

            }
            keyString += "}";
            webKitString += "}";


            cssString += keyString;
            cssString += webKitString;
        }
    }
    
    for(i = 0; i < fontRules.length; i++){
        
        cssString += "@font-face {";
        
        var fontRule = fontRules[i];
        for(var key in fontRule.declarations){
            fontRule.declarations
            cssString += fontRule.declarations[key]["property"] + ":" + fontRule.declarations[key]["value"] + ";";
        }
        
        cssString += "}";
    }
    
    var cssDest = helpers.buildDirs(cssFiles.output, checkSize);
    
    fs.writeFileSync(cssDest + saveName + '.css', cssString);

    callBack();    
                     
}

function loopBanners(){
    
    sizePos++;
    if(sizePos == sizeLength){
        sizePos = 0;
        bannerPos++;
        
        if(bannerPos == bannerLength){
            bannerPos = 0;
            styleTypesPos++;
            if(styleTypesPos == styleTypesLength){
                
                sizePos = 0;
                runAdditionals();
               //console.log('done');
            }else{
                nextBanner();
            }
        }else{
            nextBanner();
        }
        
    }else{
        nextBanner();
    }  
    
}

function loopAdditions(){
    
    sizePos++;
    if(sizePos == sizeLength){
        sizePos = 0;
        additionPos++;
        if(additionPos == additionFiles.length){
            additionPos = 0;
            console.log("done");
        }else{
            runAdditionals();
        }
    }else{
        runAdditionals();
    }
    
}

nextBanner();