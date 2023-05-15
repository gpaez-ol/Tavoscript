

define(function(require){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,10],$V1=[1,11],$V2=[1,12],$V3=[1,13],$V4=[1,14],$V5=[1,7],$V6=[1,24],$V7=[1,22],$V8=[1,19],$V9=[1,20],$Va=[1,21],$Vb=[1,23],$Vc=[5,7,8,9,10,11,14,18,25,42,43,44,45],$Vd=[1,29],$Ve=[1,33],$Vf=[16,21,26],$Vg=[1,34],$Vh=[1,35],$Vi=[16,21,25,26,29,30],$Vj=[1,36],$Vk=[1,37],$Vl=[1,38],$Vm=[1,39],$Vn=[16,21,25,26,29,30,31,33,34,35],$Vo=[1,40],$Vp=[1,41],$Vq=[16,21,25,26,29,30,31,33,34,35,37,38],$Vr=[1,42],$Vs=[1,43],$Vt=[16,21,25,26,29,30,31,33,34,35,37,38,39,41],$Vu=[21,25];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"INSTRUCTIONS":4,"EOF":5,"TYPE":6,"intType":7,"floatType":8,"boolType":9,"charType":10,"stringType":11,"CONDITIONALS":12,"IF":13,"(":14,"CONDITIONALHYPEREXPRESSION":15,")":16,"{":17,"}":18,"INSTRUCTION":19,"DECLARATION":20,";":21,"SUPRAEXPRESSION":22,"ASSIGNMENTS":23,"ASSIGNMENT":24,"id":25,"=":26,"HYPEREXPRESSION":27,"SUPEREXPRESSION":28,"&&":29,"||":30,"<":31,"EXPRESSION":32,">":33,"!=":34,"==":35,"TERMS":36,"+":37,"-":38,"*":39,"FACTOR":40,"/":41,"NUMBER":42,"E":43,"PI":44,"text":45,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"intType",8:"floatType",9:"boolType",10:"charType",11:"stringType",13:"IF",14:"(",16:")",17:"{",18:"}",21:";",25:"id",26:"=",29:"&&",30:"||",31:"<",33:">",34:"!=",35:"==",37:"+",38:"-",39:"*",41:"/",42:"NUMBER",43:"E",44:"PI",45:"text"},
productions_: [0,[3,2],[6,1],[6,1],[6,1],[6,1],[6,1],[12,7],[4,2],[4,1],[4,1],[19,2],[19,2],[20,2],[23,2],[23,1],[24,1],[24,3],[22,3],[22,1],[27,1],[27,3],[27,3],[15,1],[28,3],[28,3],[28,3],[28,3],[28,1],[32,1],[32,3],[32,3],[36,3],[36,3],[36,1],[40,1],[40,1],[40,1],[40,1],[40,1],[40,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 
    // aqui deberia regresar la tabla de memoria de las funciones, etc
    console.log(quadruples);
    console.log(operatorStack);
    console.log(operandStack);
    console.log(variables);
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
case 7:

                var end = jumpStack.pop();
                var quadruple = quadruples[end];
                console.log(quadruple);
                quadruple.result = quadruples.length;

        

break;
case 13:

        currentType = null;


break;
case 16:

        // TODO: Add logic link variables with functions or with global status
        if(variables.some(variable => variable.name === $$[$0]))
        {
            console.log("Name is already taken",$$[$0]);
            throw new Error($$[$0], "name is already taken");
        }
        variables.push({type:currentType,name:$$[$0]});
    
break;
case 17:

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
case 18:

                operatorStack.push('=');
                if([...operatorStack].pop() == "="){
                    createAssignmentQuad();
            }
        
break;
case 23:

            console.log({... quadruples});
            // check if there is a result  if no resutl its an error
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
case 24:

                operatorStack.push('<');
                if([...operatorStack].pop() == "<"){
                createOperationQuad();
            }
        
break;
case 25:

            operatorStack.push('>');
            if([...operatorStack].pop() == ">"){
                createOperationQuad();
            }
        
break;
case 26:

            operatorStack.push('!=');
            if([...operatorStack].pop() == "!="){
                createOperationQuad();
            }
        
break;
case 27:

            operatorStack.push('==');
            if([...operatorStack].pop() == "=="){
                createOperationQuad();
            }
        
break;
case 30:

            operatorStack.push('+');
            if([...operatorStack].pop() == "+"){
                createOperationQuad();
            }
            
        
break;
case 31:

            operatorStack.push('-');
            if([...operatorStack].pop() == "-"){
                createOperationQuad();
            }
        
break;
case 32:

            operatorStack.push('*');
            if([...operatorStack].pop() == "*"){
                createOperationQuad();
            }
        
break;
case 33:

            operatorStack.push('/');
            if([...operatorStack].pop() == "/"){
                createOperationQuad();
            }
        
break;
case 35:

            // check if number is int or float
            operandStack.push($$[$0]);
            typeStack.push("int");
        
break;
case 38:

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
}
},
table: [{3:1,4:2,6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:4,13:$V5,14:$V6,19:3,20:5,22:6,25:$V7,27:9,28:15,32:16,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},{1:[3]},{5:[1,25],6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,14:$V6,19:26,20:5,22:6,25:$V7,27:9,28:15,32:16,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},o($Vc,[2,9]),o($Vc,[2,10]),{21:[1,27]},{21:[1,28],26:$Vd},{14:[1,30]},{23:31,24:32,25:$Ve},o($Vf,[2,19],{29:$Vg,30:$Vh}),{25:[2,2]},{25:[2,3]},{25:[2,4]},{25:[2,5]},{25:[2,6]},o($Vi,[2,20],{31:$Vj,33:$Vk,34:$Vl,35:$Vm}),o($Vn,[2,28],{37:$Vo,38:$Vp}),o($Vq,[2,29],{39:$Vr,41:$Vs}),o($Vt,[2,34]),o($Vt,[2,35]),o($Vt,[2,36]),o($Vt,[2,37]),o($Vt,[2,38]),o($Vt,[2,39]),{14:$V6,22:44,25:$V7,27:9,28:15,32:16,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},{1:[2,1]},o($Vc,[2,8]),o($Vc,[2,11]),o($Vc,[2,12]),{14:$V6,25:$V7,27:45,28:15,32:16,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},{14:$V6,15:46,25:$V7,27:47,28:15,32:16,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},{21:[2,13],24:48,25:$Ve},o($Vu,[2,15]),o($Vu,[2,16],{26:[1,49]}),{14:$V6,25:$V7,28:50,32:16,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},{14:$V6,25:$V7,28:51,32:16,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},{14:$V6,25:$V7,32:52,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},{14:$V6,25:$V7,32:53,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},{14:$V6,25:$V7,32:54,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},{14:$V6,25:$V7,32:55,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},{14:$V6,25:$V7,36:56,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},{14:$V6,25:$V7,36:57,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},{14:$V6,25:$V7,40:58,42:$V8,43:$V9,44:$Va,45:$Vb},{14:$V6,25:$V7,40:59,42:$V8,43:$V9,44:$Va,45:$Vb},{16:[1,60],26:$Vd},o($Vf,[2,18],{29:$Vg,30:$Vh}),{16:[1,61]},{16:[2,23],29:$Vg,30:$Vh},o($Vu,[2,14]),{14:$V6,25:$V7,27:62,28:15,32:16,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},o($Vi,[2,21],{31:$Vj,33:$Vk,34:$Vl,35:$Vm}),o($Vi,[2,22],{31:$Vj,33:$Vk,34:$Vl,35:$Vm}),o($Vn,[2,24],{37:$Vo,38:$Vp}),o($Vn,[2,25],{37:$Vo,38:$Vp}),o($Vn,[2,26],{37:$Vo,38:$Vp}),o($Vn,[2,27],{37:$Vo,38:$Vp}),o($Vq,[2,30],{39:$Vr,41:$Vs}),o($Vq,[2,31],{39:$Vr,41:$Vs}),o($Vt,[2,32]),o($Vt,[2,33]),o($Vt,[2,40]),{17:[1,63]},o($Vu,[2,17],{29:$Vg,30:$Vh}),{4:64,6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:4,13:$V5,14:$V6,19:3,20:5,22:6,25:$V7,27:9,28:15,32:16,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},{6:8,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,14:$V6,18:[1,65],19:26,20:5,22:6,25:$V7,27:9,28:15,32:16,36:17,40:18,42:$V8,43:$V9,44:$Va,45:$Vb},o($Vc,[2,7])],
defaultActions: {10:[2,2],11:[2,3],12:[2,4],13:[2,5],14:[2,6],25:[2,1]},
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
case 1:return 42
break;
case 2:return 39
break;
case 3:return 41
break;
case 4:return 38
break;
case 5:return 37
break;
case 6:return 14
break;
case 7:return 16
break;
case 8:return 17
break;
case 9:return 18
break;
case 10:return 31
break;
case 11:return 33
break;
case 12:return '<='
break;
case 13:return '>='
break;
case 14:return 34
break;
case 15:return 35
break;
case 16:return 26
break;
case 17:return 21
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
case 23:return 13
break;
case 24:return 'WHILE'
break;
case 25:return 'DO'
break;
case 26:return 45
break;
case 27:return 'character'
break;
case 28:return 25
break;
case 29:return 44
break;
case 30:return 43
break;
case 31:return 5
break;
case 32:
break;
}
},
rules: [/^(?:\s+)/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:<)/,/^(?:>)/,/^(?:<=)/,/^(?:>=)/,/^(?:!=)/,/^(?:==)/,/^(?:=)/,/^(?:;)/,/^(?:char\b)/,/^(?:boolean\b)/,/^(?:string\b)/,/^(?:float\b)/,/^(?:int\b)/,/^(?:if\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:"[^\"]*")/,/^(?:'[^\']?')/,/^(?:([a-zA-Z])[a-zA-Z0-9_]*)/,/^(?:PI\b)/,/^(?:E\b)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
return parser;
});