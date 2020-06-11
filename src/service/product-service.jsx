import Util from "util/mm.jsx"
const _mm = new Util()
class Product{
  //获取用户列表
  getProductList(listParam){
    let url = ""
    let data = {}
    if(listParam.listType === "list"){
      url = "/manage/product/list.do"
      data.pageNum = listParam.pageNum
    }else if (listParam.listType === "search"){
      url = "/manage/product/search.do"
      data.pageNum = listParam.pageNum
      data[listParam.searchType] = listParam.keyword
    }
    return _mm.request({
      type: "post",
      url: url,
      data: data
    })
  }
  setProductStatus(productInfo){
    return _mm.request({
      type: "post",
      url: "/manage/product/set_sale_status.do",
      data: productInfo
    })
  }
  //检查保存商品的表单数据
  checkProduct(product){
    let result = {
      status: true,
      msg:"验证通过"
    }
    if(typeof product.name !== "string" || product.name.length === 0){
      return {
        status: false,
        msg: "商品名称不能为空"
      }
    }
    if(typeof product.subtitle !== "string" || product.subtitle.length === 0){
      return {
        status: false,
        msg: "商品描述不能为空"
      }
    }
    
    if(typeof product.categoryId !== "number" || !(product.categoryId > 0)){
      return {
        status: false,
        msg: "请选择商品品类"
      }
    }
    if(typeof product.price !== "number" || !(product.price >= 0)){
      return {
        status: false,
        msg: "请输入正确的商品价格"
      }
    }
    if(typeof product.stock !== "number" || !(product.stock >=0)){
      return {
        status: false,
        msg: "请输入正确的商品库存"
      }
    }
    
    return result
  }
  saveProduct(product){
     return _mm.request({
      type: "post",
      url: "/manage/product/save.do",
      data: product
    })
  }
  //品类管理相关
  getCategoryList(parentCategoryId){
    return _mm.request({
      type: "post",
      url: "/manage/category/get_category.do",
      data: {
        categoryId: parentCategoryId
      }
    })
  }
}
export default Product