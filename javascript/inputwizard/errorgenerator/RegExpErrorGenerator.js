dojo.provide("inputwizard.errorgenerator.RegExpErrorGenerator");

dojo.require("inputwizard.AbstractErrorGenerator");

dojo.declare(
	"inputwizard.errorgenerator.RegExpErrorGenerator",
	[inputwizard.AbstractErrorGenerator],
	{
		
		constructor : function(args){
			
			this.regExp = args["regExp"];
		
		},
		
		getErrors : function(value){
			if(!value.match(this.regExp)){
				return [this.message];
			}
			return [];
		}
		
	}
);

