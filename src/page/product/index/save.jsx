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
      categoryId: 0,
      parentCategoryId: 0,
      subImages: []
    }
    this.handleCateGoryChange = this.handleCateGoryChange.bind(this)
  }
  //品类选择器的变化
  handleCateGoryChange(categoryId,parentCategoryId){
    console.log(categoryId,parentCategoryId)
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
    let index = e.target.index
    let subImages = this.state.subImages
    subImages.splice(index,1)
    this.setState({
      subImages: subImages
    })
  }
  render(){
    return(
      <div id = "page-wrapper">
        <PageTitle title = "添加商品" />
          <div className="form-horizontal">
            <div className="form-group">
             <label className="col-md-2 control-label">商品名称</label>
              <div className="col-md-5">
                <input type="text" className="form-control" placeholder="请输入商品名称"/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品描述</label>
              <div className="col-md-5">
                <input type="text" className="form-control" placeholder="请输入商品描述"/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">所属分类</label>
              <CategorySelector onCategoryChange = {
                 (categoryId,parentCategoryId) => {this.handleCateGoryChange(null,categoryId,parentCategoryId)}}
                 />
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品价格</label>
              <div className="col-md-3">
                <div className="input-group">
                  <input type="number" className="form-control" placeholder="请输入商品价格"/>
                  <span className="input-group-addon" >元</span>
                </div> 
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品库存</label>
              <div className="col-md-3">
                <div className="input-group">
                    <input type="number" className="form-control" placeholder="库存"/>
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
              <label className="col-md-2 control-label">商品详情</label>
              <div className="col-md-10">
                detail
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary">提交</button>
              </div>
            </div>
        </div>
      </div>
      )
  }
}
export default ProductSave