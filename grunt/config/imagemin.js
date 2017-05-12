//Imagemin

/*
Compresses jpg and gif files, for png files use png min
*/
module.exports = {
    imageLib: {
        files: [{
            expand: true,
            cwd: '<%= imageSrc %>/',
            src: ['**/*.{jpg,gif}'],
            dest: '<%= bin %>banners/images'
        }]
    },
    working : {
        files : {
            
            "<%= bin %>/banners/working/richloads/branddefaultRich/images/pizza-margherita.jpg" : "<%= imageSrc %>/food/italian/pizza-margherita-1024x1024.jpg"
        }
    }
};