import "widget/common"

import $ from 'n-zepto'
import _ from 'underscore'
import createModule from 'widget/pit/module-2'
import createTitle from 'widget/pit/title-2'
import createTopModule from 'widget/pit/module-0112'

import html from './act.html'
import "./act.less";

import {getUrlParam} from 'xzs-util'
import ajax from 'widget/ajax'
import util from 'widget/util'
const defaultPageId='31'
const pageId=getUrlParam('pageId')||defaultPageId

const content=$('#content')
content.append(_.template(html)({pageId}))

const topit=$('<div class="act-top"></div>')
content.append(topit)

var handleResult=(list,content)=>{
  content.append(createModule(list))
}
var handleFirst=(obj,content)=>{
  topit.append(createTitle(obj.title||obj.pageName))
  var {items}=obj;
  var descMap=require('./data.json');
  for(var i=0;i<items.length;i++){
    if(items[i].itemId in descMap){
      items[i].desc=descMap[items[i].itemId]
    }
  }
  topit.append(createTopModule(items))
}

ajax({
  url:'/requesthome/homepage',
  type:'post',
  data:{
    pageId
  },
  success(result){
    if(result.success){
      var module=result.module;
      if(_.isArray(module)){
        var first=util.picker(module)
        if(first){
          handleFirst(first,content)
          handleResult(module,content)
        }
      }
    }
  }
})
