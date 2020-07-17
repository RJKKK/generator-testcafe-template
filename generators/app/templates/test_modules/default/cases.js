const fromData = {
    newPhone: '13711775' + (Math.random() * 100 + 100).toFixed(0),
    phone: '13711775027',
    code: '123456',
    username: 'user-' + (Math.random() * 100 + 100).toFixed(0),
    password: '123456a'
}

const listAction = [
    // 确定 表单输入框 是否完成加载
    {
        desc: '进入注册页',
        action: async page => {
            await page.click('.submit')
        }
    },


    {
        desc: '输入账号',
        action: async page => {
            await page.typeText('.el-input__inner',fromData.newPhone)
        }
    },
    // 获取验证码
    {
        desc: '点击获取验证码按钮',
        action: async page => {
            await page.click('.getCode')
        }
    },

]
export default listAction
