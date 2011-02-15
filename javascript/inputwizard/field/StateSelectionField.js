dojo.provide("inputwizard.field.StateSelectionField");

dojo.require("inputwizard.field.DropDownField");

dojo.declare(
	"inputwizard.field.StateSelectionField",
	[inputwizard.field.DropDownField],
	{
		
		startup : function(){
			this.addStatesToDropDown();
			this.inherited(arguments);
		},
		
		addStatesToDropDown : function(){
			var parent = this;
			
			var states = this.getStates(function(states){
				parent.appendCountryOptions(states);
			});
		},
		
		getStates : function(callBack){
			
			var parent = this;
			var xhrArgs = {
			    url: 'getStates.json',
			    handleAs: "json",
			    load: function(data) {
					console.log(data);
					callBack(data['states']);
			    },
			    error: function(error) {
					console.error(requested + "Error: " + error);
			    }
			};
			
			dojo.xhrGet(xhrArgs);
			console.log("Called: getStates()");
		},
		
		appendCountryOptions : function(states){
			var states = states;
			for(var i in states){
				var option = this.createOption(states[i]['value'], states[i]['label']);
				this.containerNode.appendChild(option);
			}
		},
		
		createOption : function(value, label){
			var option = document.createElement('option');
			option.setAttribute('value', value);
			option.appendChild(document.createTextNode(label));
			return option;
		}
	}
);
