# Project Setup

## System Requirements

- Node.js >= 16.0.0
- Yarn >= 1.0

## Setup Steps

1. Clone the repo
2. Run `yarn install` in the root of the project to setup dependencies

## Building

1. Run `yarn build` in the root of the project to build for production.

# Project Description

## Main Libraries

- JISON: Lexical analysis and Semantic tool used for building parsers out of a defined grammar.
- TypeScript: strongly typed JavaScript superset

## Folder Structure

Inside the `src` directory there are multiple folders with their own specific purpose. Specifically the Lex syntax and the Parser logic

## Avances hasta el momento

Se preparo el documento completo de cual seria la descripcion del lenguaje,
Se creo el primer repositori el cual tiene las herramientas necesarias para probar facilmetne el lenguaje utilizando JISON.
Se anadio un lenguaje basico que funciona como calculadora por el momento para tener una base.

-Se anadio instrucciones, declaracion basica y asignacion basica de valores a un identificador.

- Se agrego un mapa de las variables disponibles en el programa.
- Se agergo logica para agregar una variable nueva
- Se agrego logica para llamar el valor de una variable
- Se agrego tabla semantica para las operaciones
- Se mejoro la tabla semantica de las operaciones
- Se agrego logica para creaer multiples variables de int,float y tipo string
- Se generan variables temporales cuando son necesitadas
- Se generar cuadruplos con orden correcto para instrucciones basicas
- Se generan cuadruplos correctos para el condicional "if"
- Se generan cuadruplos correctos para el condicional "else"
- Se generan cuadruplos correctos para el condicional "while"
- Se generan cuadruplos correctos para el condicional "do - while"
- Se generan cuadruplos correctos para el ciclo "for" con 1 variable y 1 condicion
- La tabla semantica se encuentra en su propio archivo
- Se generan funciones que guardan las variables locales, temporales
- Se genera automaticamente una funcion main la cual tiene variables globales
- Se genera el directorio de funciones
- Se pueden utilizar funciones en las expresiones y se llaman utilizando :nombreFunc(argumentos);
- Se pueden crear arreglos de cualquier tamano de dimensiones, como parametros de funciones tmbn
- Se puede llamar arreglos utiliando expresiones como los argumentos de dicho arreglo
- Se agregaron addresses correctos a las variables asi como un objeto con los addresses base
- Se agrego la funcion de print() 
- Se agrego la funcion de read()
- Se agrego getArrayVariable en caso de que la variable local y globa se llamen igual pero la global es arreglo si se llama como arrelgo se busca hasta global
- Se agrego la maquina virtual funcionando a un 50%
- Se agregaron variables globales
- Se agregaron arreglos como parametros de funciones
- Maquina virtual funcionando a un 90%
- Read funcionando al 100% 
- Maquina virtual lista
- Se agrego logica para correrlo desde la terminal
- Se removieron variables sin usar
- Utiliza code segment para cargar y descargar los quadruplos de memoria
- Negativos funcionando
- Operadores tienen una representacion numerica
- Terminado al 100%