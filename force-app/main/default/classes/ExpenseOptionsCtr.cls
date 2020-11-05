public class ExpenseOptionsCtr {
    
    @AuraEnabled
    public static List<Expense__c> getExpenseDetails(){
        
        List<Expense__c> lstExpense=[Select Id,Name From Expense__c LIMIT 5];
        
        return lstExpense;  
        
    }
    @AuraEnabled
    public static List<Expense__c> getSearchDetails(String searchText) {
        String searchKey = '%' + searchText + '%'; 
        if(searchText != null || searchText.length()>0 ){ 
            List<Expense__c> lstExpense = [ SELECT Id , Name FROM Expense__c WHERE Name LIKE : searchKey];
            return lstExpense;
        }
        else {   
            List<Expense__c> lstExpense = [Select Id,Name From Expense__c LIMIT 5];
            return lstExpense;
        }        
    }
    
    @AuraEnabled
    public static List<Expense__c> getMoreTypeData(Integer ofset) {
         List<Expense__c> lstExpense= [Select Id,Name From Expense__c LIMIT 5 OFFSET : ofset];
        return lstExpense;
     }
    
    
    
 }