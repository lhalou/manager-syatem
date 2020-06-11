import React,{Component} from "react"
import {Link} from "react-router-dom"
import PageTitle from "component/page-title/index.jsx"
import Pagination from "util/pagination/index.jsx"
import Order from "service/order-service.jsx"
import ListSearch from "./index-list-search.jsx"
import Util from "util/mm.jsx"
import TableList from "util/table-list/index.jsx"

const _mm = new Util()
const _order = new Order()

class OrderList extends Component {
  constructor(props){
    super(props),
    this.state = {
      pageNum: 1,
      list: [] ,
      listType: 'list' //list  或者是  search
    }
  }
  componentDidMount(){
    this.loadOrderList()
  }
  //搜索
  handleSearch(orderNumber){
    let listType = orderNumber === "" ? "list" : "search"
    this.setState({
      listType: listType,
      pageNum:1,
      orderNumber: orderNumber
    },() => {
      this.loadOrderList()
    })
  }
  //加载商品列表
  loadOrderList(){
    let listParam = {}
    listParam.listType = this.state.listType
    listParam.pageNum = this.state.pageNum
    if(this.state.listType === "search"){
      listParam.orderNo = this.state.orderNumber
    }
   _order.getOrderList(listParam).then((res) => {
      this.setState(res)
    },errMsg => {
      this.setState ({
        list: []
      })
      _mm.errorTips(errMsg)
    })
  }
  
  //切换页面
  handleChangePage(pageNum){
    this.setState({
      pageNum: pageNum
    },() => {
       this.loadOrderList()
    })
  }
  
  render(){
    let tableHeads = [
      '订单号','收件人','订单状态','订单总价','创建时间','操作'
    ]
    return (
      <div id = "page-wrapper">
        <PageTitle title = "订单列表" />
        <ListSearch onSearch = {(orderNumber) => {this.handleSearch(orderNumber)}}/>
        <TableList tableHeaders = {tableHeads}>
          {
            this.state.list.map((order,index) => {
                    return (
                      <tr key = {index}>
                        <td>
                          <Link to = {`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                        </td>
                        <td>{order.receiverName}</td>
                        <td>{order.statusDesc}</td>
                        <td>￥{order.payment}</td>
                        <td>{order.createTime}</td>
                        <td>
                          <Link to = {`/order/detail/${order.orderNo}`}>详情</Link>
                        </td>
                      </tr>
                    )
            })
          }
        </TableList>
        
        <Pagination current = {this.state.pageNum} total = {this.state.total} 
          onChange = {(pageNum) => {this.handleChangePage(pageNum)}}
        />
      </div>
    )
  }
}
export default OrderList