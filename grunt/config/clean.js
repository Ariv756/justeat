//Clean

/*
clear generated files
*/

module.exports = {
    all : [
        '<%= cssSrc %>/**/*.{css,scss,map}',
        '<%= htmlMinSrc %>/**/*.html',
        '<%= htmlInlineSrc %>/**/*.html',
        '<%= bin %>/**/*'
    ]
}