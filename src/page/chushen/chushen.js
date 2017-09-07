import common from "widget/common"
import "./chushen.less"
import $ from 'n-zepto'
import ajax from 'widget/ajax'
import _ from 'underscore'


document.title="厨神争霸赛"
const content=$('#content')

content.append(`
  <img class="banner" src="${require('./img/banner_01.png')}" />
  <img class="banner" src="${require('./img/banner_02.png')}" />
  <img class="banner" src="${require('./img/banner_03.png')}" />
  <div class="switch-wrap">
    <div class="switch">
      <div class="switch-item">9月9日参赛选手</div><div class="switch-item">9月10日参赛选手</div>
    </div>
  </div>
  <div class="player-list">

  </div>
  <div class="player-list">

  </div>
  <img class="banner" src="${require('./img/banner_10.png')}" />
  <img class="banner" src="${require('./img/banner_11.png')}" />
`)

$('.switch-item').each((index,item)=>{
  $(item).on('click',()=>{
    var selClass = 'switch-item-sel'
    $('.switch-item').removeClass(selClass).eq(index).addClass(selClass)
    $('.player-list').css('display','none').eq(index).css('display','block')
  })
}).eq(0).trigger('click')

var renderPlayer = playerList => playerList.picList&&playerList.picList.map(player=>`
  <div class="player">
    <img src="${player.picUrl}" />
    <div class="count">
      当前票数 : <span>${player.titleInfo}</span>
    </div>
    <a class="link" detail="${player.targetId}" href="javascript:void(0);"></a>
  </div>
`)

ajax({
  url:'/requesthome/home',
  type:'post',
  data:{
    appversion:"1",
    src:'h5',
    version:"1",
    data:{
      pageId:common.isProd?90:306
    }
  },
  success(result){
    if(result.success){
      var modules = result.module
      $('.player-list').eq(0).html(renderPlayer(modules[0]||{}))
      $('.player-list').eq(1).html(renderPlayer(modules[1]||{}))
    }
  }
})

// banner吸顶
var isSupportSticky = function(){
  // 判断是否支持sticky属性
  var prefixTestList = ['-webkit-'];
  var stickyText = '';
  for (var i = 0; i < prefixTestList.length; i++ ) {
      stickyText += 'position:' + prefixTestList[i] + 'sticky;';
  }
  // 创建一个dom来检查
  var div = document.createElement('div');
  var body = document.body;
  div.style.cssText = 'display:none;' + stickyText;
  body.appendChild(div);
  var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
  body.removeChild(div);
  div = null;
  return isSupport;
}

var switchWrap = $('.switch-wrap')
var switchTab = $('.switch')
if(isSupportSticky()){
   switchWrap.css({'position':'sticky','position':'-webkit-sticky',top:0,'z-index':2})
 }
var scroll = _.throttle(()=>{
  var scrollTop=$(window).scrollTop()
  var offsetY = switchWrap.offset().top

  if(!isSupportSticky()){
    if(scrollTop>offsetY){
      switchTab.css({position:'fixed'})
    }else{
      switchTab.css({position:'relative'})
    }
  }
},200)

$(window).on('scroll',scroll)

var setShare = () => {
  wx.onMenuShareAppMessage({
    title:'厨神争霸赛',
    desc:"参与投票免费送大米or哈密瓜",
    link:window.location.href,
    imgUrl:'http://a.xianzaishi.com/mobile/logo_5a3df7fc231dd1e114315201965dce06.png'
  })
  wx.onMenuShareTimeline({
    title:'厨神争霸赛-参与投票免费送大米or哈密瓜',
    link:window.location.href,
    imgUrl:'http://a.xianzaishi.com/mobile/logo_5a3df7fc231dd1e114315201965dce06.png'
  })
}
// 设置分享链接
ajax({
  url:`/order/getWeixinWapPayTicket.json`,
  type:'post',
  domain:'trade',
  contentType:'application/json',
  processData:false,
  data:JSON.stringify({
    appversion:"1",
    src:'h5',
    version:"1",
    data:{
      url:window.encodeURIComponent(location.href.split('#')[0])
    }
  }),
  success(result){
    if(result.success){
      var {timestamp,noncestr,appId,paySign} = result.data
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp:parseInt(timestamp), // 必填，生成签名的时间戳
        nonceStr: noncestr, // 必填，生成签名的随机串
        signature: paySign,// 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(()=>{
        setShare()
      })
    }
  }
})

setShare()
