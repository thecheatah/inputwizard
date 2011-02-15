dojo.provide("inputwizard.Form");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.FieldDelegate");
dojo.require("inputwizard.DataStore");
dojo.require("inputwizard.Field");

dojo.declare(
	
	// summary:
	//		This Form class delegates the entire application by talking
	//		to all the different classes and passing in the necessary
	//		information from one to the other.
	// 
	//	description:
	//		The Form class is set as the delegate to the fields and 
	//		listeners by these delegate classes:
	//			inputwizard.FieldDelegate,
	//			inputwizard.DataValueChangeDelegate,
	//			inputwizard.DataErrorChangeDelegate.
	//		The Form finds all the difference listeners (the delegates)
	//		and stores them in three arrays, fields, 
	//		dataValueChangeLisenters, and dataErrorChangeListeners.
	//		
	
	"inputwizard.Form",
	[dijit._Widget, 
	 dijit._Templated, 
	 inputwizard.FieldDelegate],
	{
		
		templatePath: dojo.moduleUrl(
			"inputwizard", 
			"templates/Form.html"
		),
		method: "",
		action: "",
		isStartupComplete: false,
		isContainer : true,	
		dataStore : null,//Holds the singleton inputwizard.DataStore
		allWidgets: [],//[]All contained widgets
		fields : [],//[]Widgets that inherit from inputwizard.Field
		dataValueChangeListeners : [],//[]Widgets that inherit from inputwizard.DataValueChangeDelegate
		dataErrorChangeListeners : [],//[]Widgets that inherit from inputwizard.DataErrorChangeDelegate
		backendDelegate: null,
		backendDelegateClass: "",
		constructor : function(){
			// summary:
			//		The constructor method creates the DataStore to hold all
			//		the values and errors from the field
			//
			
			this.allWidgets = [];
			this.fields = [];
			this.dataValueChangeListeners = [];
			this.dataErrorChangeListeners = [];
		},
		
		startup : function(){
			// summary:
			//		Finds all the initial fields and listeners and informs them
			//		of the initial values.
			//
			
			this.inherited(arguments);

			//Initialize the backend delegate
			if (this.backendDelegateClass == null || this.backendDelegateClass == "") {
				console.info("Form: backendDelegate is not defined");
			} else {
				var backendDelegateClass = eval(this.backendDelegateClass);
				if (backendDelegateClass == null) {
					console.error("Form: Unable to retrieve class from: " + this.backendDelegateClass);
				} else {
					this.backendDelegate = new backendDelegateClass();
				}
			}

			
			this.dataStore = new inputwizard.DataStore();
			this.allWidgets = this._findAllWidgets();
			this.findFields();
			
			this.findDataValueChangeListeners();
			this.findDataErrorChangeListeners();
			
			
			
			var parent = this;
			
			//work around to trigger the listeners after all widgets have been fully initialized
			setTimeout( function() {
				parent.informDataValueChangeListeners(parent.dataStore.valuesToArray());
				parent.informDataErrorChangeListeners(parent.dataStore.errorsToArray());
				parent.isStartupComplete = true;
				parent.loadForm();
			}, 0);

			
		},

		//Methods to handle the formBackend
		saveForm : function() {
			this.backendDelegate.saveFormDataToBackend(this);
		},

		loadForm : function() {
			var parent = this;
			if (this.backendDelegate != null) {
				this.backendDelegate.loadFormDataFromBackend(this, function(fields){parent.readLoadFormDataFromBackend(fields);});
			}
		},

		readLoadFormDataFromBackend: function(fields) {
			this.dataStore.setValues(fields);
			for(var i in this.fields) {
				this.fields[i].readValueFromDataStore(this.dataStore);
			}
			this.informDataValueChangeListeners(this.dataStore.valuesToArray());
		},

		validateFormFromBackend : function() {
			console.log("Called: Form.validateFormFromBackend()");
			var parent = this;
			if (this.backendDelegate != null) {
				this.backendDelegate.validateFormFromBackend(this, function(results){parent.readValidateFormFromBackend(results);});
			}
		},
		
		readValidateFormFromBackend : function(results) {
			console.log(results);
			this.errorGeneratorDelegateErrorsChanged("backend-validation", results);
		},
		
		informDataValueChangeListeners: function(/*Associative Array*/ valuesChanged){
						
			var dataChangeListeners = this.dataValueChangeListeners;
			for(var listener in dataChangeListeners){
				dataChangeListeners[listener].dataValueChangeDelegateValuesChanged(this, valuesChanged);
			}
		},
		
		informDataErrorChangeListeners: function(/*Associative Array*/ errorsChanged){
						
			var errorChangeListeners = this.dataErrorChangeListeners;
			
			for(var listener in errorChangeListeners){
				errorChangeListeners[listener].dataErrorChangeDelegateErrorsChanged(this, errorsChanged);
			}
		},

		fieldDelegateFieldVisibilityChanged : function(/*Widget*/ field, /*String*/ visibilitiesChanged) {
			this.dataStore.setVisibilities(visibilitiesChanged);
			if (this.isStartupComplete) {
				var errorsChanged = {};
				for(var i in visibilitiesChanged) {
					errorsChanged[i] = [];
				}
				this.informDataErrorChangeListeners(errorsChanged);
			}
		},

		fieldDelegateFieldValuesChanged : function(/*Field Widget*/ field, /*Key Valued Pair*/ valuesChanged){
			// summary:
			//		When a value is changed, fieldDelegateFieldValuesChanged
			//		receives the value from the field that inherits from the
			//		inputwizard.Field class running the method
			//		valuesChanged which runs this method.  The dataStore is 
			//		contacted setting the value based on the keys in valuesChanged
			//		with the new value. then the dataValueChangeListeners are
			//		informed that the value has changed.
			//

			for(var i in this.fields){
				if(field == this.fields[i]){
					this.dataStore.setValues(valuesChanged);
					break;
				}
			}
			
			var errorsChanged = {};
			for(var i in valuesChanged) {
				errorsChanged[i] = [];
			}
			this.errorGeneratorDelegateErrorsChanged("backend-validation", errorsChanged);
			
			if (this.isStartupComplete) {
				this.informDataValueChangeListeners(valuesChanged);
				this.informDataErrorChangeListeners(errorsChanged);

				for(var key in valuesChanged) {
					if (key == "page") {
						this.saveForm();
					}
					if (valuesChanged[key] == "review") {
						this.validateFormFromBackend();
					}
				}
			}
		},
		
		errorGeneratorDelegateErrorsChanged : function(/*string*/ groupName, /*Associative Array*/ errorsChanged){
			// summary:
			//		When an error is occurs, errorGeneratorDelegateErrorsChanged
			//		receives the value from the field that inherits from the
			//		inputwizard.Field class running the method
			//		errorsChanged which runs this method.  The dataStore is 
			//		contacted setting the errors based on the key in errorsChanged
			//		with the new error. then the dataErrorChangeListeners are
			//		informed that the errors have changed.
			//
			
			//for(var i in this.fields){
				//if(field == this.fields[i]){
					this.dataStore.setErrors(groupName, errorsChanged);
				//	break;
				//}
			//}
			
			if (this.isStartupComplete) {
				this.informDataErrorChangeListeners(errorsChanged);
			}
		},	
		
		addErrorGenerators : function(/* Array */ errorGenerators){
			
			for(var i in errorGenerators){
				
				errorGenerators[i].setErrorGeneratorDelegate(this);
				
				if(errorGenerators[i].inheritsFromDataValueChangeDelegate){
				
					this.dataValueChangeListeners.push(errorGenerators[i]);
				
				}
			
			}			
			
		},
		
		findDataValueChangeListeners : function(){		
			
			var parent = this;
			
			dojo.forEach(this.allWidgets,
				function(widget){
					if(widget.inheritsFromDataValueChangeDelegate){
						parent.dataValueChangeListeners.push(widget);
					}
				}
			);
		},
		
		findDataErrorChangeListeners : function(){
						
			var parent = this;
			
			dojo.forEach(this.allWidgets,
				function(widget){
					if(widget.inheritsFromDataErrorChangeDelegate){
						parent.dataErrorChangeListeners.push(widget);
					}
				}
			);
		},
				
		findFields : function(){
						
			var parent = this;
			var fields = inputwizard.Field.findFields(this.domNode);
			dojo.forEach(fields, 
				function(field){
					field.setDelegates(parent);
					parent.dataStore.createDataElement(field.getKeys());
					parent.fields.push(field);
				}
			);
			
		},
		
		getFields : function(){
			return this.fields;
		},
		
		getDataStoreValues : function(){
			return this.dataStore.valuesToArray();
		},
		
		getDataStoreErrors : function(/*string*/ key){
			if (this.dataStore.isVisible(key)) {
				return this.dataStore.getErrors(key);
			} else {
				return [];
			}
		},
		
		_findAllWidgets : function(){
			return dojo.query("[widgetId]", this.containerNode).map(dijit.byNode); //[]dijits;
		}
	}
);
