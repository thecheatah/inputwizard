dojo.provide("inputwizard.field.list.DialogListDelegate");

dojo.require("inputwizard.field.list.ListDelegate");

dojo.require("inputwizard.field.list.ListItemData");

dojo.declare(
	"inputwizard.field.list.DialogListDelegate",
	[inputwizard.field.list.ListDelegate],
	{
		//abstract class
		startup : function(){
			this.inherited(arguments);
			
			this.listDialog.startup();
			var connection = dojo.connect(this.listDialog.submitButton, 'onclick', this, function(event){
				this.addItemCallBack(this.listDialog.getValues());
				this.listDialog.hide();
			});
		},
		
		addItem : function(/* List */ list, /* function(listItemData) */ callBack){
			this.addItemCallBack = callBack;
			this.listItemData = new inputwizard.field.list.ListItemData();
		},
		
		removeItem : function(/* List */ list, /* listItemData */ listItemData){
			list.removeItem(listItemData);
		},
		
		getListItemWidget : function(/* List */ list, /* listItemData */ listItemData){
			console.error("Trying to call unimplemented method inputwizard.field.list.getListItemWidget()");
			return {};
		}
	}
);
