dojo.provide("inputwizard.DataElement");

dojo.declare(
	"inputwizard.DataElement",
	null,
	{
		// summary:
		//		DataElement object is only visible by the inputwizard.DataStore
		//		class. DataElements hold the key, value and errors of field widgets.
		//
		// description:
		//		The inputwizard.Form class tells the DataStore to create
		//		key value DataElements and store them in a hash map within the DataStore.
		//		DataElements are only manipulated by the DataStore class and are unseen
		//		by all other object. 
		//
			
		key : "",
		
		value: "",
		
		errors: {}, //key value errors
		
		visible: true,
		
		constructor : function(){
			this.inherited(arguments);
			this.errors = {};
		},

		setVisible : function (value) {
			this.visible = value;
		},

		isVisible : function() {
			return this.visible;
		},
		
		setKey : function( /*String*/ inKey){
			this.key = inKey;
		},
		
		setValue : function(/*String*/ inValue){
			this.value = inValue;
		},
		
		setErrors : function(/*string*/ groupName, /*Array of String*/ errors){
			this.errors[groupName] = errors;
		},
		
		getKey : function(){
			return this.key; 
		},
		
		getValue : function(){
			return this.value;
		},
		
		getErrors : function(){
			var errorArray = [];
			
			for(var group in this.errors) {
				for(var i in this.errors[group]){
					errorArray.push(this.errors[group][i]);
				}
			}
			
			return errorArray;//[] key value errors
		},
		
		toString : function(){
			return "Key : " + this.key + "\n" +
				   "Val : " + this.value + "\n" +
				   "Err : " + this.getErrors();
		}					         
	}
);

