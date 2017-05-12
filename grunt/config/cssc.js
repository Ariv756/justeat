//Combine media queries

/*
Combines multiple media queries with matching parameters into single media query blocks. Helps with minifiying css further
*/

module.exports = {
	"csscFirstSet": {
		"options": {
			"sortSelectors": true,
			"lineBreaks": true,
			"sortDeclarations": true,
			"consolidateViaDeclarations": true,
			"consolidateViaSelectors": false,
			"consolidateMediaQueries": false
		},
		"files": {
			"<%= cssSrc %>common/initial-rules.css": "<%= cssSrc %>common/initial-combined.css",
			"<%= cssSrc %>common/rays/ray-anim-reveal-rules.css": "<%= cssSrc %>common/rays/ray-anim-reveal-combined.css"
		}
	},
	"main": {
		"options": {
			"sortSelectors": true,
			"lineBreaks": true,
			"sortDeclarations": true,
			"consolidateViaDeclarations": true,
			"consolidateViaSelectors": false,
			"consolidateMediaQueries": false
		},
		"files": {
			"<%= cssSrc %>brand/default-rules.css": "<%= cssSrc %>brand/default-combined.css"
		}
	}
}