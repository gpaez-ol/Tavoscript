

define(function(require){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,12],$V1=[1,13],$V2=[1,14],$V3=[1,15],$V4=[1,19],$V5=[1,18],$V6=[1,11],$V7=[5,7,8,9,10,34,47,49],$V8=[1,26],$V9=[1,41],$Va=[1,38],$Vb=[1,36],$Vc=[1,37],$Vd=[1,40],$Ve=[30,43],$Vf=[1,69],$Vg=[1,70],$Vh=[1,71],$Vi=[1,68],$Vj=[1,59],$Vk=[17,19,30,47,72,73,74],$Vl=[1,75],$Vm=[1,76],$Vn=[17,19,30,43,47,57,59,60,72,73,74],$Vo=[1,77],$Vp=[1,78],$Vq=[1,79],$Vr=[1,80],$Vs=[17,19,30,43,47,57,59,60,61,63,64,65,72,73,74],$Vt=[1,81],$Vu=[1,82],$Vv=[17,19,30,43,47,57,59,60,61,63,64,65,67,68,72,73,74],$Vw=[1,83],$Vx=[1,84],$Vy=[17,19,30,43,47,57,59,60,61,63,64,65,67,68,69,71,72,73,74],$Vz=[7,8,9,10,15,16,17,22,24,27,30,42,47,72,73,74],$VA=[1,102],$VB=[19,43,57],$VC=[7,8,9,10,19],$VD=[17,30,47,72,73,74],$VE=[7,8,9,10,13,15,16,17,22,24,27,30,42,47,72,73,74];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"MAININSTRUCTIONS":4,"EOF":5,"TYPE":6,"intType":7,"floatType":8,"boolType":9,"stringType":10,"HYPERCONDITIONALS":11,"CONDITIONALS":12,"{":13,"INSTRUCTIONS":14,"}":15,"IF":16,"(":17,"CONDITIONALHYPEREXPRESSION":18,")":19,"ELSE":20,"WHILECOMMAND":21,"WHILE":22,"DOCOMMAND":23,"DO":24,"LOOPS":25,"HYPEREXPRESSION":26,"FOR":27,"FORASSIGNMENT":28,"PARAMETER":29,"id":30,"PARAMETERS":31,"FUNCTYPE":32,"FUNCDEFINITION":33,"FUNC":34,"VOIDFUNCDEFINITION":35,"voidType":36,"FUNCHEADER":37,"VOIDFUNCHEADER":38,"FUNCTION":39,"FUNCTIONINSTRUCTIONS":40,"FUNCRETURN":41,"RETURN":42,";":43,"ARGUMENTS":44,"ARGUMENT":45,"FUNCCALLHEADER":46,"CallType":47,"FUNCCALLS":48,"CALLTYPE":49,"FACTFUNCCALLS":50,"MAININSTRUCTION":51,"DECLARATION":52,"INSTRUCTION":53,"SUPRAEXPRESSION":54,"ASSIGNMENTS":55,"ASSIGNMENT":56,"=":57,"SUPEREXPRESSION":58,"&&":59,"||":60,"<":61,"EXPRESSION":62,">":63,"!=":64,"==":65,"TERMS":66,"+":67,"-":68,"*":69,"FACTOR":70,"/":71,"NUMBER":72,"FLOAT":73,"text":74,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"intType",8:"floatType",9:"boolType",10:"stringType",13:"{",15:"}",16:"IF",17:"(",19:")",20:"ELSE",22:"WHILE",24:"DO",27:"FOR",30:"id",34:"FUNC",36:"voidType",42:"RETURN",43:";",47:"CallType",49:"CALLTYPE",57:"=",59:"&&",60:"||",61:"<",63:">",64:"!=",65:"==",67:"+",68:"-",69:"*",71:"/",72:"NUMBER",73:"FLOAT",74:"text"},
productions_: [0,[3,2],[6,1],[6,1],[6,1],[6,1],[11,1],[11,4],[12,7],[12,8],[21,1],[23,1],[25,7],[25,8],[25,8],[29,2],[31,2],[31,1],[32,1],[32,1],[32,1],[32,1],[33,3],[35,3],[37,4],[38,4],[39,4],[39,4],[41,3],[44,2],[44,1],[45,1],[46,3],[48,3],[48,4],[50,3],[40,2],[40,1],[51,2],[51,1],[51,2],[4,2],[4,1],[14,2],[14,1],[53,2],[53,2],[53,1],[53,1],[52,2],[55,2],[55,1],[56,1],[56,3],[28,3],[54,3],[54,1],[26,1],[26,3],[26,3],[18,1],[58,3],[58,3],[58,3],[58,3],[58,1],[62,1],[62,3],[62,3],[66,3],[66,3],[66,1],[70,1],[70,1],[70,1],[70,1],[70,1],[70,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 
    // aqui deberia regresar la tabla de memoria de las funciones, etc
    console.log("quadruples:",quadruples);
    console.log("operators:",operatorStack);
    console.log("operands:",operandStack);
    console.log("jumps:",jumpStack);
    console.log("functions:",functions);
    console.log("current function:",currentFunction)
    
break;
case 2:

      currentType = "int";

break;
case 3:

    currentType = "float";

break;
case 4:

    currentType = "boolean";

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
case 22:

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

break;
case 23:

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
case 24: case 25:

    functions[currentFunction].quadruplesStart = quadruples.length;
    if(functions[currentFunction].name === "main")
    {
        quadruples[0].address = quadruples.length;
    }

break;
case 26: case 27:

    finishFunction(functions[currentFunction],quadruples)
    currentFunction = 0;
    nextAvailable = functions[currentFunction].variables.filter(variable => variable.varType == "temporal").length + 1

break;
case 28:

            // aqui podria asignarse el valor obtenido a la variable global con el mismo nombre de la funcion
            createReturnVar(functions[currentFunction],typeStack,operandStack,quadruples,nextAvail);

break;
case 31:

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
case 32:

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
    console.log("Logro la llamada");

break;
case 33:

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
case 35:

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
    console.log("va a checar el tipo");
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
    console.log(quadruples);
    console.log("checo el tipo");
    

break;
case 49:

        currentType = null;


break;
case 52:

        createVariable($$[$0],currentType,functions[currentFunction]);
    
break;
case 53:

        createVariable($$[$0-2],currentType,functions[currentFunction]);
        operatorStack.push('=');
        if([...operatorStack].pop() == "=")
        {
        var rightOperand = operandStack.pop();
        var rightType = typeStack.pop();
        var leftOperand = $$[$0-2];
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
case 54:

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
case 55:

                operatorStack.push('=');
                if([...operatorStack].pop() == "="){
                    createAssignmentQuad(quadruples,operandStack,operatorStack,typeStack);
            }
        
break;
case 60:

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
case 61:

                operatorStack.push('<');
                if([...operatorStack].pop() == "<"){
                createOperationQuad(quadruples,operandStack, operatorStack,typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 62:

            operatorStack.push('>');
            if([...operatorStack].pop() == ">"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 63:

            operatorStack.push('!=');
            if([...operatorStack].pop() == "!="){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 64:

            operatorStack.push('==');
            if([...operatorStack].pop() == "=="){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 67:

            operatorStack.push('+');
            if([...operatorStack].pop() == "+"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack,nextAvail, functions[currentFunction]);
            }
            
        
break;
case 68:

            operatorStack.push('-');
            if([...operatorStack].pop() == "-"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 69:

            operatorStack.push('*');
            if([...operatorStack].pop() == "*"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 70:

            operatorStack.push('/');
            if([...operatorStack].pop() == "/"){
                createOperationQuad(quadruples, operandStack, operatorStack, typeStack, nextAvail, functions[currentFunction]);
            }
        
break;
case 72:

            // add check constants
            operandStack.push($$[$0]);
            typeStack.push("int");
            createConstantVariable($$[$0],"int",functions[0])
        
break;
case 73:

            operandStack.push($$[$0]);
            typeStack.push("float");
            createConstantVariable($$[$0],"float",functions[0])
        
break;
case 74:

            // check var exists
            // if var doesnt exist throw error
            let variable = getVariable($$[$0],functions,currentFunction);
            operandStack.push($$[$0]);
            typeStack.push(variable.type);
        
break;
case 76:

            operandStack.push($$[$0]);
            typeStack.push("string");
            createConstantVariable($$[$0],"string",functions[0])
        
break;
}
},
table: [{3:1,4:2,6:7,7:$V0,8:$V1,9:$V2,10:$V3,33:16,34:$V4,35:17,37:8,38:9,39:5,46:10,47:$V5,48:6,49:$V6,51:3,52:4},{1:[3]},{5:[1,20],6:7,7:$V0,8:$V1,9:$V2,10:$V3,33:16,34:$V4,35:17,37:8,38:9,39:5,46:10,47:$V5,48:6,49:$V6,51:21,52:4},o($V7,[2,42]),{43:[1,22]},o($V7,[2,39]),{43:[1,23]},{30:$V8,55:24,56:25},{13:[1,27]},{13:[1,28]},{17:$V9,26:31,30:$Va,44:29,45:30,46:42,47:$V5,50:39,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{30:[1,43]},{30:[2,2]},{30:[2,3]},{30:[2,4]},{30:[2,5]},{17:[1,44]},{17:[1,45]},{30:[1,46]},{7:[1,49],8:[1,50],9:[1,51],10:[1,52],32:47,36:[1,48]},{1:[2,1]},o($V7,[2,41]),o($V7,[2,38]),o($V7,[2,40]),{30:$V8,43:[2,49],56:53},o($Ve,[2,51]),o($Ve,[2,52],{57:[1,54]}),{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,14:56,16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,40:55,41:57,42:$Vj,46:42,47:$V5,50:39,52:60,53:58,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,14:72,16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,46:42,47:$V5,50:39,52:60,53:58,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{17:$V9,19:[1,73],26:31,30:$Va,45:74,46:42,47:$V5,50:39,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},o($Vk,[2,30]),o($Vk,[2,31],{59:$Vl,60:$Vm}),o($Vn,[2,57],{61:$Vo,63:$Vp,64:$Vq,65:$Vr}),o($Vs,[2,65],{67:$Vt,68:$Vu}),o($Vv,[2,66],{69:$Vw,71:$Vx}),o($Vy,[2,71]),o($Vy,[2,72]),o($Vy,[2,73]),o($Vy,[2,74]),o($Vy,[2,75]),o($Vy,[2,76]),{17:$V9,26:64,30:$Va,46:42,47:$V5,50:39,54:85,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{17:$V9,26:31,30:$Va,44:86,45:30,46:42,47:$V5,50:39,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{17:[1,87]},{6:90,7:$V0,8:$V1,9:$V2,10:$V3,29:89,31:88},{6:90,7:$V0,8:$V1,9:$V2,10:$V3,29:89,31:91},{17:[1,92]},{30:[1,93]},{30:[1,94]},{30:[2,18]},{30:[2,19]},{30:[2,20]},{30:[2,21]},o($Ve,[2,50]),{17:$V9,26:95,30:$Va,46:42,47:$V5,50:39,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{15:[1,96]},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,41:97,42:$Vj,46:42,47:$V5,50:39,52:60,53:98,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{15:[2,37]},o($Vz,[2,44]),{17:$V9,26:99,30:$Va,46:42,47:$V5,50:39,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{43:[1,100]},{43:[1,101],57:$VA},o($Vz,[2,47]),o($Vz,[2,48]),o($VB,[2,56],{59:$Vl,60:$Vm}),o($Vz,[2,6],{13:[1,103]}),{17:[1,104]},{13:[1,105]},{17:[1,106]},{17:[1,107]},{17:[2,10]},{13:[2,11]},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,15:[1,108],16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,46:42,47:$V5,50:39,52:60,53:98,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{43:[2,33]},o($Vk,[2,29]),{17:$V9,30:$Va,46:42,47:$V5,50:39,58:109,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{17:$V9,30:$Va,46:42,47:$V5,50:39,58:110,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{17:$V9,30:$Va,46:42,47:$V5,50:39,62:111,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{17:$V9,30:$Va,46:42,47:$V5,50:39,62:112,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{17:$V9,30:$Va,46:42,47:$V5,50:39,62:113,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{17:$V9,30:$Va,46:42,47:$V5,50:39,62:114,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{17:$V9,30:$Va,46:42,47:$V5,50:39,66:115,70:35,72:$Vb,73:$Vc,74:$Vd},{17:$V9,30:$Va,46:42,47:$V5,50:39,66:116,70:35,72:$Vb,73:$Vc,74:$Vd},{17:$V9,30:$Va,46:42,47:$V5,50:39,70:117,72:$Vb,73:$Vc,74:$Vd},{17:$V9,30:$Va,46:42,47:$V5,50:39,70:118,72:$Vb,73:$Vc,74:$Vd},{19:[1,119],57:$VA},{17:$V9,19:[1,120],26:31,30:$Va,45:74,46:42,47:$V5,50:39,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{19:[1,121]},{6:90,7:$V0,8:$V1,9:$V2,10:$V3,19:[1,122],29:123},o($VC,[2,17]),{30:[1,124]},{6:90,7:$V0,8:$V1,9:$V2,10:$V3,19:[1,125],29:123},o($VD,[2,32]),{17:[2,22]},{17:[2,23]},o($Ve,[2,53],{59:$Vl,60:$Vm}),o($V7,[2,26]),{15:[2,36]},o($Vz,[2,43]),{43:[1,126],59:$Vl,60:$Vm},o($Vz,[2,45]),o($Vz,[2,46]),{17:$V9,26:127,30:$Va,46:42,47:$V5,50:39,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,14:128,16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,46:42,47:$V5,50:39,52:60,53:58,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{17:$V9,18:129,26:130,30:$Va,46:42,47:$V5,50:39,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,14:131,16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,46:42,47:$V5,50:39,52:60,53:58,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{28:132,30:[1,133]},{17:$V9,18:134,26:130,30:$Va,46:42,47:$V5,50:39,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},o($V7,[2,27]),o($Vn,[2,58],{61:$Vo,63:$Vp,64:$Vq,65:$Vr}),o($Vn,[2,59],{61:$Vo,63:$Vp,64:$Vq,65:$Vr}),o($Vs,[2,61],{67:$Vt,68:$Vu}),o($Vs,[2,62],{67:$Vt,68:$Vu}),o($Vs,[2,63],{67:$Vt,68:$Vu}),o($Vs,[2,64],{67:$Vt,68:$Vu}),o($Vv,[2,67],{69:$Vw,71:$Vx}),o($Vv,[2,68],{69:$Vw,71:$Vx}),o($Vy,[2,69]),o($Vy,[2,70]),o($Vy,[2,77]),o($Vy,[2,35]),{43:[2,34]},{13:[2,24]},o($VC,[2,16]),o($VC,[2,15]),{13:[2,25]},{15:[2,28]},o($VB,[2,55],{59:$Vl,60:$Vm}),{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,15:[1,135],16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,46:42,47:$V5,50:39,52:60,53:98,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{19:[1,136]},{19:[2,60],59:$Vl,60:$Vm},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,15:[1,137],16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,46:42,47:$V5,50:39,52:60,53:98,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{17:$V9,18:138,26:130,30:$Va,46:42,47:$V5,50:39,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{57:[1,139]},{19:[1,140]},o($Vz,[2,7]),{13:[1,141]},{22:[1,142]},{19:[1,143]},{17:$V9,26:144,30:$Va,46:42,47:$V5,50:39,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{13:[1,145]},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,14:146,16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,46:42,47:$V5,50:39,52:60,53:58,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{17:[1,147]},{13:[1,148]},o($VD,[2,54],{59:$Vl,60:$Vm}),{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,14:149,16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,46:42,47:$V5,50:39,52:60,53:58,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,15:[1,150],16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,46:42,47:$V5,50:39,52:60,53:98,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{17:$V9,26:151,30:$Va,46:42,47:$V5,50:39,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,14:152,16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,46:42,47:$V5,50:39,52:60,53:58,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,15:[1,153],16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,46:42,47:$V5,50:39,52:60,53:98,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},o($Vz,[2,12]),{19:[1,154],59:$Vl,60:$Vm},{6:7,7:$V0,8:$V1,9:$V2,10:$V3,11:62,12:65,15:[1,155],16:$Vf,17:$V9,21:66,22:$Vg,23:67,24:$Vh,25:63,26:64,27:$Vi,30:$Va,46:42,47:$V5,50:39,52:60,53:98,54:61,58:32,62:33,66:34,70:35,72:$Vb,73:$Vc,74:$Vd},o($VE,[2,8],{20:[1,156]}),o($Vz,[2,13]),o($Vz,[2,14]),o($VE,[2,9])],
defaultActions: {12:[2,2],13:[2,3],14:[2,4],15:[2,5],20:[2,1],49:[2,18],50:[2,19],51:[2,20],52:[2,21],57:[2,37],70:[2,10],71:[2,11],73:[2,33],93:[2,22],94:[2,23],97:[2,36],121:[2,34],122:[2,24],125:[2,25],126:[2,28]},
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
case 1:return 73
break;
case 2:return 72
break;
case 3:return 69
break;
case 4:return 71
break;
case 5:return 68
break;
case 6:return 67
break;
case 7:return 17
break;
case 8:return 19
break;
case 9:return 13
break;
case 10:return 15
break;
case 11:return 61
break;
case 12:return 63
break;
case 13:return '<='
break;
case 14:return '>='
break;
case 15:return 64
break;
case 16:return 65
break;
case 17:return 57
break;
case 18:return 43
break;
case 19:return 47
break;
case 20:return 9
break;
case 21:return 10
break;
case 22:return 8
break;
case 23:return 7
break;
case 24:return 16
break;
case 25:return 36
break;
case 26:return 20
break;
case 27:return 22
break;
case 28:return 24
break;
case 29:return 27
break;
case 30:return 34
break;
case 31:return 42
break;
case 32:return 74
break;
case 33:return 30
break;
case 34:return 'PI'
break;
case 35:return 'E'
break;
case 36:return 5
break;
case 37:
break;
}
},
rules: [/^(?:\s+)/,/^(?:[0-9]+(\.[0-9]+)\b)/,/^(?:[0-9]+\b)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:<)/,/^(?:>)/,/^(?:<=)/,/^(?:>=)/,/^(?:!=)/,/^(?:==)/,/^(?:=)/,/^(?:;)/,/^(?::)/,/^(?:boolean\b)/,/^(?:string\b)/,/^(?:float\b)/,/^(?:int\b)/,/^(?:if\b)/,/^(?:void\b)/,/^(?:else\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:for\b)/,/^(?:func\b)/,/^(?:return\b)/,/^(?:"[^\"]*")/,/^(?:([a-zA-Z])[a-zA-Z0-9_]*)/,/^(?:PI\b)/,/^(?:E\b)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
return parser;
});