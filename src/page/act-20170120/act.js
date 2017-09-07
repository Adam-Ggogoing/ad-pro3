import "widget/common"

import $ from 'n-zepto'
import _ from 'underscore'

import "./act.less"
import html from './act.html'

import createModule from 'widget/pit/module-1'
import createModuleTitle from 'widget/pit/moduleTitle-2'
import createModuleSpace from 'widget/pit/moduleSpace'

import {getUrlParam} from 'xzs-util'
import ajax from 'widget/ajax'
import util from 'widget/util'

const content=$('#content')
content.append(html);
// 根据url中的pageId获取相应的配置
const handleResult=(list,content)=>{
	var item=null;
  	var html='';
  	for(var i=0;i<list.length;i++){
    item=list[i]
    if(item.items&&item.items.length>0){
      html+=createModuleTitle({title:item.title||item.pageName})
      html+=createModule(item.items)
    }
   }
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
