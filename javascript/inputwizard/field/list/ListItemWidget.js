dojo.provide("inputwizard.field.list.ListItemWidget");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.FieldDelegate");

dojo.declare(
	"inputwizard.field.list.ListItemWidget",
	[dijit._Widget,
	 dijit._Templated,
	 inputwizard.FieldDelegate],
	{
		
		widgetsInTemplate : true,
		
		templatePath : null,
		parentField : null,
		listItemData : null,
		
		fields : null,
		
		startup : function(){
			this.fields = [];
			this.findFields();//Find and set delegate for fields
			this.inherited(arguments);//Call startup an all of the sub widgets.

			if(this.templatePath == null){
				console.error("templatePath not specified");
			}
		},
		
		findFields : function(){
			var parent = this;
			var fields = inputwizard.Field.findFields(this.domNode);
			dojo.forEach(fields, 
				function(field){
					parent.fields.push(field);
					field.setDelegates(parent);
					var key = field.getKeys()[0];
					
					var value = parent.listItemData.getValue(field.getKeys()[0]);
					
					var keyValue = {};
					
					keyValue[key] = value;
					
					field.setValues(keyValue);
					if(!field._started){
						
						field.startup();
						
					}
				}
			);
		},
		
		setListItemData: function(listItemData) {
			this.listItemData = listItemData;
			this.writeValuesToTemplate(listItemData);
		},
		
		setParentField : function(field){
			this.parentField = field;
		},
		
		writeValuesToTemplate : function( /*ListItemData*/ listItemData){
			console.error("Trying to call unimplemented method inputwizard.field.list.ListItemWidget.writeValuesToTemplate()");
		},
		
		fieldDelegateFieldValuesChanged : function(/*Widget*/ field, /*String*/ valuesChanged){
			this.listItemData.setValue(field.getKeys()[0], valuesChanged[field.getKeys()[0]]);
			this.parentField.valuesChanged();
		},
		
		errorGeneratorDelegateErrorsChanged : function(/*Widget*/ field, /*Array*/ errorsChanged){
		
		}	
	}
);
