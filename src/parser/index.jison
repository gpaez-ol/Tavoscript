
%{
    const {semanticTable} = require("./semanticTable");
    const {createReturnVar,finishFunction} = require("./functionsUtils");
    const {createVariable,createConstantVariable,getVariable} = require("./variableUtils");
    const {getOperands,createAssignmentQuad,createOperationQuad} = require("./quadrupleUtils.js");

    var operatorStack = [];
    var operandStack = [];
    var typeStack = [];
    var jumpStack = [];

    //for functions
    var availableParams = [];
    var functionCalled = null;
    var functionCallCurrentParam = 0;
    // t1 registro temporal
    // operacion,   operandoizq,operandoder,res
    // el primer quadruple debe ser un GOTO main () ya que main es la primera funcion, si no existe main , tirar error
    // should be main if its still null after everything that is the error
    var quadruples = [{operator:"GOTO",address:null}];
    
    var functions = [{name:"main",returnType:"void",parameters:[],variables:[],size:null,quadruplesStart:null}];
    let currentFunction = 0;
    var jumpStack = [];
    let nextAvailable = 1;
    function nextAvail() {
        let variable = "t" + nextAvailable;
        nextAvailable = nextAvailable+1;
        return variable;
    }
    var currentType = "";
    
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
":"                         return 'CallType'
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
            quadruple.address = quadruples.length;

};

CONDITIONALS: IF '(' CONDITIONALHYPEREXPRESSION ')' '{' INSTRUCTIONS '}'{
                var end = jumpStack.pop();
                var quadruple = quadruples[end];
                quadruple.address = quadruples.length;
      
} | IF '(' CONDITIONALHYPEREXPRESSION ')' '{' INSTRUCTIONS '}' ELSE {
                var end = jumpStack.pop();
                var quadruple = quadruples[end];
                console.log(quadruple);
                quadruple.address = quadruples.length+1;
                quadruples.push({operator:"GOTO",address:result});
                jumpStack.push(quadruples.length-1);
      
};
WHILECOMMAND: WHILE {jumpStack.push(quadruples.length);};
DOCOMMAND: DO {jumpStack.push(quadruples.length);};
LOOPS: WHILECOMMAND '('CONDITIONALHYPEREXPRESSION ')' '{' INSTRUCTIONS'}'{
                         var end = jumpStack.pop();
                         var whileStart =  jumpStack.pop();
                         var quadruple = quadruples[end];
                         quadruples.push({operator:"GOTO",address:whileStart});
                         quadruple.address = quadruples.length;

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
            quadruples.push({operator:"GOTOT",value:resultOperand,address:end});
} | FOR '(' FORASSIGNMENT  , CONDITIONALHYPEREXPRESSION ')' '{' INSTRUCTIONS '}'{
        var pendingFalseQuadruple = jumpStack.pop();
        var forStart = jumpStack.pop();
        var quadruple = quadruples[pendingFalseQuadruple];
        quadruples.push({operator:"GOTO",address:forStart});
        quadruple.address = quadruples.length;

};
// contabilizar parametros, variables locales y las variables temporales para saber de que tamano es el pedazo de memoria
PARAMETER: TYPE id {
         createVariable($2,$1,functions[currentFunction],"parameter");
         functions[currentFunction].parameters.push($1);

};
PARAMETERS: PARAMETERS , PARAMETER | PARAMETER;
FUNCTYPE: intType  | floatType   | boolType  | stringType;
FUNCDEFINITION: FUNC FUNCTYPE id{
    // add check to see function is unique
    if($3 === "main"){
        console.log("Main function should be void");
        throw new Error("Main function should be void");
    }
    if(functions.some((func) => func.name === $3))
    {
        console.log(`Function ${$3} already exists`);
        throw new Error(`Function ${$3} was already declared`);
    }
    // check if variable name exists because global variable will exist
    // talvez tmbn pushear a las variables globales una variable con el mismo nombre d ela funcion ,para tener el valor asignado
    functions.push({name:$3,returnType:$2,parameters:[],size:null,variables:[],quadruplesStart:null});
    currentFunction = functions.length-1;
    nextAvailable=1;
};
VOIDFUNCDEFINITION: FUNC voidType id{
    // add check to see function is unique
    if(functions.some((func) => func.name === $3) && $3 !== "main")
    {
        console.log(`Function ${$3} already exists`);
        throw new Error(`Function ${$3} was already declared`);
    }else if($3 === "main" && functions.find((func) => func.name === $3).quadruplesStart !== null)
    {
        console.log('Main was already declared');
        throw new Error("Main was already declared");
    }
    // check if variable name exists because global variable will exist
    // talvez tmbn pushear a las variables globales una variable con el mismo nombre d ela funcion ,para tener el valor asignado
    if($3 !== "main" )
    {
    functions.push({name:$3,returnType:$2,parameters:[],size:null,variables:[],quadruplesStart:null});
    currentFunction = functions.length-1;
    nextAvailable=1;
    }
};
FUNCHEADER: FUNCDEFINITION '('PARAMETERS ')' {
    functions[currentFunction].quadruplesStart = quadruples.length;
    if(functions[currentFunction].name === "main")
    {
        quadruples[0].address = quadruples.length;
    }
};
VOIDFUNCHEADER: VOIDFUNCDEFINITION '('PARAMETERS ')' {
    functions[currentFunction].quadruplesStart = quadruples.length;
    if(functions[currentFunction].name === "main")
    {
        quadruples[0].address = quadruples.length;
    }
};
FUNCTION: FUNCHEADER '{'  FUNCTIONINSTRUCTIONS '}'{
    finishFunction(functions[currentFunction],quadruples)
    currentFunction = 0;
    nextAvailable = functions[currentFunction].variables.filter(variable => variable.varType == "temporal").length + 1
} | VOIDFUNCHEADER '{'  INSTRUCTIONS '}'{
    finishFunction(functions[currentFunction],quadruples)
    currentFunction = 0;
    nextAvailable = functions[currentFunction].variables.filter(variable => variable.varType == "temporal").length + 1
} ;

FUNCRETURN:  RETURN HYPEREXPRESSION ';' {
            // aqui podria asignarse el valor obtenido a la variable global con el mismo nombre de la funcion
            createReturnVar(functions[currentFunction],typeStack,operandStack,quadruples,nextAvail);
};

ARGUMENTS: ARGUMENTS , ARGUMENT | ARGUMENT;
ARGUMENT: HYPEREXPRESSION {
            var currentParam = availableParams.pop();
            if(currentParam === null || currentParam === undefined)
            {
                console.log("Too many arguments for the function");
                throw new Error("Too many arguments for the function")
            }
            var operand = operandStack.pop();
            var operandType = typeStack.pop();
            var param = functionCallCurrentParam;
            var paramType = currentParam;
            if(operandType !== paramType)
            {
                console.log(`Type should be ${paramType}`);
                throw new Error(`Type should be ${paramType}`);
            }
            console.log(`${param}(${paramType})=${operand}(${operandType})`);
            quadruples.push({operator:"PARAM",value:operand,param:functionCallCurrentParam});
            functionCallCurrentParam++;
};
FUNCCALLHEADER: CallType id '('{
    // prepara el numero de parametros
    // genera ERA size para traer el new size
    // check function exist
    functionCalled = functions.find(func => func.name === $2);
    if(!functionCalled)
    {
        console.log(`The function ${$2}does not exist`);
        throw new Error(`The function ${$1} does not exist`);
    }
    availableParams = [...functionCalled.parameters];
    functionCallCurrentParam = 1
    quadruples.push({operator:"ERA",functionName:$2});
};
FUNCCALLS: FUNCCALLHEADER ARGUMENTS ')'{
    // revisar que los parametros usados este vacio
    if(availableParams.length > 0)
    {
        console.log("Arguments missing");
        throw new Error("Arguments missing for function call");
    }
    // aqui va a generar go sub, procedure_name,initial-address (quadrupplo hihi)
    quadruples.push({operator:"GOSUB",value:functionCalled.name});
    // recordar el address donde estabas antes
    // asignar el valor que tiene la variable global nombre de func en ese momento al sig temporal
    if(functionCalled.returnType != "void")
    {
        // la variable global con el mismo nombre de la funcion deberia tener el valor necesario;
        var result = nextAvail();[]
        var resultType = functionCalled.returnType;
        createVariable(result, resultType, functions[currentFunction], "temporal");
        quadruples.push({operator:"=",operand:result,value:functionCalled.name})
    }
    
} | CALLTYPE id '(' ')';

FACTFUNCCALLS: FUNCCALLHEADER ARGUMENTS ')'{
    // revisar que los parametros usados este vacio
    if(availableParams.length > 0)
    {
        console.log("Arguments missing");
        throw new Error("Arguments missing for function call");
    }
    // aqui va a generar go sub, procedure_name,initial-address (quadrupplo hihi)
    quadruples.push({operator:"GOSUB",value:functionCalled.name});
    // recordar el address donde estabas antes
    // asignar el valor que tiene la variable global nombre de func en ese momento al sig temporal
    if(functionCalled.returnType != "void")
    {
        // la variable global con el mismo nombre de la funcion deberia tener el valor necesario;
        var result = nextAvail();[]
        var resultType = functionCalled.returnType;
        createVariable(result, resultType, functions[currentFunction], "temporal");
        quadruples.push({operator:"=",operand:result,value:functionCalled.name})
        operandStack.push(result);
        typeStack.push(resultType);
    }else {
        console.log("You cannot use a void function within a expression");
        throw new Error("You cannot use a void function within an expression");
    }
    
};

FUNCTIONINSTRUCTIONS: INSTRUCTIONS FUNCRETURN | FUNCRETURN;

MAININSTRUCTION: DECLARATION ';' | FUNCTION | FUNCCALLS ';';
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
        quadruples.push({operator:operator,operand:leftOperand,value:rightOperand});
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
            quadruples.push({operator:operator,operand:leftOperand,result:rightOperand});
            // this should be the reference to goto at the end of the for
            jumpStack.push(quadruples.length);
        }
    };
SUPRAEXPRESSION 
        : SUPRAEXPRESSION '=' HYPEREXPRESSION {
                operatorStack.push('=');
                if([...operatorStack].pop() == "="){
                    createAssignmentQuad(quadruples,operandStack,operatorStack,typeStack);
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
            if(resultType != "bool")
            {
                console.log("A conditional statement should be a boolean");
                throw new Error("A conditional statement should be a boolean");
            }
            quadruples.push({operator:"GOTOF",value:resultOperand,address:null});
            jumpStack.push(quadruples.length-1);
        };

SUPEREXPRESSION
        : SUPEREXPRESSION '<' EXPRESSION {
                operatorStack.push('<');
                if([...operatorStack].pop() == "<"){
                createOperationQuad(quadruples,operandStack, operatorStack,typeStack, nextAvail, functions[currentFunction]);
            }
        }
        | SUPEREXPRESSION '>' EXPRESSION {
            operatorStack.push('>');
            if([...operatorStack].pop() == ">"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        }
        | SUPEREXPRESSION '!=' EXPRESSION {
            operatorStack.push('!=');
            if([...operatorStack].pop() == "!="){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        }
        | SUPEREXPRESSION '==' EXPRESSION {
            operatorStack.push('==');
            if([...operatorStack].pop() == "=="){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        }
        | EXPRESSION;

EXPRESSION
        : TERMS 
        | EXPRESSION '+' TERMS
        {
            operatorStack.push('+');
            if([...operatorStack].pop() == "+"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack,nextAvail, functions[currentFunction]);
            }
            
        }
        | EXPRESSION '-' TERMS
        {
            operatorStack.push('-');
            if([...operatorStack].pop() == "-"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        };

TERMS
        : TERMS '*' FACTOR
        {
            operatorStack.push('*');
            if([...operatorStack].pop() == "*"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        }
        | TERMS '/' FACTOR
        {
            operatorStack.push('/');
            if([...operatorStack].pop() == "/"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        }
        | FACTOR;     

FACTOR
        : NUMBER 
        {
            // add check constants
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
        | id
        {
            // check var exists
            // if var doesnt exist throw error
            let variable = getVariable($1,functions,currentFunction);
            operandStack.push($1);
            typeStack.push(variable.type);
        }|
        FACTFUNCCALLS 
        | text {
            operandStack.push($1);
            typeStack.push("string");
            createConstantVariable($1,"string",functions[0])
        } 
        | '('  SUPRAEXPRESSION ')'; 
