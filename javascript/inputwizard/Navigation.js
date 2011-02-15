dojo.provide("inputwizard.Navigation");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.Field");

dojo.declare(
	"inputwizard.Navigation",
	[dijit._Widget, 
	 dijit._Templated,
	 inputwizard.Field],
	{
		
		templatePath: dojo.moduleUrl(
			"inputwizard", 
			"templates/Navigation.html"
		),
		
		key : "",
		value : "",
		
		currentPageNumber : 0,
		
		links : null,
		names : null,
		
		constructor : function(){
		
			this.links = [];
			this.names = [];
			              
		},
		
		startup : function(){
			this.links = dojo.query("a", this.containerNode );
			var parent = this;
			
			for(var i = 0; i < this.links.length; i++){
				
				this.names[i] = this.links[i].name;
				
				if (this.links[i].className.match(/\bcurrent\b/)){
					
					this.value = this.links[i].name;
					this.setCurrentPageNumber(i);
					this.updateNavigation();
					
					
					if(this.links[i].getAttribute('review') == "true"){
						this.setDisplayModeForFieldsWithinDomNode(dojo.byId('review'), inputwizard.DisplayModeListener.displayModeValues.REVIEW);
					} else {
						this.setDisplayModeForFieldsWithinDomNode(dojo.byId('review'), inputwizard.DisplayModeListener.displayModeValues.EDIT);
					}
				}
				
				dojo.connect(this.links[i], "onclick", function(e){	
					parent.setCurrentPageNumberOnLinkClick(e);
				});	
				
			}
			
		},
		
		reviewIdExists : function(){
			
			if(!dojo.byId('review')){
				console.log("I was expecting the inputwizard.Form domNode " + 
						"to have an id of review.  Please rename Form id to review.");
				
				return false;
			}
			
			return true;
			
		},
		
		setCurrentPageNumberOnLinkClick : function(e){
			this.reviewIdExists();
			
			for(var i = 0 ; i < this.links.length ; i++){
				dojo.removeClass(this.links[i],"current");	
				if(e.currentTarget == this.links[i]){
					this.currentPageNumber = i;
				}
			}
			this.updateNavigation();
		},
		
		setCurrentPageNumber : function(number){
			this.reviewIdExists();
			
			for(var i = 0 ; i < this.links.length ; i++){
				dojo.removeClass(this.links[i],"current");	
			}
			this.currentPageNumber = number;
			this.updateNavigation();
		},
		
		getCurrentPageNumber : function(){
			return this.currentPageNumber;
		},
		
		getMaxPageNumber : function(){
			return this.links.length;
		},
		
		showNextPage : function(){
			var currentPageNumber = this.getCurrentPageNumber();
			var maxPageNumber = this.getMaxPageNumber();
			
			if(currentPageNumber + 1 < maxPageNumber){
				this.setCurrentPageNumber(currentPageNumber + 1);
			}
		},
		
		showPreviousPage : function(){
			var currentPageNumber = this.getCurrentPageNumber();
			var maxPageNumber = this.getMaxPageNumber();
			
			if(currentPageNumber > 0){
				this.setCurrentPageNumber(currentPageNumber - 1);
			}
		},
		
		updateNavigation : function(){
			this.updateCurrentLinkClass();
			this.updateCurrentPageValue();
			this.updateDisplayMode("review");
			this.valuesChanged();
		},
		
		updateCurrentLinkClass : function(index){			
			dojo.addClass(this.links[this.currentPageNumber], "current");
		},
		
		updateCurrentPageValue : function(index){
			this.value = this.links[this.currentPageNumber].name;
		},
		
		updateDisplayMode : function(domNodeId){
			
			var domNode = dojo.byId(domNodeId);
			
			if(this.links[this.currentPageNumber].getAttribute('review') == "true"){
				this.setDisplayModeForFieldsWithinDomNode(domNode, inputwizard.DisplayModeListener.displayModeValues.REVIEW);
			} else {
				this.setDisplayModeForFieldsWithinDomNode(domNode, inputwizard.DisplayModeListener.displayModeValues.EDIT);
			}
			
		},
		
		getValues : function(){	
		
			var key = this.key;
			var keyValue = {};
			keyValue[key]=this.value;
			return keyValue;
		
		},
		
		getKeys : function(){
			return [this.key];
		},
		
		getErrors : function(){
			var key = this.key;
			var keyValue = {};
			var err = [];
			keyValue[key] = err;
			return keyValue;
		},
		
		setDisplayMode : function(){
			//unimplemented
		}
	}
);
