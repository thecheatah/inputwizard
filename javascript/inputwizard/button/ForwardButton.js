dojo.provide("inputwizard.button.ForwardButton");

dojo.require("inputwizard.button.AbstractNavigationButton");

dojo.declare(
	"inputwizard.button.ForwardButton",
	[inputwizard.button.AbstractNavigationButton],
	{		
		updateNavigationWidget : function(){
			this.navigationWidget.showNextPage();
		}
	
	}
);
