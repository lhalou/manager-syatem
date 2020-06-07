import React,{Component} from "react"
class PageTitle extends Component {
  componentWillMount(){
    //获取到的title值放到dom的title标签中，浏览器的地址栏中
    document.title = this.props.title + '- HAPPY MMALL'
  }
  render(){
    return (
      <div className="row">
          <div className="col-md-12">
            <h1 className = "page-header">{this.props.title}</h1>
            {this.props.children}
          </div>
        </div>
       
    )
  }
}
export default PageTitle