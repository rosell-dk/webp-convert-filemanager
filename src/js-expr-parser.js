
import { JSExprParser, FUNCTION_CALL, LITERAL, INFIX_OP, PREFIX_OP, VARIABLE, LEFT_PAREN, RIGHT_PAREN, DOT, PROPERTY_ACCESSOR_LEFT, PROPERTY_ACCESSOR_RIGHT }  from './classes/JSExprParser.js'

//console.log(JSExprParser.tokenize('equals(6,true)'));


function testTokenizeResult(s, expectedResult) {
  var result = JSExprParser.tokenize(s);
  if (JSON.stringify(result) !== JSON.stringify(expectedResult)) {
    throw new Error(
      'TOKENIZER TEST FAILED on "' + s + '"' +
      'expected: ' + JSON.stringify(expectedResult) + '. ' +
      'got: ' + JSON.stringify(result)
    );
    console.log('TEST FAILED');
    console.log('expect: ' + JSON.stringify(expectedResult));
    console.log('result: ' + JSON.stringify(result));
  }
}
function testTokenizeResultNot(s, expectedResult) {
}

function testRpnResult(s, expectedResult) {
  let tokens = JSExprParser.stringToRpn(s);
  let result = tokens.map(function(a) {return a[1]}); // strip off token type
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
      'EVAL TEST FAILED ' +
      'expected: ' + JSON.stringify(expectedResult) + '. ' +
      'got: ' + JSON.stringify(result)
    );
  }
}

// literals
testTokenizeResult('""', [[LITERAL,'']]);
testTokenizeResult('null', [[LITERAL, null]]);
testTokenizeResult('undefined', [[LITERAL, undefined]]);
testTokenizeResult('NaN', [[LITERAL, NaN]]);
testTokenizeResult('"hello"', [[LITERAL,'hello']]);
testTokenizeResult('7', [[LITERAL, 7]]);

// operations
testTokenizeResult('!', [[PREFIX_OP, '!']]);
testTokenizeResult('~', [[PREFIX_OP, '~']]);
testTokenizeResult(',', [[INFIX_OP, ',']]);
testTokenizeResult('??', [[INFIX_OP, '??']]);
testTokenizeResult('||', [[INFIX_OP, '||']]);
testTokenizeResult('&&', [[INFIX_OP, '&&']]);
testTokenizeResult('|', [[INFIX_OP, '|']]);
testTokenizeResult('^', [[INFIX_OP, '^']]);
testTokenizeResult('&', [[INFIX_OP, '&']]);
testTokenizeResult('==', [[INFIX_OP, '==']]);
testTokenizeResult('!=', [[INFIX_OP, '!=']]);
testTokenizeResult('===', [[INFIX_OP, '===']]);
testTokenizeResult('<', [[INFIX_OP, '<']]);
testTokenizeResult('>', [[INFIX_OP, '>']]);
testTokenizeResult('<=', [[INFIX_OP, '<=']]);
testTokenizeResult('>=', [[INFIX_OP, '>=']]);
testTokenizeResult('>>', [[INFIX_OP, '>>']]);
testTokenizeResult('<<', [[INFIX_OP, '<<']]);
testTokenizeResult('>>>', [[INFIX_OP, '>>>']]);
testTokenizeResult('+', [[INFIX_OP, '+']]);
testTokenizeResult('-', [[INFIX_OP, '-']]);
testTokenizeResult('*', [[INFIX_OP, '*']]);
testTokenizeResult('/', [[INFIX_OP, '/']]);
testTokenizeResult('%', [[INFIX_OP, '%']]);
testTokenizeResult('**', [[INFIX_OP, '**']]);
testTokenizeResult('**', [[INFIX_OP, '**']]);

testTokenizeResult('(', [[LEFT_PAREN,'(']]);
testTokenizeResult(')', [[RIGHT_PAREN,')']]);
testTokenizeResult('doit(3)', [[FUNCTION_CALL,'doit'],[LEFT_PAREN,'('],[LITERAL,3],[RIGHT_PAREN, ')']]);
testTokenizeResult('name', [[VARIABLE,'name']]);
testTokenizeResult('name.firstName', [[VARIABLE,'name'],[DOT,'.'],[VARIABLE,'firstName']]);
testTokenizeResult('name["firstName"]', [[VARIABLE,'name'],[PROPERTY_ACCESSOR_LEFT,'['],[LITERAL,'firstName'],[PROPERTY_ACCESSOR_RIGHT,']']]);
//testTokenizeResult(':', [[COLON, ':']]);
testTokenizeResult('true+1', [[LITERAL,true],[INFIX_OP, '+'],[LITERAL, 1]]);
testTokenizeResult('true-1', [[LITERAL,true],[INFIX_OP, '-'],[LITERAL, 1]]);
testTokenizeResult('7*4', [[LITERAL,7],[INFIX_OP, '*'],[LITERAL, 4]]);
testTokenizeResult('7&&&4', [[LITERAL,7],[INFIX_OP, '&&'],[INFIX_OP, '&'],[LITERAL, 4]]);


testRpnResult('1+2', [1,2,'+']);
testRpnResult('1+(2+3)*4', [1,2,3,'+',4,'*','+']);
testRpnResult('1+2-3', [1,2,'+',3,'-']);    // left-right associativity
testRpnResult('1**2**3', [1,2,3,'**','**']);    // right-left associativity
testRpnResult('!true', [true,'!']);    // right-left associativity


testEval('1+(2+3)*4', 21);
testEval('2*3*2', 12);
testEval('2**3', 8);
testEval('3%2', 1);
testEval('4/2', 2);
testEval('6/3%2', 0);
testEval('true==false', false);
testEval('true!=false', true);
testEval('true===true', true);
testEval('8===8===true', true);
testEval('true!==true', false);
testEval('null??2', 2);
testEval('true||false&&true', true);
testEval('2|1', 3);
testEval('2&1', 0);
testEval('12^9', 5);

testEval('2<<1', 4);
testEval('2>>1', 1);
testEval('2>>>1', 1);
testEval('2>2', false);
testEval('2>=2', true);
testEval('2**3**2', 512);

testEval('!false', true);
testEval('~1', -2);

//console.log(JSExprParser.parse('1+2*3'));
//let rpn = JSExprParser.stringToRpn('1+(2+3)*4')
//let rpn = JSExprParser.stringToRpn('1-2')
//let rpn = JSExprParser.stringToRpn('1+2*3')
//JSExprParser.evaluateRpn(rpn);

// (1+(2/3)*(4|5))&&7  =>  1 2 3 / 4 5 | * + 7 &&

//console.log(JSExprParser.stringToRpn('1<2*3'));  // 1 2 3 * +



//console.log(JSExprParser.stringToRpn('1*2+3!'));  // 1 2 * 3 +

//testTokenizeResult("'hello'", [[LITERAL,'hello']]);
//testTokenizeResult('"hello"=="world"', [[LITERAL,'hello'], [INFIX_OP, '=='], [LITERAL, 'world']]);
//testTokenizeResult('i', [[VARIABLE,'i']]);

//console.log(JSExprParser.tokenize('true+1'));


//import ExpressionParser from './classes/ExpressionParser.js'
