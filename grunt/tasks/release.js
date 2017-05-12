//build selected banners for html in release

module.exports = function(grunt) {
    grunt.registerTask('release', [
        "cleanAll",
        "images",
        "styles",
        "html",
        "svg",
        "uglify:release",
        "execute:richloadcopies",
        "execute:zip"
    ]);
};