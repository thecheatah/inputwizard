dojo.provide("inputwizard.tests.DropDownFieldTest");

dojo.require("inputwizard.field.DropDownField");
dojo.require("inputwizard.DataStore");

var dropDownFieldMixinFixture = {
	setUp : function(){
	
		this.dropDownField = new inputwizard.field.DropDownField();
		
		this.dropDownField.value = "TestValueMiddle";
		this.dropDownField.key = "TestKey";
		
		this.dropDownField.delegate = {
			fieldDelegateFieldValuesChanged : function(/*Widget*/ field, /*String*/ valuesChanged){
				console.log("fieldDelegateFieldValuesChanged() called");
			},
		
			fieldDelegateFieldVisibilityChanged : function(/*Widget*/ field, /*Map <String, Boolean>*/ visibilitiesChanged) {
				console.log("fieldDelegateFieldValuesChanged() called");
			}
		};
		
		var optionTop = document.createElement('option');
		var optionMiddle = document.createElement('option');
		var optionBottom = document.createElement('option');
		
		optionTop.value = "TestValueTop"; 
		optionMiddle.value = "TestValueMiddle"; 
		optionBottom.value = "TestValueBottom";
		
		optionTop.innerHTML = "top";
		optionMiddle.innerHTML = "middle";
		optionBottom.innerHTML = "bottom";
		
		this.dropDownField.containerNode.appendChild(optionTop);
		this.dropDownField.containerNode.appendChild(optionMiddle);
		this.dropDownField.containerNode.appendChild(optionBottom);
		
		document.body.appendChild(this.dropDownField.domNode);
		this.dropDownField.startup();
		this.dataStore = new inputwizard.DataStore();
	},

	tearDown : function(){
		
		document.body.removeChild(this.dropDownField.domNode);
		this.dataStore = null;
		this.dropDownField = null;	
	},

	timeout: 4000
};

doh.register("DropDownField", 
	[	 
		dojo.mixin({
			name : "DropDownWidget value should equal TestValueTop",
			runTest : function(){ 
				
				this.dataStore.createDataElement(["TestKey"]);
				this.dataStore.setValues({TestKey : "TestValueTop"});
				
				doh.assertEqual("TestValueMiddle", this.dropDownField.value);
				
				this.dropDownField.readValueFromDataStore(this.dataStore);
				
				doh.assertEqual("TestValueTop", this.dropDownField.value);
			
			}
		}, dropDownFieldMixinFixture),
		
		dojo.mixin({
			name : "DropDownWidget.containerNode value should equal TestValueTop",
			runTest : function(){ 
				
				this.dataStore.createDataElement(["TestKey"]);
				this.dataStore.setValues({TestKey : "TestValueTop"});
				
				doh.assertEqual("TestValueMiddle", this.dropDownField.containerNode.value);
			
				this.dropDownField.readValueFromDataStore(this.dataStore);
				
				doh.assertEqual("TestValueTop", this.dropDownField.containerNode.value);
			
			}
		}, dropDownFieldMixinFixture),
		
		dojo.mixin({
			name : "DropDownWidget.containerNode value null",
			runTest : function(){ 
				
				this.dataStore.createDataElement(["TestKey"]);
				this.dataStore.setValues({TestKey : null});
				
				doh.assertEqual("TestValueMiddle", this.dropDownField.containerNode.value);
			
				this.dropDownField.readValueFromDataStore(this.dataStore);
				
				doh.assertEqual("TestValueTop", this.dropDownField.containerNode.value);
			
			}
		}, dropDownFieldMixinFixture)
	]
);

