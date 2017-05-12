//Autoprefixer

/*
Takes css rules and adds prefixes based on data from caniuse.com

e.g. 
#before autoprefixer
.anim{
    transform : translate(0,10px,0);
}
#after autoprefixer
.anim{
    -webkit-transform : translate(0,10px,0);
    -moz-transform : translate(0,10px,0);
    -ms-transform : translate(0,10px,0);
    transform : translate(0,10px,0);
}
*/

module.exports = {
	"initial": {
		"options": {
			"cascade": false
		},
		"files": {
			"<%= cssSrc %>common/initial-prefixed.css": "<%= cssSrc %>common/initial-compiled.css",
			"<%= cssSrc %>common/rays/ray-anim-reveal-prefixed.css": "<%= cssSrc %>common/rays/ray-anim-reveal-compiled.css"
		}
	},
	"examples": {
		"options": {
			"cascade": false
		},
		"files": {
			"<%= cssSrc %>brand/default-prefixed.css": "<%= cssSrc %>brand/default-compiled.css"
		}
	}
}