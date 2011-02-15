dojo.provide("inputwizard.tests.DataStoreTest");

dojo.require("inputwizard.DataStore");

doh.register("DataStore", 
	[
		{ 
		    name: "Test createDataElement()", 
		    timeout: 4000, 
		    runTest: function(){ 
				var dataStore = new inputwizard.DataStore();
				dataStore.createDataElement(["TestKey"]);
				dataStore.setValues({TestKey : "TestValue"});
				doh.assertEqual("TestValue", dataStore.getValue("TestKey"));
			} 
		},
		
		{ 
		    name: "Test valuesToArray()", 
		    timeout: 4000, 
		    runTest: function(){ 
				var dataStore = new inputwizard.DataStore();
				dataStore.createDataElement(["TestKey"]);
				dataStore.setValues({TestKey : "TestValue"});
				var map = dataStore.valuesToArray();
				var mapToCompare = {};
				mapToCompare["TestKey"] = "TestValue";
				doh.assertEqual(true, map["TestKey"] == mapToCompare["TestKey"]);
			} 
		}
	]
);
