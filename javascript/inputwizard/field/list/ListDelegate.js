dojo.provide("inputwizard.field.list.ListDelegate");

dojo.require("dijit._Widget");

dojo.declare(
	"inputwizard.field.list.ListDelegate",
	[dijit._Widget],
	{
		//interface
		inheritsFromListDelegate : true,
		
		listItemData : null, 
		
		listItemWidget : null,
		listDialog : null,
		addItemCallBack : null,
		
		addItem : function(/* List */ list, /* function(listItemData) */ callBack){
			console.error("Trying to call unimplemented method inputwizard.field.list.ListDelegate.addItem()");
		},
		
		removeItem : function(/* List */ list, /* listItemData */ listItemData){
			console.error("Trying to call unimplemented method inputwizard.field.list.ListDelegate.removeItem()");
		},
		
		getListItemWidget : function(/* List */ list, /* listItemData */ listItemData){
			console.error("Trying to call unimplemented method inputwizard.field.list.getListItemWidget()");
			return {};
		}
	}
);
