({
    expenseDetails : function(component, event, helper) {
        
        var action = component.get("c.getExpenseDetails"); //Calling Apex class controller 'getTemplateRecrod' method
        
        action.setCallback(this, function(res) {
            
            var state = res.getState();
            
            if (state === "SUCCESS") {
                
                component.set("v.lstExpenseData", res.getReturnValue());
                
            } else {
                
                var toastEvent = $A.get("e.force:showToast");
                
                toastEvent.setParams({
                    
                    "title": "Error :",
                    
                    "mode": "sticky",
                    
                    "message": res.getError()[0].message
                    
                });
                
                toastEvent.fire();
                
            }
            
        });
        
        $A.enqueueAction(action);
        
    }
    
})