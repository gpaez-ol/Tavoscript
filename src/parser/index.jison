
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
"float"                    return 'floatType'
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
%}
%start START
%%
START : INSTRUCTIONS EOF { console.log("Correct Syntax")  };
TYPE : intType | floatType  | boolType | charType | stringType;
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
