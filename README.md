# Global Developer Test

# About the test

This test will demonstrate your ability to work with an example of one of our development environments.

1. Install all the dependencies needed to build release versions of the banners.
2. There are two sizes currently coded for the banners, 300x50 and 300x250. Following the guide given by the designer (BannerDesigns.png in the root of the repo), build the remaining requested banner sizes.
3. Use sass, html and javascript to create the additional sizes.
4. Fork this repo and commit your test when complete.
5. Make sure you read through all the repository information below, it'll help you create the additional sizes.
6. The banner type is 'brand' and the set name is 'default'.
7. Main html file to edit can be found in src/html/brand/richload/default.html
8. Main scss file to edit can be found in src/scss/brand/default.scss
9. Main js file to edit can be found in src/js/brand/default/main.js
10. Run ```grunt release``` to populate the ```bin``` directory for the server.
11. Once you have started the local server, the banners can be accessed in the following url scheme :
Responsive working file : ```http://localhost:3000/banners/working/brand/default/index.html```
Sized banners : ```http://localhost:3000/banners/sizes/brand/default/{size}/index.html```

# Repository information

Create HTML5 banners for Flashtalking.

To edit and build this project you'll need to install the following :
- [Nodejs](https://nodejs.org/)
- [Sass](http://sass-lang.com/install)
- [Imagemagick](http://www.imagemagick.org/script/binary-releases.php)
- [Gruntjs](http://gruntjs.com/)

The following commands can be run in the root of the repository to build/debug the banners.

- Grunt start : Start running a local server to view banners.
- Grunt watch : Updates debug version of the banners whilst you make changes.
- Grunt debug : Builds a debug version of just the html5 banners.
- Grunt release : Builds a release version of the html5 banners ready to test in flash talking.

Note, if you're overriding a css property using media queries, the property needs to be in the default properties for the rule. e.g.

**This will not work.**
```
.rule{
    height:100px;
    @media (min-height:250px){
        width:200px;
    }
}
```

**This will work.**
```
.rule{
    height:100px;
    width: 100%;
    @media (min-height:250px){
        width:200px;
    }
}
```

# Add a new banner

Run ```node scripts/addBanner.js``` with the follwing arguments to add a new banner ready for development.

- ```-type``` : Group of banners to add a new version too.
- ```-name``` : Unique identifier for the banner set.
- ```-sizes``` : Add the sizes of the banners you wish to create. They follow a WIDTHxHEIGHT dimensions naming convention. Each dimension should be seperated by a comma. For example, if you wanted to create a new set of banners at 300x50 and 320x50, you'd save it as ```-sizes 300x50,320x50```.

This command will create files ready to develop.

- Html file : /src/html/(specified type)/working(specified name).html
- Rich html file :  /src/html/(specified type)/richload/(specified name).html
- Scss file : /src/scss/(specified type)/(specified name).scss
