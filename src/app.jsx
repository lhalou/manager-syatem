import React, {
  Component
} from "react"
import ReactDOM from "react-dom"
import {BrowserRouter,Switch,Route,Redirect} from "react-router-dom"

import Layout from "component/layout/index.jsx"
//page路径在webpack.config.json中设置了
import Home from "page/home/index.jsx"
import ProductRouter from "page/product/router.jsx"
import Login from "page/login/index.jsx"
import ErrorPage from "page/error/index.jsx"
import UserList from "page/user/index.jsx"
import OrderList from "page/order/index.jsx"
class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path = "/login" component = {Login}/>
          <Route path = "/" render = { props => (
            <Layout>
              <Switch>
                <Route path = "/" exact component = {Home} />
                <Route path = "/product"  component = {ProductRouter} />
                <Route path = "/product-category" component = {ProductRouter} />
                <Route path = "/order/index" component = {OrderList}/>
                <Route path = "/user/index" component = {UserList}/>
                <Redirect exact from = "/user" to = "/user/index"/>
                <Redirect exact from = "/order" to = "/order/index"/>
                <Route component  = {ErrorPage}/>
              </Switch>
            </Layout>  
          )}/>
        </Switch>
           
      </BrowserRouter>
      
    )
  }
}
ReactDOM.render( <App/> , document.getElementById("app"))