dojo.provide("inputwizard.ErrorArea");

dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.DataErrorChangeDelegate");
dojo.require("inputwizard.ErrorDisplay");

dojo.declare(
	"inputwizard.ErrorArea",
	[dijit._Widget, 
	 dijit._Templated,
	 inputwizard.DataErrorChangeDelegate],
	{
		// summary:
		//		Error Area holds the keys to all the children widgets to which it is to report errors
		//		for.  It also holds the display node to which the errors get displayed under.
		//
		// description: 
		//		The delegate (inputwizard.Form), updates the error area every time there is
		//		a change in errors for all widgets on the page.  If the errors changed contain any
		//		of the keys in this.keys[] that this ErrorArea listens for, it will then feed the 
		//		inputwizard.ErrorDisplay with the errors and the ErrorDisplay will update
		//		itself with the new list of errors.  The errorDisplayId needs to be set, so the
		//		ErrorArea knows which ErrorDisplay to give the errors to.
		//
		// example:
		//		<div dojoType="inputwizard.ErrorArea"
		//			errorDisplayId="errDisplayAlphaNum">	
		//			<input type ="text" dojoType="inputwizard.field.RegExpField"
		//				key="alpha.field"
		//				errorMessage="Please enter a value only using characters in the alphabet"
		//				regExp="/^[a-zA-Z]+$/" 
		//				size="5">
		//			</input>
		//			<input dojoType="inputwizard.field.RegExpField"
		//				key="number.field"
		//				regExp="/^[1-9]+$/">
		//			</input>	
		//		</div>
		//
		
		templatePath: dojo.moduleUrl(
			"inputwizard", 
			"templates/ErrorArea.html"
		),
		
		isContainer : true,
		errorDisplay: null,//widget
		keys: null,
		errorDisplayId: "",//id of the div that will be displaying the list of errors
		
		startup : function(){
			this.keys = {};
			this.errorDisplay = dijit.byId(this.errorDisplayId);//Widget
			if(this.errorDisplay == null){
				console.error("Unable to find error display Id: " + this.errorDisplayId);
			}
			
			this.findKeys(); //finds all the child widget keys
		},

		dataErrorChangeDelegateErrorsChanged : function(/*Widget*/ form, /*Associative Array*/ errorsChanged){
			// summary:
			//		Takes each key in this.keys and checks if they are in the errorsChanged array.
			//
			var foundKey = false;
			for( var key in errorsChanged ){
				if( key in this.keys ){
					this.keys[key] = form.getDataStoreErrors(key);
					foundKey = true;
				}
			}
			if (foundKey) {
				this.informErrorDisplay();
			}
		},
		
		informErrorDisplay : function(){
			
			this.errorDisplay.errorAreaDelegateUpdateErrors(this, this.errorsToArray());
		
		},
		
		errorsToArray : function(){
			var errorArray = [];
			
			for(var key in this.keys){
				for(var i in this.keys[key]){
					errorArray.push(this.keys[key][i]);
				}
			}
			return errorArray;
		},
		
		findKeys : function(){
			// summary:
			//		Creates a map of the keys in the child widgets.  Then stores them in the keys
			//		array.
			//
			
			var allChildWidgets = dojo.query("[widgetId]", this.containerNode).map(dijit.byNode); //[]dijits;
			var parent = this;
			var keyHash = {};
			
			dojo.forEach(allChildWidgets, 
				function(widget){
					if(widget.inheritsFromField){
						var widgetKeys = widget.getKeys();
						for(var i in widgetKeys){
							keyHash[widgetKeys[i]] = true;
						}
					}
				}
			);
			
			for(var key in keyHash){
				this.keys[key] = true;
			}
		}
	}	
);
