import React,{Component} from "react"
import PageTitle from "component/page-title/index.jsx"
import Pagination from "util/pagination/index.jsx"
import User from "service/user-service.jsx"
import Util from "util/mm.jsx"
const _mm = new Util()
const _user = new User()
class UserList extends Component {
  constructor(props){
    super(props),
    this.state = {
      pageNum: 1
    }
  }
  componentDidMount(){
    this.loadUserList()
  }
  loadUserList(){
    _user.getUserList(this.state.pageNum).then((res) => {
      this.setState(res)
    },errMsg => {
      _mm.errorTips(errMsg)
    })
  }
  render(){
    return (
      <div id = "page-wrapper">
        <PageTitle title = "用户列表"/>
        <div className="row">
          <div className="col-md-12">
            <table className = "table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID</th>
                  <th>ID</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Pagination current = {11} total = {200} 
          onChange = {(pageNum) => {console.log(pageNum)}}
        />
      </div>
    )
  }
}
export default UserList