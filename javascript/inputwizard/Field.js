dojo.provide("inputwizard.Field");

dojo.require("inputwizard.DisplayModeListener");
dojo.require("inputwizard.DisplayArea");
dojo.require("inputwizard.DisplayAreaVisibilityListener");

dojo.declare(
	"inputwizard.Field",
	[inputwizard.DisplayModeListener,
	 inputwizard.DisplayAreaVisibilityListener],
	{
		// summary:
		//		Field is an abstract class that is inherited by all Field classes.
		//		Field classes are designated by their name ending in Field. 
		//
		//		Current Field subclasses:
		//			inputwizard.CheckBoxField
		//			inputwizard.DropDownField
		//			inputwizard.RadioButtonField
		//			inputwizard.RegExpField
		//			inputwizard.TextField
		//
		// description:
		//		All Field classes share the unimplemented methods getKeys, getValues,
		//		and getErrors.  inheritsFromField parameter is used when the
		//		inputwizard.Form class looks for all widgets within
		//		the DOM that inherit from the Field superclass.  Also at this time,
		//		the Form class is assigned as the delegate to the Field.
		//
		
		displayMode: null,
		inheritsFromField : true, //used to determine if super class is Field
		delegate : null, //Assigned to the Form that looks for all Field widgets
		
		parentDisplayArea: null,
		isParentDisplayAreaVisible: true,

		
		startup : function(){
			this.inherited(arguments);
			this.parentDisplayArea = inputwizard.DisplayArea.findParentDisplayArea(this.domNode);
			this.fieldInput.setAttribute("id", this.domNode.getAttribute("id") + "-field");
		},
		
		displayAreaVisibilityChanged : function(displayArea, isVisible) {
			if (this.parentDisplayArea == displayArea) {
				this.isParentDisplayAreaVisible = isVisible;
//*
				if (this.key != null && this.key == "first-name") {
					try {
						if (isVisible) {
							console.log(this.key + " is visible");
						} else {
							console.log(this.key + " is hidden");
						}
					} catch(e) {
						console.log("Unable to log field visibility.");
					}
				}
//*/

				this.visibilityChanged(isVisible);
			}
		},
		
		visibilityChanged : function (value) {
			var keys = this.getKeys();
			var visibilitiesChanged = {};
			for(var i in keys) {
				visibilitiesChanged[keys[i]] = value;
			}
			this.delegate.fieldDelegateFieldVisibilityChanged(this, visibilitiesChanged);
		},

		readValueFromDataStore: function(dataStore) {
			console.log("Trying to call unimplemented method inputwizard.Field.readValueFromDataStore()");
		},	

		getKeys : function(){
			console.log("Trying to call unimplemented method inputwizard.Field.getKeys()");
			return {};
		},
		
		getValues : function(){
			console.log("Trying to call unimplemented method inputwizard.Field.getValues()");
			return {};
		},
		
		setValues : function(keyValues){
			console.log("Trying to call unimplemented method inputwizard.Field.setValues()");
		},
		
		getErrors : function(){
			console.log("Trying to call unimplemented method inputwizard.Field.getErrors()");
			return {};
		},
		
		valuesChanged : function(){
			// summary:
			//		This method is called by Field Children onChange()/onClick() in startup  
			//		informing the delegate that the value in the input field has changed.
			//
			
			this.delegate.fieldDelegateFieldValuesChanged(this, this.getValues());
		},
		
		errorsChanged : function(){
			// summary:
			//		This method is called by Field Children onChange()/onClick() in startup
			//		passing the delegate an array of errors.
			//
			
			this.delegate.errorGeneratorDelegateErrorsChanged(this.id, this.getErrors());
		},
		
		setDelegates : function(delegate){
			// summary:
			//		Used by the inputwizard.Form to set the delegate of
			//		the field.
			//
			
			this.delegate = delegate;
		},
		
		setDisplayMode : function(value){
			if(this.displayMode != value){
				this.displayMode = value;
				if(this.displayMode == inputwizard.DisplayModeListener.displayModeValues.REVIEW){
					this.fieldInput.style.display = "none";
					this.reviewContainer.style.display = "inline";
					this.reviewContainer.innerHTML = this.value;
				} else if (this.displayMode == inputwizard.DisplayModeListener.displayModeValues.EDIT){
					this.fieldInput.style.display = "inline";
					this.reviewContainer.style.display = "none";
				}
			}
		}
		

	}
);

inputwizard.Field.findFields = function(domNode){
	var allWidgets = dojo.query("[widgetId]", domNode).map(dijit.byNode);
	var fields = [];
	
	for(var i = 0 ; i < allWidgets.length ; i++){
		if(allWidgets[i].inheritsFromField && !inputwizard.Field.isChildOfField(domNode, allWidgets[i].domNode)){
			fields.push(allWidgets[i]);
		}
	}
	return fields;
};

// TODO: Better define this method
inputwizard.Field.isChildOfField = function(rootNode, fieldNode){
	var parent = fieldNode.parentNode;
	
	while (true){
		if(dijit.byNode(parent) == undefined || !dijit.byNode(parent).inheritsFromField){
			parent = parent.parentNode;
			if(parent == rootNode || parent == document) break;
		} else  {
			return true;
		}
	}
	
	return false;
};
