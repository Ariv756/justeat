//build selected banners for html in debug

module.exports = function(grunt) {
    grunt.registerTask('debug', [
        "styles",
        "html",
        "svg",
        "scripts"
    ]);
};