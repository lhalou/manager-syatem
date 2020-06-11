import React,{Component} from "react"
import PageTitle from "component/page-title/index.jsx"
import Product from "service/product-service.jsx"
import Util from "util/mm.jsx"
import FileUpLoader from "util/file_uploader/index.jsx"
import CategorySelector from "./category-selector.jsx"
import "./save.scss"
const _mm = new Util()
const _product = new Product()
class ProductSave extends Component {
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
    this.handleCateGoryChange = this.handleCateGoryChange.bind(this)
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
  //简单字段变化处理
  handleInputChange(e){
    let name = e.target.name 
    let value = e.target.value.trim()
    this.setState({
      [name]: value
    })
  }
  //品类选择器的变化
  handleCateGoryChange(categoryId,parentCategoryId){
    this.setState({
      categoryId: categoryId,
      parentCategoryId: parentCategoryId
    })
    console.log(categoryId)
  }
  //上传图片成功
  handleUploadSuccess(res){
    //不能直接对state直接修改
    let subImages = this.state.subImages
    subImages.push(res)
    this.setState({
      subImages: subImages
    })
  }
  //上传图片失败
  handleUploadError(errMsg){
      _mm.errorTips(errMsg)
  }  
  //删除图片
  handleDeleteImage(e){
    //采用e.target.index获取不到index
    let index = parseInt(e.target.getAttribute('index'))
    let subImages = this.state.subImages
    subImages.splice(index,1)
    this.setState({
      subImages: subImages
    })
  }
  getSubImages(){
    return this.state.subImages.map((image) => image.uri).join(',')
  }
  //提交
  handleSubmit(){
    let product = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      categoryId: parseInt(this.state.categoryId),
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      status: this.state.status, 
      subImages: this.getSubImages(),
      detail : this.state.detail
    }
    let productCheckResult = _product.checkProduct(product)
    if(this.state.id){
      product.id = this.state.id
    }
   
    if(productCheckResult.status){
      _product.saveProduct(product).then((res) => {
        _mm.successTips(res)
        this.props.history.push('/product/index')
      },(errMsg) => {
        _mm.errorTips(errMsg)
      })
    }else {
       _mm.errorTips(productCheckResult.msg)
    }
  }
  render(){
    return(
      <div id = "page-wrapper">
        <PageTitle title = {this.state.id ? "编辑商品" : "添加商品"} />
          <div className="form-horizontal">
            <div className="form-group">
             <label className="col-md-2 control-label">商品名称</label>
              <div className="col-md-5">
                <input type="text" className="form-control" placeholder="请输入商品名称"
                  name = "name"
                  value = {this.state.name}
                  onChange = {(e) => this.handleInputChange(e)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品描述</label>
              <div className="col-md-5">
                <input type="text" className="form-control" placeholder="请输入商品描述"
                  name = "subtitle"
                  value = {this.state.subtitle}
                  onChange = {(e) => this.handleInputChange(e)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">所属分类</label>
              <CategorySelector 
                categoryId = {this.state.categoryId}
                parentCategoryId = {this.state.parentCategoryId}
                onCategoryChange = {
                 (categoryId,parentCategoryId) => {this.handleCateGoryChange(categoryId,parentCategoryId)}}
                 />
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品价格</label>
              <div className="col-md-3">
                <div className="input-group">
                  <input type="number" className="form-control" placeholder="请输入商品价格"
                    name = "price"
                    value = {this.state.price}
                    onChange = {(e) => this.handleInputChange(e)}
                  />
                  <span className="input-group-addon" >元</span>
                </div> 
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品库存</label>
              <div className="col-md-3">
                <div className="input-group">
                    <input type="number" className="form-control" placeholder="库存"
                      name = "stock"
                      value = {this.state.stock}
                    onChange = {(e) => this.handleInputChange(e)}
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
                          <i className = "fa fa-close"  index = {index}
                          onClick = {(e) => this.handleDeleteImage(e)}
                          ></i>
                       </div>
                       
                      )
                   )
                 : (
                   <div>上传图片</div>
                 )
               }
              </div>
              <div className="col-md-offset-2 col-md-10 file-upload-content">
                <FileUpLoader onSuccess = {(res) => {this.handleUploadSuccess(res)}}
                  onError = {(errMsg) => {this.handleUploadError(errMsg)}}
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
      )
  }
}
export default ProductSave