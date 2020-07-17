import {Selector} from 'testcafe'
const fromData = {
    username: 'user1998',
    password: '123456a'
}
const accountText = Selector('.el-input__inner');
const passwordText = Selector('.el-input__inner').withAttribute('type','password')
const listAction = [
    // 确定 表单输入框 是否完成加载
    {
        desc: '输入用户名',
        action: async page => {
            await page.typeText('.el-input__inner',fromData.username,{
                replace:true,
            })
        }
    },


    {
        desc: '输入密码',
        action: async page => {
            await page.typeText(passwordText,fromData.password,{
                replace:true
            })
        }
    },
    // 获取验证码
    {
        desc: '登录点击',
        action: async page => {
            await page.click('.button-login')
        }
    },

]
export default listAction
