dojo.provide("inputwizard.DisplayArea");

dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.DataValueChangeDelegate");
dojo.require("inputwizard.DisplayAreaVisibilityListener");

dojo.declare(
	"inputwizard.DisplayArea",
	[dijit._Widget, 
	 dijit._Templated,
	 inputwizard.DataValueChangeDelegate,
	 inputwizard.DisplayAreaVisibilityListener],
	{
		
		// summary:
		//		Widget is controls the visibility of a <div> based on the query attribute
		//		set in the markup.
		//
		// description:
		//		A query is set that checks the DataStoreValue's keys and looking for whether
		//		the corresponding value matches the query.  This returns a boolean value
		//		setting the isVisible value to either true or false.
		//
		// example:
		//		<div dojoType="inputwizard.DisplayArea"
		//			query="ds.dropDownMenu == 'show'">
		//			...
		//				Other nodes
		//			...
		//		</div>
		//
		
		templatePath: dojo.moduleUrl(
			"inputwizard", 
			"templates/DisplayArea.html"
		),
		isDisplayArea: true,
		isContainer : true,
		query: "", //String set in markup, must return boolean by eval()
		isVisible: null, //default internal display null
		isDomVisible: null,//default external display
		disableAnimation: false, //default

		parentDisplayArea: null,
		isParentDisplayAreaVisible: true,
		//previousVisibilityUpdateValue: null,
		
		animation: null,
		
		startup : function() {
			this.inherited(arguments);
			this.parentDisplayArea = inputwizard.DisplayArea.findParentDisplayArea(this.domNode);
		},
		
		displayAreaVisibilityChanged : function(displayArea, isVisible) {
			if (this.parentDisplayArea == displayArea) {
				if (this.isParentDisplayAreaVisible != isVisible) {
					this.isParentDisplayAreaVisible = isVisible;
					this.informVisibilityListeners();
				}
			}
		},

		informVisibilityListeners: function () {
			var isVisible = this.isVisible;
			if (!this.isParentDisplayAreaVisible) {
				isVisible = false;
			}
/*
			if (this.previousVisibilityUpdateValue != null && this.previousVisibilityUpdateValue == isVisible) {
				return;
			}
*/
			var allWidgets = dojo.query("[widgetId]", this.containerNode).map(dijit.byNode);
			for(var i in allWidgets) {
				var widget = allWidgets[i];
				if (widget.isDisplayAreaVisibilityListener) {
					widget.displayAreaVisibilityChanged(this, isVisible);
				}
			}
//			this.previousVisibilityUpdateValue = isVisible;
		},
		
		recomputeQuery : function(dataStoreValues){
			// summary:
			//		First the variable ds is taken to hold all the key value pairs from
			//		returned from the DataStore in an array.  The query then is transformed
			//		from dot notation to square bracket notation to be read as a single key:
			//		
			//			ds.student.name.last --> ds["student.name.last"] 
			// 
			//		Query is run with the eval() function, throwing an error if blank or if
			//		not boolean.  Next the result of the eval() is checked to make sure it is a
			//		boolean value. Then, this.isVisible is set to boolean result.
			//
			
			var ds = dataStoreValues;
			
			var result;
			
			var transformedQuery = this.query.replace(/ds\.([a-z0-9\.]*)/ig, "ds['$1']");
			
			try{
				if(transformedQuery!=''){
					result = eval(transformedQuery);
				}
			} catch (e){
				console.error("Unable to eval query " + this.query);
			}
			
			if(typeof result != "boolean"){
				console.error("Unable to compute a boolean value from query " + this.query);
			} else {
				if (this.isVisible != result) {
					this.isVisible = result;
					this.informVisibilityListeners();
				}
			}
		},
		
		updateDisplay : function(){
			// summary:
			//		sync internal and external states
			//
			
			if(this.isVisible){
				this.showArea();
			} else {
				this.hideArea();
			}
		},
		
		dataValueChangeDelegateValuesChanged : function(/*delegate*/ form, /*Associative Array*/ valuesChanged){
			// summary:
			//		Implemented from the inputwizard.DataValueChangeDelegate.
			//
			
			this.recomputeQuery(form.getDataStoreValues());
			this.updateDisplay();			
		},
		
		showArea : function(){
			if(this.isDomVisible == null || this.disableAnimation == true){
				if (this.animation != null) {
					this.animation.stop(true);
					this.animation = null;
				}
				this.containerNode.style.opacity = 1;
				this.containerNode.style.display = "block";
			} else if(!this.isDomVisible){
				if (this.animation != null) {
					this.animation.stop(true);
					this.animation = null;
				}
				var cont = this.containerNode;
				var anim1 = dojo.fx.wipeIn({node:cont});
				var anim2 = dojo.fadeIn({node:cont});
				this.animation = dojo.fx.combine([anim1, anim2]).play();
			}
			this.isDomVisible = true;
		},
		
		hideArea : function(){
			if(this.isDomVisible == null || this.disableAnimation == true){
				if (this.animation != null) {
					this.animation.stop(true);
					this.animation = null;
				}
				this.containerNode.style.opacity = 0;
				this.containerNode.style.display = "none";
			} else if(this.isDomVisible){
				if (this.animation != null) {
					this.animation.stop(true);
					this.animation = null;
				}
				var cont = this.containerNode;
				var anim1 = dojo.fx.wipeOut({node:cont});
				var anim2 = dojo.fadeOut({node:cont});
				this.animation = dojo.fx.combine([anim1, anim2]).play();
			}
			this.isDomVisible = false;
		}
		
	}	
);

inputwizard.DisplayArea.findParentDisplayArea = function(domNode) {
	if (domNode == null) return null;
	domNode = domNode.parentNode;
	while(domNode != null && domNode != document.body && !(dijit.byNode(domNode) != null && dijit.byNode(domNode).isDisplayArea)) {
		domNode = domNode.parentNode;
	}
	if (domNode != null) {
		return dijit.byNode(domNode);
	} else {
		return null;
	}
};
