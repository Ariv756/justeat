//Execute

/*
Run nodejs tasks as part of the grunt build process
*/

module.exports = {
    stripMQ : {
        options: {
            args: ['release']
        },
        src : 'scripts/stripMq.js'
    },
    stripMQDev : {
        options: {
            args: ['dev']
        },
        src : 'scripts/stripMq.js'
    },
    fixedSizes : {
        options: {
            args: ['release']
        },
        src : 'scripts/fixedSizes.js'
    },
    fixedSizesDev : {
        options: {
            args: ['dev']
        },
        src : 'scripts/fixedSizes.js'
    },
    richloadcopies : {
        options: {
            args: ['dev']
        },
        src : 'scripts/richloadcopies.js'
    },
    zip : {
        options: {
            args: ['dev']
        },
        src : 'scripts/zipFiles.js'
    }
}