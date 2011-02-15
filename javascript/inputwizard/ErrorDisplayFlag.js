dojo.provide("inputwizard.ErrorDisplayFlag");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.ErrorAreaDelegate");

dojo.declare(
	"inputwizard.ErrorDisplayFlag",
	[dijit._Widget, 
	 dijit._Templated,
	 inputwizard.ErrorAreaDelegate],
	{
		
		templatePath: dojo.moduleUrl(
			"inputwizard", 
			"templates/ErrorDisplayFlag.html"
		),
		
		displayId: "",
		isDomVisible: null, // default external display
		isVisible: null, //default internal display
		isContainer: true,
				
		updateVisibile : function(errors){
			
			if(errors.length != 0){
				this.isVisible = true;
			} else {
				this.isVisible = false;
			}
		
		},
		
		errorAreaDelegateUpdateErrors : function(errorArea, errors){			
			
			this.updateVisibile(errors);
			this.updateDisplay();
			
		},
		
		updateDisplay : function(){
			
			if(this.isVisible){
				this.showArea();
			} else {
				this.hideArea();
			}
			
		},
		
		showArea : function(){
			
			this.containerNode.style.opacity = 1;
			this.containerNode.style.display = "inline";
			this.isDomVisible = true;
			
		},
		
		hideArea : function(){
			
			this.containerNode.style.opacity = 0;
			this.containerNode.style.display = "none";
			this.isDomVisible = false;
			
		}
	}
);
