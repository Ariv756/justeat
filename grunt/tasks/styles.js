module.exports = function(grunt) {
    grunt.registerTask('styles', [
        "concat",
        "sass",
        "autoprefixer",
        "combine_mq",
        "cssc",
        "cssmin",
        "execute:stripMQDev"
    ]);
};