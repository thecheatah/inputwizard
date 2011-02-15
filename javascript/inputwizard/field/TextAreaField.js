 dojo.provide("inputwizard.field.TextAreaField");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.Field");

dojo.declare(
	"inputwizard.field.TextAreaField",
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
			"templates/TextAreaField.html"
		),
		
		
		key : "",
		value : "",
		rows : "",
		cols : "",
		currentCount : 0,
		maxLength : 3800, //default max length
		hasError : null,
		errorMessage : "Please reduce the length of your text to " + 
					   this.maxLength + " characters.",
		
		startup : function(){
			
			this.inherited(arguments);
			
			this.fieldInput.setAttribute("class", this.editReviewContainerNode.getAttribute("class"));
			this.fieldInput.setAttribute("rows", this.rows);
			this.fieldInput.setAttribute("cols", this.cols);
			
			this.key = dojo.string.trim(this.key);
			this.fieldInput.value = dojo.string.trim(this.value);
			this.updateCounter();
			this.valuesChanged();
			
			var parent = this;
			
			this.fieldInput.onchange=function(){
				parent.valuesChanged();
				parent.errorsChanged();
				parent.updateCounter();
			};
			
			this.fieldInput.onkeyup=function(){
				parent.updateCounter();
				parent.errorsChanged();
			};
		},
		
		readValueFromDataStore: function(dataStore) {
			this.fieldInput.value = dataStore.getValue(this.key);
			this.value = dataStore.getValue(this.key);
			
			this.updateCounter();
		},
		
		updateCounter : function() {
			
			this.currentCount =
				this.maxLength - this.trimString(this.fieldInput.value).length;
			
			var countText = this.currentCount.toString() + " remaining characters.";
			
			this.count.innerHTML = countText;
		},
		
		trimString : function(/*String*/ fieldInputString){
			return fieldInputString.replace(/(\r\n|\r|\n)/g, "\n");
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
			
			if(this.currentCount < 0){
				
				err.push(this.errorMessage);
				
				this.fieldInput.style.borderColor = "#D21034";
				this.fieldInput.style.backgroundColor = "#FFEFEF";
				dojo.addClass(this.count, "q_errors");
				
			} else {
				
				this.fieldInput.style.backgroundColor = "";
				this.fieldInput.style.borderColor = "";
				dojo.removeClass(this.count, "q_errors");
				
				this.hasError = false;
				
			}
				
			keyValue[key] = err;
			return keyValue;
		},
		
		createDisplayModeParagraph : function(){
			
			return this.value.replace(/\n/g, '<br />');
			
		},
		
		setDisplayMode : function(value){
			if(this.displayMode != value){
				this.displayMode = value;
				if(this.displayMode == inputwizard.DisplayModeListener.displayModeValues.REVIEW){
					this.fieldInput.style.display = "none";
					this.reviewContainer.style.display = "block";
					if(this.value.length==0){
						this.reviewContainer.innerHTML = "<em>(None)</em>";
					} else {
						this.setReviewContainerDimensions(this.cols);
						this.reviewContainer.innerHTML = this.createDisplayModeParagraph();
					}
				} else if (this.displayMode == inputwizard.DisplayModeListener.displayModeValues.EDIT){
					this.fieldInput.style.display = "";
					this.reviewContainer.style.display = "none";
				}
			}
		},
		
		setReviewContainerDimensions : function(cols){
						
			if(cols == "1"){
				this.reviewContainer.style.width = "26px";
			} else {
				this.reviewContainer.style.width= 26 + 8*parseInt(cols-1) + "px";
			}
		}
	}
);
