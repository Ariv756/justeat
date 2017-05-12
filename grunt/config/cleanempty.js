//Clean empty

/*
clear any empty folders or files
*/

module.exports = {
    options: {},
    all : [
        '<%= cssSrc %>/**/*',
        '<%= htmlMinSrc %>/**/*',
        '<%= htmlInlineSrc %>/**/*',
        '<%= bin %>/**/*'
    ]
}