

define(function(require){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,11],$V1=[1,12],$V2=[1,13],$V3=[1,14],$V4=[1,18],$V5=[1,17],$V6=[5,7,8,9,10,36,55],$V7=[1,25],$V8=[1,28],$V9=[1,48],$Va=[1,42],$Vb=[1,39],$Vc=[1,40],$Vd=[1,41],$Ve=[1,45],$Vf=[1,46],$Vg=[1,47],$Vh=[30,32],$Vi=[30,32,60],$Vj=[1,62],$Vk=[1,65],$Vl=[1,66],$Vm=[1,84],$Vn=[1,85],$Vo=[1,86],$Vp=[1,83],$Vq=[1,77],$Vr=[1,79],$Vs=[1,78],$Vt=[17,19,30,55,67,82,88,89,90,91],$Vu=[1,90],$Vv=[1,91],$Vw=[17,19,30,32,55,60,67,69,71,72,82,88,89,90,91],$Vx=[1,92],$Vy=[1,93],$Vz=[1,94],$VA=[1,95],$VB=[1,96],$VC=[1,97],$VD=[17,19,30,32,55,60,67,69,71,72,73,75,76,77,78,79,88,89,90,91],$VE=[1,98],$VF=[1,99],$VG=[17,19,30,32,55,60,67,69,71,72,73,75,76,77,78,79,81,82,88,89,90,91],$VH=[1,100],$VI=[1,101],$VJ=[17,19,30,32,55,60,67,69,71,72,73,75,76,77,78,79,81,82,83,85,88,89,90,91],$VK=[1,104],$VL=[7,8,9,10,15,16,17,22,24,27,30,43,48,51,55,67,82,88,89,90,91],$VM=[1,127],$VN=[19,60,69],$VO=[17,30,55,67,82,88,89,90,91],$VP=[17,30,32,55,67,88,89,90,91],$VQ=[7,8,9,10,19],$VR=[1,165],$VS=[19,30],$VT=[7,8,9,10,13,15,16,17,22,24,27,30,43,48,51,55,67,82,88,89,90,91];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"MAININSTRUCTIONS":4,"EOF":5,"TYPE":6,"intType":7,"floatType":8,"boolType":9,"stringType":10,"HYPERCONDITIONALS":11,"CONDITIONALS":12,"{":13,"INSTRUCTIONS":14,"}":15,"IF":16,"(":17,"CONDITIONALHYPEREXPRESSION":18,")":19,"ELSE":20,"WHILECOMMAND":21,"WHILE":22,"DOCOMMAND":23,"DO":24,"LOOPS":25,"HYPEREXPRESSION":26,"FOR":27,"FORASSIGNMENT":28,"PARAMETER":29,"id":30,"DIMENSIONS":31,"]":32,"PARAMETERS":33,"FUNCTYPE":34,"FUNCDEFINITION":35,"FUNC":36,"VOIDFUNCDEFINITION":37,"voidType":38,"FUNCHEADER":39,"VOIDFUNCHEADER":40,"FUNCTION":41,"FUNCRETURN":42,"RETURN":43,"READARGUMENT":44,"ARRCALL":45,"READBODY":46,"READFUNC":47,"READ":48,"PRINTBODY":49,"PRINTFUNC":50,"PRINT":51,"ARGUMENTS":52,"ARGUMENT":53,"FUNCCALLHEADER":54,"CallType":55,"FUNCCALLS":56,"FACTFUNCCALLS":57,"MAININSTRUCTION":58,"DECLARATION":59,";":60,"INSTRUCTION":61,"SUPRAEXPRESSION":62,"ASSIGNMENTS":63,"ARRAYID":64,"DIMENSION":65,"[":66,"NUMBER":67,"ASSIGNMENT":68,"=":69,"SUPEREXPRESSION":70,"&&":71,"||":72,"<":73,"EXPRESSION":74,"<=":75,">":76,">=":77,"!=":78,"==":79,"TERMS":80,"+":81,"-":82,"*":83,"FACTOR":84,"/":85,"ARRHEADER":86,"ARRBODY":87,"FLOAT":88,"text":89,"TRUE":90,"FALSE":91,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"intType",8:"floatType",9:"boolType",10:"stringType",13:"{",15:"}",16:"IF",17:"(",19:")",20:"ELSE",22:"WHILE",24:"DO",27:"FOR",30:"id",32:"]",36:"FUNC",38:"voidType",43:"RETURN",48:"READ",51:"PRINT",55:"CallType",60:";",66:"[",67:"NUMBER",69:"=",71:"&&",72:"||",73:"<",75:"<=",76:">",77:">=",78:"!=",79:"==",81:"+",82:"-",83:"*",85:"/",88:"FLOAT",89:"text",90:"TRUE",91:"FALSE"},
productions_: [0,[3,2],[6,1],[6,1],[6,1],[6,1],[11,1],[11,4],[12,7],[12,8],[21,1],[23,1],[25,7],[25,8],[25,8],[29,2],[29,3],[33,2],[33,1],[34,1],[34,1],[34,1],[34,1],[35,3],[37,3],[39,4],[39,3],[40,4],[40,3],[41,4],[41,4],[42,2],[44,1],[44,2],[46,2],[46,1],[47,4],[49,2],[49,1],[50,4],[52,2],[52,1],[53,1],[54,3],[56,3],[56,2],[57,3],[57,2],[58,2],[58,1],[58,2],[4,2],[4,1],[14,2],[14,1],[61,2],[61,2],[61,2],[61,2],[61,2],[61,1],[61,1],[59,2],[64,1],[31,2],[31,1],[65,3],[65,3],[63,2],[63,1],[68,1],[68,2],[68,3],[28,3],[62,3],[62,1],[26,1],[26,3],[26,3],[18,1],[70,3],[70,3],[70,3],[70,3],[70,3],[70,3],[70,1],[74,1],[74,3],[74,3],[80,3],[80,3],[80,1],[86,2],[87,2],[87,1],[45,2],[84,1],[84,2],[84,1],[84,2],[84,1],[84,2],[84,1],[84,1],[84,1],[84,1],[84,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 
    if(functions[0].quadruplesStart === null)
    {
        console.log("Main function is missing");
        throw new Error("Main function is missing");
    }
    // aqui deberia regresar la tabla de memoria de las funciones, etc
    console.log("quadruples:",quadruples);
    console.log("operators:",operatorStack);
    console.log("operands:",operandStack);
    console.log("jumps:",jumpStack);
    console.log("functions:",functions);
    console.log("current function:",currentFunction)
    return {quadruples,functions};
    
break;
case 2:

      currentType = "int";

break;
case 3:

    currentType = "float";

break;
case 4:

    currentType = "bool";

break;
case 5:

    currentType = "string";

break;
case 7:

            var end = jumpStack.pop();
            var quadruple = quadruples[end];
            quadruple.address = quadruples.length;


break;
case 8:

                var end = jumpStack.pop();
                var quadruple = quadruples[end];
                quadruple.address = quadruples.length;
      

break;
case 9:

                var end = jumpStack.pop();
                var quadruple = quadruples[end];
                console.log(quadruple);
                quadruple.address = quadruples.length+1;
                quadruples.push({operator:"GOTO",address:result});
                jumpStack.push(quadruples.length-1);
      

break;
case 10: case 11:
jumpStack.push(quadruples.length);
break;
case 12:

                         var end = jumpStack.pop();
                         var whileStart =  jumpStack.pop();
                         var quadruple = quadruples[end];
                         quadruples.push({operator:"GOTO",address:whileStart});
                         quadruple.address = quadruples.length;


break;
case 13:

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

break;
case 14:

        var pendingFalseQuadruple = jumpStack.pop();
        var forStart = jumpStack.pop();
        var quadruple = quadruples[pendingFalseQuadruple];
        quadruples.push({operator:"GOTO",address:forStart});
        quadruple.address = quadruples.length;


break;
case 15:

         createVariable($$[$0],$$[$0-1],functions[currentFunction],"parameter");
         functions[currentFunction].parameters.push($$[$0-1]);

break;
case 16:

        currentArray.type = $$[$0-2];
        createArrayVariable(currentArray,functions[currentFunction],"parameter");
       functions[currentFunction].parameters.push({type:$$[$0-2],dimensions:currentArray.dimensions.map(dimension => {return dimension.upperLimit}  )});
        currentArray = null;

break;
case 23:

    // add check to see function is unique
    if($$[$0] === "main"){
        console.log("Main function should be void");
        throw new Error("Main function should be void");
    }
    if(functions.some((func) => func.name === $$[$0]))
    {
        console.log(`Function ${$$[$0]} already exists`);
        throw new Error(`Function ${$$[$0]} was already declared`);
    }
    // check if variable name exists because global variable will exist
    // talvez tmbn pushear a las variables globales una variable con el mismo nombre d ela funcion ,para tener el valor asignado
    functions.push({name:$$[$0],returnType:$$[$0-1],parameters:[],size:null,variables:[],quadruplesStart:null});
    currentFunction = functions.length-1;
    nextAvailable=1;
    nextPointerAvailable=1;
    resetAvailableAddresses();

break;
case 24:

    // add check to see function is unique
    if(functions.some((func) => func.name === $$[$0]) && $$[$0] !== "main")
    {
        console.log(`Function ${$$[$0]} already exists`);
        throw new Error(`Function ${$$[$0]} was already declared`);
    }else if($$[$0] === "main" && functions.find((func) => func.name === $$[$0]).quadruplesStart !== null)
    {
        console.log('Main was already declared');
        throw new Error("Main was already declared");
    }
    // check if variable name exists because global variable will exist
    // talvez tmbn pushear a las variables globales una variable con el mismo nombre d ela funcion ,para tener el valor asignado
    if($$[$0] !== "main" )
    {
    functions.push({name:$$[$0],returnType:$$[$0-1],parameters:[],size:null,variables:[],quadruplesStart:null});
    currentFunction = functions.length-1;
    nextAvailable=1;
    }

break;
case 25: case 26: case 27: case 28:

    functions[currentFunction].quadruplesStart = quadruples.length;
    if(functions[currentFunction].name === "main")
    {
        quadruples[0].address = quadruples.length;
    }

break;
case 29: case 30:

    finishFunction(functions[currentFunction],quadruples)
    currentFunction = 0;
    nextAvailable = functions[currentFunction].variables.filter(variable => variable.varType == "temporal").length + 1

break;
case 31:

            // aqui podria asignarse el valor obtenido a la variable global con el mismo nombre de la funcion
            createReturnVar(functions[currentFunction],typeStack,operandStack,quadruples,nextAvail);

break;
case 32:

            let readVariable = getVariable($$[$0],functions,currentFunction);
            operandStack.push(readVariable.address);
            typeStack.push(readVariable.type);

        
break;
case 33: case 102:

            if(currentDimension <= arrayCalled.dimensions.length-1)
            {
                console.log(`Incorrect call array ${arrayCalled.name} has more dimensionesn`);
                throw new Error(`Incorrect call array ${arrayCalled.name} has more dimensionesn`);

            }
            arrayCalled = null;
            currentArrayCallIndex = null;
        
break;
case 34: case 35:

                createReadQuad(quadruples,operandStack,typeStack)
            
break;
case 37:

                createPrintQuad(quadruples,operandStack,typeStack)
                
            
break;
case 38:

                createPrintQuad(quadruples,operandStack,typeStack)
            
break;
case 42:

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

break;
case 43:

    // prepara el numero de parametros
    // genera ERA size para traer el new size
    // check function exist
    functionCalled = functions.find(func => func.name === $$[$0-1]);
    if(!functionCalled)
    {
        console.log(`The function ${$$[$0-1]}does not exist`);
        throw new Error(`The function ${$$[$0-2]} does not exist`);
    }
    availableParams = [...functionCalled.parameters];
    functionCallCurrentParam = 1
    quadruples.push({operator:"ERA",functionName:$$[$0-1]});

break;
case 44:

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
    

break;
case 45:

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

break;
case 46:

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
        let createdVar = createVariable(result, resultType, functions[currentFunction], "temporal");
        quadruples.push({operator:"=",operand:createdVar.address,value:functionCalled.name})
        operandStack.push(createdVar.address);
        typeStack.push(resultType);
    }else {
        console.log("You cannot use a void function within a expression");
        throw new Error("You cannot use a void function within an expression");
    }
    

break;
case 47:

      quadruples.push({operator:"GOSUB",value:functionCalled.name});
    // recordar el address donde estabas antes
    // asignar el valor que tiene la variable global nombre de func en ese momento al sig temporal
    if(functionCalled.returnType != "void")
    {
        // la variable global con el mismo nombre de la funcion deberia tener el valor necesario;
        var result = nextAvail();[]
        var resultType = functionCalled.returnType;
        let createdVar= createVariable(result, resultType, functions[currentFunction], "temporal");
        quadruples.push({operator:"=",operand:createdVar.address,value:functionCalled.name})
        operandStack.push(createdVar.address);
        typeStack.push(resultType);
    }else {
        console.log("You cannot use a void function within a expression");
        throw new Error("You cannot use a void function within an expression");
    }

break;
case 62:

        currentType = null;

break;
case 66:

    if(currentArray === null)
    {
        console.log("Dimensions can only be created within a named array");
        throw new Error("Dimensions can only be created within a named array");
    }
    if($$[$0] < 1)
    {
        console.log("Array limits must be positive values");
        throw new Error("Array limits must be positive values");
    }
    createConstantVariable($$[$0],"int",functions[0])
    currentArray.dimensions.push({upperLimit:$$[$0],m:0});

break;
case 67:

    if($$[$0]< 1)
    {
        console.log("Array limits must be positive values");
        throw new Error("Array limits must be positive values");
    }
    createConstantVariable($$[$0],"int",functions[0])
    currentArray = {type:currentType,name:$$[$0-2],varType:currentFunction.name == "main" ? "global" : "local",dimensions:[{upperLimit:$$[$0]}]};


break;
case 70:

        createVariable($$[$0],currentType,functions[currentFunction]);
    
break;
case 71:

        createArrayVariable(currentArray,functions[currentFunction]);
        currentArray = null;
    
break;
case 72:

        let declaredVar = createVariable($$[$0-2],currentType,functions[currentFunction]);
        operatorStack.push('=');
        if([...operatorStack].pop() == "=")
        {
        var rightOperand = operandStack.pop();
        var rightType = typeStack.pop();
        var leftOperand = declaredVar.address;
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
    
break;
case 73:

        createVariable($$[$0-2],"int",functions[currentFunction]);
        operatorStack.push('=');
        if([...operatorStack].pop() == "=")
        {
            var rightOperand = operandStack.pop();
            var rightType = typeStack.pop();
            var leftOperand = $$[$0-2];
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
    
break;
case 74:

                operatorStack.push('=');
                if([...operatorStack].pop() == "="){
                    createAssignmentQuad(quadruples,operandStack,operatorStack,typeStack);
            }
        
break;
case 79:

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
        
break;
case 80:

                operatorStack.push('<');
                if([...operatorStack].pop() == "<"){
                createOperationQuad(quadruples,operandStack, operatorStack,typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 81:

            operatorStack.push('<=');
            if([...operatorStack].pop() == "<="){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 82:

            operatorStack.push('>');
            if([...operatorStack].pop() == ">"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 83:

            operatorStack.push('>=');
            if([...operatorStack].pop() == ">="){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 84:

            operatorStack.push('!=');
            if([...operatorStack].pop() == "!="){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 85:

            operatorStack.push('==');
            if([...operatorStack].pop() == "=="){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 88:

            operatorStack.push('+');
            if([...operatorStack].pop() == "+"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack,nextAvail, functions[currentFunction]);
            }
            
        
break;
case 89:

            operatorStack.push('-');
            if([...operatorStack].pop() == "-"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 90:

            operatorStack.push('*');
            if([...operatorStack].pop() == "*"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 91:

            operatorStack.push('/');
            if([...operatorStack].pop() == "/"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 93:

        let arrayVariable = getArrayVariable($$[$0-1],functions,currentFunction);
        arrayCalled = arrayVariable;
        currentDimension = 0;


break;
case 94:

     createDimensionQuad(arrayCalled,currentDimension,currentArrayCallIndex,quadruples,operandStack,operatorStack,typeStack,nextAvail,functions[currentFunction],functions[0])
     if(currentDimension !== arrayCalled.dimensions.length-1)
     {
     currentArrayCallIndex = operandStack.pop();
     typeStack.pop();
     }
     currentDimension++;

break;
case 95:

    createDimensionQuad(arrayCalled,currentDimension,currentArrayCallIndex,quadruples,operandStack,operatorStack,typeStack,nextAvail,functions[currentFunction],functions[0])
    if(currentDimension !== arrayCalled.dimensions.length-1)
     {
     currentArrayCallIndex = operandStack.pop();
     typeStack.pop();
     }
    currentDimension++;

break;
case 97:

            // add check constants
            let numberAddress = createConstantVariable($$[$0],"int",functions[0])
            typeStack.push("int");
            operandStack.push(numberAddress);
        
break;
case 98:

            console.log($$[$0]*-1);
            let negativeNAddress =createConstantVariable($$[$0]*-1,"int",functions[0])
            // add check constants
            operandStack.push(negativeNAddress);
            typeStack.push("int");
        
break;
case 99:

            let floatAddress = createConstantVariable($$[$0],"float",functions[0])
            operandStack.push(floatAddress);
            typeStack.push("float");
        
break;
case 100:

            console.log($$[$0]*-1);
            // add check constants
            let negativeFAddress = createConstantVariable($$[$0]*-1,"float",functions[0])
            operandStack.push(negativeFAddress);
            typeStack.push("float");
        
break;
case 101:

            // check var exists
            // if var doesnt exist throw error
            let variable = getVariable($$[$0],functions,currentFunction);
            operandStack.push(variable.address);
            typeStack.push(variable.type);
        
break;
case 104:

            let stringAddress = createConstantVariable($$[$0],"string",functions[0])
            operandStack.push(stringAddress);
            typeStack.push("string");
        
break;
case 105:

            let booleanTAddress = createConstantVariable("true","bool",functions[0])
            // constant address
            operandStack.push(booleanTAddress);
            typeStack.push("bool");
        
break;
case 106:

            // constant address
            let booleanFAddress = createConstantVariable("false","bool",functions[0])
            operandStack.push(booleanFAddress);
            typeStack.push("bool");
        
break;
}
},
table: [{3:1,4:2,6:7,7:$V0,8:$V1,9:$V2,10:$V3,35:15,36:$V4,37:16,39:8,40:9,41:5,54:10,55:$V5,56:6,58:3,59:4},{1:[3]},{5:[1,19],6:7,7:$V0,8:$V1,9:$V2,10:$V3,35:15,36:$V4,37:16,39:8,40:9,41:5,54:10,55:$V5,56:6,58:20,59:4},o($V6,[2,52]),{60:[1,21]},o($V6,[2,49]),{60:[1,22]},{30:$V7,31:26,32:$V8,63:23,65:27,68:24},{13:[1,29]},{13:[1,30]},{17:$V9,19:[1,32],26:34,30:$Va,45:43,52:31,53:33,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},o($Vh,[2,2]),o($Vh,[2,3]),o($Vh,[2,4]),o($Vh,[2,5]),{17:[1,51]},{17:[1,52]},{30:[1,53]},{7:[1,56],8:[1,57],9:[1,58],10:[1,59],34:54,38:[1,55]},{1:[2,1]},o($V6,[2,51]),o($V6,[2,48]),o($V6,[2,50]),{30:$V7,31:26,32:$V8,60:[2,62],65:27,68:60},o($Vi,[2,69]),o($Vi,[2,70],{66:$Vj,69:[1,61]}),{30:$Vk,32:[1,63],65:64},o($Vh,[2,65]),{66:$Vl},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,14:67,16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:68,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,14:87,16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:68,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,19:[1,88],26:34,30:$Va,45:43,53:89,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{60:[2,45]},o($Vt,[2,41]),o($Vt,[2,42],{71:$Vu,72:$Vv}),o($Vw,[2,76],{73:$Vx,75:$Vy,76:$Vz,77:$VA,78:$VB,79:$VC}),o($VD,[2,86],{81:$VE,82:$VF}),o($VG,[2,87],{83:$VH,85:$VI}),o($VJ,[2,92]),o($VJ,[2,97]),{67:[1,102],88:[1,103]},o($VJ,[2,99]),o($VJ,[2,101],{66:$VK}),{32:[1,105]},o($VJ,[2,103]),o($VJ,[2,104]),o($VJ,[2,105]),o($VJ,[2,106]),{17:$V9,26:76,30:$Va,45:43,54:50,55:$V5,57:44,62:106,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,74:108,80:37,82:$Vc,84:38,86:49,87:107,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,19:[1,110],26:34,30:$Va,45:43,52:109,53:33,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{6:114,7:$V0,8:$V1,9:$V2,10:$V3,19:[1,112],29:113,33:111},{6:114,7:$V0,8:$V1,9:$V2,10:$V3,19:[1,116],29:113,33:115},{17:[1,117]},{30:[1,118]},{30:[1,119]},{30:[2,19]},{30:[2,20]},{30:[2,21]},{30:[2,22]},o($Vi,[2,68]),{17:$V9,26:120,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{67:[1,121]},o($Vi,[2,71],{66:$Vl}),o($Vh,[2,64]),{66:$Vj},{67:[1,122]},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,15:[1,123],16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:124,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},o($VL,[2,54]),{60:[1,125]},{60:[1,126],69:$VM},{60:[1,128]},{60:[1,129]},{60:[1,130]},o($VL,[2,60]),o($VL,[2,61]),o($VN,[2,75],{71:$Vu,72:$Vv}),{17:$V9,26:131,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:[1,132]},{17:[1,133]},o($VL,[2,6],{13:[1,134]}),{17:[1,135]},{13:[1,136]},{17:[1,137]},{17:[1,138]},{17:[2,10]},{13:[2,11]},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,15:[1,139],16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:124,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{60:[2,44]},o($Vt,[2,40]),{17:$V9,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,70:140,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,70:141,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,74:142,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,74:143,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,74:144,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,74:145,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,74:146,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,74:147,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,80:148,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,80:149,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,82:$Vc,84:150,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,82:$Vc,84:151,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},o($VJ,[2,98]),o($VJ,[2,100]),o($VO,[2,93]),o($VJ,[2,102]),{19:[1,152],69:$VM},{17:$V9,30:$Va,32:[2,96],45:43,54:50,55:$V5,57:44,67:$Vb,74:153,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},o($VP,[2,95],{81:$VE,82:$VF}),{17:$V9,19:[1,154],26:34,30:$Va,45:43,53:89,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},o($VJ,[2,47]),{6:114,7:$V0,8:$V1,9:$V2,10:$V3,19:[1,155],29:156},{13:[2,26]},o($VQ,[2,18]),{30:[1,157],31:158,32:$V8,65:27},{6:114,7:$V0,8:$V1,9:$V2,10:$V3,19:[1,159],29:156},{13:[2,28]},o($Vt,[2,43]),{17:[2,23]},{17:[2,24]},o($Vi,[2,72],{71:$Vu,72:$Vv}),o($Vh,[2,67]),o($Vh,[2,66]),o($V6,[2,29]),o($VL,[2,53]),o($VL,[2,55]),o($VL,[2,56]),{17:$V9,26:160,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},o($VL,[2,57]),o($VL,[2,58]),o($VL,[2,59]),{60:[2,31],71:$Vu,72:$Vv},{17:$V9,26:162,30:$Va,45:43,49:161,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{30:$VR,44:164,45:166,46:163,86:49},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,14:167,16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:68,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,18:168,26:169,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,14:170,16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:68,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{28:171,30:[1,172]},{17:$V9,18:173,26:169,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},o($V6,[2,30]),o($Vw,[2,77],{73:$Vx,75:$Vy,76:$Vz,77:$VA,78:$VB,79:$VC}),o($Vw,[2,78],{73:$Vx,75:$Vy,76:$Vz,77:$VA,78:$VB,79:$VC}),o($VD,[2,80],{81:$VE,82:$VF}),o($VD,[2,81],{81:$VE,82:$VF}),o($VD,[2,82],{81:$VE,82:$VF}),o($VD,[2,83],{81:$VE,82:$VF}),o($VD,[2,84],{81:$VE,82:$VF}),o($VD,[2,85],{81:$VE,82:$VF}),o($VG,[2,88],{83:$VH,85:$VI}),o($VG,[2,89],{83:$VH,85:$VI}),o($VJ,[2,90]),o($VJ,[2,91]),o($VJ,[2,107]),o($VP,[2,94],{81:$VE,82:$VF}),o($VJ,[2,46]),{13:[2,25]},o($VQ,[2,17]),o($VQ,[2,15],{66:$Vj}),{30:$Vk,32:[1,174],65:64},{13:[2,27]},o($VN,[2,74],{71:$Vu,72:$Vv}),{17:$V9,19:[1,175],26:176,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},o($Vt,[2,38],{71:$Vu,72:$Vv}),{19:[1,177],30:$VR,44:178,45:166,86:49},o($VS,[2,35]),o($VS,[2,32],{66:$VK}),{32:[1,179]},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,15:[1,180],16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:124,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{19:[1,181]},{19:[2,79],71:$Vu,72:$Vv},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,15:[1,182],16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:124,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,18:183,26:169,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{69:[1,184]},{19:[1,185]},o($VQ,[2,16],{66:$Vl}),{60:[2,39]},o($Vt,[2,37],{71:$Vu,72:$Vv}),{60:[2,36]},o($VS,[2,34]),o($VS,[2,33]),o($VL,[2,7]),{13:[1,186]},{22:[1,187]},{19:[1,188]},{17:$V9,26:189,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{13:[1,190]},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,14:191,16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:68,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:[1,192]},{13:[1,193]},o($VO,[2,73],{71:$Vu,72:$Vv}),{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,14:194,16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:68,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,15:[1,195],16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:124,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{17:$V9,26:196,30:$Va,45:43,54:50,55:$V5,57:44,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,14:197,16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:68,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,15:[1,198],16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:124,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},o($VL,[2,12]),{19:[1,199],71:$Vu,72:$Vv},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:74,12:80,15:[1,200],16:$Vm,17:$V9,21:81,22:$Vn,23:82,24:$Vo,25:75,26:76,27:$Vp,30:$Va,42:71,43:$Vq,45:43,47:73,48:$Vr,50:72,51:$Vs,54:50,55:$V5,57:44,59:69,61:124,62:70,67:$Vb,70:35,74:36,80:37,82:$Vc,84:38,86:49,88:$Vd,89:$Ve,90:$Vf,91:$Vg},o($VT,[2,8],{20:[1,201]}),o($VL,[2,13]),o($VL,[2,14]),o($VT,[2,9])],
defaultActions: {19:[2,1],32:[2,45],56:[2,19],57:[2,20],58:[2,21],59:[2,22],85:[2,10],86:[2,11],88:[2,44],112:[2,26],116:[2,28],118:[2,23],119:[2,24],155:[2,25],159:[2,27],175:[2,39],177:[2,36]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    const {semanticTable} = require("./semanticTable");
    const {createReturnVar,finishFunction} = require("./functionsUtils");
    const {createVariable,createConstantVariable,getVariable,getArrayVariable,createArrayVariable,resetAvailableAddresses} = require("./variableUtils");
    const {getOperands,createAssignmentQuad,createOperationQuad,createPrintQuad,createReadQuad} = require("./quadrupleUtils");
    const {createDimensionQuad} = require("./arrayUtils");

    var operatorStack = [];
    var operandStack = [];
    var typeStack = [];
    var jumpStack = [];
    var currentDimension = 0;
    var arrayCalled = null;
    var currentArrayCallIndex = null;

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

    

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 88
break;
case 2:return 67
break;
case 3:return 83
break;
case 4:return 85
break;
case 5:return 82
break;
case 6:return 81
break;
case 7:return 17
break;
case 8:return 19
break;
case 9:return 13
break;
case 10:return 15
break;
case 11:return 73
break;
case 12:return 76
break;
case 13:return 75
break;
case 14:return 77
break;
case 15:return 78
break;
case 16:return 79
break;
case 17:return 69
break;
case 18:return 60
break;
case 19:return 55
break;
case 20:return 66
break;
case 21:return 32
break;
case 22:return 90
break;
case 23:return 91
break;
case 24:return 9
break;
case 25:return 10
break;
case 26:return 8
break;
case 27:return 7
break;
case 28:return 16
break;
case 29:return 38
break;
case 30:return 20
break;
case 31:return 22
break;
case 32:return 24
break;
case 33:return 27
break;
case 34:return 36
break;
case 35:return 43
break;
case 36:return 51
break;
case 37:return 48
break;
case 38:return 89
break;
case 39:return 30
break;
case 40:return 5
break;
case 41:
break;
}
},
rules: [/^(?:\s+)/,/^(?:[0-9]+(\.[0-9]+)\b)/,/^(?:[0-9]+\b)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:<)/,/^(?:>)/,/^(?:<!)/,/^(?:!>)/,/^(?:!=)/,/^(?:==)/,/^(?:=)/,/^(?:;)/,/^(?::)/,/^(?:\[)/,/^(?:\])/,/^(?:true\b)/,/^(?:false\b)/,/^(?:bool\b)/,/^(?:string\b)/,/^(?:float\b)/,/^(?:int\b)/,/^(?:if\b)/,/^(?:void\b)/,/^(?:else\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:for\b)/,/^(?:func\b)/,/^(?:return\b)/,/^(?:print\b)/,/^(?:read\b)/,/^(?:"[^\"]*")/,/^(?:([a-zA-Z])[a-zA-Z0-9_]*)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
return parser;
});