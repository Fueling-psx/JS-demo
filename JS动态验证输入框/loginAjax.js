
/**
 * login validate [javascript]
 * @author PENGSHUANGXI
 */
var LoginAjax = function() {

	/**
	 * 方法对象 [存放各事件动态处理函数]
	 * @type {Object}
	 */
	var method = {};
	method.userCheck = function () {	
		var self = this;
		var next = self.nextSibling;

		// 动态添加span
		if(next.tagName != 'SPAN'){
			var span = method.insertSpan(self, next);
			span.textContent = '请输入小写字母的用户名';
			span.style.color = '#e0e0e0';
		}
	
		// 动态验证input框值
		self.addEventListener('blur', function(){
			var thisValue = self.value,
			    next = self.nextSibling;
			if(!thisValue)  span.textContent = '必填项！';
			else {
				var regex = /^[a-z]+$/,
					arr = thisValue.match(regex);
				if(arr == null) {
					next.textContent = '用户名非法！';
					next.style.color = 'red';
				} else {
					$.ajax({
						url: "handleAjax.php",
						type: "post",
						dataType: "json",
						data: {userValue: thisValue},
						success: function(data) {
							if(!!data) {
								next.textContent = '用户名正确';
								next.style.color = 'green';
							} else{
								next.textContent = '用户名不存在！';
								next.style.color = 'red';
							}
						},
						/*error: function(XMLHttpRequest, textStatus, errorThrown){
							alert(JSON.stringify(XMLHttpRequest));
						}*/
					});
				}	
			}
		
		}, false);
	}
	method.passCheck = function(){
		var self = this,
			next = self.nextSibling;
		this.addEventListener('blur', function(){
			var value = self.value;
			console.log(self);
			if(!value) {
				if(next.tagName != 'SPAN'){
					var span = method.insertSpan(self, next);
					span.textContent = '必填项';
					span.style.color = 'red';
				}
	
			}
		});
	}
	method.insertSpan = function(self, next){
		var span = document.createElement("span");
			parent = self.parentNode;
		span.setAttribute('class', 'tips');
		if(parent.lastChild == self)  parent.appendChild(span);
		else  parent.insertBefore(span, next);

		return span;
	}

	var eventMap = {
		'input[type="text"]'     : 'userCheck',
		'input[type="password"]' : 'passCheck',
		'input[type="submit"]'   : 'submitCheck'
	}
	// 初始化 事件处理
	var init = function(){
		var event = Object.getOwnPropertyNames(eventMap);	

		event.forEach(function(name){
			var dom = document.querySelector(name);
			var eventkey = eventMap[name];
			// 添加事件监听
			dom.addEventListener('click', method[eventkey], false);
		});
	}
	init();

}