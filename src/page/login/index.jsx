import React,{Component} from "react"
import "./index.scss"
class Login extends Component {
  constructor(props){
    super(props),
    this.state = {
      username: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  handleInputChange(e) {
    let inputName = e.target.name
    let inputValue = e.target.value
    console.log(inputName,inputValue)
    this.setState({
      [inputName]:inputValue
    })
  }
  render(){
    return (
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default login-panel">
            <div className="panel-heading">欢迎登录-MMALL管理系统</div>
            <div className="panel-body">
            <form>
              <div className = "form-group">
                <input type="text" 
                      name = "username"
                      className="form-control" 
                      placeholder="请输入用户名" 
                      onChange = {e => this.handleInputChange(e)}
                      />
              </div>
              <div className = "form-group">
                <input type="password" 
                      name = "password"
                      className="form-control" 
                      placeholder="请输入密码" 
                      onChange = {e => this.handleInputChange(e)}
                      />
              </div>
              <button type="submit" className="btn btn-lg btn-primary btn-block">登录</button>
            </form>
            </div>
          </div>
        </div>
    )
  }
}
export default Login