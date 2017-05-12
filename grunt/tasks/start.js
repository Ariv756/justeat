module.exports = function(grunt) {
    grunt.registerTask('start', [
        "uglify:server",
        "open:webpage",
        "express"
    ]);
};