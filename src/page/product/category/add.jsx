import React,{Component} from "react"
import PageTitle from "component/page-title/index.jsx"
import Product from "service/product-service.jsx"
import Util from "util/mm.jsx"
const _mm = new Util()
const _product = new Product()
class CategoryAdd extends Component {
  constructor(props){
    super(props),
    this.state = {
      parentId: 0, //挂载节点的 ID
      categoryList: [],
      categoryName: '' //新建的ID
    }
  }
  componentDidMount(){
    this.loadCategoryList()
  }
  
  //加载品类列表,显示父品类列表
  loadCategoryList(){
    _product.getCategoryList().then((res) => {
      this.setState({
        categoryList: res
      })
    },errMsg => {
      _mm.errorTips(errMsg)
    })
  }
  handleInputChange(e){
    let name = e.target.name 
    let value = e.target.value 
    this.setState({
      [name]: value
    })
  }
  handleSubmit(e){
    let categoryName = this.state.categoryName.trim()
    if(categoryName){
      _product.saveCategory({
        parentId: this.state.parentId,
        categoryName:categoryName
      }).then((res) => {
        _mm.successTips(res)
        this.props.history.push('/product-category/index')
      },errMsg => {
        _mm.errorTips(errMsg)
      })
    }
  }
  render(){
    return (
      <div id = "page-wrapper">
        <PageTitle title = "品类列表">
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-md-2 control-label">所属品类</label>
                <div className="col-md-5">
                  <select name = "parentId" className = "form-control"
                  onChange = {(e) => this.handleInputChange(e)}>
                    <option value = "0">根品类/</option>
                    {
                      this.state.categoryList.map((category,index) => {
                        return <option value = {category.id} key = {index}>根品类/{category.name}</option>
                      })
                    }
                  </select>
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-2 control-label">品类名称</label>
                <div className="col-md-5">
                  <input type="text" className="form-control" placeholder="请输入品类名称"
                    name = "categoryName"
                    value = {this.state.name}
                    onChange = {(e) => this.handleInputChange(e)}
                  />
                </div>
            </div>
             <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary"
                onClick = {(e) => this.handleSubmit(e)}>提交</button>
              </div>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}
export default CategoryAdd