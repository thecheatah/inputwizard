dojo.provide("inputwizard.field.RadioButtonField");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.Field");

dojo.declare(
	"inputwizard.field.RadioButtonField",
	[dijit._Widget, 
	 dijit._Templated,
	 inputwizard.Field],
	{
		
		// summary:
		//		A standard radio button field widget with label predefined.
		//
		// description:
		//		A subclass of inputwizard.Field class
		//		that takes an initial key, associative text label, name, and
		//		selected. Input is passed and stored in the inputwizard.DataStore
		//		class.
		//
		// example:
		//		<input dojoType="inputwizard.field.RadioButtonField"
		//			name="rad" 
		//			key="radioButton" 
		//			value="show"
		//			selected=""
		//			text="Show Next Div">
		//			
		//		<input dojoType="inputwizard.field.RadioButtonField" 
		//			name="rad"
		//			key="radioButton" 
		//			value="hide"
		//			selected="checked"
		//			text="Hide Next Div">
		//
		
		templatePath: dojo.moduleUrl(
			"inputwizard.field", 
			"templates/RadioButtonField.html"
		),
		
		key: "",
		value: "",
		name: "",
		reviewText: "",
		checked: false,
		
		startup : function(){
			
			this.inherited(arguments);
			this.name = dojo.string.trim(this.name);
			this.key = dojo.string.trim(this.key);
			
			this.fieldInput.value = this.value;
			
			if(dojo.string.trim(this.name) == ""){
				this.name = this.key;
			}

			try {
				var newField = document.createElement('<input type="radio" name="'+this.name+'" value="'+this.value+'" '+(this.checked?'checked="checked"':'')+'/>');
				this.fieldInput.parentNode.insertBefore(newField, this.fieldInput);
				this.fieldInput.parentNode.removeChild(this.fieldInput);
				this.fieldInput = newField;
			}catch(err){}
			
			this.fieldInput.setAttribute("name", this.name);

			if(this.checked){
				this.fieldInput.setAttribute("checked", true);
				this.valuesChanged();
			}
						
			var parent = this;
			this.fieldInput.onclick=function(){
				parent.value = parent.fieldInput.value;
				parent.valuesChanged();
			};
		},
		
		getValues : function(){	
			var key = this.key;
			var keyValue = {};
			keyValue[key]=this.value;
			return keyValue;
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
					if(this.fieldInput.checked){
						this.fieldInput.style.display = "none";
						this.editReviewContainerNode.parentNode.setAttribute("class", "reviewText");
					} else {
						this.editReviewContainerNode.parentNode.setAttribute("style", "display:none;");
					}
				} else if (this.displayMode == inputwizard.DisplayModeListener.displayModeValues.EDIT){

					this.editReviewContainerNode.parentNode.setAttribute("class", "");
					this.editReviewContainerNode.parentNode.setAttribute("style", "display:inline;");
					this.fieldInput.style.display = "";
					this.reviewContainer.style.display = "none";
				}
			}
		}
	}
);
