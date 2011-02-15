dojo.provide("inputwizard.field.ListField");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.Field");
dojo.require("inputwizard.Button");

dojo.declare(
	"inputwizard.field.ListField",
	[dijit._Widget, 
	 dijit._Templated,
	 inputwizard.Field],
	{
		templatePath: dojo.moduleUrl(
				"inputwizard.field", 
				"templates/ListField.html"
			),
			
		MAX_LIST_SIZE : -1,
		
		key : "",
		addButtonLabel: "",
		
		listItemArrayDictionary : null,
		
		listDelegate: null,
		
		startup : function(){
			this.inherited(arguments);
			this.listItemArrayDictionary = [];
			
			try{
				if(!this.listDelegate.inheritsFromListDelegate){
					throw "listDelegate does not inherit from inputwizard.field.list.ListDelegate";
				}
				this.listDelegate.startup();
			} catch(err) {
				console.error(err);
			}
			this.listSizeChanged();
			this._addAddButtonLabel();
			var parent = this;
			this.addButton.onclick = function(){ parent.triggerAddItem();};
		},
		readValueFromDataStore: function(dataStore) {
			var elements = dataStore.getValue(this.key);
			console.log(elements);
			if (typeof elements != "object" || elements.constructor != Array) {
				console.error("Value from datastore is not an array.");
				return;
			}
			for(var i = 0; i < elements.length; i++) {
				this.addItem(elements[i]);
			}
		},
		getKeys : function(){
			return [this.key];
		},
		
		getValues : function(){
			var result = {};
			result[this.key] =  this.toArray();
			return result;
		},
		
		/*
		setValues : function(){
			TODO
		},
		*/
		toArray : function(){
			var result = [];
			for(var i = 0 ; i < this.listItemArrayDictionary.length ; i++){
				result.push(this.listItemArrayDictionary[i].data);
			}
			return result;
		},

		triggerAddItem : function(){
			var parent = this;
			if(parent.MAX_LIST_SIZE == -1 || parent.listItemArrayDictionary.length < parent.MAX_LIST_SIZE){
				this.listDelegate.addItem(this, function(listItemData){
					parent.addItem(listItemData);
				});
			}
		},
		
		listSizeChanged: function() {
			if (this.listItemArrayDictionary.length == 0) {
				this.reviewContainer.style.display = "none";
			} else {
				this.reviewContainer.style.display = "";
			}
			if(this.MAX_LIST_SIZE != -1 && this.listItemArrayDictionary.length == this.MAX_LIST_SIZE){
				this.addButton.style.display = "none";
			} else {
				this.addButton.style.display = "inline-block";
			}
			this.valuesChanged();
		},
		
		addItem : function(listItemData){
			var listItemWidget = this.listDelegate.getListItemWidget(this, listItemData);
			
			listItemWidget.removeButtonLocation.appendChild(this._createDeleteButton(listItemWidget));
			
			this.listWidgetContainer.appendChild(listItemWidget.domNode);
			this.listItemArrayDictionary.push({
				data : listItemData,
				widget : listItemWidget			
			});
			
			listItemWidget.startup();
			
			this.listSizeChanged();
		},
		
		_createDeleteButton : function(widget){
			var deleteButton = new inputwizard.Button();
			deleteButton.startup();
			
			deleteButton.setClass("btn delete");
			deleteButton.setButtonLabel("\u00D7 Delete");			
			
			var deleteButtonDomNode = deleteButton.getDomNode();
			
			var parent = this;
			dojo.connect(deleteButtonDomNode, "onclick", function(){parent._removeWidgetAndValue(widget);});
			return deleteButtonDomNode;
		},
		
		_removeWidgetAndValue : function(widget){
			this.listWidgetContainer.removeChild(widget.domNode);
			
			for(var i = 0 ; i < this.listItemArrayDictionary.length ; i ++){
				if(this.listItemArrayDictionary[i].widget == widget){
					this.listItemArrayDictionary.splice(i, 1);
					break;
				}
			}
			
			this.listSizeChanged();
		},
		
		_addAddButtonLabel : function(){
			var labelText = document.createTextNode(this.addButtonLabel);
			this.addButton.appendChild(labelText);
			
		},
		
		getContainerNodeChildren : function(){
			return dojo.query(">", this.containerNode);
		},
		
		setDisplayMode : function(mode){
			if(this.displayMode != mode){
				this.displayMode = mode;
				if(this.displayMode == inputwizard.DisplayModeListener.displayModeValues.REVIEW){
					
					this.addButton.style.display = "none";
				
				} else if (this.displayMode == inputwizard.DisplayModeListener.displayModeValues.EDIT && (this.listItemArrayDictionary == null || this.listItemArrayDictionary.length != this.MAX_LIST_SIZE)){
					this.addButton.style.display = "";
				}
			}
		}
	
	}
);
