dojo.provide("inputwizard.AbstractErrorGenerator");

dojo.require("inputwizard.DataValueChangeDelegate");

dojo.declare(
	"inputwizard.AbstractErrorGenerator",
	[inputwizard.DataValueChangeDelegate],
	{
		
		errorGeneratorDelegate : null,
		
		staticVar : {idIndex : 0},
		
		key : "",
		message: "",
		
		constructor : function(args){
			
			this.key = args["key"];
			this.message = args["message"];
			
			this.id = "ErrorGenerator_" + (this.staticVar.idIndex++);
		
		},
		
		setErrorGeneratorDelegate : function(/* errorGenerator delegate */ value){
			
			this.errorGeneratorDelegate = value;
		
		},
		
		dataValueChangeDelegateValuesChanged : function(/*Widget*/ form, /*Associative Array*/  valuesChanged){
			
			if(valuesChanged[this.key] != null){
				var errors = {};
				errors[this.key] = this.getErrors(valuesChanged[this.key]);
				this.errorGeneratorDelegate.errorGeneratorDelegateErrorsChanged(this.id, errors);
			}
			
		},
		
		getErrors : function(value){
			
			console.error("inputwizard.AbstractErrorGenerator.getErrors() unimplemented error!");
			return [];

		},
		
		setKey : function(/*string*/ key){
			this.key = key;
		}
		
	}
);
