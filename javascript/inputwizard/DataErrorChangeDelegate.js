dojo.provide("inputwizard.DataErrorChangeDelegate");

dojo.declare(
	"inputwizard.DataErrorChangeDelegate",
	null,
	{
		inheritsFromDataErrorChangeDelegate : true,
		
		dataErrorChangeDelegateErrorsChanged : function(form, errorsChanged){
			console.log("Trying to call unimplemented method " +
						"edu." +
						"rutgers." +
						"ess." +
						"input." +
						"DataErrorChangeDelegate." +
						"dataErrorChangeDelegateErrorChanged()");
			return {};
		}
	}
);
