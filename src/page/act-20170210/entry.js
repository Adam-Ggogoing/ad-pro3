import hybird from 'widget/hybird'
hybird.setTitle('情人节')

import "widget/common"

import $ from 'n-zepto'
import _ from 'underscore'

import "./index.less"
import html from './index.html'
import createSingle from 'widget/pit/single-1'

import createModule from 'widget/pit/module-1'

import {getUrlParam} from 'xzs-util'
import ajax from 'widget/ajax'
import util from 'widget/util'

const content=$('#content')

// 根据url中的pageId获取相应的配置
const configMap={
  "1":{
    "img":require('./pic/floor12.jpg'),
    "background":"#ffc0c4"
  }
};
const defaultMode='1'
const modeId=getUrlParam('mode')||defaultMode
const config=configMap[modeId]||configMap[defaultMode]

content.css('background-color',config.background)
$('body').css('background-color',config.background)
$('html').css('background-color',config.background)

content.append(_.template(html)({img:config.img}))

const handleResult=(modules,content)=>{
  var html = ''
  // 第一层坑位
  html += '<div id="chang1" class="chang1">'
  html += createSingle(modules[0].items)
  html += '</div>'
  // 相恋
  if(modules[1]){
    html += `
      <img class="banner" src="${require('./pic/title2.jpg')}"/>
      <div class="xlian"><div class="chang1">${createModule(modules[1].items||[])}</div></div>
    `
  }
   // 相知
  if(modules[2]){
    html += `
      <img class="banner" src="${require('./pic/title3.jpg')}"/>
      <div class="xzhi">${createModule(modules[2].items||[])}</div>
    `
  }
   // 相守
  if(modules[3]){
    html += `
      <img class="banner" src="${require('./pic/title4.jpg')}"/>
      <div class="xshou">${createModule(modules[3].items||[])}</div>
    `
  }


  content.append(html)
}

var handleSingle = () =>{
	var list = [require('./pic/top0.png'),require('./pic/top1.png'),require('./pic/top2.png'),require('./pic/top3.png')]
	var pits = $('#chang1 .pit-1')
	for(var i=0;i<pits.length;i++){
		var pit = pits.eq(i)
		var s=i%4;
		pit.append(`<div class="position-top"><img class="size" src="${list[s]}"></img></div>`)
	}
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
    handleSingle()
  }
})
