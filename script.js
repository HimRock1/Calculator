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
        operation=multiply(num1,num2);
    }
    else if(operator=="/"){
        operation=Division(num1,num2);
    }
    return operation;
}