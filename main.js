const {parser} = require("./src/parser/index.js");
const fs = require("fs");
const {startProgram} = require ("./src/virtualMachine/processor");
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

if (argv.file === null || argv.file === undefined) {
    throw new Error("File Argument is missing");
  }
async function readFile(fileName) {
    try {
      return await fs.readFileSync(fileName)
    } catch (err) {
      console.error('Error occurred while reading directory:', err)
    }
  }
const devMode = false;
async function main()
{
    let buffer = await readFile(argv.file);
    let fileContent = buffer.toString();
    let result = parser.parse(fileContent);
    fs.writeFileSync('./output.json', JSON.stringify(result, null, 2) , 'utf-8');
    if(devMode)
    {
        console.log(result);
    }
    await startProgram(result,devMode);
}


main();