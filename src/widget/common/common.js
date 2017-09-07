import "dwd-rem"
import "./common.less"
import $ from 'n-zepto'
import hybird from 'xzs-hybird'
import ajax from 'widget/ajax'
import login from 'widget/login'
import message from 'xzs-message'

const isDev=process.env.NODE_ENV==='development'
const isQa=process.env.NODE_ENV==='qa'
const isProd=process.env.NODE_ENV==='production'
const content=$('#content')
const isApp = () => hybird.isAndroid()||hybird.isIos()

var mUrl = isProd?'//m.xianzaishi.com/mobile':'//m.xianzaishi.net/mobile'

if(isDev){
  // 开发环境添加额外功能
  const toolbar=$('<div class="toolbar"></div>')
  const link=$('<a class="toolbar-frash">刷新</a>')
  link.on('touchstart',e=>{
    window.location.href=window.location.href
  })
  content.append(toolbar)
  toolbar.append(link)

}

var openDetail = (itemId) => {
  if(isApp()){
    hybird.openDetail(itemId)
  }else{
    window.location.href=`${mUrl}/detail.html?id=${itemId}`
  }
}
// 点击带有detail的链接就app跳转
content.on('click','a[detail]',e=>{
  var element=$(e.currentTarget)
  openDetail(element.attr('detail'))
})

var addItemToCart = (itemId,skuId) => {
  if(isApp()){
    hybird.addItemToCart(itemId,skuId)
  }else{
    login.check((result,modules)=>{
      if(result){
        ajax({
          url:'/sc/appendItem.json',
          domain:'trade',
          type:'post',
          data:{
            uid:modules.userId,
            itemId:itemId,
            skuId:skuId,
            itemCount:1
          },
          success:function(res){
            if(res.success){
              message('添加购物车成功')
            }else{
              message(res.errorMsg)
            }
          }
        })
      }else{
        openDetail(itemId)
      }
    })
  }
}
// 点击带有sku-id item-id的链接添加购物车
content.on('click','a[sku-id]',e=>{
  var element=$(e.target)
  addItemToCart(element.attr('item-id'),element.attr('sku-id'))
})

// 回到顶部
content.on('click','.backtotop',e=>{
  $(window).scrollTop(0)
})

$(()=>{
  content.css('opacity',1)
})

export default {
  isDev,isQa,isProd
}
