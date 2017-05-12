module.exports = function(grunt) {
    grunt.registerTask('scripts', [
        "uglify:debug",
        "execute:richloadcopies"
    ]);
};