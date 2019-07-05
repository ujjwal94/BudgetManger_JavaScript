// Budget Controller
var budgetController = (function(){
    
    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;        
    };
    
    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;        
    };    
    
    var calculateTotal = function(type){
      
        var sum = 0;
        
        data.allItems[type].forEach(function(current){
            
        });
    };
        
    var data = {
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        }
        
    };
    
    return {
        addItem:function(type,des,val){
            var newItem,ID;
            
            //Create new ID
            if(data.allItems[type].length > 0 ){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1; 
            }
            else{
                ID = 0;
            }
                        
            // Create new item based on 'inc' or 'exp' type
            if(type === 'exp'){
                newItem = new Expense(ID,des,val);    
            }
            else if (type === 'inc'){
                newItem = new Income(ID,des,val); 
            }
            
            //push it into our data structure
            data.allItems[type].push(newItem);
            
            //return new item
            return newItem;
        },
        
        calculateBudget:function(){
          
            // Calculate total income and expenses
            
            // Calculate the budget:income - expenses
            
            // Calculate the percenta
        },
        
        getBudget:function(){
          return{
              budget:data.budget,
              tatalInc:data.totalsInc,
              totalExp:data.totalsExp,
              percentage:data.percentage
          }  
        },
        
        testing:function(){
            console.log(data);
        }
    };

})();

// UI Controller
var UIController = (function(){
    
    var DOMStrings = {
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn',
        incomeContainer:'.income__list',
        expensesContainer:'.expenses__list',
        budgetLabel:'.budget__value',
        incomeLabel:'.budget__income--value',
        expensesLabel:'.budget__expenses--value',
        percentageLabel:'.budget__expenses--percentage'
    };
    
    return {
        getInput:function(){
            
            return {
                type : document.querySelector(DOMStrings.inputType).value, // Will be either inc or exp
                description : document.querySelector(DOMStrings.inputDescription).value,
                value :parseFloat( document.querySelector(DOMStrings.inputValue).value)
            }
            
        },
        
        addListItem: function(obj,type){
            var html,newHtml,element;
            
            // Create HTML string with placeholder text
            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else if(type === 'exp'){
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
            
        },
        
        clearFields:function(){
            var fields,fieldsArray;
            
            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);
            
            fieldsArray = Array.prototype.slice.call(fields);
            
            fieldsArray.forEach(function(current, index, array){
                current.value = "";
            });
            
            fieldsArray[0].focus();
        },
         
        displayBudget:function(obj){
            
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalsInc;
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalsExp;
            document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage;
            
                
        },
        
        getDOMstrings: function(){
            return DOMStrings;
        }
    }
    
})();


// Global App controler
var controller = (function(budgetCtrl,UICtrl){
    
    var setupEventListeners = function(){
       
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
    
        document.addEventListener('keypress',function(event){

           if(event.keyCode === 13 || event.which === 13 ){
               ctrlAddItem();
           }



        });
    };
    
    var updateBudget = function(){
        // 1.Calculate the budget
        budgetCtrl.calculateBudget();
                
        // 2.Return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3.Display the budget on the UI
        UICtrl.displayBudget(budget);
        
    }
    
    var ctrlAddItem = function(){
        var input,newItem;
        
        // 1.Get the field input data
        input = UICtrl.getInput();
        
        if(input.description !== '' && !isNan(input.value) && input.value >0){
            // 2.Add the item to budget controller
            newItem = budgetCtrl.addItem(input.type,input.description,input.value);

            // 3.Add the item to the UI 
            UICtrl.addListItem(newItem,input.type);

            // 4.Clear the fields
            UICtrl.clearFields();

            // 5.Calculate and update the budget
            updateBudget();
        }
        
        

    }
    
    return {
        init:function(){
            console.log('Application has started.');
            setupEventListeners();
        }
    };
    
})(budgetController,UIController);

controller.init();







