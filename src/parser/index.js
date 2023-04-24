

define(function(require){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,8],$V1=[1,9],$V2=[1,10],$V3=[1,11],$V4=[1,12],$V5=[1,7],$V6=[5,7,8,9,10,11,16],$V7=[1,25],$V8=[1,20],$V9=[1,21],$Va=[1,22],$Vb=[1,23],$Vc=[1,24],$Vd=[1,26],$Ve=[1,27],$Vf=[1,28],$Vg=[1,29],$Vh=[1,30],$Vi=[14,19,20,21,22,23,25],$Vj=[14,19,20,25],$Vk=[14,19,20,21,22,25];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"INSTRUCTIONS":4,"EOF":5,"TYPE":6,"intType":7,"floatType":8,"boolType":9,"charType":10,"stringType":11,"INSTRUCTION":12,"DECLARATION":13,";":14,"ASSIGNMENT":15,"id":16,"=":17,"EXPRESSION":18,"+":19,"-":20,"*":21,"/":22,"^":23,"(":24,")":25,"NUMBER":26,"E":27,"PI":28,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"intType",8:"floatType",9:"boolType",10:"charType",11:"stringType",14:";",16:"id",17:"=",19:"+",20:"-",21:"*",22:"/",23:"^",24:"(",25:")",26:"NUMBER",27:"E",28:"PI"},
productions_: [0,[3,2],[6,1],[6,1],[6,1],[6,1],[6,1],[4,2],[4,1],[12,2],[12,2],[13,2],[15,1],[15,3],[18,3],[18,3],[18,3],[18,3],[18,3],[18,2],[18,3],[18,1],[18,1],[18,1],[18,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 console.log("Correct Syntax")  
break;
case 12:

        // TODO: Add logic to which type of value it is
        variables[$$[$0]] ={type:"int",value:null};
    
break;
case 13:

        // TODO: Add logic to which type of value it is
        variables[$$[$0-2]] = {type:"int",value:Number($$[$0])};
        console.log(variables);
    
break;
case 14:
this.$ = $$[$0-2]+$$[$0];
break;
case 15:
this.$ = $$[$0-2]-$$[$0];
break;
case 16:
this.$ = $$[$0-2]*$$[$0];
break;
case 17:
this.$ = $$[$0-2]/$$[$0];
break;
case 18:
this.$ = Math.pow($$[$0-2], $$[$0]);
break;
case 19:
this.$ = -$$[$0];
break;
case 20:
this.$ = $$[$0-1];
break;
case 21:
this.$ = Number(yytext);
break;
case 22:
this.$ = Math.E;
break;
case 23:
this.$ = Math.PI;
break;
case 24:

        // TODO: Add logic to check that the identifier has a value and exists
        console.log(variables);
        this.$ = variables[$$[$0]].value;
      
break;
}
},
table: [{3:1,4:2,6:6,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:3,13:4,15:5,16:$V5},{1:[3]},{5:[1,13],6:6,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:14,13:4,15:5,16:$V5},o($V6,[2,8]),{14:[1,15]},{14:[1,16]},{15:17,16:$V5},{14:[2,12],17:[1,18]},{16:[2,2]},{16:[2,3]},{16:[2,4]},{16:[2,5]},{16:[2,6]},{1:[2,1]},o($V6,[2,7]),o($V6,[2,9]),o($V6,[2,10]),{14:[2,11]},{16:$V7,18:19,20:$V8,24:$V9,26:$Va,27:$Vb,28:$Vc},{14:[2,13],19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh},{16:$V7,18:31,20:$V8,24:$V9,26:$Va,27:$Vb,28:$Vc},{16:$V7,18:32,20:$V8,24:$V9,26:$Va,27:$Vb,28:$Vc},o($Vi,[2,21]),o($Vi,[2,22]),o($Vi,[2,23]),o($Vi,[2,24]),{16:$V7,18:33,20:$V8,24:$V9,26:$Va,27:$Vb,28:$Vc},{16:$V7,18:34,20:$V8,24:$V9,26:$Va,27:$Vb,28:$Vc},{16:$V7,18:35,20:$V8,24:$V9,26:$Va,27:$Vb,28:$Vc},{16:$V7,18:36,20:$V8,24:$V9,26:$Va,27:$Vb,28:$Vc},{16:$V7,18:37,20:$V8,24:$V9,26:$Va,27:$Vb,28:$Vc},o($Vi,[2,19]),{19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh,25:[1,38]},o($Vj,[2,14],{21:$Vf,22:$Vg,23:$Vh}),o($Vj,[2,15],{21:$Vf,22:$Vg,23:$Vh}),o($Vk,[2,16],{23:$Vh}),o($Vk,[2,17],{23:$Vh}),o($Vi,[2,18]),o($Vi,[2,20])],
defaultActions: {8:[2,2],9:[2,3],10:[2,4],11:[2,5],12:[2,6],13:[2,1],17:[2,11]},
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

    var semanticTable = {};
    // int 
    semanticTable[["int","int",'+']] = "int";
    semanticTable[["int","int",'-']] = "int";
    semanticTable[["int","int",'*']] = "int";
    semanticTable[["int","int",'/']] = "float";
    semanticTable[["int","int","comparison"]] = "boolean";
    semanticTable[["int","int","&&"]] = null;
    
    semanticTable[["int","float",'+']] = "float";
    semanticTable[["int","float",'-']] = "float";
    semanticTable[["int","float",'*']] = "float";
    semanticTable[["int","float",'/']] = "float";
    semanticTable[["int","float","comparison"]] = "boolean";
    semanticTable[["int","float","&&"]] = null;

    semanticTable[["int","char",'+']] = null;
    semanticTable[["int","char",'-']] = null;
    semanticTable[["int","char",'*']] = null;
    semanticTable[["int","char",'/']] = null;
    semanticTable[["int","char","comparison"]] = null;
    semanticTable[["int","char","&&"]] = null;
    
    semanticTable[["int","boolean",'+']] = null;
    semanticTable[["int","boolean",'-']] = null;
    semanticTable[["int","boolean",'*']] = null;
    semanticTable[["int","boolean",'/']] = null;
    semanticTable[["int","boolean","comparison"]] = null;
    semanticTable[["int","boolean","&&"]] = null;

    // float
    semanticTable[["float","int",'+']] = "float";
    semanticTable[["float","int",'-']] = "float";
    semanticTable[["float","int",'*']] = "float";
    semanticTable[["float","int",'/']] = "float";
    semanticTable[["float","int","comparison"]] = "boolean";
    semanticTable[["float","int","&&"]] = null;

    semanticTable[["float","float",'+']] = "float";
    semanticTable[["float","float",'-']] = "float";
    semanticTable[["float","float",'*']] = "float";
    semanticTable[["float","float",'/']] = "float";
    semanticTable[["float","float","comparison"]] = "boolean";
    semanticTable[["float","float","&&"]] = null;

    semanticTable[["float","char",'+']] = null;
    semanticTable[["float","char",'-']] = null;
    semanticTable[["float","char",'*']] = null;
    semanticTable[["float","char",'/']] = null;
    semanticTable[["float","char","comparison"]] = null;
    semanticTable[["float","char","&&"]] = null;

    semanticTable[["float","boolean",'+']] = null;
    semanticTable[["float","boolean",'-']] = null;
    semanticTable[["float","boolean",'*']] = null;
    semanticTable[["float","boolean",'/']] = null;
    semanticTable[["float","boolean","comparison"]] = null;
    semanticTable[["float","boolean","&&"]] = null;

    // char
    semanticTable[["char","int",'+']] = null;
    semanticTable[["char","int",'-']] = null;
    semanticTable[["char","int",'*']] = null;
    semanticTable[["char","int",'/']] = null;
    semanticTable[["char","int","comparison"]] = null;
    semanticTable[["char","int","&&"]] = null;
    
    semanticTable[["char","float",'+']] = null;
    semanticTable[["char","float",'-']] = null;
    semanticTable[["char","float",'*']] = null;
    semanticTable[["char","float",'/']] = null;
    semanticTable[["char","float","comparison"]] = null;
    semanticTable[["char","float","&&"]] = null;

    semanticTable[["char","char",'+']] = "char";
    semanticTable[["char","char",'-']] = null;
    semanticTable[["char","char",'*']] = null;
    semanticTable[["char","char",'/']] = null;
    semanticTable[["char","char","comparison"]] = "boolean";
    semanticTable[["char","char","&&"]] = null;

    semanticTable[["char","boolean",'+']] = null;
    semanticTable[["char","boolean",'-']] = null;
    semanticTable[["char","boolean",'*']] = null;
    semanticTable[["char","boolean",'/']] = null;
    semanticTable[["char","boolean","comparison"]] = null;
    semanticTable[["char","boolean","&&"]] = null;

    // boolean
    semanticTable[["boolean","int",'+']] = null;
    semanticTable[["boolean","int",'-']] = null;
    semanticTable[["boolean","int",'*']] = null;
    semanticTable[["boolean","int",'/']] = null;
    semanticTable[["boolean","int","comparison"]] = null;
    semanticTable[["boolean","int","&&"]] = null;

    semanticTable[["boolean","float",'+']] = null;
    semanticTable[["boolean","float",'-']] = null;
    semanticTable[["boolean","float",'*']] = null;
    semanticTable[["boolean","float",'/']] = null;
    semanticTable[["boolean","float","comparison"]] = null;
    semanticTable[["boolean","float","&&"]] = null;

    semanticTable[["boolean","char",'+']] = null;
    semanticTable[["boolean","char",'-']] = null;
    semanticTable[["boolean","char",'*']] = null;
    semanticTable[["boolean","char",'/']] = null;
    semanticTable[["boolean","char","comparison"]] = null;
    semanticTable[["boolean","char","&&"]] = null;

    semanticTable[["boolean","boolean",'+']] = null;
    semanticTable[["boolean","boolean",'-']] = null;
    semanticTable[["boolean","boolean",'*']] = null;
    semanticTable[["boolean","boolean",'/']] = null;
    semanticTable[["boolean","boolean","comparison"]] = null;
    semanticTable[["boolean","boolean","&&"]] = "boolean";


    var variables = {};
    // example type
    // variables["varA"] = {type:"int",value:10};

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
case 1:return 26
break;
case 2:return 21
break;
case 3:return 22
break;
case 4:return 20
break;
case 5:return 19
break;
case 6:return 23
break;
case 7:return 24
break;
case 8:return 25
break;
case 9:return 17
break;
case 10:return 14
break;
case 11:return 10
break;
case 12:return 9
break;
case 13:return 11
break;
case 14:return 8
break;
case 15:return 7
break;
case 16:return 'text'
break;
case 17:return 'character'
break;
case 18:return 16
break;
case 19:return 28
break;
case 20:return 27
break;
case 21:return 5
break;
case 22:
break;
}
},
rules: [/^(?:\s+)/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:\^)/,/^(?:\()/,/^(?:\))/,/^(?:=)/,/^(?:;)/,/^(?:char\b)/,/^(?:boolean\b)/,/^(?:string\b)/,/^(?:float\b)/,/^(?:int\b)/,/^(?:"[^\"]*")/,/^(?:'[^\']?')/,/^(?:([a-zA-Z])[a-zA-Z0-9_]*)/,/^(?:PI\b)/,/^(?:E\b)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
return parser;
});