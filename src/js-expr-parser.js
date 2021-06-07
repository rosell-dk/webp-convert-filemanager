
import { JSExprParser, FUNCTION_CALL, LITERAL, OPERATOR, VARIABLE, LEFT_PAREN, RIGHT_PAREN, DOT, PROPERTY_ACCESSOR_LEFT, PROPERTY_ACCESSOR_RIGHT, TERNARY, COLON }  from './classes/JSExprParser.js'

//console.log(JSExprParser.tokenize('equals(6,true)'));


function testEquals(s, expectedResult) {
  var result = JSExprParser.tokenize(s);
  if (JSON.stringify(result) !== JSON.stringify(expectedResult)) {
    console.log('TEST FAILED');
    console.log('expect: ' + JSON.stringify(expectedResult));
    console.log('result: ' + JSON.stringify(result));
  }
}
function testNotEquals(s, expectedResult) {
}

testEquals('true+1', [[LITERAL,true],[OPERATOR, '+'],[LITERAL, 1]]);
testEquals('true-1', [[LITERAL,true],[OPERATOR, '-'],[LITERAL, 1]]);
testEquals('7*4', [[LITERAL,7],[OPERATOR, '*'],[LITERAL, 4]]);
testEquals('7/4', [[LITERAL,7],[OPERATOR, '/'],[LITERAL, 4]]);
testEquals('7%4', [[LITERAL,7],[OPERATOR, '%'],[LITERAL, 4]]);
testEquals('7&4', [[LITERAL,7],[OPERATOR, '&'],[LITERAL, 4]]);
testEquals('7|4', [[LITERAL,7],[OPERATOR, '|'],[LITERAL, 4]]);
testEquals('7^4', [[LITERAL,7],[OPERATOR, '^'],[LITERAL, 4]]);
testEquals('7&&4', [[LITERAL,7],[OPERATOR, '&&'],[LITERAL, 4]]);
testEquals('7&&&4', [[LITERAL,7],[OPERATOR, '&&'],[OPERATOR, '&'],[LITERAL, 4]]);
testEquals('7==4', [[LITERAL,7],[OPERATOR, '=='],[LITERAL, 4]]);
testEquals('7===4', [[LITERAL,7],[OPERATOR, '==='],[LITERAL, 4]]);
testNotEquals('7=4', [[LITERAL,7],[OPERATOR, '='],[LITERAL, 4]]);
testEquals('7!=4', [[LITERAL,7],[OPERATOR, '!='],[LITERAL, 4]]);
testEquals('7!==4', [[LITERAL,7],[OPERATOR, '!=='],[LITERAL, 4]]);
testEquals('7!4', [[LITERAL,7],[OPERATOR, '!'],[LITERAL, 4]]);
testEquals('7>4', [[LITERAL,7],[OPERATOR, '>'],[LITERAL, 4]]);
testEquals('7>=4', [[LITERAL,7],[OPERATOR, '>='],[LITERAL, 4]]);
testEquals('7<4', [[LITERAL,7],[OPERATOR, '<'],[LITERAL, 4]]);
testEquals('7<=4', [[LITERAL,7],[OPERATOR, '<='],[LITERAL, 4]]);
testEquals('"hello"', [[LITERAL,'hello']]);
testEquals('""', [[LITERAL,'']]);
testEquals('(', [[LEFT_PAREN,'(']]);
testEquals(')', [[RIGHT_PAREN,')']]);
testEquals('doit(3)', [[FUNCTION_CALL,'doit'],[LEFT_PAREN,'('],[LITERAL,3],[RIGHT_PAREN, ')']]);
testEquals('name', [[VARIABLE,'name']]);
testEquals('name.firstName', [[VARIABLE,'name'],[DOT,'.'],[VARIABLE,'firstName']]);
testEquals('name["firstName"]', [[VARIABLE,'name'],[PROPERTY_ACCESSOR_LEFT,'['],[LITERAL,'firstName'],[PROPERTY_ACCESSOR_RIGHT,']']]);
testEquals('?', [[TERNARY, '?']]);
testEquals(':', [[COLON, ':']]);
testEquals('null', [[LITERAL, null]]);
testEquals('undefined', [[LITERAL, undefined]]);
testEquals('NaN', [[LITERAL, NaN]]);


JSExprParser.parse('1+2*3');

//testEquals("'hello'", [[LITERAL,'hello']]);
//testEquals('"hello"=="world"', [[LITERAL,'hello'], [OPERATOR, '=='], [LITERAL, 'world']]);
//testEquals('i', [[VARIABLE,'i']]);

//console.log(JSExprParser.tokenize('true+1'));


//import ExpressionParser from './classes/ExpressionParser.js'
