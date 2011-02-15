dojo.provide("inputwizard.field.CountrySelectionField");

dojo.require("inputwizard.field.DropDownField");

dojo.declare(
	"inputwizard.field.CountrySelectionField",
	[inputwizard.field.DropDownField],
	{
		
		startup : function(){
			this.addCountriesToDropDown();
			this.inherited(arguments);
		},
		
		addCountriesToDropDown : function(){
			var parent = this;
			
			var countries = this.getCountries(function(countries){
				parent.appendCountryOptions(countries);
			});
		},
		
		getCountries : function(callBack){
			
			var parent = this;
			var xhrArgs = {
			    url: 'getCountries.json',
			    handleAs: "json",
			    load: function(data) {
					console.log(data);
					callBack(data['countries']);
			    },
			    error: function(error) {
					console.error(requested + "Error: " + error);
			    }
			};
			
			dojo.xhrGet(xhrArgs);
			console.log("Called: getCountries()");
		},
		
		appendCountryOptions : function(countries){
			var countries = countries;
			for(var i in countries){
				var option = this.createOption(countries[i]['value'], countries[i]['label']);
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
