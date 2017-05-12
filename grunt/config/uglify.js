//Uglify

/*
Minifies mutltiple javascript files into a single smaller file. Multiple
js files can be brought together into one file, compressed and mangled
to reduce http requests and file size.
*/

module.exports = {
    debug: {
        options: {
            mangle : false,
            compress : false,
            beautify : true,
            preserveComments  : 'all'
        },
        files : '<%= scriptList %>'
    },
    release: {
        options: {
            compress: {
                drop_console: true
            },
            mangle : true,
            beautify : false,
            preserveComments  : false
        },
        files : '<%= scriptList %>'
    },
    server: {
        options: {
            compress: {
                drop_console: true
            },
            mangle : true,
            beautify : false,
            preserveComments  : false
        },
        files : {
            'bin/server.js' : 'scripts/server.js'
        }
    }
};