dojo.provide("inputwizard.DataValueChangeDelegate");

dojo.declare(
	"inputwizard.DataValueChangeDelegate",
	null,
	{
		// summary:
		//		Interface implemented by the Display area.  Used by the Form to
		//		assign listeners to the dataValueChangeListeners array.
		//
		// description:
		//		Method is called by the delegate when values have been changed and the
		//		the listeners have been informed in the inputwizard.Form 
		//		class.
		//
		
		inheritsFromDataValueChangeDelegate : true,
		
		dataValueChangeDelegateValuesChanged : function(/*Widget*/ form, /*Associative Array*/  valuesChanged){
			console.log("Trying to call unimplemented method " +
						"edu." +
						"rutgers." +
						"ess." +
						"input." +
						"DataValueChangeDelegate." +
						"dataValueChangeDelegateValuesChanged()");
			return {};
		}
	}
);
