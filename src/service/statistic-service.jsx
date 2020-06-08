import Util from "util/mm.jsx"
const _mm = new Util()
class Statistic{
  //用户登录
  getHomeCount(){
    return _mm.request({ 
      url: "/manage/statistic/base_count.do",
      
    })
  }


}
export default Statistic