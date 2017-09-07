import "widget/common"

import $ from 'n-zepto'
import _ from 'underscore'

import html from './persell.html'
import "./persell.less";

import ajax from 'widget/ajax'
import createModule from 'widget/pit/module-3'
import createModuleSpace from 'widget/pit/moduleSpace'
import createModuleVideo from 'widget/pit/module-video'

import {getUrlParam} from 'xzs-util'

const content=$('#content')
content.append(html)

var handleResult=(list,list2,content)=>{
  content.append(
	createModule(list),
	createModuleSpace([
	{
		url:require("./pic/timemessage.png")
	}
	]),
	createModule(list2),
	createModuleSpace([
	{
		url:require("./pic/sellmsg.png")
	}
	]),
	createModuleVideo([
	{
		videoUrl:"http://player.youku.com/embed/XNzYzMjU1NzY="
	}
	]),
	createModuleSpace([
	{
		url:require("./pic/bottom.jpg")
	}
	]),

)
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
      handleResult(result.module[0].items,result.module[1].items,content)
    }
  }
})
