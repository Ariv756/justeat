module.exports = function(grunt) {
    var path = require('path');

    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'grunt/config'),
        jitGrunt: {
            customTasksDir: 'grunt/tasks',
            staticMappings: {
                'includereplace' : 'grunt-include-replace',
                'inlinecss' : 'grunt-inline-css',
                'run' : 'grunt-run',
                'express' : 'grunt-express-server'
            }
        },
        data: {         //path variables
            commonSrc: 'src/common/',
            imageSrc: 'src/images/',
            imageRawSrc: 'src/imagesRaw/',
            htmlSrc: 'src/html/',
            jsSrc: 'src/js/',
            cssSrc: 'src/css/',
            scssSrc: 'src/scss/',
            htmlMinSrc: 'src/htmlmin/',
            htmlInlineSrc: 'src/htmlInline/',
            bin: 'bin/',
            host : 'http://10.20.30.38:8888/',
            scriptList : grunt.file.readJSON('grunt/data/scripts.json')
        }
    });
};