const createTestCase = require('testcafe');
const createHtml = require('./js/createHtml')
const customReporter = require('./reporter')
const config = require('./globalConfig')
var open = require('open');
const fs = require('fs');
const path = require('path')
let testcafe = null;
let stream = null

createTestCase('localhost', 1337, 1338)
    .then(tc => {
        testcafe = tc;
        const runner = testcafe.createRunner();
        stream = fs.createWriteStream(config.reportUrl);
        return runner
            .src(
                config.test_modules
            )
            .browsers(config.browsers)
            .screenshots(
                config.screenshots.path,
                config.screenshots.takeOnFails,
                config.screenshots.pathPattern
            )
            // 生成report格式,根据需要安装对应report模块,
            // 详细看:http://devexpress.github.io/testcafe/documentation/using-testcafe/common-concepts/reporters.html
            .reporter(customReporter,stream)
            .concurrency(config.concurrency)
            .run(
                config.runner
            );
    }).then(failedCount => {
    console.error('Failed Count:' + failedCount);
    let res =  fs.readFileSync('report.json', 'utf8')
    createHtml(JSON.parse(res)).then(()=>{
        open( path.resolve(
            __dirname,
            'testResult/reporter-testResult.html'));

    })

    testcafe.close();
})
    .catch(err => {
        console.error(err);
    });
