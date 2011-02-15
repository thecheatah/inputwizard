dojo.provide("inputwizard.field.RegExpField");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.field.TextField");

dojo.declare(
	"inputwizard.field.RegExpField",
	[dijit._Widget, 
	 dijit._Templated,
	 inputwizard.field.TextField],
	{
		// summary:
		//		Inherits from TextField, but takes a regExp as one of its attributes
		//		for user input error handling.
		//
		// description:
		//		The regExp is taken and matched against the value entered by the user.
		//		If the the regExp is not a match then it will push an error message to
		//		an array and return it or else it will return an empty error array
		//		to caller.
		// 
		// example:
		//		<input dojoType="inputwizard.RegExpField"
		//			key="alpha.field"
		//			regExp="/^[a-zA-Z]+$/" 
		//			size="5">
		//		</input>
		//
		
		templatePath: dojo.moduleUrl(
			"inputwizard.field", 
			"templates/TextField.html"
		),
		
		key: "",
		errorMessage: "",
		value: "",
		size: "",
		regExp: "",
		hasError: null,
		
		constructor : function(){
			this.regExp = {};
		},
		
		startup : function(){
			
			this.inherited(arguments);
			
			if(dojo.string.trim(this.errorMessage) == ""){
				this.errorMessage = "Error - field does not regexp - " + this.regExp;
			}
			
			if(!this.isMatch() && dojo.string.trim(this.value)!=""){
				this.errorsChanged();
			} else {
				this.hasError = false;
			}
		},
		
		getErrors : function(){
			var key = this.key;
			var keyValue = {};
			var err = [];
			if(!this.isMatch()){					
				err.push(this.errorMessage);
				this.fieldInput.style.borderColor = "#D21034";
				this.fieldInput.style.backgroundColor = "#FFEFEF";
				this.hasError = true;
			} else {
				this.fieldInput.style.backgroundColor = "";
				this.fieldInput.style.borderColor = "";
				this.hasError = false;
			}
			
			keyValue[key]=err;
			
			return keyValue;
		},
		
		isMatch : function(){
			var value = this.fieldInput.value;
			var matchExp = this.regExp;
			return value.match(matchExp); //returns null if not match
		}
	}
);
