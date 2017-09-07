import createToken from 'xzs-token'
import ajax from 'widget/ajax'

const isProd=process.env.NODE_ENV==='production'
var token = createToken(isProd)
var mUrl = isProd?'//m.xianzaishi.com/mobile':'//m.xianzaishi.net/mobile'

var checkCache = null
export default {
  gotoLogin(){
    window.location.href=`${mUrl}/login.html?redicret=${window.escape(window.location.href)}`
  },
  check(callback){
    var cb = callback||function(){}
    var tokenValue = token.get()
    if(!tokenValue||token==='(null)'||token==='null'){
      return cb(false)
    }
    if(checkCache!==null){
      cb(true,checkCache,tokenValue)
    }
    ajax({
      url:'/requestuser/mine',
      type:'post',
      data:{
        token:tokenValue
      },
      success(result){
        if(result.success){
          checkCache = result.module
          cb(true,result.module,tokenValue)
        }else{
          // 用户不存在
          if(result.resultCode===-7){
            token.clear()
          }
          cb(false)
        }
      }
    })
  }
}
