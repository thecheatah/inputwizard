dojo.provide("inputwizard.field.PasswordField");

dojo.require("inputwizard.field.TextField");

dojo.declare(
	"inputwizard.field.PasswordField",
	[inputwizard.field.TextField],
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
			"templates/PasswordField.html"
		)
	}
);
