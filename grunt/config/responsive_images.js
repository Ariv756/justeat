//Responsive images
/*
Scales down larger images into smaller dimensions, use to
server the right quality image to the right device resolution.
*/
module.exports = {
    imageLib:{
        options : {
            engine: "im",
            units : "pixel",
            newFilesOnly : false,
            sizes : [ 
                { name : "120x600",   quality : 70,  gravity : "Center", aspectRatio: false, width: "120",   height: "600"  },
                { name : "160x600",   quality : 70,  gravity : "Center", aspectRatio: false, width: "160",   height: "600"  },
                { name : "300x50",    quality : 90,  gravity : "Center", aspectRatio: false, width: "300",   height: "50"   },
                { name : "300x250",   quality : 70,  gravity : "Center", aspectRatio: false, width: "300",   height: "250"  },
                { name : "300x600",   quality : 90,  gravity : "Center", aspectRatio: false, width: "300",   height: "600"  },
                { name : "320x50",    quality : 90,  gravity : "Center", aspectRatio: false, width: "320",   height: "50"   },
                { name : "320x480",   quality : 90,  gravity : "Center", aspectRatio: false, width: "320",   height: "480"  },
                { name : "468x60",    quality : 90,  gravity : "Center", aspectRatio: false, width: "468",   height: "60"   },
                { name : "720x480",   quality : 90,  gravity : "Center", aspectRatio: false, width: "720",   height: "480"  },
                { name : "728x90",    quality : 70,  gravity : "Center", aspectRatio: false, width: "728",   height: "90"   },
                { name : "768x1024",  quality : 90,  gravity : "Center", aspectRatio: false, width: "768",   height: "1024" },
                { name : "970x250",   quality : 90,  gravity : "Center", aspectRatio: false, width: "970",   height: "250"  },
                { name : "1024x768",  quality : 90,  gravity : "Center", aspectRatio: false, width: "1024",  height: "768"  },
                { name : "1024x1024", quality : 90,  gravity : "Center", aspectRatio: false, width: "1024",  height: "1024" } //this size is for working only
            ]
        },
        files : [{
            expand : true,
            src: ["**/*.{jpg,gif,png}"],
            cwd: "<%= imageRawSrc %>food",
            dest: "<%= imageSrc %>food"
        }]
    }
};