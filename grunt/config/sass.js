//Sass

/*
Compiles sass into a single css file
*/
module.exports = {
	"initial": {
		"options": {
			"style": "compact"
		},
		"files": {
			"<%= cssSrc %>common/initial-compiled.css": "<%= cssSrc %>common/initial.scss",
			"<%= cssSrc %>common/rays/ray-anim-reveal-compiled.css": "<%= cssSrc %>common/rays/ray-anim-reveal.scss"
		}
	},
	"examples": {
		"options": {
			"style": "compact"
		},
		"files": {
			"<%= cssSrc %>brand/default-compiled.css": "<%= cssSrc %>brand/default.scss"
		}
	}
}