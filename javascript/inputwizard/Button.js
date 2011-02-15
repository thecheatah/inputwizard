dojo.provide("inputwizard.Button");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.DisplayModeListener");

dojo.declare(
	"inputwizard.Button",
	[dijit._Widget, 
	 dijit._Templated,
	 inputwizard.DisplayModeListener],
	{
		templatePath : dojo.moduleUrl(
			"inputwizard", 
			"templates/Button.html"
		),
		
		href : "javascript:void(0)",
		buttonLabel : "",
		
		startup : function(){
			this.inherited(arguments);
			this.setButtonLabel(this.buttonLabel);
		},
		
		getDomNode : function(){
			return this.buttonNode;
		},
		
		setButtonLabel : function(buttonLabel){
			this.buttonNode.innerHTML = buttonLabel;
		},
		
		setClass : function(className){
			this.buttonNode.className = className;
			this.buttonNode.setAttribute("class", className);
		},
		
		setDisplayMode : function(mode){
			if(this.displayMode != mode){
				this.displayMode = mode;
				if(this.displayMode == inputwizard.DisplayModeListener.displayModeValues.REVIEW){
					
					this.buttonNode.style.display = "none";
				
				} else if (this.displayMode == inputwizard.DisplayModeListener.displayModeValues.EDIT){
					
					this.buttonNode.style.display = "";
				
				}
			}
		}
	
	}
);
