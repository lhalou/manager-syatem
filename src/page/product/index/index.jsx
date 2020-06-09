import React,{Component} from "react"
import {Link} from "react-router-dom"
import PageTitle from "component/page-title/index.jsx"
import Pagination from "util/pagination/index.jsx"
import Product from "service/product-service.jsx"
import Util from "util/mm.jsx"
import TableList from "util/table-list/index.jsx"
import "./index.scss"
const _mm = new Util()
const _product = new Product()

class ProductList extends Component {
  constructor(props){
    super(props),
    this.state = {
      pageNum: 1,
      list: [] 
    }
  }
  componentDidMount(){
    this.loadProductList()
  }
  //加载商品列表
  loadProductList(){
    _product.getProductList(this.state.pageNum).then((res) => {
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
      this.loadProductList()
    })
  }
  handleSetProductStatus(e,productId,currentStatus){
    let newStatus = currentStatus == 1 ? 2 :1
    let confrimTips = currentStatus == 1 ? "确定要下架该产品？": "确定要上架该产品？"
    if(window.confirm(confrimTips)){
      _product.setProductStatus({
        productId: productId,
        status: newStatus
      }).then(res => {
        _mm.successTips(res)
        this.loadProductList()
      },errMsg => {
        _mm.errorMsg(errMsg)
      })
    }
  }
  render(){
    let tableHeads = [
      {name:'商品ID',width: "10%"},
      {name:'商品信息',width: "50%"},
      {name:'价格',width: "10%"},
      {name:'状态',width: "15%"},
      {name:'操作',width: "15%"}
    ]
    return (
      <div id = "page-wrapper">
        <PageTitle title = "商品列表"/>
        <div className="row">
          <div className="col-md-12">
            <div className="form-inline">
              <div className="form-group">
                <select className="form-control">
                  <option value = "productId">按商品ID查询</option>
                  <option value = "productName">按商品名称查询</option>
                </select>
              </div>
              <div className="form-group">
                <input type="text" className = "form-control" placeholder = "关键词"/>
                <button className="btn btn-primary">搜索</button>
              </div>
            </div>
          </div>
        </div>
        <TableList tableHeaders = {tableHeads}>
          {
            this.state.list.map((product,index) => {
                    return (
                      <tr key = {index}>
                        <td>{product.id}</td>
                        <td>
                          <p>{product.name}</p>
                          <p>{product.subtitle}</p>
                        </td>
                        <td>￥{product.price}</td>
                        <td>
                          <p>{product.status == 1 ? "在售" : "已下架"}</p>
                          <button className = "btn btn-xs btn-warning" 
                              onClick = {(e) => this.handleSetProductStatus(e,product.id,product.status)}>
                            {product.status == 1 ? "下架" : "上架"}
                          </button>
                        </td>
                        <td>
                          <Link className = "opear" to = {`/product/detail/${product.id}`}>详情</Link>
                          <Link className = "opear" to = {`/product/save/${product.id}`}>编辑</Link>
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
export default ProductList