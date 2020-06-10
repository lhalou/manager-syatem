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