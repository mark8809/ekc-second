({
    
    changeTab : function(component, event, helper) {
          var methodCallingFrom = event.currentTarget.getAttribute("data-calling");
          var itemType =  component.get("v.itemType"); 
            if(methodCallingFrom == 'content' && itemType != 'content'){  
                component.set("v.itemType", 'content'); 
                component.set("v.isContent", true); 
                component.set("v.isPeople", false); 
                component.set("v.isChannels", false); 
                component.set("v.isGroup", false);             
            }
        else  if(methodCallingFrom == 'people' && itemType != 'people'){  
            component.set("v.itemType", 'people'); 
            component.set("v.isContent", false); 
            component.set("v.isPeople", true); 
            component.set("v.isChannels", false); 
            component.set("v.isGroup", false); 
        }
            else  if(methodCallingFrom == 'channel' && itemType != 'channel'){  
                component.set("v.itemType", 'channel'); 
                component.set("v.isContent", false); 
                component.set("v.isPeople", false); 
                component.set("v.isChannels", true); 
                component.set("v.isGroup", false);
            }
           else  if(methodCallingFrom == 'group' && itemType != 'group'){  
                    component.set("v.itemType", 'group'); 
                    component.set("v.isContent", false); 
                    component.set("v.isPeople", false); 
                    component.set("v.isChannels", false); 
                    component.set("v.isGroup", true); 
                }
        
    },
    
})