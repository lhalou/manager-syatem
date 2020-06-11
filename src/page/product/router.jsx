import React,{Component} from "react"
import {Switch,Route,Redirect} from "react-router-dom"
import ProductList from "page/product/index/index.jsx"
import ProductSave from "page/product/index/save.jsx"
import ProductDetail from "page/product/index/detail.jsx"
class ProductRouter extends Component {
  render(){
    return (
      <Switch>
        <Route path = "/product/index" component = {ProductList}/>
        {/* ?表示可选的 */}
        <Route path = "/product/save/:pid?" component = {ProductSave} />
        <Route path = "/product/detail/:pid" component = {ProductDetail} />
        <Redirect exact from = "/product" to = "/product/index"/> 
      </Switch>
    )
  }
}
export default ProductRouter