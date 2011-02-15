dojo.provide("inputwizard.tests.inputwizard");

dojo.require("inputwizard.tests.DataElementTest");
dojo.require("inputwizard.tests.DataStoreTest");
dojo.require("inputwizard.tests.CheckBoxFieldTest");
dojo.require("inputwizard.tests.DropDownFieldTest");

///
if(dojo.isBrowser){
	doh.registerUrl(
			"DropDownFieldIntergration", 
			dojo.moduleUrl("inputwizard.tests", "DropDownFieldIntergrationTest.html")
	);
}
///
