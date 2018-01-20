/*
 * Implement all your JavaScript in this file!
 */

var output = $('#display');
var input = [];
var operationClicked = false;
var sum = 0;
var value = undefined;
var operation = '';
var lastOpr = false;
var clicks = 0;

// choose and print numbers function
$('.num').click(function(){
    if(operationClicked){
        input.length = 0;
        operationClicked = false;
    }
    value = $(this).val();
    input.push(value);
    output.val(input.join(''));
    lastOpr = false;
});

// click on operation +,-,/,*

$('.opr').click(function(){

    operationClicked=true;

    if(!lastOpr){
        if(output.val() && operation){
            switch (operation) {
                case 'add':
                    value = Number(output.val());
                    sum = Number(output.val()) + sum;
                    output.val(sum);
                    break;
                case 'subtract':
                    sum = sum - Number(output.val());
                    output.val(sum);
                    break;
                case 'multiply':
                    sum = sum * Number(output.val());
                    output.val(sum);
                    break;
                case 'divide':
                    sum = sum / Number(output.val());
                    output.val(sum);
                    break;
            }
        }
    }

    if($(this).attr('id') == ('addButton')){
        console.log("add");
        operation = 'add';
    }
    if($(this).attr('id') == ('subtractButton')){
        operation = 'subtract';
        console.log("subtract");
    }
    if($(this).attr('id') == ('multiplyButton')){
        operation = 'multiply';
        console.log("multiply");
    }
    if($(this).attr('id') == ('divideButton')){
        operation = 'divide';
        console.log("divide");
    }

    sum = Number(output.val())
    lastOpr = true;

});

// equals operation
$('#equalsButton').click(function() {
    clicks++;
    if(!lastOpr){
        evaluate (operation);
        if(operation){
            operationClicked = true;
            operation='';
            sum = output.val();
        }
    }

});

// evaluate declared operation
function evaluate (operation){
    switch (operation) {
        case 'add':
            sum = Number(output.val()) + sum;
            output.val(sum);
            break;
        case 'subtract':
            sum = sum - Number(output.val());
            output.val(sum);
            break;
        case 'multiply':
            sum = sum * Number(output.val());
            output.val(sum);
            break;
        case 'divide':
            sum = sum / Number(output.val());
            output.val(sum);
            break;
    }
}

// clear function
$('#clearButton').click(function(){
    input.length = 0;
    output.val(input);
    operationClicked = false;
    sum = 0;
    operation = '';
})