const addition=function(...args){
    const result=args.reduce((total,arg)=>total+arg,0);
    return result;
}
const subtraction=function(first,...args){
    const result=args.reduce((total,arg)=>total-arg,first);
    return result;
}
const multiply=function(...args){
    const result=args.reduce((total,arg)=>total*arg,1);
    return result;
}
const Division=function(first,...args){
    const result=args.reduce((total,arg)=>total/arg,first);
    return result;
}


// function OPERATE that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

function operate(operator,num1,num2){
    let operation;
    if(CheckNullOperand(num1)){
        operation='Invalid Operation';
    }
    else if(operator=="+"){
        if(isNaN(num1) || isNaN(num2)){
            operation='Invalid No.'
        }
        else operation=addition(num1,num2);
    }
    else if(operator=="-"){
        if(isNaN(num1) || isNaN(num2)){
            operation='Invalid No.'
        }
        else operation=subtraction(num1,num2);
    }
    else if(operator=="*"){
        if(isNaN(num1) || isNaN(num2)){
            operation='Invalid No.'
        }
        else{
            if(num2==null || num2==undefined || num2==''){num2=1}
            operation=multiply(num1,num2);
        }
    }
    else if(operator=="/"){
        if(isNaN(num1) || isNaN(num2)){
            operation='Invalid No.'
        }
        else{
            if(num2==null || num2==undefined || num2=='' || num2==0){operation='Invalid No.'}
            else operation=Division(num1,num2);
        }
    }
    return operation;
}


// Function to check if a Number is Integer and Float.

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    n=parseFloat(n);
    return Number(n) === n && n % 1 !== 0;
}
function CheckNullOperand(num1){
    if(num1==0){return false;}
    if(num1==null || num1==undefined || num1=='' || isNaN(num1)){
        return true;
    }
}


// Function to add the type of Solution according to its length

const SolutionSizeCalc=function(Solution){
    if(isFloat(Solution)){
        if((Solution.toFixed(3).toString().length)<=12){return Solution.toFixed(3)}
        else {
            return Solution.toExponential(7);
        }
    }
    else if(isInt(Solution)){
        if((Solution.toString().length)<=12){return Solution}
        else if(((Solution.toString().length)>12) && ((Solution.toString().length)<=100)) return Solution.toExponential(7); 
    }
    else{
        return Solution;
    }
}
    


//functions that populate the display when you click the number buttons.

const total=document.querySelector('.total');
const buttons=document.getElementById('switch');
const NumbersKeys=buttons.querySelectorAll('.NumKey');
const FunctionKey=buttons.querySelectorAll('.functionKey');
const EqualKey=buttons.querySelector('.EqualKey');
const ClearKey=buttons.querySelector('.ClearKey');
const DeleteKey=buttons.querySelector('.DelKey');
let operationCount=0;
let firstNum;
let operationKey;
let SecondNum;

buttons.addEventListener('click',(e)=>{
    if(!e.target.closest('button'))return;
    const key=e.target;
    const keyValue=e.target.value;
    const displayValue=total.textContent;
    

    if(key.classList.contains('NumKey')){
        if(displayValue=='0'){
            total.textContent=keyValue;
        }
        else if(total.classList.contains('previousOperators')){
            total.textContent=keyValue;
        }
        else if(total.classList.contains('TotalSolution')){
            total.textContent=keyValue;
        }
        else{
            if(keyValue.includes('.')){
                if(displayValue.includes('.')){return}
            }
            total.textContent=displayValue+keyValue;
        }
        total.classList.remove('TotalSolution');
        total.classList.remove('previousOperators');
        total.classList.add('NumbersAction')
    }
    if(key.classList.contains('functionKey')){
        operationCount++;
        if(operationCount==1){
            firstNum=displayValue;
            total.textContent =firstNum;
        }
        if(operationCount>1){
            SecondNum=parseFloat(displayValue);
            firstNum=parseFloat(firstNum);
            const CalcResult=operate(operationKey,firstNum,SecondNum);
            total.textContent=SolutionSizeCalc(CalcResult);
            firstNum=total.textContent;
        }
        operationKey=keyValue;
        total.classList.remove('TotalSolution');
        total.classList.remove('NumbersAction');
        total.classList.add('previousOperators');
    }
    if(key.classList.contains('EqualKey')){
        SecondNum=parseFloat(displayValue);
        firstNum=parseFloat(firstNum);
        let Solution=operate(operationKey,firstNum,SecondNum);
        total.textContent=SolutionSizeCalc(Solution);
        operationCount=0;
        total.classList.remove('previousOperators');
        total.classList.remove('NumbersAction');
        total.classList.add('TotalSolution');
    }
    if(key.classList.contains('ClearKey')){
        total.textContent='0';
        total.classList.remove('previousOperators');
        total.classList.remove('NumbersAction');
        total.classList.remove('TotalSolution');
        operationCount=0;
    }
    if(key.classList.contains('DelKey')){
        total.textContent=displayValue.slice(0,-1);
        if(total.textContent==''){
            total.textContent='0';
        }
    }

})