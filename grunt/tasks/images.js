module.exports = function(grunt) {
    grunt.registerTask('images', [
        "responsive_images",
        "imagemin"
    ]);
};