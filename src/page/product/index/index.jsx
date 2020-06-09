import React,{Component} from "react"
import {Link} from "react-router-dom"
import PageTitle from "component/page-title/index.jsx"
import Pagination from "util/pagination/index.jsx"
import Product from "service/product-service.jsx"
import ListSearch from "./index-list-search.jsx"
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
      list: [] ,
      listType: 'list'
    }
  }
  componentDidMount(){
    this.loadProductList()
  }
  //搜索
  handleSearch(searchType,searchKeyword){
    let listType = searchKeyword === "" ? "list" : "search"
    this.setState({
      listType: listType,
      pageNum:1,
      searchTtype: searchType,
      searchKeyword: searchKeyword
    },() => {
      this.loadProductList()
    })
  }
  //加载商品列表
  loadProductList(){
    let listParam = {}
    listParam.listType = this.state.listType
    listParam.pageNum = this.state.pageNum
    if(this.state.listType === "search"){
      listParam.searchType = this.state.searchType
      listParam.keyword = this.state.searchKeyword
    }
    _product.getProductList(listParam).then((res) => {
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
        <ListSearch onSearch = {(searchTtype,searchKeyword) => {this.handleSearch(searchTtype,searchKeyword)}}/>
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