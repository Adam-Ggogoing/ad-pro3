import "swiper/dist/css/swiper.min.css"
import "./slide.less"
import ajax from 'widget/ajax'
import {getUrlParam} from 'xzs-util'

var slide = require('swiper/dist/js/swiper.min.js')
var slideId = getUrlParam('id')

var body = $('body')
var render = ({picList,frequency}) => {
  var html = $(`
    <div class="swiper-container">
      <div class="swiper-wrapper">
        ${picList.map(image=>{
          return `<div class="swiper-slide" style="background-image:url(${image.replace('http:','')})"></div>`
        }).join('')}
      </div>
    </div>
  `)

  html.css({height,width})

  body.html('').append(html)

  return new Swiper ('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: frequency||2000,
    autoplayDisableOnInteraction: false,
    effect:'fade'
  })
}

var height = $(window).height()
var width = $(window).width()
var version = undefined


var fetch = ()=>ajax({
  url:'/tvadvertisement/getadpicture/',
  domain:'purchase',
  type:'post',
  contentType:'application/json',
  data:JSON.stringify({"appversion":"1","data":slideId,"src":"erp","version":1}),
  success(result){
    var modules = result.module||{}

    // 检测是否自动重启
    if(version!==undefined&&version!==modules.version){
      window.location.reload()
      return
    }
    if(result.success){
      version = modules.version
      render(modules)
    }else{
      body.html(result.errorMsg)
    }
  }
})
fetch()

window.setInterval(fetch,2*60*1000)
