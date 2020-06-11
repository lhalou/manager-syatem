import React,{Component} from "react"
import PageTitle from "component/page-title/index.jsx"
import Product from "service/product-service.jsx"
import Util from "util/mm.jsx"
import CategorySelector from "./category-selector.jsx"
import "./save.scss"
const _mm = new Util()
const _product = new Product()
class ProductDetail extends Component {
  constructor(props){
    super(props),
    this.state = {
      id: this.props.match.params.pid,
      name: '',
      subtitle: '',
      price: '',
      stock: '',
      status: 1,
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
      detail : ''
    }
   
  }
  componentDidMount(){
    this.loadProduct() //加载商品详情
  }
  loadProduct(){
    //有Id的时候表示编辑功能，需要表单回填。
    if(this.state.id){
      _product.getProduct(this.state.id).then((res) => {
        let images = res.subImages.split(',')
        res.subImages = images.map((imgUri) => {
          return {
            uri: imgUri,
            url: res.imageHost + imgUri
          }
        })
        this.setState(res)
      },(errMsg) => {
        _mm.errorTips(errMsg)
      })
    }
  }
  
  render(){
    return(
      <div id = "page-wrapper">
        <PageTitle title = "添加商品" />
          <div className="form-horizontal">
            <div className="form-group">
             <label className="col-md-2 control-label">商品名称</label>
              <div className="col-md-5">
                <p className="from-control-static">{this.state.name}</p>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品描述</label>
              <div className="col-md-5">
                <p className="from-control-static">{this.state.subtitle}</p>
               
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">所属分类</label>
              <CategorySelector 
                readOnly
                categoryId = {this.state.categoryId}
                parentCategoryId = {this.state.parentCategoryId}
                 />
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品价格</label>
              <div className="col-md-3">
                <div className="input-group">
                  <input type="number" className="form-control"
                    value = {this.state.price}
                    readOnly
                  />
                  <span className="input-group-addon" >元</span>
                </div> 
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品库存</label>
              <div className="col-md-3">
                <div className="input-group">
                    <input type="number" className="form-control"
                      value = {this.state.stock}
                      readOnly    
                    />
                    <span className="input-group-addon" >件</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品图片</label>
              <div className="col-md-10 content">
               {
                 this.state.subImages.length ? 
                   this.state.subImages.map(
                     (image,index) => 
                     ( 
                       <div className = "img-con" key = {index}> 
                          <img src = {image.url} className = "img"/>
                       </div>
                       
                      )
                   )
                 : (
                   <div>暂无图片</div>
                 )
               }
              </div>
              
            </div>
        </div>
      </div>
      )
  }
}
export default ProductDetail