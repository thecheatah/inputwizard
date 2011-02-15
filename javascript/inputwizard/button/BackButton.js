dojo.provide("inputwizard.button.BackButton");

dojo.require("inputwizard.button.AbstractNavigationButton");

dojo.declare(
	"inputwizard.button.BackButton",
	[inputwizard.button.AbstractNavigationButton],
	{	
		
		startup : function(){
			this.inherited(arguments);
			
			var parent = this;
			
			dojo.connect(this.navigationWidget, "updateNavigation", function(){
				parent.setDisplay(parent.navigationWidget.getCurrentPageNumber());
			});
			
		},
		
		updateNavigationWidget : function(){
			this.navigationWidget.showPreviousPage();
			this.setDisplay(this.navigationWidget.getCurrentPageNumber());
		},
		
		setDisplay : function(pageNumber){
			
			if(pageNumber == 0){
				this.buttonNode.style.display = "none";
			} else {
				this.buttonNode.style.display = "";
			}
			
		}
	
	}
);
