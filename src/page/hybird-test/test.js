import common from 'widget/common'
import hybird from 'xzs-hybird'
import "./test.less"
import createModule from 'widget/pit/module-1'
import createModule1 from 'widget/pit/module-0309'
import ajax from 'widget/ajax'
import {cookie} from 'xzs-util'
import message from 'xzs-message'

var mock=[
  {
    discountPrice:4980,
    discountPriceYuanString:"49.80",
    feature:null,
    inventory:1,
    itemId:10201787,
    picUrl:"http://img.xianzaishi.com/2/1478361351100.jpeg",
    price:4980,
    priceYuanString:"49.80",
    sku:"10184",
    subtitle:"法式小切",
    title:"美勒牧场羔羊原切系列法式小切400g",
    itemSkuVOs:[
      {
        "skuId":10357,
        "itemId":10201787,
        "inventory":1,
        "skuUnit":3,
        "title":"泰国进口金枕榴莲散装",
        "quantity":0,
        "promotionInfo":null,
        "price":15520,
        "discountPrice":15520,
        "priceYuanString":"155.20",
        "discountPriceYuanString":"155.20",
        "saleDetailInfo":"散称1份/2000g",
        "originplace":"泰国",
        "tags":"11000000000000000",
        "tagDetail":{
          "skuId":10357,
          "mayPlus":true,
          "mayOrder":true,
          "maySale":true,
          "specialTag":true,
          "channel":1,
          "tagContent":null
        }
      }
    ]
  },{
    discountPrice:4980,
    discountPriceYuanString:"49.80",
    feature:null,
    inventory:1,
    itemId:10201787,
    picUrl:"http://img.xianzaishi.com/2/1478361351100.jpeg",
    price:4980,
    priceYuanString:"49.80",
    sku:"10184",
    subtitle:"法式小切",
    title:"美勒牧场羔羊原切系列法式小切400g",
    itemSkuVOs:[
      {
        "skuId":10357,
        "itemId":10201787,
        "inventory":1,
        "skuUnit":3,
        "title":"泰国进口金枕榴莲散装",
        "quantity":0,
        "promotionInfo":null,
        "price":15520,
        "discountPrice":15520,
        "priceYuanString":"155.20",
        "discountPriceYuanString":"155.20",
        "saleDetailInfo":"散称1份/2000g",
        "originplace":"泰国",
        "tags":"11000000000000000",
        "tagDetail":{
          "skuId":10357,
          "mayPlus":true,
          "mayOrder":true,
          "maySale":true,
          "specialTag":true,
          "channel":1,
          "tagContent":null
        }
      }
    ]
  }
];
var content=$('#content')


content.append(`<img class="banner" src="${require('./banner1.jpeg')}" />`)
content.append(`<img class="banner getCoupon" src="${require('./banner2.jpg')}" />`)

content.on('click','.getCoupon',()=>{
  var isApp = hybird.isAndroid()||hybird.isIos()
  var token = isApp?hybird.getToken():cookie.get('token')
  if(!token||token==='(null)'||token==='null'){
    if(common.isQa||common.isDev){
      window.location.href='//m.xianzaishi.net/mobile/login.html?redicret='+window.location.href
    }else{
      window.location.href='//m.xianzaishi.com/mobile/login.html?redicret='+window.location.href
    }
    return
  }
  ajax({
    url:'/promotion/addDiscountCoupon',
    type:'get',
    data:{
      type:1,
      couponId:18,
      token
    },
    success(result){
      message(result)
      result=JSON.parse(result)
      if(result.success){
        message('领券成功,'+result.errorMsg)
      }else{
        message(result.errorMsg||'领取失败')
      }

    }
  })
})

content.append('<div class="title">点击添加购物车</div>')
content.append(createModule(mock))

content.append('<div class="title">女性节坑位</div>')
content.append(createModule1(mock))
