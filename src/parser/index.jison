
%{
    const {semanticTable} = require("./semanticTable");
    const {createReturnVar,finishFunction,checkParams} = require("./functionsUtils");
    const {createVariable,createConstantVariable,getVariable,getArrayVariable,createArrayVariable,resetAvailableAddresses} = require("./variableUtils");
    const {getOperands,createAssignmentQuad,createOperationQuad,createPrintQuad,createReadQuad} = require("./quadrupleUtils");
    const {createDimensionQuad} = require("./arrayUtils");

    var operandStack = [];
    var typeStack = [];
    var currentDimension = 0;
    var arrayCalled = null; 
    var arrayCalledLabel = null;
    var currentArrayCallIndex = null;

    var availableParams = [];
    var functionCalled = null;
    var functionCallCurrentParam = 0;
    var quadruples = [{operator:"GOTO",address:null}];
    
    var functions = [{variables:[],global:true},{name:"main",returnType:"void",parameters:[],variables:[],size:null,quadruplesStart:null}];
    let currentFunction = 0;
    var jumpStack = [];
    let nextAvailable = 1;
    let nextPointerAvailable =1;
    function nextAvail(pointer=false) {
        if(pointer)
        {
            let variable = `tp${nextPointerAvailable}`;
            nextPointerAvailable++;
            return variable;
        }
        let variable = `t${nextAvailable}`;
        nextAvailable++;
        return variable;
    }
    var currentType = "";
    var currentArray = null;

    
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
":<"                        return '<='
":>"                        return '>='
"!="                        return '!='
"=="                        return '=='
"="                         return '='
";"                         return ';'
":"                         return 'CallType'
"["                         return '['
"]"                         return ']'
"true"                      return 'TRUE'
"false"                     return 'FALSE'
"bool"                   return 'boolType'
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
"print"                     return 'PRINT'
"read"                      return 'READ'
\"[^\"]*\"				    return 'TEXT'
([a-zA-Z])[a-zA-Z0-9_]*	    return 'ID'
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
    if(functions[1].quadruplesStart === null)
    {
        console.log("Main function is missing");
        throw new Error("Main function is missing");
    }
    // aqui deberia regresar la tabla de memoria de las funciones, etc
    console.log("quadruples:",quadruples);
    console.log("operands:",operandStack);
    console.log("jumps:",jumpStack);
    console.log("functions:",functions);
    console.log("current function:",currentFunction)
    return {quadruples,functions};
    };
TYPE : intType {
      currentType = "int";
} | floatType {
    currentType = "float";
}  | boolType {
    currentType = "bool";
} | stringType {
    currentType = "string";
};

MAININSTRUCTION: DECLARATION ';' | FUNCTION | FUNCCALLS ';';
MAININSTRUCTIONS: MAININSTRUCTIONS  MAININSTRUCTION | MAININSTRUCTION;

INSTRUCTIONS : INSTRUCTIONS  INSTRUCTION | INSTRUCTION ;

INSTRUCTION : DECLARATION ';' 
            | SUPRAEXPRESSION ';' 
            | FUNCRETURN ';' 
            | PRINTFUNC ';' 
            | READFUNC ';'
            | HYPERCONDITIONAL 
            | LOOPS;
DECLARATION : TYPE ASSIGNMENTS {
        currentType = null;
};

ASSIGNMENTS : ASSIGNMENTS , ASSIGNMENT | ASSIGNMENT;
ASSIGNMENT
    : ID {
        createVariable($1,currentType,functions[currentFunction]);
    } | ARRAYDEF {
        createArrayVariable(currentArray,functions[currentFunction]);
        currentArray = null;
    }
    |  ID '=' HYPEREXPRESSION {
        let declaredVar = createVariable($1,currentType,functions[currentFunction]);
        var rightOperand = operandStack.pop();
        var rightType = typeStack.pop();
        var leftOperand = declaredVar.address;
        var leftType = currentType;
        var operator = "=";
        if(rightType != leftType && !(rightType === "int" && leftType === "float"))
        {
            console.log("Operation",leftType,operator,rightType,"is not valid");
            throw new Error("Operation is not valid");
        }
        console.log(`${leftOperand}(${leftType})${operator}${rightOperand}(${rightType})`)
        quadruples.push({operator:operator,operand:leftOperand,value:rightOperand,global:currentFunction === 0});
    }
    ;

// condicionales 
HYPERCONDITIONAL: CONDITIONAL | CONDITIONALELSE '{'  INSTRUCTIONS '}'{
            var end = jumpStack.pop();
            var quadruple = quadruples[end];
            quadruple.address = quadruples.length;

};

CONDITIONAL: IF '(' CONDITIONALHYPEREXPRESSION ')' '{' INSTRUCTIONS '}'{
                var end = jumpStack.pop();
                var quadruple = quadruples[end];
                quadruple.address = quadruples.length;
};
CONDITIONALELSE: IF '(' CONDITIONALHYPEREXPRESSION ')' '{' INSTRUCTIONS '}' ELSE {
                var end = jumpStack.pop();
                var quadruple = quadruples[end];
                jumpStack.push(quadruples.length);
                quadruples.push({operator:"GOTO",address:result,global:currentFunction === 0});
                quadruple.address = quadruples.length;
      
};
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
            jumpStack.push(quadruples.length);
            quadruples.push({operator:"GOTOF",value:resultOperand,address:null,global:currentFunction === 0});
        };
// Loops
WHILECOMMAND: WHILE {jumpStack.push(quadruples.length);};
DOCOMMAND: DO {jumpStack.push(quadruples.length);};
LOOPS: WHILECOMMAND '('CONDITIONALHYPEREXPRESSION ')' '{' INSTRUCTIONS'}'{
                         var end = jumpStack.pop();
                         var whileStart =  jumpStack.pop();
                         var quadruple = quadruples[end];
                         quadruples.push({operator:"GOTO",address:whileStart,global:currentFunction === 0});
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
            quadruples.push({operator:"GOTOT",value:resultOperand,address:end,global:currentFunction === 0});
} | FOR '(' FORASSIGNMENT  , CONDITIONALHYPEREXPRESSION ')' '{' INSTRUCTIONS '}'{
        var pendingFalseQuadruple = jumpStack.pop();
        var forStart = jumpStack.pop();
        var quadruple = quadruples[pendingFalseQuadruple];
        quadruples.push({operator:"GOTO",address:forStart,global:currentFunction === 0});
        quadruple.address = quadruples.length;

};
FORASSIGNMENT : ID '=' HYPEREXPRESSION {
        let forVar = createVariable($1,"int",functions[currentFunction]);
        var rightOperand = operandStack.pop();
        var rightType = typeStack.pop();
        var leftOperand = forVar.address;
        var leftType = "int";
        var operator = "=";
        if(rightType != leftType && !(rightType === "int" && leftType === "float")) 
        {
            console.log("Type should be int");
            throw new Error("For loops only take int types");
        }
        console.log(`${leftOperand}(${leftType})${operator}${rightOperand}(${rightType})`)
        quadruples.push({operator:operator,operand:leftOperand,value:rightOperand,global:currentFunction === 0});
        // this should be the reference to goto at the end of the for
        jumpStack.push(quadruples.length);
    };
// Funciones
PARAMETER: TYPE ID {
         createVariable($2,$1,functions[currentFunction],"parameter");
         functions[currentFunction].parameters.push($1);
} | TYPE ARRAYDEF{
        currentArray.type = $1;
        createArrayVariable(currentArray,functions[currentFunction],"parameter");
        functions[currentFunction].parameters.push({type:$1,dimensions:currentArray.dimensions.map(dimension => {return dimension.upperLimit}  )});
        currentArray = null;
};
PARAMETERS: PARAMETERS , PARAMETER | PARAMETER;
FUNCTYPE: intType  | floatType   | boolType  | stringType | voidType;
FUNCDEFINITION: FUNC FUNCTYPE ID{
    if($3 === "main" && $2 !== "void"){
        console.log("Main function should be void");
        throw new Error("Main function should be void");
    }
    if(functions.some((func) => func.name === $3)  && $3 !== "main")
    {
        console.log(`Function ${$3} already exists`);
        throw new Error(`Function ${$3} was already declared`);
    }else if($3 === "main" && functions.find((func) => func.name === $3).quadruplesStart !== null)
    {
        console.log('Main was already declared');
        throw new Error("Main was already declared");
    }
    if($3 !== "main" )
    {
        let functionVariable =  createVariable($3, $2, functions[0], "local");
        functions.push({name:$3,returnType:$2,parameters:[],size:null,variables:[],quadruplesStart:null,globalAddress:functionVariable.address});
        currentFunction = functions.length-1;
    }else {
        currentFunction=1;
    }
    nextAvailable=1;
    nextPointerAvailable=1;
    resetAvailableAddresses();
};

FUNCHEADER: FUNCDEFINITION '('PARAMETERS ')' {
    if(functions[currentFunction].name === "main")
    {
        console.log("Main function should not have parameters");
        throw new Error("Main function should not have parameters");
    }
    functions[currentFunction].quadruplesStart = quadruples.length;
} | FUNCDEFINITION '(' ')' {
    if(functions[currentFunction].name === "main")
    {
        quadruples[0].address = quadruples.length;
    }
    functions[currentFunction].quadruplesStart = quadruples.length;
};
FUNCTION: FUNCHEADER '{'  INSTRUCTIONS '}'{
    finishFunction(functions[currentFunction],quadruples)
    currentFunction = 0;
    nextAvailable = functions[currentFunction].variables.filter(variable => variable.varType == "temporal").length + 1
};

FUNCRETURN:  RETURN HYPEREXPRESSION  {
            // aqui podria asignarse el valor obtenido a la variable global con el mismo nombre de la funcion
            createReturnVar(functions[currentFunction],typeStack,operandStack,quadruples);
};

// Function Calling
FUNCCALLHEADER: CallType ID '('{
    // prepara el numero de parametros
    // genera ERA size para traer el new size
    functionCalled = functions.find(func => func.name === $2);
    if(!functionCalled)
    {
        console.log(`The function ${$2}does not exist`);
        throw new Error(`The function ${$2} does not exist`);
    }
    availableParams = [...functionCalled.parameters];
    console.log("Available Params :",[...availableParams]);
    functionCallCurrentParam = 1
    quadruples.push({operator:"ERA",functionName:$2,global:currentFunction === 0,global:currentFunction === 0});
};

ARGUMENTS: ARGUMENTS , ARGUMENT | ARGUMENT;
ARGUMENT: HYPEREXPRESSION {
            var currentParam = availableParams.shift();
            if(currentParam === null || currentParam === undefined)
            {
                console.log("Too many arguments for the function");
                throw new Error("Too many arguments for the function")
            }
            var operand = operandStack.pop();
            var operandType = typeStack.pop();
            var param = functionCallCurrentParam;
            checkParams(operand,operandType,currentParam,functionCallCurrentParam,currentFunction,functions,quadruples)
            functionCallCurrentParam++;
};
FUNCCALLS: FUNCCALLHEADER ARGUMENTS ')'{
    // revisar que los parametros usados este vacio
    if(availableParams.length > 0)
    {
        console.log("Arguments missing");
        throw new Error("Arguments missing for function call");
    }
    // aqui va a generar go sub, procedure_name,initial-address (quadrupplo hihi)
    quadruples.push({operator:"GOSUB",value:functionCalled.name,global:currentFunction === 0});
    // recordar el address donde estabas antes
    // asignar el valor que tiene la variable global nombre de func en ese momento al sig temporal
    if(functionCalled.returnType != "void")
    {
        // la variable global con el mismo nombre de la funcion deberia tener el valor necesario;
        var result = nextAvail();
        var resultType = functionCalled.returnType;
        createVariable(result, resultType, functions[currentFunction], "temporal");
        quadruples.push({operator:"=",operand:result,value:functionCalled.name,global:currentFunction === 0})
    }
    
} | FUNCCALLHEADER ')'{
    if(availableParams.length > 0)
    {
        console.log("Arguments missing");
        throw new Error("Arguments missing for function call");
    }
    quadruples.push({operator:"GOSUB",value:functionCalled.name,global:currentFunction === 0});
    // recordar el address donde estabas antes
    // asignar el valor que tiene la variable global nombre de func en ese momento al sig temporal
    if(functionCalled.returnType != "void")
    {
        // la variable global con el mismo nombre de la funcion deberia tener el valor necesario;
        var result = nextAvail();[]
        var resultType = functionCalled.returnType;
        createVariable(result, resultType, functions[currentFunction], "temporal");
        quadruples.push({operator:"=",operand:result,value:functionCalled.name,global:currentFunction === 0})
    }
};

FACTFUNCCALLS: FUNCCALLHEADER ARGUMENTS ')'{
    // revisar que los parametros usados este vacio
    if(availableParams.length > 0)
    {
        console.log("Arguments missing");
        throw new Error("Arguments missing for function call");
    }
    // aqui va a generar go sub, procedure_name,initial-address (quadrupplo hihi)
    quadruples.push({operator:"GOSUB",value:functionCalled.name,global:currentFunction === 0});
    // recordar el address donde estabas antes
    // asignar el valor que tiene la variable global nombre de func en ese momento al sig temporal
    if(functionCalled.returnType != "void")
    {
        // la variable global con el mismo nombre de la funcion deberia tener el valor necesario;
        var result = nextAvail();
        var resultType = functionCalled.returnType;
        let createdVar = createVariable(result, resultType, functions[currentFunction], "temporal");
        quadruples.push({operator:"=",operand:createdVar.address,value:functionCalled.globalAddress,global:currentFunction === 0})
        operandStack.push(createdVar.address);
        typeStack.push(resultType);
    }
    
}| FUNCCALLHEADER  ')' {
    if(availableParams.length > 0)
    {
        console.log("Arguments missing");
        throw new Error("Arguments missing for function call");
    }
      quadruples.push({operator:"GOSUB",value:functionCalled.name,global:currentFunction === 0});
    // recordar el address donde estabas antes
    // asignar el valor que tiene la variable global nombre de func en ese momento al sig temporal
    if(functionCalled.returnType != "void")
    {
        // la variable global con el mismo nombre de la funcion deberia tener el valor necesario;
        var result = nextAvail();[]
        var resultType = functionCalled.returnType;
        let createdVar= createVariable(result, resultType, functions[currentFunction], "temporal");
        quadruples.push({operator:"=",operand:createdVar.address,value:functionCalled.name,global:currentFunction === 0})
        operandStack.push(createdVar.address);
        typeStack.push(resultType);
    }
};

ARRHEADER: ID '[' {
        let arrayVariable = getArrayVariable($1,functions,currentFunction);
        arrayCalled = arrayVariable;
        arrayCalledLabel = {label:arrayVariable.name,dimensions:[]};
        currentDimension = 0;

};
ARRBODY: ARRBODY , EXPRESSION{
     let dimensionIndex = createDimensionQuad(arrayCalled,currentDimension,currentArrayCallIndex,quadruples,operandStack,typeStack,nextAvail,functions,currentFunction)
     arrayCalledLabel.dimensions.push(dimensionIndex);
     if(currentDimension !== arrayCalled.dimensions.length-1)
     {
     currentArrayCallIndex = operandStack.pop();
     typeStack.pop();
     }
     currentDimension++;
} | EXPRESSION
{
    let lastDimensionIndex = createDimensionQuad(arrayCalled,currentDimension,currentArrayCallIndex,quadruples,operandStack,typeStack,nextAvail,functions,currentFunction)
    arrayCalledLabel.dimensions.push(lastDimensionIndex);
    if(currentDimension !== arrayCalled.dimensions.length-1)
     {
     currentArrayCallIndex = operandStack.pop();
     typeStack.pop();
     }
    currentDimension++;
};
ARRCALL: ARRHEADER ARRBODY;

ARRAYDEF: ARRAYID DIMENSIONS;
ARRAYID:  ID '['{
    currentArray = {type:currentType,name:$1,varType:currentFunction.global === true ? "global" : "local",dimensions:[]};
};
DIMENSIONS:  DIMENSIONS '[' DIMENSION | DIMENSION;

DIMENSION:  NUMBER ']'{
    if(currentArray === null)
    {
        console.log("Dimensions can only be created within a named array");
        throw new Error("Dimensions can only be created within a named array");
    }
    if($1 < 1)
    {
        console.log("Array limits must be positive values");
        throw new Error("Array limits must be positive values");
    }
    createConstantVariable($1,"int",functions[0])
    currentArray.dimensions.push({upperLimit:$1,m:0});
} ;
SUPRAEXPRESSION 
        : SUPRAEXPRESSION '=' HYPEREXPRESSION {
            createAssignmentQuad(quadruples,operandStack,"=",typeStack,currentFunction===0);
        }
        | HYPEREXPRESSION;

HYPEREXPRESSION
        : SUPEREXPRESSION
        | HYPEREXPRESSION '&&' SUPEREXPRESSION
        | HYPEREXPRESSION '||' SUPEREXPRESSION;


SUPEREXPRESSION
        : SUPEREXPRESSION '<' EXPRESSION {
            createOperationQuad(quadruples,operandStack, "<",typeStack, nextAvail, functions[currentFunction]);
        }
        | SUPEREXPRESSION '<=' EXPRESSION {
            createOperationQuad(quadruples, operandStack, '<=', typeStack, nextAvail, functions[currentFunction]);
        }
        | SUPEREXPRESSION '>' EXPRESSION {
            createOperationQuad(quadruples, operandStack, '>', typeStack, nextAvail, functions[currentFunction]);
        }
        | SUPEREXPRESSION '>=' EXPRESSION {
            createOperationQuad(quadruples, operandStack, '>=', typeStack, nextAvail, functions[currentFunction]);
        }
        | SUPEREXPRESSION '!=' EXPRESSION {
            createOperationQuad(quadruples, operandStack, '!=', typeStack, nextAvail, functions[currentFunction]);
        }
        | SUPEREXPRESSION '==' EXPRESSION {
            createOperationQuad(quadruples, operandStack, '==', typeStack, nextAvail, functions[currentFunction]);
        }
        | EXPRESSION;

EXPRESSION
        : TERMS 
        | EXPRESSION '+' TERMS
        {
            createOperationQuad(quadruples, operandStack, '+', typeStack,nextAvail, functions[currentFunction]);
        }
        | EXPRESSION '-' TERMS
        {
            createOperationQuad(quadruples, operandStack, '-', typeStack, nextAvail, functions[currentFunction]);
        };

TERMS
        : TERMS '*' FACTOR
        {
            createOperationQuad(quadruples, operandStack, '*', typeStack, nextAvail, functions[currentFunction]);
        }
        | TERMS '/' FACTOR
        {
            createOperationQuad(quadruples, operandStack, "/", typeStack, nextAvail, functions[currentFunction]);
        }
        | FACTOR;     
        
FACTOR
        : NUMBER 
        {
            // add check constants
            let numberAddress = createConstantVariable($1,"int",functions[0])
            typeStack.push("int");
            operandStack.push(numberAddress);
        }
        | '-' NUMBER %prec UMINUS
        {
            console.log($2*-1);
            let negativeNAddress =createConstantVariable($2*-1,"int",functions[0])
            // add check constants
            operandStack.push(negativeNAddress);
            typeStack.push("int");
        }
        | FLOAT 
        {
            let floatAddress = createConstantVariable($1,"float",functions[0])
            operandStack.push(floatAddress);
            typeStack.push("float");
        }
        | '-' FLOAT %prec UMINUS
        {
            console.log($2*-1);
            // add check constants
            let negativeFAddress = createConstantVariable($2*-1,"float",functions[0])
            operandStack.push(negativeFAddress);
            typeStack.push("float");
        }
        | ID
        {
            // check var exists
            // if var doesnt exist throw error
            let variable = getVariable($1,functions,currentFunction);
            operandStack.push(variable.address);
            typeStack.push(variable.type);
        }|ARRCALL ']'
        {
            if(currentDimension <= arrayCalled.dimensions.length-1)
            {
                console.log(`Incorrect call array ${arrayCalled.name} has more dimensionesn`);
                throw new Error(`Incorrect call array ${arrayCalled.name} has more dimensionesn`);

            }
            arrayCalled = null;
            currentArrayCallIndex = null;
        }
        |FACTFUNCCALLS 
        | TEXT {
            let stringAddress = createConstantVariable($1,"string",functions[0])
            operandStack.push(stringAddress);
            typeStack.push("string");
        } |
        TRUE{
            let booleanTAddress = createConstantVariable("true","bool",functions[0])
            // constant address
            operandStack.push(booleanTAddress);
            typeStack.push("bool");
        } |
        FALSE {
            // constant address
            let booleanFAddress = createConstantVariable("false","bool",functions[0])
            operandStack.push(booleanFAddress);
            typeStack.push("bool");
        }
        | '('  SUPRAEXPRESSION ')'; 
READARGUMENT:ID
        {
            let readVariable = getVariable($1,functions,currentFunction);
            operandStack.push({address:readVariable.address,label:readVariable.name});
            typeStack.push(readVariable.type);

        }| ARRCALL ']'
        {
            if(currentDimension <= arrayCalled.dimensions.length-1)
            {
                console.log(`Incorrect call array ${arrayCalled.name} has more dimensionesn`);
                throw new Error(`Incorrect call array ${arrayCalled.name} has more dimensions`);

            }
            operandStack[operandStack.length] = {address:operandStack[operandStack.length -1],label:arrayCalledLabel}
            arrayCalled = null;
            arrayCalledLabel =  null;
            currentArrayCallIndex = null;
        };
// Reading and Writing
READBODY:  READBODY , READARGUMENT  {
                createReadQuad(quadruples,operandStack,typeStack)
            }
            | READARGUMENT{
                createReadQuad(quadruples,operandStack,typeStack)
            };
READFUNC:  READ '(' READBODY ')';

PRINTBODY:  PRINTBODY , HYPEREXPRESSION  {
                createPrintQuad(quadruples,operandStack,typeStack)
                
            }
            | HYPEREXPRESSION{
                createPrintQuad(quadruples,operandStack,typeStack)
            };
PRINTFUNC:  PRINT '(' PRINTBODY ')';
