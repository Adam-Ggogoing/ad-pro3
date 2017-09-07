import $ from 'n-zepto'
import "./lucky.less"
import common from 'widget/common'
import message from 'xzs-message'
import _ from 'underscore'
import login from 'widget/login'
import ajax from 'widget/ajax'
import util from 'widget/util'
import html from './lucky.html'
import hybird from 'xzs-hybird'
import {getUrlParam} from 'xzs-util'

var lotteryId = getUrlParam('id')||'1'

var startFunc = (cb) => {
  $(()=>{
    window.setTimeout(()=>{
      login.check((result,modules)=>{
        if(result){

            // 获取抽奖次数
            ajax({
              url:'/lottery/getlotterydrawcount.json',
              domain:'trade',
              type:'post',
              processData:false,
              contentType:'text/html',
              data:JSON.stringify({
                "version":1,
                "src":"h5",
                "data":{
                  "userId":modules.userId+'',
                  lotteryId
                },
                "appversion":"1"
              }),
              success(result){
                if(result.success){
                  return cb(modules,result.module)
                }else{
                  return cb(modules,0)
                }
              }
            })
        }else{
          login.gotoLogin()
        }
      })

    },300)
  })
}

document.title="速懒鲜生刮刮乐"

startFunc((modules,count)=>{

  var content = $('#content')

  content.append(_.template(html)({
    top:require('./pic/guajiang_02.jpg'),
    count,
    download:util.download
  }))

  var canvas = document.getElementById('canvas')
  var textDom = $('.text')

  // 加载效果暂时不要
  $('.loading-img').css('opacity',0)

  // 初始化canvas
  // canvas 长宽设置
  var fontSize = parseInt($('html').css('font-size'))
  var dpr = parseInt($('html').attr('data-dpr'))||1
  var height = parseInt(3.7*fontSize)
  var width = parseInt(8*fontSize)
  canvas.width = width
  canvas.style.width = width
  canvas.height = height
  canvas.style.height = height

  var context = canvas.getContext('2d')

  context.fillStyle = '#999'
  context.fillRect(0,0,width,height)
  context.fillStyle = "white"
  context.font = `900 ${fontSize}px Microsoft yahei`
  context.fillText('猛刮此处',fontSize*2,fontSize*2)
  context.globalCompositeOperation = 'destination-out'

  var dom = $(canvas)
  var arr = []
  var radius = 25*dpr

  // 发起抽奖请求
  var getLucky = _.once(() => {
    ajax({
      url:'/lottery/lotterydraw.json',
      domain:'trade',
      type:'post',
      processData:false,
      contentType:'text/html',
      data:JSON.stringify({
        "version":1,
        "src":"h5",
        "data":{
          "userId":modules.userId+'',
          lotteryId
        },
        "appversion":"1"
      }),
      success(result){
        if(result.success){
          var {winning,lotteryName,endTime} = result.module
          if(winning){
            textDom.html(`
              <p>恭喜您获得</p>
              <p>${lotteryName}</p>
            `)
          }else{
            textDom.html(`
              <p>您未中奖</p>
              <p>不要伤心，再来过</p>
            `)
          }
        }else{
          message(result.errorMsg,5000)
        }
      }
    })
  })

  // 刮奖结束
  var endAction = _.once(() => {
    if(count !== 0){
      $('.guajiang .btn-group').css('display','block')
      $('.count span').html(`${count-1}次`)
      dom.hide()
      if(hybird.isAndroid()||hybird.isIos()){
        $('.guajiang .btn-group .view').css('display','none')
        $('.guajiang .btn-group span').css('display','none')
      }
    }
  })

  // 计算百分比
  var throttled = _.throttle(()=>{
    var imgData = context.getImageData(0,0,width,height)
    var pixles = imgData.data
    var  transPixs = []
    for (var i = 0, j = pixles.length; i < j; i += 4) {
      var a = pixles[i + 3];
      if(a < 128) {
        transPixs.push(i);
      }
     }
    var percent = (transPixs.length / (pixles.length / 4) * 100).toFixed(2);
    if(percent>3){
      getLucky()
    }
    if(percent>50){
      endAction()
    }
  },200)

  // 手势移动时 将相应位置绘制成透明
  dom.on('touchmove',(e)=>{
    var {touches} = e
    var offset = dom.offset()
    var list = arr.map.call(touches,touch=>({
      x:touch.pageX-offset.left,
      y:touch.pageY-offset.top
    }))
    list.map(point=>{
      var radgrad = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
      radgrad.addColorStop(0, 'rgba(0,0,0,0.8)');
      radgrad.addColorStop(1, 'rgba(0,0,0, 0)');
      context.beginPath()
      context.fillStyle = radgrad
      context.arc(point.x, point.y, radius, 0, Math.PI * 2, true)
      context.fill()
      context.closePath()
    })

    throttled()

    e.preventDefault()
    return false

  })

  $('.guajiang .continue').on('click',()=>{
    window.location.href=`act-lucky.html?r=${Math.random()}`
  })

})
