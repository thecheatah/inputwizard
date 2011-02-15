dojo.provide("inputwizard.PageArea");

dojo.require("inputwizard.DisplayArea");

dojo.declare(
	"inputwizard.PageArea",
	[inputwizard.DisplayArea],
	{
		pageName:"",
		disableAnimation: true,
		startup : function() {
			this.inherited(arguments);
			this.query = "ds.page == '"+this.pageName+"' || ds.page == 'review'";
		},

		informVisibilityListeners : function() {
			//Do Nothing.
		}
	}
);
