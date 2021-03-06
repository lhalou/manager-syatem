import React,{Component} from "react"
import PageTitle from "component/page-title/index.jsx"
import Pagination from "util/pagination/index.jsx"
import TableList from "util/table-list/index.jsx"
import User from "service/user-service.jsx"
import Util from "util/mm.jsx"
const _mm = new Util()
const _user = new User()
class UserList extends Component {
  constructor(props){
    super(props),
    this.state = {
      pageNum: 1,
      list: [],
    }
  }
  componentDidMount(){
    this.loadUserList()
  }

  loadUserList(){
    _user.getUserList(this.state.pageNum).then((res) => {
      this.setState(res)
    },errMsg => {
      this.setState ({
        list: []
      })
      _mm.errorTips(errMsg)
    })
  }
  handleChangePage(pageNum){
    this.setState({
      pageNum: pageNum
    },() => {
      this.loadUserList()
    })
  }
  render(){
    let listBody = this.state.list.map((user,index) => {
                    return (
                      <tr key = {index}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{new Date(user.createTime).toLocaleString()}</td>
                      </tr>
                    )
                  });
    let listError = (
      <tr>
        <td colSpan = "5" className = "text-center">
        {this.state.firstLoading ? "正在加载。。。。": "没有找到相应的结果"}
        
        </td>
      </tr>
    )
    let tableBody = this.state.list.length > 0 ? listBody : listError
    return (
      <div id = "page-wrapper">
        <PageTitle title = "用户列表"/>
        <TableList tableHeaders = {["ID","用户名","邮箱","电话","注册时间"]}>
          {tableBody}
        </TableList>
       
        <Pagination current = {this.state.pageNum} total = {this.state.total} 
          onChange = {(pageNum) => {this.handleChangePage(pageNum)}}
        />
      </div>
    )
  }
}
export default UserList