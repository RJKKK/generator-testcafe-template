module.exports = {
  "reportUrl": "report.json",
  // 设置需要执行的浏览器
  "browsers": ["chrome"],
  // 需要运行的test_modules
  "test_modules": [
    "./test_modules/default/index.js",
    "./test_modules/login/index.js",
  ],
  // 错误自动截图
  "screenshots": {
    // 保存路径
    "path": "./error/",
    "takeOnFails": true,
    // 保存路劲格式
    "pathPattern": "${DATE}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png"
  },
  // 并发量
  "concurrency": 2,
  "runner": {
    "skipJsErrors": true,
    "quarantineMode": false, // 隔离模式，可以理解为失败重跑
    "selectorTimeout": 5000,// 设置页面元素查找超时时间,智能等待
    "assertionTimeout": 7000,// 设置断言超时时间
    "pageLoadTimeout": 30000,// 设置页面加载超时时间
    "debugOnFail": false,    // 失败开启调试模式 脚本编写建议开启
    "speed": 1               // 执行速度0.01 - 1
  },
  "defaultTestUrl":"http://127.0.0.1:8080" //默认测试页面路径
}

