dojo.provide("inputwizard.field.TextField");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.Field");

dojo.declare(
	"inputwizard.field.TextField",
	[dijit._Widget, 
	 dijit._Templated,
	 inputwizard.Field],
	{
		
		// summary:
		//		Generic input type text field. Inherits from inputwizard.Field
		//		and implements unimplemented method getValues().
		//
		// description:
		//		The generic text field is used as a super class for inputwizard.field.RegExpField
		//		and handles the onChange() event and getValues()
		//
		
		templatePath: dojo.moduleUrl(
			"inputwizard.field", 
			"templates/TextField.html"
		),
		
		
		key: "",
		value: "",
		size: "", //generic parameter use to size the text field
		placeHolderText: "",
		showingPlaceHolderText: false,

		startup : function(){
			this.inherited(arguments);
			this.fieldInput.setAttribute("class", this.domNode.getAttribute("class"));
			
			this.key = dojo.string.trim(this.key);
			this.value = dojo.string.trim(this.value);
			this.fieldInput.value = this.value;
			this.fieldInput.name = this.key;
			this.valuesChanged();
			
			var parent = this;
			this.fieldInput.onchange=function(){
				if (!parent.showingPlaceHolderText) {
					parent.value = parent.fieldInput.value;
					parent.valuesChanged();
					parent.errorsChanged();
				}
				parent.onchangePlaceHolderTextCb();
			};
			this.fieldInput.onblur=this.fieldInput.onchange;
			this.fieldInput.onfocus=function() {
				parent.onfocusPlaceHolderTextCb();
			};
			this.onchangePlaceHolderTextCb();
		},
		onfocusPlaceHolderTextCb:function() {
			if (this.showingPlaceHolderText) {
				this.showingPlaceHolderText = false;
				this.fieldInput.value = "";
				dojo.removeClass(this.fieldInput, "PlaceHolderTextVisible");
			}
		},
		onchangePlaceHolderTextCb:function() {
			if (this.value == "") {
				this.showingPlaceHolderText = true;
				dojo.addClass(this.fieldInput, "PlaceHolderTextVisible");
				this.fieldInput.value = this.placeHolderText;
			}
		},
		readValueFromDataStore: function(dataStore) {
			this.onfocusPlaceHolderTextCb();
			this.fieldInput.value = dataStore.getValue(this.key);
			this.value = dataStore.getValue(this.key);
			this.onchangePlaceHolderTextCb();
		},
		getValues : function(){	
			var key = this.key;
			var keyValue = {};
			keyValue[key]=this.value;
			return keyValue;
		},
		
		setValues : function(keyValues){
			if(keyValues[this.key] != null){
				this.value = keyValues[this.key];
				this.fieldInput.value = keyValues[this.key];
			}	
		},
		
		getKeys : function(){
			return [this.key];
		},
		
		getErrors : function(){
			var key = this.key;
			var keyValue = {};
			var err = [];
			keyValue[key] = err;
			return keyValue;
		},
		
		setDisplayMode : function(value){
			if(this.displayMode != value){
				this.displayMode = value;
				if(this.displayMode == inputwizard.DisplayModeListener.displayModeValues.REVIEW){
					this.fieldInput.style.display = "none";
					this.reviewContainer.style.display = "";
					if(this.value.length==0){
						this.reviewContainer.innerHTML = "<em>(None)</em>";
					} else {
						this.reviewContainer.innerHTML = this.value;
					}
				} else if (this.displayMode == inputwizard.DisplayModeListener.displayModeValues.EDIT){
					this.fieldInput.style.display = "";
					this.reviewContainer.style.display = "none";
				}
			}
		}
	}
);
