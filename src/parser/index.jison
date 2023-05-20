
%{
    var operatorStack = [];
    var operandStack = [];
    var typeStack = [];
    var jumpStack = [];
    // t1 registro temporal
    // operacion,   operandoizq,operandoder,res
    var quadruples = [];
    /*
    int 0
    float 1
    char 2
    boolean 3
    */
    let semanticTable = {};
    semanticTable['int'] = {
        '+': {
            'int': 'int',
            'float': 'float'
        },
        '-': {
            'int': 'int',
            'float': 'float'
        },
        '*': {
            'int': 'int',
            'float': 'float'
        },
        '/': {
            'int': 'float',
            'float': 'float'
        },
        '>': {
            'int': 'bool',
            'float': 'bool'
        },
        '<': {
            'int': 'bool',
            'float': 'bool'
        },
        '>=': {
            'int': 'bool',
            'float': 'bool'
        },
        '<=': {
            'int': 'bool',
            'float': 'bool'
        },
        '==': {
            'int': 'bool',
            'float': 'bool'
        },
        '!=': {
            'int': 'bool',
            'float': 'bool'
        }
        };

    // Float values
    semanticTable['float'] = {
        '+': {
            'int': 'float',
            'float': 'float'
        },
        '-': {
            'int': 'float',
            'float': 'float'
        },
        '*': {
            'int': 'float',
            'float': 'float'
        },
        '/': {
            'int': 'float',
            'float': 'float'
        },
        '>': {
            'int': 'bool',
            'float': 'bool'
        },
        '<': {
            'int': 'bool',
            'float': 'bool'
        },
        '>=': {
            'int': 'bool',
            'float': 'bool'
        },
        '<=': {
            'int': 'bool',
            'float': 'bool'
        },
        '==': {
            'int': 'bool',
            'float': 'bool'
        },
        '!=': {
            'int': 'bool',
            'float': 'bool'
        }
        };
    // char values
    semanticTable['char'] = {
        '==': {
            'char': 'bool'
        },
        '!=': {
            'char': 'bool'
        }
        };

    // Boolean values
    semanticTable['bool'] = {
        '&&': {
            'bool': 'bool'
        },
        '||': {
            'bool': 'bool'
        },
        '!': {
            'bool': 'bool'
        },
        '==': {
            'bool': 'bool'
        },
        '!=': {
            'bool': 'bool'
        }
        };

    // type,name
    // TODO: make variables linked to functions and global values
    var variables = [];
    var jumpStack = [];
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
        if(!resultType)
        {
            console.log("Operation",leftType,operator,rightType,"is not valid");
            throw new Error("Operation is not valid");
        }
        var result = nextAvail();
        console.log(`${leftOperand}(${leftType})${operator}${rightOperand}(${rightType})=${result}(${resultType})`);
        quadruples.push({operator:operator,leftOperand:leftOperand,rightOperand:rightOperand,result:result});
        operandStack.push(result);
        typeStack.push(resultType);
        // TODO: delete temporals that are not needed anymore
    }
    function createAssignmentQuad(){
        var [rightOperand,rightType,leftOperand,leftType,operator] = getOperands();
        // add more validations later but for now strict typing
        if(rightType != leftType)
        {
            console.log("Operation",leftType,operator,rightType,"is not valid");
            throw new Error("Operation is not valid");
        }
        console.log("se uso el assignment");
        console.log(`${leftOperand}(${leftType})${operator}${rightOperand}(${rightType})`)
        quadruples.push({operator:operator,leftOperand:leftOperand,rightOperand:null,result:rightOperand});
    }
%}
%lex
%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b        return 'NUMBER'
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
"char"                      return 'charType'
"boolean"                   return 'boolType'
"string"                    return 'stringType'
"float"                     return 'floatType'
"int"                       return 'intType'
"if"                        return 'IF'
"else"                      return 'ELSE'
"while"                     return 'WHILE'
"do"                        return 'DO'
"for"                       return 'FOR'
\"[^\"]*\"				    return 'text'
\'[^\']?\'                  return 'character'
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
START : INSTRUCTIONS EOF { 
    // aqui deberia regresar la tabla de memoria de las funciones, etc
    console.log("quadruples:",quadruples);
    console.log("operators:",operatorStack);
    console.log("operands:",operandStack);
    console.log("jumps:",jumpStack);
    console.log("variables:",variables);};
TYPE : intType {
      currentType = "int";
} | floatType {
    currentType = "float";
}  | boolType {
    currentType = "boolean";
} | charType  {
    currentType = "char";
}| stringType {
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

INSTRUCTIONS : INSTRUCTIONS  INSTRUCTION | INSTRUCTION ;


INSTRUCTION : DECLARATION ';' | SUPRAEXPRESSION ';' | HYPERCONDITIONALS | LOOPS;
DECLARATION : TYPE ASSIGNMENTS {
        currentType = null;

};
ASSIGNMENTS : ASSIGNMENTS , ASSIGNMENT | ASSIGNMENT;
ASSIGNMENT 
    : id {
        // TODO: Add logic link variables with functions or with global status
        if(variables.some(variable => variable.name === $1))
        {
            console.log("Name is already taken",$1);
            throw new Error($1, "name is already taken");
        }
        variables.push({type:currentType,name:$1});
    }
    | id '=' HYPEREXPRESSION {
        // TODO: Add logic to which type of value it is
        variables.push({type:currentType,name:$1});
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
         variables.push({type:"int",name:$1});
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
            // check if number is int or float
            operandStack.push($1);
            typeStack.push("int");
        }
        | E
        | PI
        | id
        {
            // check var exists
            // if var doesnt exist throw error
            let variable = variables.find(variable => variable.name === $1);
            if (variable)
            {
            operandStack.push($1);
            typeStack.push(variable.type);

            }else {
                console.log("Variable does not exist at this point in time",$1);
                throw new Error("Variable ",$1, "does not exist at this point");
            }
        }
        | text
        | '('  SUPRAEXPRESSION ')'; 

