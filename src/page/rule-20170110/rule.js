import {getUrlParam} from 'xzs-util'
import "widget/common"
import $ from 'n-zepto'
import "./rule.less";

const content=$('#content')
content.append(`<img class="rule-20170110" src="${require('./rule.jpg')}" />`)
content.append(`<a class="rule-back" href="act-20170110.html?pageId=${getUrlParam('pageId')}"></a>`)
