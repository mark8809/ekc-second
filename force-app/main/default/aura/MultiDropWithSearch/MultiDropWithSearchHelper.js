({
    setInfoText: function(component, labels) {
        if (labels.length === 0) {
            component.set("v.infoText", "Select an option...");
        }
        if (labels.length === 1) {
            component.set("v.infoText", labels[0]);
        }
        else if (labels.length > 1) {
            component.set("v.infoText", labels.length + " options selected");
        }
    },
    
    getSelectedValues: function(component){
        
        var options = component.get("v.options_");
        var itemType = component.get("v.itemType");
        var values = [];
        if(options!==undefined){
            options.forEach(function(element) {
                if (element.selected) {
                    values.push(element.Name);
                }
            });
        }
        if(itemType == 'Type') {
            component.set("v.selectedTypeItems", values);
         }
        else if(itemType == 'Languages') {
            component.set("v.selectedTypeLanguages", values);
         }
        else if(itemType == 'Content Source') {
            component.set("v.selectedTypeContentSource", values);
        }
        else if(itemType == 'Pricing') {
            component.set("v.selectedTypePricing", values);
        }
        
        return values;
    },
    
    getSelectedLabels: function(component){
        var options = component.get("v.options_");
        var labels = [];
        if(options!==undefined){
            options.forEach(function(element) {
                if (element.selected) {
                    labels.push(element.Name);
                }
            });  
        }
        return labels;
    },
    
    despatchSelectChangeEvent: function(component,values){
        var compEvent = component.getEvent("selectChange");
        compEvent.setParams({ "values": values });
        compEvent.fire();
    }
    
})