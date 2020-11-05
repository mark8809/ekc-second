({
	init : function(component, event, helper) {
        var levelList = [];
        var ratingList = [];
        levelList = ['Beginner','Intermediate','Advance'];
        ratingList = ['5 * * * * *','4 * * * * ','3 * * * * '];
        component.set("v.levelList", levelList);
        component.set("v.ratinglList", ratingList);
                     
        
		
	},
     handleClick: function(component, event, helper) {
        var mainDiv = component.find('main-div');
        $A.util.addClass(mainDiv, 'slds-is-open');
         component.set("v.isOpen", true);
     },
    
     handleMouseOutButton: function(component, event, helper) {
         window.setTimeout(
            $A.getCallback(function() {
                if (component.isValid()) {
                    //if dropdown over, user has hovered over the dropdown, so don't close.
                    if (component.get("v.dropdownOver")) {
                        return;
                    }
                    var mainDiv = component.find('main-div');
                    $A.util.removeClass(mainDiv, 'slds-is-open');
                }
            }), 200
            
        );
    },
    
    handleMouseOutFilter: function(component, event, helper) {
        // component.set("v.isOpen", false);
        
    },
    handleClickOnFilterBotton: function(component, event, helper) {
         component.set("v.isOpen", false);
        
    },
    handleSelectionLevel: function(component, event, helper) {
         
    },
    handleChangeFrom: function(component, event, helper) {
          var selectedOptionValue = event.getParam("value");
    },
     handleChangeTo: function(component, event, helper) {
           var selectedOptionValue = event.getParam("value");
    },
    
})