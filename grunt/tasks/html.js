module.exports = function(grunt) {
    grunt.registerTask('html', [
        "includereplace",
        "execute:fixedSizesDev",
        "inlinecss",
        "htmlmin"
    ]);
};