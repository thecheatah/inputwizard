dojo.provide("inputwizard.tests.DataElementTest");

dojo.require("inputwizard.DataElement");

doh.register("DataElement", 
	[
		{ 
		    name: "Test DataElement setKey(), getKey()", 
		    timeout: 4000, 
		    runTest: function(){ 
				var dataElement = new inputwizard.DataElement();
				dataElement.setKey("TestKey");
				doh.assertEqual("TestKey", dataElement.getKey()); 
			} 
		},
		
		{ 
			name: "Test DataElement setValue(), getValue()", 
			timeout: 4000, 
			runTest: function(){
				var dataElement = new inputwizard.DataElement();
				dataElement.setValue("TestValue");
				doh.assertEqual("TestValue", dataElement.getValue()); 
			} 
		},
	
		{ 
			name: "Test DataElement setErrors(), getErrors()", 
			timeout: 4000, 
			runTest: function(){
				var dataElement = new inputwizard.DataElement();
				dataElement.setErrors("GroupName", ["Error1", "Error2"]);
				doh.assertEqual(["Error1", "Error2"], dataElement.getErrors()); 
			} 
		}
	]
);
