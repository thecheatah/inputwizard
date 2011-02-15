dojo.provide("inputwizard.Help");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("inputwizard.DisplayModeListener");

dojo.declare(
	"inputwizard.Help",
	[dijit._Widget, 
	 dijit._Templated,
	 inputwizard.DisplayModeListener],
	{
		
		templatePath: dojo.moduleUrl(
			"inputwizard", 
			"templates/Help.html"
		),
		
		isDomVisible: false, // default external display
		isVisible: false, //default internal display
		key: "",
		isContainer: true,
		
		startup : function(){
			var parent = this;
			
			this.box.onclick = function(e){
				parent.moveHelpBox(e);
				parent.updateDisplay();
				parent.updateButton();
			};
			
			this.exit_button.onclick=function(e){
				parent.hideHelpBox();
				parent.updateDisplay();
				parent.updateButton();
			};
		},
		
		updateOpenedHelp : function(){
			if(this.statics.openedHelp!=null && this.statics.openedHelp!=this){
				this.statics.openedHelp.hideHelpBox();
				this.statics.openedHelp.updateDisplay();
				this.statics.openedHelp.updateButton();
			}
			this.statics.openedHelp = this;
		},
		
		updateButton : function(){
			if(this.isDomVisible){
				this.box.setAttribute("class", "button_box_activated");
			} else {
				this.box.setAttribute("class", "button_box");
			}
		},
		
		moveHelpBox : function(e){
			var event = window.event || e;
			var helpButton = event.srcElement || event.target;
			var helpButtonPos = dojo.position(helpButton, true);
			console.log(helpButtonPos.x);
			console.log(helpButtonPos.y);
			if(this.isVisible){
				this.isVisible = false;
			} else {
				this.help_box.setAttribute("style",
						"top: "+parseInt(helpButtonPos.y-30)+"px; " +
						"left: "+parseInt(helpButtonPos.x+39)+"px;" +
						"display:none;");
				this.isVisible = true;
				this.updateOpenedHelp();
			}
		},
		
		hideHelpBox : function(){
			this.isVisible = false;
		},
		
		updateDisplay : function(){
			if(this.isVisible){
				this.showArea();
			} else {
				this.hideArea();
			}
		},
		
		showArea : function(){
			if(!this.isDomVisible){
				var cont = this.help_box;
				var anim = dojo.fx.wipeIn({node:cont});
				var mation = dojo.fadeIn({node:cont});
				anim.play();
				mation.play();
			}
			this.isDomVisible = true;
			
		},
		
		hideArea : function(){
			if(this.isDomVisible){
				var cont = this.help_box;
				var anim = dojo.fx.wipeOut({node:cont});
				var mation = dojo.fadeOut({node:cont});
				mation.play();
				anim.play();
			}
			this.isDomVisible = false;
			
		},
		
		statics : {openedHelp : null},
		
		setDisplayMode : function(value){
			if (value == inputwizard.DisplayModeListener.displayModeValues.REVIEW) {
				this.domNode.style.display = "NONE";
			}else if(value == inputwizard.DisplayModeListener.displayModeValues.EDIT){
				this.domNode.style.display = "";
			}
		}
	}
);
