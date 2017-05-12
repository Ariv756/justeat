//HTMLmin

/*
Minifies HTML content to reduce file size and remove invisible
spaces that may cause problems with styling.
*/
module.exports = {
	"working": {
		"options": {
			"removeComments": true,
			"collapseWhitespace": true,
			"html5": true,
			"keepClosingSlash": true
		},
		"files": {
			"<%= bin %>banners/working/brand/default/index.html": "<%= htmlMinSrc %>brand/workingdefault.html",
			"<%= bin %>banners/working/richloads/branddefaultRich/index.html": "<%= htmlMinSrc %>brand/richload/default.html"
		}
	},
	"sizes": {
		"options": {
			"removeComments": true,
			"collapseWhitespace": true,
			"html5": true,
			"keepClosingSlash": true
		},
		"files": [
			{
				"expand": true,
				"src": [
					"**/*.html"
				],
				"cwd": "<%= htmlMinSrc %>brand/default/sizes/",
				"dest": "<%= bin %>banners/sizes/brand/default/"
			},
			{
				"expand": true,
				"src": [
					"**/*.html"
				],
				"cwd": "<%= htmlMinSrc %>brand/default/richloads/",
				"dest": "<%= bin %>banners/sizes/brand/richloads/"
			}
		]
	}
}