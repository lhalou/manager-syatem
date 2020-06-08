import React,{Component} from "react"

class TableList extends Component {
  constructor(props){
    super(props),
    this.state = {
      isFirstLoading: true
    }
  }
  
  componentWillReceiveProps(){
    //列表只有在第一次挂载的时候，才是true
    this.setState({
      isFirstLoading: false
    })
  }
  render(){
    //表头信息
    let tableHeader = this.props.tableHeaders.map(
      (tableHead,index) => {
        if(typeof tableHead === "object"){
          return <th key = {index} width = {tableHead.width}>{tableHead.name}</th>
        }else if (typeof tableHead === "string"){
          return <th key = {index}>{tableHead}</th>
        }
      }
    )
    //列表信息
    let listBody = this.props.children
    let listInfo = (
      <tr>
        <td colSpan = {this.props.tableHeaders.length} className = "text-center">
        {this.state.isFirstLoading ? "正在加载。。。。": "没有找到相应的结果"}
        </td>
      </tr>
    )
    let tableBody = listBody.length > 0 ? listBody : listInfo
    return (
      //列表信息
       <div className="row">
          <div className="col-md-12">
            <table className = "table table-striped table-bordered">
              <thead>
                <tr>
                  {tableHeader}
                </tr>
              </thead>
              <tbody>
                {
                  tableBody
                }
              </tbody>
            </table>
          </div>
        </div>
    )
   
  }
}
export default TableList
