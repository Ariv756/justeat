//Cssmin

/*
Minifies css to reduce file size
*/

module.exports = {
	"initial": {
		"files": {
			"<%= cssSrc %>common/initial.css": "<%= cssSrc %>common/initial-rules.css",
			"<%= cssSrc %>common/rays/ray-anim-reveal.css": "<%= cssSrc %>common/rays/ray-anim-reveal-rules.css"
		}
	},
	"examples": {
		"files": {
			"<%= bin %>banners/working/richloads/branddefaultRich/css/main.css": "<%= cssSrc %>brand/default-rules.css"
		}
	}
}