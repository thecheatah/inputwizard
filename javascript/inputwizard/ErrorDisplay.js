dojo.provide("inputwizard.ErrorDisplay");

dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.ErrorAreaDelegate");

dojo.declare(
	"inputwizard.ErrorDisplay",
	[dijit._Widget, 
	 dijit._Templated,
	 inputwizard.ErrorAreaDelegate],
	{
		
		// summary:
		//		ErrorDisplay checks whether or not there are error's in the error store. If there is
		//		errors in the errorStore it will create an element for them and append the child
		//		element to the parent node.
		//
		// description:
		//		The inputwizard.ErrorArea feeds the ErrorDisplay errors only if their 
		//		associative key in within the ErrorArea.  The ErrorDisplay will then take those
		//		errors and create a key valued pair within the errorStore, holding the errors key
		//		and the array of errors.  It then iterates through the errorStore picking out all 
		//		the errors and then it goes through the array of errors and creates a list element
		//		for each error which gets appended to an unordered list.  The errors are redrawn
		//		every time the errors are updated.  The ErrorDisplay id needs to be set and the
		//		ErrorArea will look for that specific id.
		//
		// example:
		//		<div dojoType="inputwizard.ErrorDisplay" 
		//			id="errDisplayAlphaNum">
		//		</div>
		//
		
		templatePath: dojo.moduleUrl(
			"inputwizard", 
			"templates/ErrorDisplay.html"
		),
		
		displayId: "",
		isDomVisible: null, // default external display
		isVisible: null, //default internal display
		isContainer: true,
				
		redrawErrors: function(errors){
		
			//Only print unique errors.
			var errorsHash = {};
			for(var i in errors) {
				errorsHash[errors[i]] = true;
			}		
			var uniqueErrors = [];
			for(var error in errorsHash) {
				uniqueErrors.push(error);
			}
			errors = uniqueErrors;

			var errorElements = dojo.query("li", this.containerNode);
			
			for(var i = 0; i < errorElements.length; i++){
				this.containerNode.removeChild(errorElements[i]);
			}
			
			for(var i = 0 ; i < errors.length ; i++){
				this._createErrorElement(errors[i]);
			}
			
			if(dojo.query("li", this.containerNode).length != 0){
				this.isVisible = true;
			} else {
				this.isVisible = false;
			}
		},
		
		errorAreaDelegateUpdateErrors : function(errorArea, errors){			
			
			this.redrawErrors(errors);
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
			if(true || this.isDomVisible == null){
				this.containerNode.style.opacity = 1;
				this.containerNode.style.display = "block";
			} else if(!this.isDomVisible){
				var cont = this.containerNode;
				var anim = dojo.fx.wipeIn({node:cont});
				var mation = dojo.fadeIn({node:cont});
				anim.play();
				mation.play();
			}
			this.isDomVisible = true;
			
		},
		
		hideArea : function(){
			if(true || this.isDomVisible == null){
				this.containerNode.style.opacity = 0;
				this.containerNode.style.display = "none";
			} else if (this.isDomVisible){
				var cont = this.containerNode;
				var anim = dojo.fx.wipeOut({node:cont});
				var mation = dojo.fadeOut({node:cont});
				mation.play();
				anim.play();
			}
			this.isDomVisible = false;
			
		},
		
		_createErrorElement : function(error){
			
			var errorListElement = document.createElement("li");
			var errorString = document.createTextNode(error);
			errorListElement.appendChild(errorString);
			this.containerNode.appendChild(errorListElement);
			
		}
	}
);
