import "widget/common"

import $ from 'n-zepto'

import "./index.less"

import ajax from 'widget/ajax'
import util from 'widget/util'
document.title="水果大PK有奖竞猜"
const content=$('#content')
content.append(`
  <div class="wrap">
    <img class="banner" src="${require('./pic/shi1.jpg')}" />
    <img class="banner" src="${require('./pic/shi2.jpg')}" />
    <div class="rule">
      <p>活动时间:2017年3月28日10:00-18:30分</p>
      <p>活动对象：鲜在时会员</p>
      <p>活动范围：线上线下均可参加</p>
    </div>
    <div class="rule">
      <h2>活动规则</h2>
      <p>1、购买国产【大连美早樱桃25-30mm 250g】的所有用户id，若当晚中国足球队赢，则可获得【大连美早樱桃25-30mm 250g】商品提货券*2张</p>
      <p>2、购买【新西兰爱妃苹果85mm 1粒装】的所有用户id，若当晚伊朗足球队赢，则可获得【新西兰爱妃苹果85mm 1粒装】商品优惠券*1张；</p>
      <p>3、同时购买上述2款商品的所有用户id，若当晚中国队与伊朗队踢平，则可随机获得上述2款商品其中一种的商品提货券*1张</p>
      <p>4、当日重复下单，系统默认最靠近截止时间的订单内商品为参加活动的凭证</p>
      <p>5、当晚比赛结束后，3个工作日内将对猜中的用户进行绑券，优惠券有效期为7日</p>
    </div>
    <a href='javascript:void(0);' class="left" detail="10205201"></a>
    <a href='javascript:void(0);' class="right" detail="10205198"></a>
  </div>
`)
