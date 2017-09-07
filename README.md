### 鲜在时活动页

#### 目录结构

````
src
|-- page                      这个文件夹下放活动页
|    |-- act-20170103         一个文件夹代表一个页面,文件夹名称不得以`z字母`开头
|           |-- package.json  遵循commonjs规范
|           |-- entry.js
|      
|-- widget                    这个文件夹下放公用模块
     |-- ajax                 ajax模块 封装不同环境下的host
     |-- common               环境判断，及页面公共模块
     |-- hybird               调用app相关功能
     |-- pit                  坑位
          |-- single-1        坑位模版
````

#### 公用模块

#### 1、ajax

````
import ajax from "widget/ajax";
ajax({
  // url不要写host，会根据不同的环境使用不同的host
  url:'/wapcenter/requesthome/homepage',
  type:'post',
  data:{
    pageId:"31"
  }
})

````
#### 2、common

````
// 每个页面必须引用
import common from 'widget/common';

// 是否是开发环境
common.isDev

// 是否是测试环境
common.isQa

// 是否是线上环境
common.isProd

````

#### 3、hybird

````
import hybird from 'widget/hybird'

// 传入商品id，打开app详情页
hybird.openDetail('12343')

````

#### 4、pit

````
import createSingle from 'widget/pit/single-1'

// 传入数据  返回模版 可直接append到dom里去
createSingle([
  {
    image:"//img.alicdn.com/imgextra/i1/5/TB204gWaxvxQeBjy0FiXXXioXXa_!!5-0-yamato.jpg_300x1000q90.jpg",
    title:'进口火龙果',
    subTitle:'500G/个共3个',
    price:'25.5',
    originPrice:'49.00',
    itemId:'12345'
  }
])

````
