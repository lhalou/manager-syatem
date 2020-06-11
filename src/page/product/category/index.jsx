import React,{Component} from "react"
import {Link} from "react-router-dom"
import PageTitle from "component/page-title/index.jsx"

import TableList from "util/table-list/index.jsx"
import Product from "service/product-service.jsx"
import Util from "util/mm.jsx"
const _mm = new Util()
const _product = new Product()
class CategoryList extends Component {
  constructor(props){
    super(props),
    this.state = {
      parentCategoryId: this.props.match.params.categoryId || 0,
      list: [],
    }
  }
  componentDidMount(){
    this.loadCategoryList()
  }
  //加载品类列表
  loadCategoryList(){
    _product.getCategoryList(this.state.parentCategoryId).then((res) => {
      this.setState({
        list: res
      })
    },errMsg => {
      this.setState ({
        list: []
      })
      _mm.errorTips(errMsg)
    })
  }
  //更新品类的名字
  handleUpdateName(categoryId,categoryName){
    let newName = window.prompt("请输入新的品类名称",categoryName)
    if(newName){
      _product.updateCategoryName({
        categoryId: categoryId,
        categoryName: newName
      }).then((res) => {
        _mm.successTips(res)
        this.loadCategoryList()
      },errMsg =>{
        _mm.errorTips(errMsg)
      })
    }
  }
  render(){
    let listBody = this.state.list.map((category,index) => {
                    return (
                      <tr key = {index}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                          <a className="opera"
                          onClick = {(e) => this.handleUpdateName(category.id,category.name)}
                          >修改名称</a>
                        </td> 
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
        <PageTitle title = "品类列表"/>
        <div className="row">
          <div className="col-md-12">
            <p>父品类ID:{this.state.parentCategoryId}</p>
          </div>
        </div>
        <TableList tableHeaders = {["品类ID","品类名称","操作"]}>
          {tableBody}
        </TableList>
       
       
      </div>
    )
  }
}
export default CategoryList