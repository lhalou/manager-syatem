import React,{Component} from "react"
import {Switch,Route,Redirect} from "react-router-dom"
import ProductList from "./index/index.jsx"

class ProductRouter extends Component {
  render(){
    return (
      <Switch>
        <Route path = "/product/index" component = {ProductList}/>
        <Redirect exact from = "/product" to = "/product/index"/> 
      </Switch>
    )
  }
}
export default ProductRouter