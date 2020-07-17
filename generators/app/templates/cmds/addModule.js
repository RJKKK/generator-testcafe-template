const path = require('path')
const fs = require('fs')
const root = path.join(__dirname,'../test_modules')
const prompts = require('prompts');
let appConfig = require('../config')
const iconv = require('iconv-lite');
String.prototype.splice = function (start,newStr) {
    return this.slice(0,start)+newStr+this.slice(start)
}
if(!process.argv[2]){
    throw new Error('Can not find the name for a new module!')
}
let moduleName = process.argv[2]
let moduleArr = fs.readdirSync(root)
let moduleUrl = path.join(root,moduleName)
if(moduleArr.indexOf(moduleName)===-1){
    fs.mkdirSync(moduleUrl)
    createModule()
}
else throw new Error('the module is exist!!!')
async function createModule() {
    // Those are files'templates
    let index_js = "import {sharedInfo} from '../../shared-module'\n" +
        "import config from './config'\n" +
        "import listAction from './cases'\n" +
        "fixture`${config.unitName}`.page`${config.url}`;\n" +
        "\n" +
        "test(config.unitName, async I => {\n" +
        "    sharedInfo[config.unitName] = listAction\n" +
        "    for (let i = 0;i< listAction.length;i++){\n" +
        "        await listAction[i].action(I)\n" +
        "        sharedInfo[config.unitName][i][\"isPass\"] = true\n" +
        "    }\n" +
        "\n" +
        "})";
    let cases_js = "const fromData = {\n" +
        "   //you can write down the from data here\n" +
        "}\n" +
        "\n" +
        "//the 'case' in 'desc' are the  cases\' names will be write down to report.json\n" +
        "const listAction = [\n" +
        "    {\n" +
        "        desc: 'case1',\n" +
        "        action: async page => {\n" +
        "           //todo\n" +
        "        }\n" +
        "    },\n" +
        "\n" +
        "\n" +
        "    {\n" +
        "        desc: 'case2',\n" +
        "        action: async page => {\n" +
        "            //todo\n" +
        "        }\n" +
        "    },\n" +
        "    {\n" +
        "        desc: 'case3',\n" +
        "        action: async page => {\n" +
        "            //todo\n" +
        "        }\n" +
        "    },\n" +
        "\n" +
        "]\n" +
        "export default listAction";
    console.log('The questions in next to set the module\'s config. you can also edit in corresponding config.js\n')
    sleep(2000)
    const q1 = await prompts({
        type: 'text',
        name: 'reportName',
        message: 'What is the name of  report? It will be shown by the report.json'
    });

  let reportName=q1.reportName===''?moduleName:q1.reportName
    const q2 = await prompts({
        type: 'text',
        name: 'url',
        message: 'Set a separation url in this module?'
    });
   let url=q2.url===''?appConfig.defaultTestUrl:q2.url
    let config_js = `export default {
    url:"${url}",
    unitName:"${reportName}",
}`;
    //  to write down the required files
    fs.writeFileSync(path.join(moduleUrl,"index.js"),index_js,{encoding:'utf8'});
    fs.writeFileSync(path.join(moduleUrl,"cases.js"),cases_js,{encoding:'utf8'});
    fs.writeFileSync(path.join(moduleUrl,"config.js"),config_js,{encoding:'utf8'});

    // to edit the config

    !~appConfig.test_modules.indexOf(`./test_modules/${moduleName}/index.js`)&&appConfig.test_modules.push(`./test_modules/${moduleName}/index.js`)
    let reg = /("test_modules":[\d\D]*])/
    let fileContent =  fs.readFileSync(path.join(__dirname,'../config.js'),{encoding:'utf8'})
    let head =  '"test_modules": [\r\n'
    let rear =  '  ]'
    let content = ''
    appConfig.test_modules.forEach(val=>{
        content+= `    "${val}",\r\n`
    })
    let newfile = fileContent.replace(reg,head+content+rear)

  fs.writeFileSync(path.join(__dirname,'../config.js'),newfile)

}
function sleep(ms) {
    return new Promise((resolve) =>{
        setTimeout(()=>{
            resolve(ms)
        },ms)
    } )
}




