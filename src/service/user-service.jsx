import Util from "util/mm.jsx"
const _mm = new Util()
class User{
  //用户登录
  login(loginInfo){
    return _mm.request({
      type: "post",
      url: "/manage/user/login.do",
      data: loginInfo
    })
  }
  //检查登录接口的数据是否合法
  checkLoginInfo(loginInfo){
    let username = $.trim(loginInfo.username)
    let password = $.trim(loginInfo.password)
    if(typeof username !== "string" || username.length === 0){
      return {
        status: false,
        msg: "用户名错误"
      }
    }
    if(typeof password !== "string" || password.length === 0){
      return {
        status: false,
        msg: "密码错误"
      }
    }
    return {
      status: true,
      msg: '验证通过'
    }
  }
}
export default User