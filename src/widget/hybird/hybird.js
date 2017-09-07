// 供app端注入客户端标示和版本号
window.setXzsVersion=function (platform,version){
  window.xzsPlatform = platform
  window.xzsVersion = version
}

// 打开详情页
var openDetail = (itemId) => {
  if(typeof(showSendMsg)!=="undefined"){
    return showSendMsg.postMessage(itemId)
  }
  if(
    window.webkit&&
    window.webkit.messageHandlers&&
    window.webkit.messageHandlers.showSendMsg&&
    typeof window.webkit.messageHandlers.showSendMsg.postMessage === 'function'
  ){
    return window.webkit.messageHandlers.showSendMsg.postMessage(itemId)
  }
}

// 加购物车
var addItemToCart = (list) => {
  if(typeof(showSendMsg)!=='undefined'){
    return showSendMsg.addItemToCart(list[0],list[1])
  }
  if(
    window.webkit&&
    window.webkit.messageHandlers&&
    window.webkit.messageHandlers.addItemToCart&&
    typeof window.webkit.messageHandlers.addItemToCart.postMessage === 'function'
  ){
    return window.webkit.messageHandlers.addItemToCart.postMessage(list)
  }
}

export default {
  openDetail,
  addItemToCart(itemId,skuId){
    if(typeof(window.xzsPlatform)==='undefined'){
      return openDetail(itemId)
    }else{
      return addItemToCart([itemId,skuId])
    }
  },
  setTitle(title){
    document.title=title
  }
}
