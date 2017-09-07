import hybird from "widget/hybird"
hybird.setTitle('节后解腻')

import "widget/common"

import $ from 'n-zepto'
import _ from 'underscore'

import "./act.less"
import {getUrlParam} from 'xzs-util'
import ajax from 'widget/ajax'
import util from 'widget/util'
import createSingle from 'widget/pit/single-2'
import createModule from 'widget/pit/module-3'

const content=$('#content')

var img1 = require('./pic/img1.png')
var img2 = require('./pic/img2.jpg')
var img3 = require('./pic/img3.jpg')

var html = '';

html += '<img class="banner" src="'+img1+'"/>'
html += '<img class="banner" src="'+img2+'"/>'
html += '<img class="banner" src="'+img3+'"/>'
html += '<a item-id="10204842" sku-id="11294" class="target">$</a>'

content.append(html);

var handleResult = (modules,content) => {
  var html = ''
  // 第一层坑位
  html += createSingle(modules[0].items||[])

  // 菌菇清肠
  if(modules[1]){
    html += `
      <img class="banner" src="${require('./pic/img4.jpg')}"/>
      <div class="jungu-memo">
        <span>菌香浓郁</span>
        <span>|</span>
        <span>纯净免洗</span>
      </div>
      <div class="jungu">${createModule(modules[1].items||[])}</div>
    `
  }

  // 蔬菜汁清肠
  if(modules[2]){
    html += `
      <img class="banner" src="${require('./pic/img5.jpg')}"/>
      <div class="shucai">${createModule(modules[2].items||[])}</div>
    `
  }

  // 精选清肠水果
  if(modules[3]){
    html += `
      <img class="banner" src="${require('./pic/img6.jpg')}"/>
      <div class="jingxuan">${createModule(modules[3].items||[])}</div>
    `
  }

  // 高纤维清肠水果
  if(modules[4]){
    html += `
      <img class="banner" src="${require('./pic/img7.jpg')}"/>
      <div class="qianwei">${createModule(modules[4].items||[])}</div>
    `
  }

  // 返回顶部
  html += `<img class="banner backtotop" src="${require('./pic/img8.jpg')}"/>`

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
