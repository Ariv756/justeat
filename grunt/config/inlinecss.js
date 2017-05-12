//inline css

/*
Inlines css into html tags
*/

module.exports = {
	"examples": {
		"options": {
			"applyStyleTags": false,
			"removeStyleTags": false,
			"preserveMediaQueries": false,
			"preserveFontFaces": false,
			"webResources": {
				"scripts": false,
				"images": 0.1
			},
			"applyWidthAttributes": false,
			"applyHeightAttributes": false,
			"applyAttributesTableElements": false,
			"xmlMode": true
		},
		"files": {
			"<%= htmlMinSrc %>brand/workingdefault.html": "<%= htmlInlineSrc %>brand/workingdefault.html",
			"<%= htmlMinSrc %>brand/richload/default.html": "<%= htmlInlineSrc %>brand/richload/default.html"
		}
	},
	"sizes": {
		"options": {
			"applyStyleTags": false,
			"removeStyleTags": false,
			"preserveMediaQueries": false,
			"preserveFontFaces": false,
			"webResources": {
				"scripts": false,
				"images": 0.1
			},
			"applyWidthAttributes": false,
			"applyHeightAttributes": false,
			"applyAttributesTableElements": false,
			"xmlMode": true
		},
		"files": [
			{
				"expand": true,
				"src": [
					"**/*.html"
				],
				"cwd": "<%= htmlInlineSrc %>brand/default/sizes",
				"dest": "<%= htmlMinSrc %>brand/default/sizes"
			}
		]
	}
}