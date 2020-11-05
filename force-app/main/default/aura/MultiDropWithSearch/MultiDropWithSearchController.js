({
    init: function(component, event, helper) {
        
        var itemType = component.get("v.itemType");
        console.log('itemType   '+ itemType);
        var action = component.get("c.getExpenseDetails"); //Calling Apex class controller 'getTemplateRecrod' method     
        action.setCallback(this, function(res) {
            var state = res.getState();
            if (state === "SUCCESS") {
                component.set("v.options_", res.getReturnValue());
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
        
        var values = helper.getSelectedValues(component);
        helper.setInfoText(component, values);
        $A.enqueueAction(action);
        
    },
    handleClick: function(component, event, helper) {
        var mainDiv = component.find('main-div');
        $A.util.addClass(mainDiv, 'slds-is-open');
        component.set("v.dropdownOver", true); 
    },
    
    handleSelection: function(component, event, helper) {       
        var item = event.currentTarget;
        if (item && item.dataset) {
            var itemType= component.get("v.itemType");
            var value = item.dataset.value;
            console.log(value +'  '+ itemType)
            var selected = item.dataset.selected;
            var options = component.get("v.options_");
            //contro(ctrl) key ADDS to the list (unless clicking on a previously selected item)
            //also, ctrl key does not close the dropdown (uses mouse out to do that)
            
            if (event.ctrlKey) {
                options.forEach(function(element) {
                    if(element.selected == true){
                        if (element.Name === value) {
                            element.selected = false;
                        }}
                    else {
                        if (element.Name === value) {
                            element.selected = true;
                        }
                    }
                });
            } else {
                options.forEach(function(element) {
                    
                    if(element.selected == true){
                        if (element.Name === value) {
                            element.selected = false;
                        }}
                    else {
                        if (element.Name === value) {
                            element.selected = true;
                        }
                    }
                });
                var mainDiv = component.find('main-div');
                $A.util.addClass(mainDiv, 'slds-is-open');
            }
            
            component.set("v.dropdownOver", true); 
            component.set("v.options_", options);
            var values = helper.getSelectedValues(component);
            var labels = helper.getSelectedLabels(component);
            helper.setInfoText(component, labels);
            helper.despatchSelectChangeEvent(component, values);
        }
    },
    
    handleMouseLeave: function(component, event, helper) {
        var mainDiv = component.find('main-div');
        $A.util.removeClass(mainDiv, 'slds-is-open');
    },
    
    handleMouseEnter: function(component, event, helper) {
        component.set("v.dropdownOver", true);
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
    
    
    searchField: function(component, event, helper) {
        var searchText = component.get("v.searchText");
        
        var itemType = component.get("v.itemType");
        console.log('itemType   '+ itemType+' '+ searchText);
        var action = component.get("c.getSearchDetails");
        
        action.setParams({ searchText: searchText });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.options_", response.getReturnValue());
                if(component.get("v.options_").length == 0) {
                    console.log('000000');
                }
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            
        });
        $A.enqueueAction(action);
    },
    viewMore: function(component, event, helper) {
        component.set("v.loadmore", true); 
        var itemType = component.get("v.itemType");
        if(itemType == 'Type'){
            var allData = [];
            
            allData = component.get("v.options_");
            var currLength = allData.length;
            var action = component.get("c.getMoreTypeData");
            action.setParams({ofset : currLength});
            action.setCallback(this, function(response){
                var state = response.getState();
                if(state === "SUCCESS") {
                    var data = response.getReturnValue();
                    data.forEach(function(curr) {
                        var isDuplicate = false;
                        allData.forEach(function(prev) {
                            
                            if(curr.Name == prev.Name){
                                isDuplicate = true;
                            }
                            
                        })
                        if(isDuplicate == false){
                            allData.push(curr);
                        }
                        
                    });
                    
                    component.set("v.loadmore", false); 
                    component.set("v.options_", allData); 
                    
                    
                }
                else {
                    
                    component.set("v.loadmore", false); 
                }
            });
        }       
        else if(itemType == 'Content Source'){
            var allData = [];
            
            allData = component.get("v.options_");
            var currLength = allData.length;
            var action = component.get("c.getMoreTypeData");
            action.setParams({ofset : currLength});
            action.setCallback(this, function(response){
                var state = response.getState();
                if(state === "SUCCESS") {
                    var data = response.getReturnValue();
                    data.forEach(function(curr) {
                        var isDuplicate = false;
                        allData.forEach(function(prev) {
                            
                            if(curr.Name == prev.Name){
                                isDuplicate = true;
                            }
                        })
                        if(isDuplicate == false){
                            allData.push(curr);
                        }
                    });
                    component.set("v.loadmore", false); 
                    component.set("v.options_", allData); 
                }
                else {
                    component.set("v.loadmore", false); 
                }
            });
        }
        $A.enqueueAction(action);
    }
    
})