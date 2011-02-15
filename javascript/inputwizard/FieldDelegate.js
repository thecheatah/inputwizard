dojo.provide("inputwizard.FieldDelegate");

dojo.require("inputwizard.ErrorGeneratorDelegate");

dojo.declare(
	"inputwizard.FieldDelegate",
	[inputwizard.ErrorGeneratorDelegate],
	{
		// summary:
		//		Interface implemented by the delegate inputwizard.Form class.
		//
		// description:
		//		The methods are called by the subclasses of the inputwizard.Field
		//		class when values change.  These methods are to handle the logic new incoming
		//		values.
		
		fieldDelegateFieldValuesChanged : function(/*Widget*/ field, /*String*/ valuesChanged){
			console.error("Trying to call unimplemented method inputwizard.FieldDelegate.fieldDelegateFieldValuesChanged()");
		},
		
		fieldDelegateFieldVisibilityChanged : function(/*Widget*/ field, /*Map <String, Boolean>*/ visibilitiesChanged) {
			console.error("Trying to call unimplemented method inputwizard.FieldDelegate.fieldDelegateFieldVisibilityChanged()");
		}
		
	}
);
