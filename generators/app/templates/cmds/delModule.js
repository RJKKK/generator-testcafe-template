const path = require('path')
const fs = require('fs')
const root = path.join(__dirname,'../test_modules')
let appConfig = require('../globalConfig')
if(!process.argv[2]){
    throw new Error('Can not find the name for a  module from cmd text!')
}
let moduleName = process.argv[2]
let moduleArr = fs.readdirSync(root)
if(moduleArr.indexOf(moduleName)===-1){
    throw new Error('Can not find the name for a module from directory !')
}
else{
    deleteModule()
}
function deleteModule(){
    _delFileLog()
    _delDir(path.join(root,moduleName))
}


function _delDir(path){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}
function _delFileLog() {
    let reg = /("test_modules":[\d\D]*])/
    let fileContent =  fs.readFileSync(path.join(__dirname,'../globalConfig.js'),{encoding:'utf8'})
    let head =  '"test_modules": [\r\n'
    let rear =  '  ]'
    let content = ''
    appConfig.test_modules.find((val,index)=>{
        if(`./test_modules/${moduleName}/index.js`==val){
            appConfig.test_modules.splice(index,1)
            return true
        }
    })
    appConfig.test_modules.forEach(val=>{
        content+= `    "${val}",\r\n`
    })
    let newfile = fileContent.replace(reg,head+content+rear)
    fs.writeFileSync(path.join(__dirname,'../globalConfig.js'),newfile)
}
