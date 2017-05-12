var fs = require('fs');
var colors = require('colors');
var helpers = require('./helpers.js');
var specifyingSizes = false;

var defaultSizes = [
    "216x36",
    "120x600",
    "160x600",
    "300x50",
    "300x250",
    "300x600",
    "300x1050",
    "320x50",
    "320x480",
    "468x60",
    "720x480",
    "728x90",
    "768x1024",
    "800x1280",
    "970x250",
    "1024x768"
]

var args = process.argv;

var validKeys = [
    'type',
    'name',
    'sizes'
]

var currentKey = '';
var options = {};

for(var i = 0; i < args.length; i++){
    
    var argvalue = args[i];
    
    if(argvalue.charAt(0) == '-'){
        
        currentKey = argvalue.substring(1);
        options[currentKey] = [];
        
    }else{
        
        if(currentKey !== ''){
            if(validKeys.indexOf(currentKey) > - 1){
                options[currentKey].push(argvalue);
            }else{
                console.error('Key ' + currentKey + ' isn\'t valid'.red);
                return;
            }
        }
        
    }
}
if(options['name']){
    
    if(!options['type']){
        console.error(('-type must be defined').red);
        return;
    }
    if(options['sizes']){
        
        var sizesOtp_raw = options['sizes'];
        var sizesOpt_string = '';
        for(var i = 0; i < sizesOtp_raw.length; i++){
            sizesOpt_string += sizesOtp_raw[i];
        }
        var sizesOpt_array = sizesOpt_string.replace(/\s/g,'').split(",");
        var sizeReg = /(\d\d\d\d|\d\d\d|\d\d)x(\d\d\d\d|\d\d\d|\d\d)/;
        defaultSizes = [];
        
        for (var i = 0; i < sizesOpt_array.length; i++){
            
            var singleDem = sizesOpt_array[i];
            var isMatch = singleDem.match(sizeReg)
            if(!isMatch){
                
                console.error(('Size ' + singleDem + ' isn\'t a valid size. Dimensions need to be in the format 1234x4321.').red);
                return;
                
            }else{
                defaultSizes.push(singleDem);
            }
        }
        
        specifyingSizes = true;
        console.log(('Will create sizes : ' + JSON.stringify(defaultSizes) ).green);
        
    }else{
        console.log(('-sizes hasn\'t been defined, will use default sizes').red);
    }
    
    var name = '';
    for(var i = 0; i < options['name'].length; i++){
        name += options['name'][i];
        if(i < (options['name'].length - 1)){
            name += '-';
        }
    }
    var type = '';
    for(var i = 0; i < options['type'].length; i++){
        type += options['type'][i];
        if(i < (options['type'].length - 1)){
            type += '-';
        }
    }
    
    console.log(('Generating files and folders for new banner : ' + type + "-" + name).bold.green);
    console.log('');
    
    newBanner(type, name);
}else{
    console.error(('-name must be defined').red);
    return;
}

function newBanner(type, name){
    
    //data file
    
    var dataSrc = "Scripts/Data/" + type + "/" + name + ".json";
    var bannerName = type + "-" + name;
    
    if(!fs.existsSync("Scripts/Data/" + type + "/")){
        fs.mkdirSync("Scripts/Data/" + type + "/");
    }
    
    if(fs.existsSync(dataSrc)){
        
        var nameCheck = fs.readFileSync(dataSrc, 'utf8');
        var dataFileJson = JSON.parse(nameCheck);
        
        if(specifyingSizes){
            var currentSizes = dataFileJson.sizes;
            var newSizes = [];

            for(i = 0; i < defaultSizes.length; i++){

                var checkSize = defaultSizes[i];
                if(currentSizes.indexOf(checkSize) == -1){
                    dataFileJson.sizes.push(checkSize);
                    newSizes.push(checkSize);
                }

            }
            if(newSizes.length == 0){
                console.error((bannerName + ' banner already defined in the sizes specified').red);
                return;
            }else{
                
                var newData = JSON.stringify(dataFileJson, null, "\t");
                fs.writeFileSync(dataSrc, newData, 'utf8');
                console.log((dataSrc + ' saved').green);
                
                console.error(('Added sizes ' + JSON.stringify(newSizes) + ' to banner ' + bannerName).green);
                return;
                
            }
        }else{
            console.error((bannerName + ' banner already defined in the sizes specified').red);
            return;
        }
        
    }
    
    var banner = {};
    banner.name = bannerName;
    banner.sizes = defaultSizes;
    banner.clicktags = 2;
    
    banner.files = {
        "init_html" : {
            "input" : "src/htmlinline/" + type + "/working" + name + ".html",
            "output" : "src/htmlinline/" + type + "/" + name + "/sizes/"
        },
        "init_css" : {
            "input" : "src/css/common/initial-combined.css",
            "output" : "src/css/common/flat/"
        },
        "rich_html" : {
            "input" : "src/htmlinline/" + type + "/richload/" + name + ".html",
            "output" : "src/htmlmin/" + type + "/" + name + "/richloads/" + type + name + "Rich_{size}/"
        },
        "rich_css" : {
            "input" : "src/css/" + type + "/" + name + "-combined.css",
            "output" : "bin/banners/sizes/" + type + "/richloads/" + type + name + "Rich_{size}/css/"
        },
        "rich_images" : {
        },
        "rich_js" : {
            "input" : "bin/banners/working/richloads/" + type + name + "Rich/js/main.js",
            "output" : "bin/banners/sizes/" + type + "/richloads/" + type + name + "Rich_{size}/js/"
        },
        "manifest" : {
            "input" : "src/js/common/manifest.json",
            "output" : "bin/banners/sizes/" + type + "/" + name + "/{size}/",
            "working" : "bin/banners/working/" + type + "/" + name + "/"
        }
    }
    banner.instantAds = [
        {
            "name": "clickTag",
            "type": "text",
            "default": "https://www.just-eat.co.uk/"
        }
    ];
    banner.richLoads = [
        {
            "name" : type + name + "Rich",
            "src" : type + name + "Rich"
        }
    ];
    banner.zips = [
        {
            "name" : type + "_" + name + "_base_{size}",
            "input" : "bin/banners/sizes/" + type + "/" + name + "/{size}/",
            "output" : "bin/outputs/" + type + "/" + name + "/"
        },{
            "name" : type + name + "Rich_{size}",
            "input" : "bin/banners/sizes/" + type + "/richloads/" + type + name + "Rich_{size}/",
            "output" : "bin/outputs/" + type + "/" + name + "/"
        }
    ];
    
    var newData = JSON.stringify(banner, null, "\t");
    fs.writeFileSync(dataSrc, newData, 'utf8');
    console.log((dataSrc + ' saved').green);
    
    //default files
    
    var newHtml_file = 'src/html/' + type + "/working" + name + ".html";
    var newRich_file = 'src/html/' + type + "/richload/" + name + ".html";
    var newScss_file = 'src/scss/' + type + "/" + name + ".scss";
    
    helpers.buildDirs('src/html/' + type + "/");
    helpers.buildDirs('src/html/' + type + "/richload/");
    helpers.buildDirs('src/scss/' + type + "/");
    
    var newHtml_content = '@@include("../common/header.html")\n';
    newHtml_content += '<ft-default>\n';
    newHtml_content += '<ft-richload name="' + type + name + 'Rich" id="' + type + name + 'Rich"> </ft-richload>\n';
    newHtml_content += '</ft-default>\n';
    newHtml_content += '@@include("../common/preload.html")\n';
    newHtml_content += '@@include("../common/footer.html")\n';

    var newRich_content = '<!DOCTYPE html>\n';
    newRich_content += '<html>\n';
    newRich_content += '	<head>\n';
    newRich_content += '        <link rel="stylesheet" href="css/main.css" type="text/css" />\n';
    newRich_content += '        <link href="../../css/common/rays/ray-anim-clear.css" rel="stylesheet" id="revealCss" />\n';
    newRich_content += '	</head>\n';
    newRich_content += '	<body>\n';
    newRich_content += '        @@include("../../../svg/generated/' + type + name +'.svg")\n';
    newRich_content += '        <ft-default clicktag="1">\n';
    newRich_content += '            <div id="animContainer">\n';
    newRich_content += '            </div>\n';
    newRich_content += '        </ft-default>\n';
    newRich_content += '        <script src="js/main.js"> </script>\n';
    newRich_content += '        <script>\n';
    newRich_content += '            onRichload("clear");\n';
    newRich_content += '            var framesObj = {\n';
    newRich_content += '                "duration" : 30,\n';
    newRich_content += '                "frames" : [\n';
    newRich_content += '                    {\n';
    newRich_content += '                        "duration" : 2.5,\n';
    newRich_content += '                        "containers" : [\n';
    newRich_content += '                            {\n';
    newRich_content += '                                "id" : "animContainer",\n';
    newRich_content += '                                "element" : document.getElementById("animContainer"),\n';
    newRich_content += '                                "class" : "frame-1"\n';
    newRich_content += '                            }\n';
    newRich_content += '                        ],\n';
    newRich_content += '                        "isEndFrame" : false\n';
    newRich_content += '                    }\n';
    newRich_content += '                ]\n';
    newRich_content += '            };\n';
    newRich_content += '            frameAnimation(framesObj);\n';
    newRich_content += '        </script>\n';
    newRich_content += '    </body>\n';
    newRich_content += '</html>';
    
    var newScss_content = '';
    
    if(fs.existsSync(newHtml_file)){
        console.log((newHtml_file + ' already exists').red);
    }else{
        fs.writeFileSync(newHtml_file, newHtml_content, 'utf8');
        console.log((newHtml_file + ' saved').green);
    }
    if(fs.existsSync(newRich_file)){
        console.log((newRich_file + ' already exists').red);
    }else{
        fs.writeFileSync(newRich_file, newRich_content, 'utf8');
        console.log((newRich_file + ' saved').green);
    }
    if(fs.existsSync(newScss_file)){
        console.log((newScss_file + ' already exists').red);
    }else{
        fs.writeFileSync(newScss_file, newScss_content, 'utf8');
        console.log((newScss_file + ' saved').green);
    }
    
    //grunt tasks
    
    var buildTasks = [
        {
            'file'      : 'grunt/config/autoprefixer.js',
            'parents'   : ['examples', 'files'],
            'key'       : "<%= cssSrc %>" + type + "/" + name + "-prefixed.css",
            'value'     : "<%= cssSrc %>" + type + "/" + name + "-compiled.css"
        },{
            'file'      : 'grunt/config/combine_mq.js',
            'parents'   : ['examples', 'files'],
            'key'       : "<%= cssSrc %>" + type + "/" + name + "-combined.css",
            'value'     : "<%= cssSrc %>" + type + "/" + name + "-prefixed.css"
        },{
            'file'      : 'grunt/config/concat.js',
            'parents'   : [],
            'key'       : type + name,
            'value'     : {
                            "src" : [
                                "<%= brandDefaults %>scss/0_brandColours.scss",
                                "<%= brandDefaults %>scss/1_breakPoints.scss",
                                "<%= brandDefaults %>scss/2_mixins.scss",
                                "<%= scssSrc %>common/colourRay-values.scss",
                                "<%= scssSrc %>common/mixins.scss",
                                "<%= scssSrc %>common/colourRay-default.scss",
                                "<%= scssSrc %>common/criticalLoaded.scss",
                                "<%= scssSrc %>" + type + "/" + name + ".scss"
                            ],
                            "dest" : "<%= cssSrc %>" + type + "/" + name + ".scss"
                        }
        },{
            'file'      : 'grunt/config/cssc.js',
            'parents'   : ['main', 'files'],
            'key'       : "<%= cssSrc %>" + type + "/" + name + "-rules.css",
            'value'     : "<%= cssSrc %>" + type + "/" + name + "-combined.css"
        },{
            'file'      : 'grunt/config/cssmin.js',
            'parents'   : ['examples', 'files'],
            'key'       : "<%= bin %>banners/working/richloads/" + type + name + "Rich/css/main.css",
            'value'     : "<%= cssSrc %>" + type + "/" + name + "-rules.css"
        },{
            'file'      : 'grunt/config/htmlmin.js',
            'parents'   : ['working', 'files'],
            'key'       : "<%= bin %>banners/working/" + type + "/" + name + "/index.html",
            'value'     : "<%= htmlMinSrc %>" + type + "/working" + name + ".html"
        },{
            'file'      : 'grunt/config/htmlmin.js',
            'parents'   : ['working', 'files'],
            'key'       : "<%= bin %>banners/working/richloads/" + type + name + "Rich/index.html",
            'value'     : "<%= htmlMinSrc %>" + type + "/richload/" + name + ".html"
        },{
            'file'      : 'grunt/config/htmlmin.js',
            'parents'   : ['sizes', 'files'],
            'key'       : "",
            'value'     : {
                            expand : true,
                            src: ["**/*.html"],
                            cwd: "<%= htmlMinSrc %>" + type + "/" + name + "/sizes/",
                            dest: "<%= bin %>banners/sizes/" + type + "/" + name + "/"
                        }
        },{
            'file'      : 'grunt/config/htmlmin.js',
            'parents'   : ['sizes', 'files'],
            'key'       : "",
            'value'     : {
                            expand : true,
                            src: ["**/*.html"],
                            cwd: "<%= htmlMinSrc %>" + type + "/" + name + "/richloads/",
                            dest: "<%= bin %>banners/sizes/" + type + "/richloads/"
                        }
        },{
            'file'      : 'grunt/config/includereplace.js',
            'parents'   : ['previews', 'files'],
            'key'       : "<%= htmlInlineSrc %>" + type + "/working" + name + ".html",
            'value'     : "<%= htmlSrc %>" + type + "/working" + name + ".html"
        },{
            'file'      : 'grunt/config/includereplace.js',
            'parents'   : ['banners', 'files'],
            'key'       : "<%= htmlInlineSrc %>" + type + "/richload/" + name + ".html",
            'value'     : "<%= htmlSrc %>" + type + "/richload/" + name + ".html"
        },{
            'file'      : 'grunt/config/inlinecss.js',
            'parents'   : ['examples', 'files'],
            'key'       : "<%= htmlMinSrc %>" + type + "/working" + name + ".html",
            'value'     : "<%= htmlInlineSrc %>" + type + "/working" + name + ".html"
        },{
            'file'      : 'grunt/config/inlinecss.js',
            'parents'   : ['examples', 'files'],
            'key'       : "<%= htmlMinSrc %>" + type + "/richload/" + name + ".html",
            'value'     : "<%= htmlInlineSrc %>" + type + "/richload/" + name + ".html"
        },{
            'file'      : 'grunt/config/inlinecss.js',
            'parents'   : ['sizes', 'files'],
            'key'       : "",
            'value'     : {
                            expand : true,
                            src: ["**/*.html"],
                            cwd: "<%= htmlInlineSrc %>" + type + "/" + name + "/sizes",
                            dest: "<%= htmlMinSrc %>" + type + "/" + name + "/sizes"
                        }
        },{
            'file'      : 'grunt/config/sass.js',
            'parents'   : ['examples', 'files'],
            'key'       : "<%= cssSrc %>" + type + "/" + name + "-compiled.css",
            'value'     : "<%= cssSrc %>" + type + "/" + name + ".scss"
        },{
            'file'      : 'grunt/config/svgstore.js',
            'parents'   : ['banners', 'files'],
            'key'       : "src/svg/generated/" + type + name + ".svg",
            'value'     : "<%= svg" + type + name + " %>"
        }
    ]
    
    for(var i = 0; i < buildTasks.length; i++){
        
        var buildTask = buildTasks[i];
        var buildTask_file = buildTask.file;
        var buildTask_parents = buildTask.parents;
        var buildTask_key = buildTask.key;
        var buildTask_value = buildTask.value;
        
        console.log("Processing task : " + buildTask_file);
        
        var buildTask_contents = fs.readFileSync(buildTask_file, 'utf8');
        
        var buildTask_obj = {};
        var buildTask_new = '';
        
        if(buildTask_contents.indexOf('module.exports = ') > -1){
            var buildTask_array = buildTask_contents.split('module.exports = ');
            buildTask_new += buildTask_array[0] + 'module.exports = ';
            buildTask_obj = JSON.parse(buildTask_array[1]);
        }
        var buildTask_addTo = {};
        if(buildTask_parents.length == 0){
            buildTask_addTo = buildTask_obj;
        }else{
            buildTask_addTo = buildTask_obj[buildTask_parents[0]];
            for(var ii = 1; ii < buildTask_parents.length; ii++){
                buildTask_addTo = buildTask_addTo[buildTask_parents[ii]];
            }
        }
        
        var saveTask = false;
        
        if(buildTask_key == ""){
            
            var shouldPush = true;
            for(var ii = 0; ii < buildTask_addTo.length; ii++){
                
                if(buildTask_addTo[ii].cwd == buildTask_value.cwd){
                    shouldPush = false;
                    console.log(('Key already exists in ' + buildTask_file).red);
                    break;
                }
                
            }
            if(shouldPush){
                buildTask_addTo.push(buildTask_value);
                saveTask = true;
            }
            
        }else{
            if(buildTask_addTo[buildTask_key]){
                console.log(('Key already exists in ' + buildTask_file).red);
            }else{
                buildTask_addTo[buildTask_key] = buildTask_value;
                saveTask = true;
            }
        }
        
        if(saveTask){
            buildTask_new += JSON.stringify(buildTask_obj, null, "\t");
            fs.writeFileSync(buildTask_file, buildTask_new, 'utf8');
            console.log((buildTask_file + ' saved').green);
        }
        
    }
    
    //gruntFile
    
    var gruntContents = fs.readFileSync("gruntfile.js", 'utf8');
    var gruntAdd = "svg" + type + name + " : grunt.file.readJSON('grunt/data/svg/" + type + name + ".json'),";
    if(gruntContents.indexOf(gruntAdd) == -1){
        var gruntReplace = "scriptList : grunt.file.readJSON('grunt/data/scripts.json')";
        var gruntNewLine = gruntAdd + "\n            " + gruntReplace;

        gruntContents = gruntContents.replace(gruntReplace, gruntNewLine);
        fs.writeFileSync("gruntfile.js", gruntContents, 'utf8');
        console.log(('Grunfile.js saved').green);
    }else{
        console.log(('Key already exists in grunt file').red);
    }
    
    
    //script data
    
    var scriptContents = fs.readFileSync("grunt/data/scripts.json", 'utf8');
    var scriptKey = "bin/banners/working/richloads/" + type + name + "Rich/js/main.js";
    var scriptValue = ["src/js/common/onRichload.js", "src/js/common/frameControl.js"];
    var scriptObj = JSON.parse(scriptContents);
    if(scriptObj[scriptKey]){
        console.log(('Key' + scriptKey + 'already exists in script data').red);
    }else{
        scriptObj[scriptKey] = scriptValue;
        var scriptNew = JSON.stringify(scriptObj, null, "\t");
        fs.writeFileSync("grunt/data/scripts.json", scriptNew, 'utf8');
        console.log(('Scripts.json updated saved').green);
    }
    
    //svgCount
    
    var svgContents = fs.readFileSync('scripts/svgData.json', 'utf8');
    var svgObj = JSON.parse(svgContents);
    var svgNewObj = {
		"name": type + name,
		"svg": [],
		"page": [
            "http://localhost:3000/banners/working/" + type + "/" + name + "/index.html",
            "http://localhost:3000/banners/working/richloads/" + type + name + "/index.html"
        ]
	}
    var svgAdd = true;
    for(var i = 0; i < svgObj.length; i++){
        if(svgObj[i].name == (type + name)){
            svgAdd = false;
            break;
        }
    }
    if(svgAdd){
        svgObj.push(svgNewObj);
        var newSvgObj = JSON.stringify(svgObj, null, "\t");
        fs.writeFileSync("scripts/svgData.json", newSvgObj, 'utf8');
        
        fs.writeFileSync("grunt/data/svg/" + type + name + ".json", "[]", 'utf8');
        
        console.log(('svgcount updated saved').green);
    }else{
        console.log(('svgcount already exists').red);
    }
}