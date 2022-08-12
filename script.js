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
    if(operator=="+"){
        operation=addition(num1,num2);
    }
    else if(operator=="-"){
        operation=subtraction(num1,num2);
    }
    else if(operator=="*"){
        if(num2==null || num2==undefined || num2==''){num2=1}
        operation=multiply(num1,num2);
    }
    else if(operator=="/"){
        if(num2==null || num2==undefined || num2==''){num2=1}
        operation=Division(num1,num2);
    }
    return operation;
}

//functions that populate the display when you click the number buttons.

const total=document.querySelector('.total');
const buttons=document.getElementById('switch');
const NumbersKeys=buttons.querySelectorAll('.NumKey');
const FunctionKey=buttons.querySelectorAll('.functionKey');
const EqualKey=buttons.querySelector('.EqualKey');

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
        else{
            total.textContent=displayValue+keyValue;
        }
        total.classList.remove('previousOperators');
        total.classList.add('NumbersAction')
    }
    if(key.classList.contains('functionKey')){
        firstNum=displayValue;
        operationKey=keyValue;
        total.classList.remove('NumbersAction');
        total.classList.add('previousOperators');
    }
    if(key.classList.contains('EqualKey')){
        SecondNum=parseInt(displayValue);
        firstNum=parseInt(firstNum);
        let Solution=operate(operationKey,firstNum,SecondNum);
        console.log(Solution);
    }

})