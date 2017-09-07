import $ from 'n-zepto'
import "./weixin-invited.less"
import common from 'widget/common'
import req from 'widget/ajax'
document.title="速懒鲜生-微信邀请页"
const content=$('#content')
content.append(`
<div class="container">
	<div class="aside1">
		<div class="part1">
			<p><span class="tel"></span>邀请您加入速懒鲜生 !</p>
			<p>接受好友邀请,即可获得<span class="toYellow">五元无门槛现金券！</span></p>					
		</div>
		<div class="part2">
			<span>¥5</span>
			<p>现金券</p>
		</div>
		<form name="form" class="part3"> 
			<input id="phoneNUM" class="b-margin" type="tel" name="phone" placeholder="输入手机号" />
			<div class="b-margin  inputcode">
				<input id="verificationNUM" type="text" name="code" placeholder="输入验证码" />
				<input class="getcode" type="button" value="获取验证码">
			</div>
			<a class="b-margin btn">立即领取</a>
		</form>
	</div>
	<div class="aside2">
		<span></span>
		<div>
			<p>立即下载速懒鲜生</p>
			<p>有速懒，购好吃！</p>
		</div>
		<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.xianzaishi.normandie">立即下载</a>
	</div>
</div>
`)
var href = location.href;
var matches = href.match(/\?page=([^&]+)/);
if(matches) {
	var page = matches[1];
}
var query = (function(href) {
	href = href.split('?');
	href.shift();
	href = href.join('?');
	href = href.split('&');
	var query = {};
	for(var i = 0; i < href.length; i += 1) {
		var q = href[i].split('=');
		query[q[0]] = q[1]
	}
	return query
}(location.href));
var telNUM = query.telnum.substr(0, 3) + "****" + query.telnum.substr(7, 4);
$(".tel").html(telNUM);

$("#phoneNUM").on("keyup", function() {

	var phoneNum = String($("#phoneNUM").val());
	var pattern = /^1[345789]\d{9}$/;
	if(!pattern.test(phoneNum)) {
		$(this).css("color", "#FF0000")
	} else {
		$(this).css("color", "#000")
	}
});

function sendSuccess() {
	var $self = $(".getcode");
	$self.attr("disabled", "disabled");
	var time = 60;
	var set = setInterval(function() {
		$self.val(--time + "(s)")
	}, 1000);
	setTimeout(function() {
		$self.attr("disabled", false).val("重新获取验证码");
		clearInterval(set)
	}, 60000)
}
$(".getcode").on("click", function() {
	var phone = String($("#phoneNUM").val());
	var pattern = /^1[345789]\d{9}$/;
	if(!pattern.test(phone)) {
		alert("手机号码输入错误")
		return false
	}
	req({
		url:'/requestuser/sendcheckcode',
		data: {phone},
		type:"post",
		headers:{'content-type': 'application/json'},
		success(data) {
			if(data.module != null) {
				alert("发送成功");
				sendSuccess();
			}else{
				alert("发送失败，请重新发送")
			}
		}
	})
	return false;
});
$(".btn").on("click", function() {
	var phone = String($("#phoneNUM").val());
	var inviteCode = query.invitenum;
	var verificationCode = String($("#verificationNUM").val());
	req({
		url:'/requestuser/regist',
		data: {
			phone,
			inviteCode,
			verificationCode,
			"registType": 2
		},
		headers:{'content-type': 'application/json'},
		type:"post",
		success(data) {
			if(!data.success) {
				alert(data.errorMsg)
			} else {
				alert("恭喜！领取成功。")
			}
		}
	})
	return false;
});