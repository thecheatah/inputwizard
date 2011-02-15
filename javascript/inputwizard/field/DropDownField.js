dojo.provide("inputwizard.field.DropDownField");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.Field");

dojo.declare(
	"inputwizard.field.DropDownField",
	[dijit._Widget, 
	 dijit._Templated,
	 inputwizard.Field],
	{
		
		// summary:
		//		A standard drop down field widget.
		//
		// description:
		//		A subclass of inputwizard.Field class
		//		that takes an initial key and options are set in hypertext. Input
		//		is passed and stored in the inputwizard.DataStore
		//		class.
		//
		// example:
		//		<select dojoType="inputwizard.field.DropDownField" 
		//			key="dropDownMenu">
		//			<option value="show">Show Next Div</option>	
		//			<option value="hide">Hide Next Div</option>	
		//		</select>
		//
		
		templatePath: dojo.moduleUrl(
			"inputwizard.field", 
			"templates/DropDownField.html"
		),
		
		key: "",
		value: "",
		
		startup : function(){
			
			this.inherited(arguments);
			
			this.containerNode.value = this.value;
			this.valuesChanged();
			
			var parent = this;
			this.containerNode.onchange=function(){
				parent.value = parent.containerNode.value;
				parent.valuesChanged();
			};
			
		},
		
		readValueFromDataStore: function(dataStore) {
			this.setValues(dataStore.valuesToArray());
		},
		
		getValues : function(){	
			var key = this.key;
			var value = this.containerNode.value;
			var keyValue = {};
			keyValue[key]=value;
			return keyValue;
		},
		
		setValues : function(keyValues){
			if(keyValues[this.key] != null){
				this.containerNode.value = keyValues[this.key];
				this.value = keyValues[this.key];
			}
			if(this.containerNode.value != keyValues[this.key]){

				console.error(this.containerNode);

				this.value = this.containerNode.value;
				this.valuesChanged();
				
				console.error(keyValues);
				console.error("inputwizard.field.DropDownField.setValues()" + 
						" The value for this key : " + this.key + " value : " + 
						keyValues[this.key] + 
						" does not equal containerNode.value: " + this.containerNode.value +
						". Most likely passed in value that does not equal any child option "+
						"elements under containerNode select element.");
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
					this.reviewContainer.style.display = "inline";
					this.reviewContainer.innerHTML = this.containerNode.options[this.containerNode.selectedIndex].text;
				} else if (this.displayMode == inputwizard.DisplayModeListener.displayModeValues.EDIT){
					this.fieldInput.style.display = "inline";
					this.reviewContainer.style.display = "none";
				}
			}
		}
	}
);
