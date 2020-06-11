import React,{Component} from "react"
import "./category-selector.scss"
import Product from "service/product-service.jsx"
import Util from "util/mm.jsx"
const _mm = new Util()
const _product = new Product()
class CategorySelector extends Component {
  constructor(props){
    super(props),
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    }
  }
  componentDidMount(){
    this.loadCategoryList()
  }
  //分类回填
  componentWillReceiveProps(nextProps){
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId
    let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
    if(!categoryIdChange && !parentCategoryIdChange){return;}
    if(nextProps.parentCategoryId === 0){
      this.setState({
        firstCategoryId: nextProps.categoryId,
        secondCategoryId: 0,
      })
    }else {
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: nextProps.categoryId,
      },() => {
        parentCategoryIdChange && this.loadSecondCategory()
      })
    }
  }
  //加载一级品类
  loadCategoryList(){
    _product.getCategoryList().then(res => {
     
      this.setState({
        firstCategoryList: res
      })
    },errMsg => {
      _mm.errorTips(errMsg)
    })
  }
  //选择一级品类
  handleFirstCategoryList(e){
    if(this.props.readOnly){
      return;
    }
    let newValue = e.target.value
    this.setState({
      //选中一级品类，并清空二级品类
      firstCategoryId: newValue,
      secondCategoryList: [],
      secondCategoryId: 0
    },//加载二级品类
    () => {
      this.loadSecondCategory()
      this.onPropsCategroyChange()
    })
  }
  //加载二级品类
  loadSecondCategory(){
    if(this.props.readOnly){
      return;
    }
     _product.getCategoryList(this.state.firstCategoryId).then(res => {
      
      this.setState({
        secondCategoryList: res
      })
    },errMsg => {
      _mm.errorTips(errMsg)
    })
  } 
  //二级品类的change 事件
  handleSecondCategoryList(e){
    let newValue = e.target.value
    this.setState({
      secondCategoryId: newValue
    },//加载二级品类
    () => {
      this.onPropsCategroyChange()
    })
  } 
 //传给父组件中的结果
  onPropsCategroyChange(){
    let category = typeof this.props.onCategoryChange === "function"
    if(this.state.secondCategoryId){
      category && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId)
    }else{
      category && this.props.onCategoryChange(this.state.firstCategoryId,0)
    }
  }
  render(){
   
    return (
       <div className="col-md-10">
        <select className="form-control cate-select"
        value = {this.state.firstCategoryId}
        readOnly = {this.props.readOnly}
        onChange = {(e) => {this.handleFirstCategoryList(e)}}
        >
          <option value = "" className = "cate-option">请选择一级分类</option>
          {
            this.state.firstCategoryList.map(
              (category,index)=>
                <option key = {index} value = {category.id} className = "cate-option">{category.name}</option>
            )
          }
        </select>
        {
          this.state.secondCategoryList.length ? 
             (<select name = "" className="form-control cate-select"
             value = {this.state.secondCategoryId }
             readOnly = {this.props.readOnly}
             onChange = {(e) => {this.handleSecondCategoryList(e)}}
             >
                <option value = "">请选择二级分类</option>
                  {
                    this.state.secondCategoryList.map(
                      (category,index)=>
                        <option key = {index} value = {category.id} className = "cate-option">{category.name}</option>
                    )
                  }
            </select>)
          : null
        }
        
      </div>
    )
  }
}
export default CategorySelector