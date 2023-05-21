
%{
    var {semanticTable} = require("./semanticTable");
    const {createReturnVar,finishFunction} = require("./functionsUtils");
    const {createVariable,createConstantVariable,getVariable} = require("./variableUtils");

    var operatorStack = [];
    var operandStack = [];
    var typeStack = [];
    var jumpStack = [];
    // t1 registro temporal
    // operacion,   operandoizq,operandoder,res
    // el primer quadruple debe ser un GOTO main () ya que main es la primera funcion, si no existe main , tirar error
    var quadruples = [];
    
    var functions = [{name:"main",returnType:"void",parameters:[],variables:[],size:null,quadruplesStart:null}];
    let currentFunction = 0;
    var jumpStack = [];
    // add logic so when main is back it goese back to nextAvailable = 1
    let nextAvailable = 1;
    function nextAvail() {
        let variable = "t" + nextAvailable;
        nextAvailable = nextAvailable+1;
        return variable;
    }
    var currentType = "";
    function getOperands() {
        var rightOperand = operandStack.pop();
        var rightType = typeStack.pop();
        var leftOperand = operandStack.pop();
        var leftType = typeStack.pop();
        var operator = operatorStack.pop();
        return [rightOperand,rightType,leftOperand,leftType,operator]
    }
    function createOperationQuad() {
        var [rightOperand,rightType,leftOperand,leftType,operator] = getOperands();
        var resultType =  semanticTable[leftType][operator][rightType];
        if(resultType === undefined)
        {
            console.log("Operation",leftType,operator,rightType,"is not valid");
            throw new Error("Operation is not valid");
        }
        var result = nextAvail();
        console.log(`${leftOperand}(${leftType})${operator}${rightOperand}(${rightType})=${result}(${resultType})`);
        createVariable(result,resultType,functions[currentFunction],"temporal");
        quadruples.push({operator:operator,leftOperand:leftOperand,rightOperand:rightOperand,result:result});
        operandStack.push(result);
        typeStack.push(resultType);
    }
    function createAssignmentQuad(){
        var [rightOperand,rightType,leftOperand,leftType,operator] = getOperands();
        // add more validations later but for now strict typing
        if(rightType != leftType)
        {
            console.log("Operation",leftType,operator,rightType,"is not valid");
            throw new Error("Operation is not valid");
        }
        console.log(`${leftOperand}(${leftType})${operator}${rightOperand}(${rightType})`)
        quadruples.push({operator:operator,leftOperand:leftOperand,rightOperand:null,result:rightOperand});
    }
%}
%lex
%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)\b        return 'FLOAT'
[0-9]+\b                    return 'NUMBER'
"*"                         return '*'
"/"                         return '/'
"-"                         return '-'
"+"                         return '+'
"("                         return '('
")"                         return ')'
"{"                         return '{'
"}"                         return '}'
"<"                         return '<'
">"                         return '>'
"<="                        return '<='
">="                        return '>='
"!="                        return '!='
"=="                        return '=='
"="                         return '='
";"                         return ';'
"boolean"                   return 'boolType'
"string"                    return 'stringType'
"float"                     return 'floatType'
"int"                       return 'intType'
"if"                        return 'IF'
"void"                      return 'voidType'
"else"                      return 'ELSE'
"while"                     return 'WHILE'
"do"                        return 'DO'
"for"                       return 'FOR'
"func"                      return 'FUNC'
"return"                    return 'RETURN'
\"[^\"]*\"				    return 'text'
([a-zA-Z])[a-zA-Z0-9_]*	    return 'id'
"PI"                        return 'PI'
"E"                         return 'E'
<<EOF>>				        return 'EOF'
.                           {}
/lex
/* operator associations and precedence */

%left '+' '-' '*' '/'
%right '='
%left UMINUS

%start START
%%
START : MAININSTRUCTIONS EOF { 
    // aqui deberia regresar la tabla de memoria de las funciones, etc
    console.log("quadruples:",quadruples);
    console.log("operators:",operatorStack);
    console.log("operands:",operandStack);
    console.log("jumps:",jumpStack);
    console.log("functions:",functions);
    console.log("current function:",currentFunction)
    };
TYPE : intType {
      currentType = "int";
} | floatType {
    currentType = "float";
}  | boolType {
    currentType = "boolean";
} | stringType {
    currentType = "string";
};

HYPERCONDITIONALS: CONDITIONALS | CONDITIONALS '{'  INSTRUCTIONS '}'{
            var end = jumpStack.pop();
            var quadruple = quadruples[end];
            console.log(quadruple);
            quadruple.result = quadruples.length;

};

CONDITIONALS: IF '(' CONDITIONALHYPEREXPRESSION ')' '{' INSTRUCTIONS '}'{
                var end = jumpStack.pop();
                var quadruple = quadruples[end];
                quadruple.result = quadruples.length;
      
} | IF '(' CONDITIONALHYPEREXPRESSION ')' '{' INSTRUCTIONS '}' ELSE {
                var end = jumpStack.pop();
                var quadruple = quadruples[end];
                console.log(quadruple);
                quadruple.result = quadruples.length+1;
                quadruples.push({operator:"GOTO",leftOperand:resultOperand,rightOperand:null,result:null});
                jumpStack.push(quadruples.length-1);
      
};
WHILECOMMAND: WHILE {jumpStack.push(quadruples.length);};
DOCOMMAND: DO {jumpStack.push(quadruples.length);};
LOOPS: WHILECOMMAND '('CONDITIONALHYPEREXPRESSION ')' '{' INSTRUCTIONS'}'{
                         var end = jumpStack.pop();
                         var whileStart =  jumpStack.pop();
                         var quadruple = quadruples[end];
                         quadruples.push({operator:"GOTO",leftOperand:resultOperand,rightOperand:null,result:whileStart});
                         quadruple.result = quadruples.length;

} | DOCOMMAND '{' INSTRUCTIONS'}' WHILE '(' HYPEREXPRESSION ')' {
        var resultOperand = operandStack.pop();
            var resultType = typeStack.pop();
            console.log(resultOperand,resultType);
            if(resultType != "bool")
            {
                console.log("A conditional statement should be a boolean");
                throw new Error("A conditional statement should be a boolean");
            }
            var end = jumpStack.pop();
            quadruples.push({operator:"GOTOT",leftOperand:resultOperand,rightOperand:null,result:end});
} | FOR '(' FORASSIGNMENT  , CONDITIONALHYPEREXPRESSION ')' '{' INSTRUCTIONS '}'{
        var pendingFalseQuadruple = jumpStack.pop();
        var forStart = jumpStack.pop();
        var quadruple = quadruples[pendingFalseQuadruple];
        quadruples.push({operator:"GOTO",leftOperand:resultOperand,rightOperand:null,result:forStart});
        quadruple.result = quadruples.length;

};
// contabilizar parametros, variables locales y las variables temporales para saber de que tamano es el pedazo de memoria
PARAMETER: TYPE id {
         createVariable($2,$1,functions[currentFunction],"parameter");
         functions[currentFunction].parameters.push($1);

};
PARAMETERS: PARAMETERS , PARAMETER | PARAMETER;
FUNCTYPE: intType  | floatType   | boolType  | stringType  | voidType;
FUNCDEFINITION: FUNC FUNCTYPE id{
    functions.push({name:$3,returnType:$2,parameters:[],size:null,variables:[],quadruplesStart:null});
    currentFunction = functions.length-1;
    nextAvailable=1;
};
FUNCHEADER: FUNCDEFINITION '('PARAMETERS ')' {
    functions[currentFunction].quadruplesStart = quadruples.length;
};
FUNCTION: FUNCHEADER '{'  FUNCTIONINSTRUCTIONS '}'{
    finishFunction(functions[currentFunction],functions[0],nextAvailable,quadruples)
    currentFunction = 0;
};

FUNCRETURN:  RETURN HYPEREXPRESSION ';' {
            createReturnVar(functions[currentFunction],typeStack,operandStack,quadruples,nextAvail);
};

FUNCTIONINSTRUCTIONS: INSTRUCTIONS FUNCRETURN | FUNCRETURN;

MAININSTRUCTION: DECLARATION ';' | FUNCTION;
MAININSTRUCTIONS: MAININSTRUCTIONS  MAININSTRUCTION | MAININSTRUCTION;

INSTRUCTIONS : INSTRUCTIONS  INSTRUCTION | INSTRUCTION ;


INSTRUCTION : DECLARATION ';' | SUPRAEXPRESSION ';' | HYPERCONDITIONALS | LOOPS;
DECLARATION : TYPE ASSIGNMENTS {
        currentType = null;

};
ASSIGNMENTS : ASSIGNMENTS , ASSIGNMENT | ASSIGNMENT;
ASSIGNMENT 
    : id {
        createVariable($1,currentType,functions[currentFunction]);
    }
    | id '=' HYPEREXPRESSION {
        createVariable($1,currentType,functions[currentFunction]);
        operatorStack.push('=');
        if([...operatorStack].pop() == "=")
        {
        var rightOperand = operandStack.pop();
        var rightType = typeStack.pop();
        var leftOperand = $1;
        var leftType = currentType;
        var operator = operatorStack.pop();
        if(rightType != leftType)
        {
            console.log("Operation",leftType,operator,rightType,"is not valid");
            throw new Error("Operation is not valid");
        }
        console.log(`${leftOperand}(${leftType})${operator}${rightOperand}(${rightType})`)
        quadruples.push({operator:operator,leftOperand:leftOperand,rightOperand:null,result:rightOperand});
        }
    }
    ;
FORASSIGNMENT : id '=' HYPEREXPRESSION {
        createVariable($1,"int",functions[currentFunction]);
        operatorStack.push('=');
        if([...operatorStack].pop() == "=")
        {
            var rightOperand = operandStack.pop();
            var rightType = typeStack.pop();
            var leftOperand = $1;
            var leftType = "int";
            var operator = operatorStack.pop();
            if(rightType != leftType)
            {
                console.log("Type should be int");
                throw new Error("For loops only take int types");
            }
            console.log(`${leftOperand}(${leftType})${operator}${rightOperand}(${rightType})`)
            quadruples.push({operator:operator,leftOperand:leftOperand,rightOperand:null,result:rightOperand});
            // this should be the reference to goto at the end of the for
            jumpStack.push(quadruples.length);
        }
    };
SUPRAEXPRESSION 
        : SUPRAEXPRESSION '=' HYPEREXPRESSION {
                operatorStack.push('=');
                if([...operatorStack].pop() == "="){
                    createAssignmentQuad();
            }
        }
        | HYPEREXPRESSION;

HYPEREXPRESSION
        : SUPEREXPRESSION
        | HYPEREXPRESSION '&&' SUPEREXPRESSION
        | HYPEREXPRESSION '||' SUPEREXPRESSION;

CONDITIONALHYPEREXPRESSION
        : HYPEREXPRESSION {
            // check if there is a result  if no result its an error
            var resultOperand = operandStack.pop();
            var resultType = typeStack.pop();
            console.log(resultOperand,resultType);
            if(resultType != "bool")
            {
                console.log("A conditional statement should be a boolean");
                throw new Error("A conditional statement should be a boolean");
            }
            quadruples.push({operator:"GOTOF",leftOperand:resultOperand,rightOperand:null,result:null});
            jumpStack.push(quadruples.length-1);
        };

SUPEREXPRESSION
        : SUPEREXPRESSION '<' EXPRESSION {
                operatorStack.push('<');
                if([...operatorStack].pop() == "<"){
                createOperationQuad();
            }
        }
        | SUPEREXPRESSION '>' EXPRESSION {
            operatorStack.push('>');
            if([...operatorStack].pop() == ">"){
                createOperationQuad();
            }
        }
        | SUPEREXPRESSION '!=' EXPRESSION {
            operatorStack.push('!=');
            if([...operatorStack].pop() == "!="){
                createOperationQuad();
            }
        }
        | SUPEREXPRESSION '==' EXPRESSION {
            operatorStack.push('==');
            if([...operatorStack].pop() == "=="){
                createOperationQuad();
            }
        }
        | EXPRESSION;

EXPRESSION
        : TERMS 
        | EXPRESSION '+' TERMS
        {
            operatorStack.push('+');
            if([...operatorStack].pop() == "+"){
                createOperationQuad();
            }
            
        }
        | EXPRESSION '-' TERMS
        {
            operatorStack.push('-');
            if([...operatorStack].pop() == "-"){
                createOperationQuad();
            }
        };

TERMS
        : TERMS '*' FACTOR
        {
            operatorStack.push('*');
            if([...operatorStack].pop() == "*"){
                createOperationQuad();
            }
        }
        | TERMS '/' FACTOR
        {
            operatorStack.push('/');
            if([...operatorStack].pop() == "/"){
                createOperationQuad();
            }
        }
        | FACTOR;     

FACTOR
        : NUMBER 
        {
            operandStack.push($1);
            typeStack.push("int");
            createConstantVariable($1,"int",functions[0])
        }
        | FLOAT 
        {
            operandStack.push($1);
            typeStack.push("float");
            createConstantVariable($1,"float",functions[0])
        }
        | E
        | PI
        | id
        {
            // check var exists
            // if var doesnt exist throw error
            let variable = getVariable($1,functions,currentFunction);
            operandStack.push($1);
            typeStack.push(variable.type);
        }
        | text {
            operandStack.push($1);
            typeStack.push("string");
            createConstantVariable($1,"string",functions[0])
        }
        | '('  SUPRAEXPRESSION ')'; 

