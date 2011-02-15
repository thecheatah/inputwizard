dojo.provide("inputwizard.field.CheckBoxField");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.Field");

dojo.declare(
	"inputwizard.field.CheckBoxField",
	[dijit._Widget, 
	 dijit._Templated,
	 inputwizard.Field],
	{

		// summary:
		//		A standard check box field widget with label predefined.
		//
		// description:
		//		A subclass of inputwizard.Field class
		//		that takes an initial key and associative text label. Input
		//		is passed and stored in the inputwizard.DataStore
		//		class.
		//
		// example:
		//		<input dojoType="inputwizard.field.CheckBoxField" 
		//						key="checkBox"
		//						text="Check off box to see the next div!">
		//
		
		templatePath: dojo.moduleUrl(
			"inputwizard.field", 
			"templates/CheckBoxField.html"
		),
		
		name: "",
		key: "",
		value: "",
		checked: false,
		
		label: "",
		
		startup : function(){
			this.inherited(arguments);
			this.name = dojo.string.trim(this.name);
			this.key = dojo.string.trim(this.key);
			
			if(dojo.string.trim(this.name) == ""){
				this.name = this.key;
				this.fieldInput.setAttribute("name", this.key);
			} else {
				this.fieldInput.setAttribute("name", this.name);
			}
			
			if(this.checked){
				this.fieldInput.checked = true;
				//this.fieldInput.setAttribute("checked", true);
				this.value = this.checked;
			} else {
				this.fieldInput.checked = false;
				this.value = this.checked;
			}
			this.valuesChanged();
			
			var parent = this;
			
			this.fieldInput.onclick=function(){
				if(parent.checked == false){
					parent.checked = true;
				} else {
					parent.checked = false;
				}
				
				parent.value = parent.checked;
				parent.valuesChanged();
			};
			
		},
		
		readValueFromDataStore: function(dataStore) {
			var value = dataStore.getValue(this.key);
			if(value == ""){value = '0';}
			if(value == '1'){
				
				this.fieldInput.checked = true;
				this.checked = true;
				this.value = this.checked;
				
			} else if (value == '0'){
				
				this.fieldInput.checked = false;
				this.checked = false;
				this.value = this.checked;
				
			} else {
				throw new Error("inputwizard.field.CheckBoxField.readValueFromDataStore() dataStore.getValue(" + this.key + ") = " + value + ", this value must be 0 or 1");
			}
		},
		
		getValues : function(){	
			var key = this.key;
			var keyValue = {};
			keyValue[key]=this.value?"1":"0";
			return keyValue;
		},
		
		setValues : function(keyValues){
			if(keyValues[this.key] != null){
				keyValues[this.key] = keyValues[this.key]==true;
				this.checked = keyValues[this.key];
				this.value = keyValues[this.key];
				this.fieldInput.checked = keyValues[this.key];
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
		
		isMatch : function(){
			var value = this.fieldInput.value;
			var matchExp = this.regExp;
			return value.match(matchExp); //returns null if not match
		},
		
		setDisplayMode : function(value){
			if(this.displayMode != value){
				this.displayMode = value;
				if(this.displayMode == inputwizard.DisplayModeListener.displayModeValues.REVIEW){
					if(this.checked){
						this.fieldInput.style.display = "none";
						if(this.editReviewContainerNode.parentNode.tagName == "LABEL"){
							this.editReviewContainerNode.parentNode.setAttribute("class", "reviewText");
						} else {
							this.reviewCheckMark.style.display="";
						}
					} else {
						if(this.editReviewContainerNode.parentNode.tagName == "LABEL"){
							this.editReviewContainerNode.parentNode.setAttribute("style", "display:none;");
						} else {
							this.fieldInput.style.display = "none";
						}
					}
				} else if (this.displayMode == inputwizard.DisplayModeListener.displayModeValues.EDIT){
					
					if(this.editReviewContainerNode.parentNode.tagName == "LABEL"){
						this.editReviewContainerNode.parentNode.setAttribute("class", "");
						this.editReviewContainerNode.parentNode.setAttribute("style", "display:;");
					}
					this.fieldInput.style.display = "";
					this.reviewContainer.style.display = "none";
					this.reviewCheckMark.style.display = "none";
				}
			}
		}
		
	}
);
