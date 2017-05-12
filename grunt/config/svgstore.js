//Svgstore

/*
Compiles multiple svg files into a single svg using the
symbol method. Reduces multiple http requesting into single
request for many images.
*/

module.exports = {
	"options": {
		"prefix": "svg-"
	},
	"banners": {
		"files": {
			"src/svg/generated/branddefault.svg": [
				"src/svg/working/just-eat-stacked.svg",
				"src/svg/working/just-eat-horizontal.svg"
			]
		}
	}
}