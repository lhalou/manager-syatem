//工具类的基本结构，采用类因为类可以做隔离作用域
class MUtil {
  request(param){
    return new Promise((resolve,reject) => {
      $.ajax({
        type: param.type || "get",
        url: param.url || "",
        dataType: param.dataType || "json",
        data: param.data || null,
        success(res){
          //数据请求成功
          if(0 === res.status){
            typeof resolve === "function" && resolve(res.data,res.mag)
          }else if(10 === res.status){
            //没有登录状态，强制登录
            this.doLogin()
          }else{
            typeof reject === "function" && reject(res.msg || res.data)
          }
        },
        error(err){
          typeof reject === "function" && reject(err.statusText)
        }
      })
    })
  }
  //跳转登录
  doLogin(){
    window.location.href = "/login?redirect=" + encodeURIComponent(window.location.pathname)
  }
  //获取URL参数
  getUrlParam(name){
    let queryString = window.location.search.split('?')[1] || ''
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    let result = queryString.match(reg)
    return result ? decodeURIComponent(result[2]): null
  }
  //错误提示
  errorTips(errMsg){
    alert(errMsg || "好像哪里出问题了")
  }
}
export default MUtil