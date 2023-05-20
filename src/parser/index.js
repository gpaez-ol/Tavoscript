

define(function(require){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,14],$V1=[1,15],$V2=[1,16],$V3=[1,17],$V4=[1,18],$V5=[1,20],$V6=[1,31],$V7=[1,21],$V8=[1,22],$V9=[1,13],$Va=[1,29],$Vb=[1,26],$Vc=[1,27],$Vd=[1,28],$Ve=[1,30],$Vf=[5,7,8,9,10,11,15,16,17,22,24,27,35,51,52,53,54],$Vg=[1,36],$Vh=[1,39],$Vi=[19,31,36],$Vj=[1,40],$Vk=[1,41],$Vl=[17,19,31,35,36,38,39,51,52,53,54],$Vm=[1,46],$Vn=[1,47],$Vo=[1,48],$Vp=[1,49],$Vq=[17,19,31,35,36,38,39,40,42,43,44,51,52,53,54],$Vr=[1,51],$Vs=[1,52],$Vt=[17,19,31,35,36,38,39,40,42,43,44,46,47,51,52,53,54],$Vu=[1,53],$Vv=[1,54],$Vw=[17,19,31,35,36,38,39,40,42,43,44,46,47,48,50,51,52,53,54],$Vx=[31,35],$Vy=[5,7,8,9,10,11,14,15,16,17,22,24,27,35,51,52,53,54];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"INSTRUCTIONS":4,"EOF":5,"TYPE":6,"intType":7,"floatType":8,"boolType":9,"charType":10,"stringType":11,"HYPERCONDITIONALS":12,"CONDITIONALS":13,"{":14,"}":15,"IF":16,"(":17,"CONDITIONALHYPEREXPRESSION":18,")":19,"ELSE":20,"WHILECOMMAND":21,"WHILE":22,"DOCOMMAND":23,"DO":24,"LOOPS":25,"HYPEREXPRESSION":26,"FOR":27,"FORASSIGNMENT":28,"INSTRUCTION":29,"DECLARATION":30,";":31,"SUPRAEXPRESSION":32,"ASSIGNMENTS":33,"ASSIGNMENT":34,"id":35,"=":36,"SUPEREXPRESSION":37,"&&":38,"||":39,"<":40,"EXPRESSION":41,">":42,"!=":43,"==":44,"TERMS":45,"+":46,"-":47,"*":48,"FACTOR":49,"/":50,"NUMBER":51,"E":52,"PI":53,"text":54,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"intType",8:"floatType",9:"boolType",10:"charType",11:"stringType",14:"{",15:"}",16:"IF",17:"(",19:")",20:"ELSE",22:"WHILE",24:"DO",27:"FOR",31:";",35:"id",36:"=",38:"&&",39:"||",40:"<",42:">",43:"!=",44:"==",46:"+",47:"-",48:"*",50:"/",51:"NUMBER",52:"E",53:"PI",54:"text"},
productions_: [0,[3,2],[6,1],[6,1],[6,1],[6,1],[6,1],[12,1],[12,4],[13,7],[13,8],[21,1],[23,1],[25,7],[25,8],[25,8],[4,2],[4,1],[29,2],[29,2],[29,1],[29,1],[30,2],[33,2],[33,1],[34,1],[34,3],[28,3],[32,3],[32,1],[26,1],[26,3],[26,3],[18,1],[37,3],[37,3],[37,3],[37,3],[37,1],[41,1],[41,3],[41,3],[45,3],[45,3],[45,1],[49,1],[49,1],[49,1],[49,1],[49,1],[49,3]],
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
    console.log("variables:",variables);
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

    currentType = "char";

break;
case 6:

    currentType = "string";

break;
case 8:

            var end = jumpStack.pop();
            var quadruple = quadruples[end];
            console.log(quadruple);
            quadruple.result = quadruples.length;


break;
case 9:

                var end = jumpStack.pop();
                var quadruple = quadruples[end];
                quadruple.result = quadruples.length;
      

break;
case 10:

                var end = jumpStack.pop();
                var quadruple = quadruples[end];
                console.log(quadruple);
                quadruple.result = quadruples.length+1;
                quadruples.push({operator:"GOTO",leftOperand:resultOperand,rightOperand:null,result:null});
                jumpStack.push(quadruples.length-1);
      

break;
case 11: case 12:
jumpStack.push(quadruples.length);
break;
case 13:

                         var end = jumpStack.pop();
                         var whileStart =  jumpStack.pop();
                         var quadruple = quadruples[end];
                         quadruples.push({operator:"GOTO",leftOperand:resultOperand,rightOperand:null,result:whileStart});
                         quadruple.result = quadruples.length;


break;
case 14:

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

break;
case 15:

        var pendingFalseQuadruple = jumpStack.pop();
        var forStart = jumpStack.pop();
        var quadruple = quadruples[pendingFalseQuadruple];
        quadruples.push({operator:"GOTO",leftOperand:resultOperand,rightOperand:null,result:forStart});
        quadruple.result = quadruples.length;


break;
case 22:

        currentType = null;


break;
case 25:

        // TODO: Add logic link variables with functions or with global status
        if(variables.some(variable => variable.name === $$[$0]))
        {
            console.log("Name is already taken",$$[$0]);
            throw new Error($$[$0], "name is already taken");
        }
        variables.push({type:currentType,name:$$[$0]});
    
break;
case 26:

        // TODO: Add logic to which type of value it is
        variables.push({type:currentType,name:$$[$0-2]});
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
        quadruples.push({operator:operator,leftOperand:leftOperand,rightOperand:null,result:rightOperand});
        }
    
break;
case 27:

         variables.push({type:"int",name:$$[$0-2]});
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
            quadruples.push({operator:operator,leftOperand:leftOperand,rightOperand:null,result:rightOperand});
            // this should be the reference to goto at the end of the for
            jumpStack.push(quadruples.length);
        }
    
break;
case 28:

                operatorStack.push('=');
                if([...operatorStack].pop() == "="){
                    createAssignmentQuad();
            }
        
break;
case 33:

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
        
break;
case 34:

                operatorStack.push('<');
                if([...operatorStack].pop() == "<"){
                createOperationQuad();
            }
        
break;
case 35:

            operatorStack.push('>');
            if([...operatorStack].pop() == ">"){
                createOperationQuad();
            }
        
break;
case 36:

            operatorStack.push('!=');
            if([...operatorStack].pop() == "!="){
                createOperationQuad();
            }
        
break;
case 37:

            operatorStack.push('==');
            if([...operatorStack].pop() == "=="){
                createOperationQuad();
            }
        
break;
case 40:

            operatorStack.push('+');
            if([...operatorStack].pop() == "+"){
                createOperationQuad();
            }
            
        
break;
case 41:

            operatorStack.push('-');
            if([...operatorStack].pop() == "-"){
                createOperationQuad();
            }
        
break;
case 42:

            operatorStack.push('*');
            if([...operatorStack].pop() == "*"){
                createOperationQuad();
            }
        
break;
case 43:

            operatorStack.push('/');
            if([...operatorStack].pop() == "/"){
                createOperationQuad();
            }
        
break;
case 45:

            // check if number is int or float
            operandStack.push($$[$0]);
            typeStack.push("int");
        
break;
case 48:

            // check var exists
            // if var doesnt exist throw error
            let variable = variables.find(variable => variable.name === $$[$0]);
            if (variable)
            {
            operandStack.push($$[$0]);
            typeStack.push(variable.type);

            }else {
                console.log("Variable does not exist at this point in time",$$[$0]);
                throw new Error("Variable ",$$[$0], "does not exist at this point");
            }
        
break;
case 49:

            operandStack.push($$[$0]);
            typeStack.push("string");
        
break;
}
},
table: [{3:1,4:2,6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:6,13:10,16:$V5,17:$V6,21:11,22:$V7,23:12,24:$V8,25:7,26:9,27:$V9,29:3,30:4,32:5,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{1:[3]},{5:[1,32],6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:6,13:10,16:$V5,17:$V6,21:11,22:$V7,23:12,24:$V8,25:7,26:9,27:$V9,29:33,30:4,32:5,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},o($Vf,[2,17]),{31:[1,34]},{31:[1,35],36:$Vg},o($Vf,[2,20]),o($Vf,[2,21]),{33:37,34:38,35:$Vh},o($Vi,[2,29],{38:$Vj,39:$Vk}),o($Vf,[2,7],{14:[1,42]}),{17:[1,43]},{14:[1,44]},{17:[1,45]},{35:[2,2]},{35:[2,3]},{35:[2,4]},{35:[2,5]},{35:[2,6]},o($Vl,[2,30],{40:$Vm,42:$Vn,43:$Vo,44:$Vp}),{17:[1,50]},{17:[2,11]},{14:[2,12]},o($Vq,[2,38],{46:$Vr,47:$Vs}),o($Vt,[2,39],{48:$Vu,50:$Vv}),o($Vw,[2,44]),o($Vw,[2,45]),o($Vw,[2,46]),o($Vw,[2,47]),o($Vw,[2,48]),o($Vw,[2,49]),{17:$V6,26:9,32:55,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{1:[2,1]},o($Vf,[2,16]),o($Vf,[2,18]),o($Vf,[2,19]),{17:$V6,26:56,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{31:[2,22],34:57,35:$Vh},o($Vx,[2,24]),o($Vx,[2,25],{36:[1,58]}),{17:$V6,35:$Va,37:59,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{17:$V6,35:$Va,37:60,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{4:61,6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:6,13:10,16:$V5,17:$V6,21:11,22:$V7,23:12,24:$V8,25:7,26:9,27:$V9,29:3,30:4,32:5,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{17:$V6,18:62,26:63,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{4:64,6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:6,13:10,16:$V5,17:$V6,21:11,22:$V7,23:12,24:$V8,25:7,26:9,27:$V9,29:3,30:4,32:5,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{28:65,35:[1,66]},{17:$V6,35:$Va,41:67,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{17:$V6,35:$Va,41:68,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{17:$V6,35:$Va,41:69,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{17:$V6,35:$Va,41:70,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{17:$V6,18:71,26:63,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{17:$V6,35:$Va,45:72,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{17:$V6,35:$Va,45:73,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{17:$V6,35:$Va,49:74,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{17:$V6,35:$Va,49:75,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{19:[1,76],36:$Vg},o($Vi,[2,28],{38:$Vj,39:$Vk}),o($Vx,[2,23]),{17:$V6,26:77,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},o($Vl,[2,31],{40:$Vm,42:$Vn,43:$Vo,44:$Vp}),o($Vl,[2,32],{40:$Vm,42:$Vn,43:$Vo,44:$Vp}),{6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:6,13:10,15:[1,78],16:$V5,17:$V6,21:11,22:$V7,23:12,24:$V8,25:7,26:9,27:$V9,29:33,30:4,32:5,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{19:[1,79]},{19:[2,33],38:$Vj,39:$Vk},{6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:6,13:10,15:[1,80],16:$V5,17:$V6,21:11,22:$V7,23:12,24:$V8,25:7,26:9,27:$V9,29:33,30:4,32:5,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{17:$V6,18:81,26:63,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{36:[1,82]},o($Vq,[2,34],{46:$Vr,47:$Vs}),o($Vq,[2,35],{46:$Vr,47:$Vs}),o($Vq,[2,36],{46:$Vr,47:$Vs}),o($Vq,[2,37],{46:$Vr,47:$Vs}),{19:[1,83]},o($Vt,[2,40],{48:$Vu,50:$Vv}),o($Vt,[2,41],{48:$Vu,50:$Vv}),o($Vw,[2,42]),o($Vw,[2,43]),o($Vw,[2,50]),o($Vx,[2,26],{38:$Vj,39:$Vk}),o($Vf,[2,8]),{14:[1,84]},{22:[1,85]},{19:[1,86]},{17:$V6,26:87,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{14:[1,88]},{4:89,6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:6,13:10,16:$V5,17:$V6,21:11,22:$V7,23:12,24:$V8,25:7,26:9,27:$V9,29:3,30:4,32:5,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{17:[1,90]},{14:[1,91]},o([17,35,51,52,53,54],[2,27],{38:$Vj,39:$Vk}),{4:92,6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:6,13:10,16:$V5,17:$V6,21:11,22:$V7,23:12,24:$V8,25:7,26:9,27:$V9,29:3,30:4,32:5,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:6,13:10,15:[1,93],16:$V5,17:$V6,21:11,22:$V7,23:12,24:$V8,25:7,26:9,27:$V9,29:33,30:4,32:5,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{17:$V6,26:94,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{4:95,6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:6,13:10,16:$V5,17:$V6,21:11,22:$V7,23:12,24:$V8,25:7,26:9,27:$V9,29:3,30:4,32:5,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},{6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:6,13:10,15:[1,96],16:$V5,17:$V6,21:11,22:$V7,23:12,24:$V8,25:7,26:9,27:$V9,29:33,30:4,32:5,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},o($Vf,[2,13]),{19:[1,97],38:$Vj,39:$Vk},{6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:6,13:10,15:[1,98],16:$V5,17:$V6,21:11,22:$V7,23:12,24:$V8,25:7,26:9,27:$V9,29:33,30:4,32:5,35:$Va,37:19,41:23,45:24,49:25,51:$Vb,52:$Vc,53:$Vd,54:$Ve},o($Vy,[2,9],{20:[1,99]}),o($Vf,[2,14]),o($Vf,[2,15]),o($Vy,[2,10])],
defaultActions: {14:[2,2],15:[2,3],16:[2,4],17:[2,5],18:[2,6],21:[2,11],22:[2,12],32:[2,1]},
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

    var {semanticTable} = require("./semanticTable");
    console.log(semanticTable);
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
        console.log("va a crear quad");
        console.log("Tabla:",semanticTable)
        var [rightOperand,rightType,leftOperand,leftType,operator] = getOperands();
        console.log("antes de sacarlo");
        var resultType =  semanticTable[leftType][operator][rightType];
        console.log(resultType);
        if(resultType === undefined)
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
case 1:return 51
break;
case 2:return 48
break;
case 3:return 50
break;
case 4:return 47
break;
case 5:return 46
break;
case 6:return 17
break;
case 7:return 19
break;
case 8:return 14
break;
case 9:return 15
break;
case 10:return 40
break;
case 11:return 42
break;
case 12:return '<='
break;
case 13:return '>='
break;
case 14:return 43
break;
case 15:return 44
break;
case 16:return 36
break;
case 17:return 31
break;
case 18:return 10
break;
case 19:return 9
break;
case 20:return 11
break;
case 21:return 8
break;
case 22:return 7
break;
case 23:return 16
break;
case 24:return 20
break;
case 25:return 22
break;
case 26:return 24
break;
case 27:return 27
break;
case 28:return 54
break;
case 29:return 'character'
break;
case 30:return 35
break;
case 31:return 53
break;
case 32:return 52
break;
case 33:return 5
break;
case 34:
break;
}
},
rules: [/^(?:\s+)/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:<)/,/^(?:>)/,/^(?:<=)/,/^(?:>=)/,/^(?:!=)/,/^(?:==)/,/^(?:=)/,/^(?:;)/,/^(?:char\b)/,/^(?:boolean\b)/,/^(?:string\b)/,/^(?:float\b)/,/^(?:int\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:for\b)/,/^(?:"[^\"]*")/,/^(?:'[^\']?')/,/^(?:([a-zA-Z])[a-zA-Z0-9_]*)/,/^(?:PI\b)/,/^(?:E\b)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
return parser;
});