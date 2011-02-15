dojo.provide("inputwizard.DisplayModeListener");

dojo.declare(
	"inputwizard.DisplayModeListener",
	null,
	{
		isDisplayModeListener: true,
		
		setDisplayMode: function(displayMode) {
			console.log("Trying to call unimplemented method " +
					"inputwizard.Navigation." +
					"setDisplayMode()");
		},
		
		setDisplayModeForFieldsWithinDomNode : function(domNode, displayMode){
			var fields = [];
			
			if(displayMode == inputwizard.DisplayModeListener.displayModeValues.REVIEW){
				dojo.addClass(domNode, "isInReviewMode");
			} else if(displayMode == inputwizard.DisplayModeListener.displayModeValues.EDIT){
				dojo.removeClass(domNode, "isInReviewMode");
			} else {
				console.error("inputwizard.DisplayModeListener - unspecified displayMode: "+
						displayMode);
			}
			
			dojo.forEach(dojo.query("[widgetId]", domNode).map(dijit.byNode),
				function(widget){
					if(widget.isDisplayModeListener){
						fields.push(widget);
					}
				}
			);
			
			for ( var i in fields ){
				fields[i].setDisplayMode(displayMode);
			}
		}
		
	}
);

inputwizard.DisplayModeListener.displayModeValues = {EDIT : ['displayModeValues.EDIT'], REVIEW: ['displayModeValues.REVIEW']}
