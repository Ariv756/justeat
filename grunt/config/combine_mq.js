//Combine media queries

/*
Combines multiple media queries with matching parameters into single media query blocks. Helps with minifiying css further
*/

module.exports = {
	"initial": {
		"files": {
			"<%= cssSrc %>common/initial-combined.css": "<%= cssSrc %>common/initial-prefixed.css",
			"<%= cssSrc %>common/rays/ray-anim-reveal-combined.css": "<%= cssSrc %>common/rays/ray-anim-reveal-prefixed.css"
		}
	},
	"examples": {
		"files": {
			"<%= cssSrc %>brand/default-combined.css": "<%= cssSrc %>brand/default-prefixed.css"
		}
	}
}