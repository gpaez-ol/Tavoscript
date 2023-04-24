
%lex
%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"("                   return '('
")"                   return ')'
"="                         return '='
";"                         return ';'
"char"                      return 'charType'
"boolean"                   return 'boolType'
"string"                    return 'stringType'
"double"                    return 'doubleType'
"int"                       return 'intType'
\"[^\"]*\"				    return 'text'
\'[^\']?\'                  return 'character'
([a-zA-Z])[a-zA-Z0-9_]*	    return 'id'
"PI"                  return 'PI'
"E"                   return 'E'
<<EOF>>				        return 'EOF'
.                           {}
/lex
/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '='
%left UMINUS

%{
    var variables = {};
    // example type
    // variables["varA"] = {type:"int",value:10};
%}
%start START
%%
START : INSTRUCTIONS EOF { console.log("Correct Syntax")  };
TYPE : intType | doubleType  | boolType | charType | stringType;
INSTRUCTIONS : INSTRUCTIONS  INSTRUCTION | INSTRUCTION;
INSTRUCTION : DECLARATION ';' | ASSIGNMENT ';' ;
DECLARATION : TYPE ASSIGNMENT;
ASSIGNMENT 
    : id {
        // TODO: Add logic to which type of value it is
        variables[$1] ={type:"int",value:null};
    }
    | id '=' EXPRESSION {
        // TODO: Add logic to which type of value it is
        variables[$1] = {type:"int",value:Number($3)};
        console.log(variables);
    }
    ;


EXPRESSION
    : EXPRESSION '+' EXPRESSION
        {$$ = $1+$3;}
    | EXPRESSION '-' EXPRESSION
        {$$ = $1-$3;}
    | EXPRESSION '*' EXPRESSION
        {$$ = $1*$3;}
    | EXPRESSION '/' EXPRESSION
        {$$ = $1/$3;}
    | EXPRESSION '^' EXPRESSION
        {$$ = Math.pow($1, $3);}
    | '-' EXPRESSION %prec UMINUS
        {$$ = -$2;}
    | '(' EXPRESSION ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    | id
      {
        // TODO: Add logic to check that the identifier has a value and exists
        console.log(variables);
        $$ = variables[$1].value;
      }
    ;
