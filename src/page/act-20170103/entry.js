import "widget/common"

import $ from 'n-zepto'
import _ from 'underscore'

import "./index.less"
import html from './index.html'
import createSingle from 'widget/pit/single-1'

import createModule from 'widget/pit/module-1'
import createModuleTitle from 'widget/pit/moduleTitle-1'

import {getUrlParam} from 'xzs-util'
import ajax from 'widget/ajax'
import util from 'widget/util'

const content=$('#content')

// 根据url中的pageId获取相应的配置
const configMap={
  "1":{
    "title":"速懒鲜生-时令水果",
    "img":require('./pic/floor1.jpg'),
    "background":"#f9daa3"
  },
  "2":{
    "title":"速懒鲜生-严选蔬菜",
    "img":require('./pic/floor2.jpg'),
    "background":"#565c75"
  },
  "3":{
    "title":"速懒鲜生-海底水产",
    "img":require('./pic/floor3.jpg'),
    "background":"#91acc9"
  },
  "4":{
    "title":"速懒鲜生-无肉不欢",
    "img":require('./pic/floor4.jpg'),
    "background":"#bba99f"
  },
  "5":{
    "title":"速懒鲜生-每日乳品",
    "img":require('./pic/floor5.jpg'),
    "background":"#b9f898"
  },
  "6":{
    "title":"速懒鲜生-解馋零食",
    "img":require('./pic/floor6.jpg'),
    "background":"#ece9d6"
  },
  "7":{
    "title":"速懒鲜生-健康粮油",
    "img":require('./pic/floor7.jpg'),
    "background":"#fce18c"
  },
  "8":{
    "title":"速懒鲜生-冷藏食品",
    "img":require('./pic/floor8.jpg'),
    "background":"#a0cae2"
  },
  "9":{
    "title":"速懒鲜生-酒水茶饮",
    "img":require('./pic/floor9.jpg'),
    "background":"#fff643"
  },
  "10":{
    "title":"速懒鲜生",
    "img":require('./pic/floor10.jpeg'),
    "background":"rgb(10, 140, 162)"
  },
  "11":{
    "title":"速懒鲜生",
    "img":require('./pic/floor11.jpg'),
    "background":"#455b8a"
  },
  "12":{
    "title":"速懒鲜生",
    "img":require('./pic/floor12.jpg'),
    "background":"#ffc0c4"
  }

};
const defaultMode='1'
const modeId=getUrlParam('mode')||defaultMode
const config=configMap[modeId]||configMap[defaultMode]

document.title = config.title  

content.css('background-color',config.background)
$('body').css('background-color',config.background)
$('html').css('background-color',config.background)

content.append(_.template(html)({img:config.img}))

const handleResult=(list,content)=>{
  var item=null
  var html='';
  var single=util.picker(list)
  if(single&&single.items&&single.items.length>0){
    html+=createSingle(single.items)
  }

  html+='<div class="act-wrap">'

  for(var i=0;i<list.length;i++){
    item=list[i]
    if(item.items&&item.items.length>0){
      html+=createModuleTitle({title:item.title||item.pageName})
      html+=createModule(item.items)
    }
  }
  html+='</div>'
  content.append(html)
}

const defaultPageId='31'
const pageId=getUrlParam('pageId')||defaultPageId
ajax({
  url:'/requesthome/homepage',
  type:'post',
  data:{
    pageId
  },
  success(result){
    if(result.success){
      handleResult(result.module,content)
    }
  }
})
