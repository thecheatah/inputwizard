dojo.provide("inputwizard.DataStore");

dojo.require("inputwizard.DataElement");

dojo.declare(
	"inputwizard.DataStore",
	null,
	{	
		// summary:
		//		DataStore handles all of the inputwizard.DataElement
		//		class element manipulation.
		//
		// description:
		//		DataStore is spoken to only by inputwizard.Form class.
		//		However, Form passes the DataStore DataElements array data to be queried
		//		to certain listeners.
		//		
		
		data : {}, //[]key valued DataElements
		
		cachedValuesToArray: null,
		
		constructor : function() {
			this.data = {};
		},
		
		createDataElement : function(/*String Array*/ keys){
			
			for(var i in keys){
				var dataElement = new inputwizard.DataElement();//creates DataElement object
				dataElement.setKey(keys[i]);
				this.data[keys[i]] = dataElement;
			}
			
		},
		
		getVisibilityStates: function() {
			var result = {};
			for(var key in this.data) {
				result[key] = this.data[key].isVisible();
			}
			return result;
		},
		
		isVisible : function(key) {
			return this.data[key].isVisible();
		},
		
		valuesToArray : function(){
			if (this.cachedValuesToArray != null) {
				return this.cachedValuesToArray;
			}
			var arr = {};
			for(var key in this.data){
				arr[key] = this.data[key].getValue();
			}
			this.cachedValuesToArray = arr;
			return arr; //[]key value DataElements
		},
		
		errorsToArray : function(){
			
			var arr = {};
			for(var key in this.data){
				arr[key] = this.data[key].getErrors();
			}
			return arr; //[]key value DataElements
		},
		
		getValue : function(/*String*/ key) {
			return this.data[key].getValue();//return DataElement Value with specific key in data
		},
		
		setValues : function(/*Key Valued Pair*/ valuesChanged){
			this.cachedValuesToArray = null;
			for(var key in valuesChanged){
				if (this.data[key] != null) {
					this.data[key].setValue(valuesChanged[key]);
				} else {
					console.error("DataStore.setValues: No data element found for key: " + key);
				}
			}
		},
		
		setVisibilities : function (/*Key Valued Pair*/ visibilitiesChanged) {
			for(var key in visibilitiesChanged) {
				this.data[key].setVisible(visibilitiesChanged[key]);
			}
		},
		
		getErrors : function(/*String*/ key){
			return this.data[key].getErrors();//return DataElement []errors with specific key
		},
		
		setErrors : function(/*Field Object*/ groupName, /*Key Value Pair*/ errorsChanged){
			for(var key in errorsChanged){
				if (this.data[key] != null) {
					this.data[key].setErrors(groupName, errorsChanged[key]);
				} else {
					console.error("DataStore.setErrors: No data element found for key: " + key);
				}
			}
		},
		
		toString : function(){
			var dataStoreString = "";
			for(key in this.data){
				dataStoreString += this.data[key].toString() + "\n";
			}
			console.log(dataStoreString);
		}
		
	}
);
