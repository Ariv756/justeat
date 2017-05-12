//Include replace

/*
Merges multiple files into a single file.
*/
module.exports = {
	"previews": {
		"files": {
			"<%= htmlInlineSrc %>brand/workingdefault.html": "<%= htmlSrc %>brand/workingdefault.html"
		}
	},
	"banners": {
		"files": {
			"<%= htmlInlineSrc %>brand/richload/default.html": "<%= htmlSrc %>brand/richload/default.html"
		}
	}
}