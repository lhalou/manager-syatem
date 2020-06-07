import React,{Component} from "react";
import {Link} from "react-router-dom"
class TopNav extends Component {
  constructor(props){
    super(props)
  }
  //退出登录
  handleLayout(){

  }
  render(){
    return (
      <div className="navbar navbar-default top-navbar">
            <div className="navbar-header"> 
                <Link className="navbar-brand" to = "/"><b>HAPPY</b>MMALL</Link>
            </div>
            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                  {/* 取消JavaScript事件 */}
                    <a className="dropdown-toggle" href="javascript:;">
                        <i className="fa fa-user fa-fw"></i> 
                        <span>欢迎，adminxxx</span>
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                          <a onClick = {this.handleLayout.bind(this)}>
                            <i className="fa fa-sign-out fa-fw"></i>
                            <span>退出登录</span>
                          </a>
                        </li>
                    </ul>  
                </li>
              
            </ul>
        </div>
    )
  }
}
export default TopNav