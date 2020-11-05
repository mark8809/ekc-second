({
    
    handleSelection: function(component, event, helper) {
        var stage = event.currentTarget.dataset.stage;      
        var options = component.get("v.stageList"); 
        
        options.forEach(function(element) {
            // console.log(element.stage);
            if(element.isChecked == false){
                if(element.stage == stage){
                    element.isChecked = true;
                }
            }
            else{
                if(element.stage == stage){
                    element.isChecked = false;
                }
                
            }
        });
        component.set('v.stageList', options);
        /// console.log(options);
        var selectedStages = helper.getSelectedValues(component);
        //console.log(selectedStages)
        component.set('v.selectedStageList', selectedStages);
        helper.setInfoText(component, selectedStages);                              
    },
    
    handleSave : function(component, event, helper){
        var options = component.get("v.selectedStageList"); 
        // console.log(options);
           component.set('v.stageList', options);               
    },
    
    handleCancel : function(component, event, helper){
     component.set("v.showstage", false);
    },
    
    handleMouseLeave: function(component, event, helper) {
        
        component.set("v.showstage", false);
        
        
    },
    handleMouseEnter: function(component, event, helper) {       
        component.set("v.showstage", true);       
    },
    

    
})