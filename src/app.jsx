import React, {
  Component
} from "react"
import ReactDOM from "react-dom"
import {BrowserRouter,Switch,Route,Redirect} from "react-router-dom"

import Layout from "component/layout/index.jsx"
//page路径在webpack.config.json中设置了
import Home from "page/home/index.jsx"
import Login from "page/login/index.jsx"
import ErrorPage from "page/error/index.jsx"
import UserList from "page/user/index.jsx"
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
                <Route path = "/product" exact component = {Home} />
                <Route path = "/product-category" exact component = {Home} />
                <Route path = "/user/index" component = {UserList}/>
                <Redirect exact from = "/user" to = "/user/index"/>
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