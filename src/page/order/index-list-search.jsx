import React,{Component} from "react"


class ListSearch extends Component {
  constructor(props){
    super(props),
    this.state = {
      orderNumber: ''
    }
  }
  handleInputChange(e){
    let name = e.target.name
    let value = e.target.value.trim()
    this.setState({
      [name]: value
    })
  }
  handleSearch(){
    this.props.onSearch(this.state.orderNumber)
  }
  handleKeyUp(e){
    if(e.keyCode ===13){
      this.handleSearch()
    }
  }
  render(){
    return (
      <div className="row search-wrap">
          <div className="col-md-12">
            <div className="form-inline">
              <div className="form-group">
                <select className="form-control"
                >
                  <option value = "">按订单号查询</option>
                </select>
              </div>
              <div className="form-group">
                <input type="text" className = "form-control" placeholder = "订单号"
                  name = "orderNumber"
                onChange = {(e) => {this.handleInputChange(e)}}
                onKeyUp = {(e) => this.handleKeyUp(e)}
                />
              </div>
              <button className="btn btn-primary"
              onClick = {(e) => {this.handleSearch(e)}}
              >搜索</button>
            </div>
          </div>
      </div>
    )
  }
}
export default ListSearch