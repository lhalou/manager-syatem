import React,{Component} from "react"
import PageTitle from "component/page-title/index.jsx"
import Order from "service/order-service.jsx"
import Util from "util/mm.jsx"
import TableList from "util/table-list/index.jsx"
import "./detail.scss"
const _mm = new Util()
const _order = new Order()
class OrderDetail extends Component {
  constructor(props){
    super(props),
    this.state = {
      orderNumber: this.props.match.params.orderNumber,
      orderInfo: {}
    }
   
  }
  componentDidMount(){
    this.loadOrderDetail() //加载商品详情
  }
  loadOrderDetail(){
    _order.getOrderDetail(this.state.orderNumber).then((res) => {
        this.setState({
          orderInfo: res
        })
      },(errMsg) => {
        _mm.errorTips(errMsg)
    })    
  }
  
  render(){
    let receiverInfo = this.state.orderInfo.shippingVo || {}
    let productList = this.state.orderInfo.orderItemVoList || []
    return(
      <div id = "page-wrapper">
        <PageTitle title = "订单详情" />
          <div className="form-horizontal">
            <div className="form-group">
             <label className="col-md-2 control-label">订单号</label>
              <div className="col-md-5">
                <p className="from-control-static">{this.state.orderInfo.orderNo}</p>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">创建时间</label>
              <div className="col-md-5">
                <p className="from-control-static">{this.state.orderInfo.createTime}</p>
               
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">收件人</label>
              <div className="col-md-5">
                <p className="from-control-static">
                {receiverInfo.receiverName}，
                {receiverInfo.receiverProvince}
                {receiverInfo.receiverCity}
                {receiverInfo.receiverAddress}
                {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                </p>
               
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">订单状态</label>
              <div className="col-md-5">
                <p className="from-control-static">
                {this.state.orderInfo.statusDesc}
                </p>
               
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">支付方式</label>
              <div className="col-md-5">
                <p className="from-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">订单金额</label>
              <div className="col-md-5">
                <p className="from-control-static">￥{this.state.orderInfo.payment}</p> 
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品列表</label>
              <div className="col-md-10">
              <TableList tableHeaders = {['商品图片','商品信息','单价','数量','合计']}>
                  {
                    productList.map((product,index) => {
                            return (
                              <tr key = {index}>
                                <td>
                                 <img className = "p-img"
                                 src = {`${this.state.orderInfo.imageHost}${product.productImage}`} 
                                 alt= {product.productName}/>
                                </td>
                                <td>{product.productName}</td>
                                <td>￥{product.currentUnitPrice}</td>
                                <td>{product.quantity}</td>
                                <td>￥{product.totalPrice}</td>
                                
                              </tr>
                            )
                    })
                  }
                </TableList>
              </div>
            </div>
        </div>
      </div>
      )
  }
}
export default OrderDetail