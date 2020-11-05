({
    setInfoText: function(component, stages) {
         //var options = component.get("v.selectedStageList");
        
        
        if (stages.length === 0) {
            
            component.set("v.infoText", "Select an option...");
            
        }
        
         if (stages.length === 1) {          
           component.set("v.infoText", stages[0]);
          }
        
       else if (stages.length >1) {
            
            component.set("v.infoText", stages.length + " options selected");
            
        }
        
    },
    
    getSelectedValues: function(component){
        
        var options = component.get("v.stageList");
        
        
        var stages = [];
        
        if(options!==undefined){
            
            options.forEach(function(element) {
                
                
                if (element.isChecked) {
                    
                    stages.push(element.stage);
                    
                }
                
            });
            
        }
        
        return stages;
        
    },
})