dojo.provide("inputwizard.button.AbstractNavigationButton");

dojo.require("inputwizard.Button");

dojo.declare(
	"inputwizard.button.AbstractNavigationButton",
	[inputwizard.Button],
	{
		
		navigationId : "",
		navigationWidget : null,
		
		startup : function(){
			this.inherited(arguments);
			
			this.setNavigationWidget(this.navigationId);
			
			var parent = this;
			this.buttonNode.onclick = function(){
				parent.updateNavigationWidget();
			};
		},
		
		setNavigationWidget : function(domNodeId){
			this.navigationWidget = dijit.byId(domNodeId);
		},
		
		updateNavigationWidget : function(){
			console.error("inputwizard.button."+
						  "AbstractNavigationButton.updateNavigationWidget() unimplemented error!");
		}
	
	}
);
