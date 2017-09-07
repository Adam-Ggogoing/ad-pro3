import $ from 'n-zepto'
import common from 'widget/common'
const content=$('#content')


// loading样式
const loading=$(`<img class="loading-img" src="${require('./loading.gif')}"/>`).css({
  position:'fixed',
  zIndex:999,
  width:'1.5rem',
  height:'1.5rem',
  display:'none',
  left:'0',
  right:0,
  top:'0',
  bottom:0,
  margin:'auto',
  padding:0
})
content.append(loading)

$(document).on('ajaxStart', function(e, xhr, options){
  loading.css('display','block')
})
$(document).on('ajaxStop', function(e, xhr, options){
  loading.css('display','none')
})
var domainMap = {
  'item':{
    'dev':'//item.xianzaishi.net/wapcenter',
    'prod':'//item.xianzaishi.com'
  },
  'trade':{
    'dev':'//trade.xianzaishi.net',
    'prod':'//trade.xianzaishi.com'
  },
  'purchase':{
    'dev':'//purchaseop.xianzaishi.net/purchaseadmin',
    'prod':'//purchaseop.xianzaishi.com'
  }
}
export default function(options){

  var originUrl = options.url
  var domainName = options.domain||'item'
  var domain = domainMap[domainName]
  if(common.isDev||common.isQa){
    options.url=domain.dev+options.url
  }
  if(common.isProd){
    options.url=domain.prod+options.url
  }
  if(domainName==='item'&&options.type!=='get'){
    options.contentType="text/plain"
    options.processData=false
    options.dataType='html'
    options.data=JSON.stringify(options.data)
  }

  // 在requesthome/homepage这个接口中 将http 协议字符去掉
  var originSuccess = options.success||function(){}
  options.success = function(result,status,xhr){
    var handleResult = result
    if(typeof(result)==='string'){
      handleResult = JSON.parse(result)
    }
    if(originUrl.indexOf('/requesthome/homepage')!==-1){
      var fixHttp = (str) => (str?str.replace(/^https?\:/,''):'')
      if(handleResult.success){
        var {module} = handleResult
        for(var i=0;i<module.length;i++){
          if(module[i].items) for(var j=0;j<module[i].items.length;j++){
            module[i].items[j].picUrl = fixHttp(module[i].items[j].picUrl)
          }
        }
      }
    }

    originSuccess.apply(options,[handleResult,status,xhr])
  }

  return $.ajax(options)
}
