import React,{Component} from "react"
import "./index.scss"
import User from "service/user-service.jsx"
import Util from "util/mm.jsx"
const _mm = new Util()
const _user = new User()
class Login extends Component {
  constructor(props){
    super(props),
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/'
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }
  //修改浏览器地址栏的内容
  componentWillMount(){
    document.title = '登录-HAPPY MMALL'
  }
  //监听Input输入内容变化
  handleInputChange(e) {
    let inputName = e.target.name
    let inputValue = e.target.value
    // console.log(inputName,inputValue)
    this.setState({
      [inputName]:inputValue
    })
  }
  //提交事件
  handleKeyUp(e){
    if(e.keyCode ===13){
      this.handleSubmit()
    }
  }
  handleSubmit(){
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    }
    let checkResult = _user.checkLoginInfo(loginInfo)
    if(checkResult.status){
      _user.login(loginInfo).then((res)=>{
        //react-router提供的history对象
        console.log(this.state.redirect)
        _mm.setStorage('userInfo',res)
        this.props.history.push(this.state.redirect)
      },(errMsg)=>{
        _mm.errorTips(errMsg)
      })
    }else{
      _mm.errorTips(checkResult.msg)
    }
    
  }
  render(){
    return (
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default login-panel">
            <div className="panel-heading">欢迎登录-MMALL管理系统</div>
            <div className="panel-body">
            <div>
              <div className = "form-group">
                <input type="text" 
                      name = "username"
                      className="form-control" 
                      placeholder="请输入用户名" 
                      onChange = {e => this.handleInputChange(e)}
                      onKeyUp = {e => this.handleKeyUp(e)}
                      />
              </div>
              <div className = "form-group">
                <input type="password" 
                      name = "password"
                      className="form-control" 
                      placeholder="请输入密码" 
                      onChange = {e => this.handleInputChange(e)}
                      onKeyUp = {e => this.handleKeyUp(e)}
                      />
              </div>
              <button className="btn btn-lg btn-primary btn-block"
                onClick = {e => this.handleSubmit(e)}
              >
                登录
              </button>
            </div>
            </div>
          </div>
        </div>
    )
  }
}
export default Login