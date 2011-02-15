dojo.provide("inputwizard.field.list.ListItemData");

dojo.declare(
	"inputwizard.field.list.ListItemData",
	null,
	{
		
		listItemData : null,
		
		constructor : function(){
			this.listItemData = {};
		},
		
		setValue : function (/* string */ key, /* value */ value){
			this.listItemData[key] = value;
		},
		
		getValue : function (key){
			return this.listItemData[key];
		},
		
		getAllValues : function(){
			var results = {};
			for(var key in this.listItemData) {
				results[key] = this.listItemData[key];
			}
			return results;
		},
		
		toString : function (){
			for (var key in this.listItemData){
				console.log("Key  : " + key);
				console.log("Value: " + this.listItemData[key]);
			}
		}
		
	}
);

inputwizard.field.list.ListItemData.createFromMap = function(map) {
	var result = new inputwizard.field.list.ListItemData();
	for(var key in map) {
		result.setValue(key, map[key]);
	}
	return result;
};
