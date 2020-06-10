import React,{Component} from "react"


class ListSearch extends Component {
  constructor(props){
    super(props),
    this.state = {
      searchType: "productId",
      searchKeyword: ''
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
    this.props.onSearch(this.state.searchType,this.state.searchKeyword)
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
                name = "searchType"
                onChange = {(e) => {this.handleInputChange(e)}}
                >
                  <option value = "productId">按商品ID查询</option>
                  <option value = "productName">按商品名称查询</option>
                </select>
              </div>
              <div className="form-group">
                <input type="text" className = "form-control" placeholder = "关键词"
                  name = "searchKeyword"
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