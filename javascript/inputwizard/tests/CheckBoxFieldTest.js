dojo.provide("inputwizard.tests.CheckBoxFieldTest");

dojo.require("inputwizard.field.CheckBoxField");
dojo.require("inputwizard.DataElement");
dojo.require("inputwizard.Form");

var checkBoxFieldMixinFixture = {
    
    setUp : function(){
		
		this.checkBoxField = new inputwizard.field.CheckBoxField();
		
		this.checkBoxField.name = "TestName";
		this.checkBoxField.key = "TestKey";
		
		this.checkBoxField.delegate = {
			fieldDelegateFieldValuesChanged : function(/*Widget*/ field, /*String*/ valuesChanged){
				console.log("fieldDelegateFieldValuesChanged() called");
			},
		
			fieldDelegateFieldVisibilityChanged : function(/*Widget*/ field, /*Map <String, Boolean>*/ visibilitiesChanged) {
				console.log("fieldDelegateFieldValuesChanged() called");
			}
		};
		
		document.body.appendChild(this.checkBoxField.domNode);
		this.checkBoxField.startup();
		this.dataStore = new inputwizard.DataStore();
		
	},
	
	tearDown : function(){
		
		document.body.removeChild(this.checkBoxField.domNode);
		this.dataStore = null;
		this.checkBoxField = null;
		
	},
	
    timeout: 4000
};

doh.register("CheckBoxField", 
	[
		dojo.mixin({
			name : "Test readValueFromDataStore(), With Value:1, Assert fieldInput attribute checked is string 'true'",
			runTest : function(){ 
				
				this.dataStore.createDataElement(["TestKey"]);
				this.dataStore.setValues({TestKey : "1"});
			
				this.checkBoxField.readValueFromDataStore(this.dataStore);
				
				doh.assertTrue(this.checkBoxField.fieldInput.checked);
			}
		}, checkBoxFieldMixinFixture),
		
		dojo.mixin({
			name : "Test readValueFromDataStore(), With Value:1, Assert CheckBoxField field checked is bool true",
			runTest : function(){ 
				
				this.dataStore.createDataElement(["TestKey"]);
				this.dataStore.setValues({TestKey : "1"});
			
				this.checkBoxField.readValueFromDataStore(this.dataStore);
				
				doh.assertTrue(this.checkBoxField.checked);
			}
		}, checkBoxFieldMixinFixture),
		
		dojo.mixin({
			name : "Test readValueFromDataStore(), With Value:1, Assert CheckBoxField field value is bool true",
			runTest : function(){ 
				
				this.dataStore.createDataElement(["TestKey"]);
				this.dataStore.setValues({TestKey : "1"});
			
				this.checkBoxField.readValueFromDataStore(this.dataStore);
				
				doh.assertTrue(this.checkBoxField.value);
			}
		}, checkBoxFieldMixinFixture),
		
		dojo.mixin({
			name : "Test readValueFromDataStore() With Value:0, Assert fieldInput attribute checked is string 'false'",
			runTest : function(){ 
				
				this.dataStore.createDataElement(["TestKey"]);
				this.dataStore.setValues({TestKey : "0"});
			
				this.checkBoxField.readValueFromDataStore(this.dataStore);
				
				doh.assertFalse(this.checkBoxField.fieldInput.checked);
				
			}
		}, checkBoxFieldMixinFixture),
		
		dojo.mixin({
			name : "Test readValueFromDataStore() With Value:0, Assert CheckBoxField field checked is bool false",
			runTest : function(){ 
				
				this.dataStore.createDataElement(["TestKey"]);
				this.dataStore.setValues({TestKey : "0"});
			
				this.checkBoxField.readValueFromDataStore(this.dataStore);
				
				doh.assertFalse(this.checkBoxField.checked);
				
			}
		}, checkBoxFieldMixinFixture),
		
		dojo.mixin({
			name : "Test readValueFromDataStore() With Value:0, Assert CheckBoxField value field checked is bool false",
			runTest : function(){ 
				
				this.dataStore.createDataElement(["TestKey"]);
				this.dataStore.setValues({TestKey : "0"});
			
				this.checkBoxField.readValueFromDataStore(this.dataStore);
				
				doh.assertFalse(this.checkBoxField.value);
				
			}
		}, checkBoxFieldMixinFixture),
		
		dojo.mixin({
			name : "Test readValueFromDataStore() With Value:'Wrong Type', Assert CheckBoxField throw inputwizard.field.CheckBoxField.ImproperValueError()",
			runTest : function(){ 
				
				this.dataStore.createDataElement(["TestKey"]);
				this.dataStore.setValues({TestKey : "Wrong Type"});
				
				doh.assertError(Error, this.checkBoxField, "readValueFromDataStore", [this.dataStore]);
				
			}
		}, checkBoxFieldMixinFixture)
	]
);
