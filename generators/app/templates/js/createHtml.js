const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')

const createHtml = data => {
    return new Promise((resolve,reject)=> {
        // 通过模板引擎,渲染html数据
        const dataHtml = nunjucks.render(
            `${path.resolve(__dirname, './template.html')}`,
            data
        )
        // 创建报表目录

        // 创建报表文件
        fs.writeFile(path.resolve(
            __dirname,
            '../testResult/reporter-testResult.html'
        ), dataHtml, err => {
            if (err) {
                reject(err)
            } else {
                console.log(
                    `创建测试报告文件成功, 路径为${path.resolve(
                        __dirname,
                        '../testResult/reporter-testResult.html'
                    )}`
                )
                console.log('--------------------------------------------------------')
                resolve()
            }
        })


    })
    }

module.exports = createHtml
