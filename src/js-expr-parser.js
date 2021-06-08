
import { JSExprParser, FUNCTION_CALL, LITERAL, OPERATOR, VARIABLE, LEFT_PAREN, RIGHT_PAREN, DOT, PROPERTY_ACCESSOR_LEFT, PROPERTY_ACCESSOR_RIGHT, TERNARY, COLON }  from './classes/JSExprParser.js'

//console.log(JSExprParser.tokenize('equals(6,true)'));


function testTokenizeResult(s, expectedResult) {
  var result = JSExprParser.tokenize(s);
  if (JSON.stringify(result) !== JSON.stringify(expectedResult)) {
    console.log('TEST FAILED');
    console.log('expect: ' + JSON.stringify(expectedResult));
    console.log('result: ' + JSON.stringify(result));
  }
}
function testTokenizeResultNot(s, expectedResult) {
}

function testRpnResult(s, expectedResult) {
  let result = JSExprParser.stringToRpn(s);
  if (JSON.stringify(result) !== JSON.stringify(expectedResult)) {
    throw new Error(
      'RPN TEST FAILED. ' +
      'expected: ' + JSON.stringify(expectedResult) + '. ' +
      'got: ' + JSON.stringify(result)
    );
  }
}

function testEval(s, expectedResult) {
  let rpn = JSExprParser.stringToRpn(s);
  let result = JSExprParser.evaluateRpn(rpn);
  if (result != expectedResult) {
    throw new Error(
      'EVAL TEST FAILED. ' +
      'expected: ' + JSON.stringify(expectedResult) + '. ' +
      'got: ' + JSON.stringify(result)
    );
  }
}

testTokenizeResult('true+1', [[LITERAL,true],[OPERATOR, '+'],[LITERAL, 1]]);
testTokenizeResult('true-1', [[LITERAL,true],[OPERATOR, '-'],[LITERAL, 1]]);
testTokenizeResult('7*4', [[LITERAL,7],[OPERATOR, '*'],[LITERAL, 4]]);
testTokenizeResult('7/4', [[LITERAL,7],[OPERATOR, '/'],[LITERAL, 4]]);
testTokenizeResult('7%4', [[LITERAL,7],[OPERATOR, '%'],[LITERAL, 4]]);
testTokenizeResult('7&4', [[LITERAL,7],[OPERATOR, '&'],[LITERAL, 4]]);
testTokenizeResult('7|4', [[LITERAL,7],[OPERATOR, '|'],[LITERAL, 4]]);
testTokenizeResult('7^4', [[LITERAL,7],[OPERATOR, '^'],[LITERAL, 4]]);
testTokenizeResult('7&&4', [[LITERAL,7],[OPERATOR, '&&'],[LITERAL, 4]]);
testTokenizeResult('7&&&4', [[LITERAL,7],[OPERATOR, '&&'],[OPERATOR, '&'],[LITERAL, 4]]);
testTokenizeResult('7==4', [[LITERAL,7],[OPERATOR, '=='],[LITERAL, 4]]);
testTokenizeResult('7===4', [[LITERAL,7],[OPERATOR, '==='],[LITERAL, 4]]);
testTokenizeResultNot('7=4', [[LITERAL,7],[OPERATOR, '='],[LITERAL, 4]]);
testTokenizeResult('7!=4', [[LITERAL,7],[OPERATOR, '!='],[LITERAL, 4]]);
testTokenizeResult('7!==4', [[LITERAL,7],[OPERATOR, '!=='],[LITERAL, 4]]);
testTokenizeResult('7!4', [[LITERAL,7],[OPERATOR, '!'],[LITERAL, 4]]);
testTokenizeResult('7>4', [[LITERAL,7],[OPERATOR, '>'],[LITERAL, 4]]);
testTokenizeResult('7>=4', [[LITERAL,7],[OPERATOR, '>='],[LITERAL, 4]]);
testTokenizeResult('7<4', [[LITERAL,7],[OPERATOR, '<'],[LITERAL, 4]]);
testTokenizeResult('7<=4', [[LITERAL,7],[OPERATOR, '<='],[LITERAL, 4]]);
testTokenizeResult('7**4', [[LITERAL,7],[OPERATOR, '**'],[LITERAL, 4]]);
testTokenizeResult('"hello"', [[LITERAL,'hello']]);
testTokenizeResult('""', [[LITERAL,'']]);
testTokenizeResult('(', [[LEFT_PAREN,'(']]);
testTokenizeResult(')', [[RIGHT_PAREN,')']]);
testTokenizeResult('doit(3)', [[FUNCTION_CALL,'doit'],[LEFT_PAREN,'('],[LITERAL,3],[RIGHT_PAREN, ')']]);
testTokenizeResult('name', [[VARIABLE,'name']]);
testTokenizeResult('name.firstName', [[VARIABLE,'name'],[DOT,'.'],[VARIABLE,'firstName']]);
testTokenizeResult('name["firstName"]', [[VARIABLE,'name'],[PROPERTY_ACCESSOR_LEFT,'['],[LITERAL,'firstName'],[PROPERTY_ACCESSOR_RIGHT,']']]);
testTokenizeResult('?', [[TERNARY, '?']]);
testTokenizeResult(':', [[COLON, ':']]);
testTokenizeResult('null', [[LITERAL, null]]);
testTokenizeResult('undefined', [[LITERAL, undefined]]);
testTokenizeResult('NaN', [[LITERAL, NaN]]);


/*
testRpnResult('1+2', [1,2,'+']);
testRpnResult('1+(2+3)*4', [1,2,3,'+',4,'*','+']);
*/
//testRpnResult('1+2-3', [1,2,'+',3,'-']);    // left-right associativity
testRpnResult('1**2**3', [1,2,3,'**','**']);    // right-left associativity

//testRpnResult('(1>2<3)>=4', [1,2,3,'<','>',4,'>=']);    // right-left associativity

//testEval('1+(2+3)*4', 21);
//testEval('2**3**2', 21);

//console.log(JSExprParser.parse('1+2*3'));
//let rpn = JSExprParser.stringToRpn('1+(2+3)*4')
//let rpn = JSExprParser.stringToRpn('1-2')
//let rpn = JSExprParser.stringToRpn('1+2*3')
//JSExprParser.evaluateRpn(rpn);

// (1+(2/3)*(4|5))&&7  =>  1 2 3 / 4 5 | * + 7 &&

//console.log(JSExprParser.stringToRpn('1<2*3'));  // 1 2 3 * +



//console.log(JSExprParser.stringToRpn('1*2+3!'));  // 1 2 * 3 +

//testTokenizeResult("'hello'", [[LITERAL,'hello']]);
//testTokenizeResult('"hello"=="world"', [[LITERAL,'hello'], [OPERATOR, '=='], [LITERAL, 'world']]);
//testTokenizeResult('i', [[VARIABLE,'i']]);

//console.log(JSExprParser.tokenize('true+1'));


//import ExpressionParser from './classes/ExpressionParser.js'
