//Concat

/*
Compiles multiple files into a single file. Use this to add scss variables
from the common directory to other scss files.
*/

module.exports = {
	"default": {
		"src": [
			"<%= scssSrc %>brandDefaults/0_brandColours.scss",
			"<%= scssSrc %>brandDefaults/1_breakPoints.scss",
			"<%= scssSrc %>brandDefaults/2_mixins.scss",
			"<%= scssSrc %>common/preload.scss",
			"<%= scssSrc %>common/colourRay-values.scss",
			"<%= scssSrc %>common/colourRay-default.scss"
		],
		"dest": "<%= cssSrc %>common/initial.scss"
	},
	"ray-anim-reveal": {
		"src": [
			"<%= scssSrc %>brandDefaults/0_brandColours.scss",
			"<%= scssSrc %>brandDefaults/1_breakPoints.scss",
			"<%= scssSrc %>brandDefaults/2_mixins.scss",
			"<%= scssSrc %>common/colourRay-values.scss",
			"<%= scssSrc %>common/colourRay-reveal.scss",
			"<%= scssSrc %>common/colourRay-trans.scss"
		],
		"dest": "<%= cssSrc %>common/rays/ray-anim-reveal.scss"
	},
	"branddefault": {
		"src": [
			"<%= scssSrc %>brandDefaults/0_brandColours.scss",
			"<%= scssSrc %>brandDefaults/1_breakPoints.scss",
			"<%= scssSrc %>brandDefaults/2_mixins.scss",
			"<%= scssSrc %>common/colourRay-values.scss",
			"<%= scssSrc %>common/mixins.scss",
			"<%= scssSrc %>common/colourRay-default.scss",
			"<%= scssSrc %>common/colourRay-clear.scss",
			"<%= scssSrc %>common/colourRay-vertical.scss",
			"<%= scssSrc %>common/colourRay-horizontal.scss",
			"<%= scssSrc %>common/criticalLoaded.scss",
			"<%= scssSrc %>brand/default.scss"
		],
		"dest": "<%= cssSrc %>brand/default.scss"
	}
}