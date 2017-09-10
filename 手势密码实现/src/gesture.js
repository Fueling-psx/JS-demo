
(function(window, undefined) {

	var canvas =  document.getElementById("canvas");
	var cfn = canvas.getContext("2d");

	/*
	 * 提供调用的方法 函数
	 */
	var methodXi = {
		rectL: 240,
		radius: 20,
		circleP: [],  // 存放圆圈坐标
		getTarget: function(element) {
			return  document.querySelector(element);
		},
		getTime: function(){
			return (Date.now && Date.now()) || (new Date()).getTime();
		},
		each: function(self, arr, callback){
			arr.forEach(function(current){
				callback.call(self, current);
			});
		},
		ObjEqual: function(obj1, obj2) {
			return JSON.stringify(obj1) === JSON.stringify(obj2);
		},
		objLength: function(obj) {
			var length = 0;
			for(var i in obj) {
				if(obj.hasOwnProperty(i)) {
					length++;
				}
			}
			return length;
		},
		setItem: function(key, value, cacheTime) {	
			var item = {
				value: value,
				cacheTime: cacheTime,
			}
			window.localStorage.setItem('JS_XI_'+key, JSON.stringify(item));
		},
		getItem: function(key){
			var item = JSON.parse(window.localStorage.getItem('JS_XI_'+key));

			if(!item)  return null;
			if(item.cacheTime < this.getTime()) {
				this.removeItem(key);
				return null;
			}
			return item.value;
		},
		removeItem: function(key) {
			window.localStorage.removeItem('JS_XI_'+key);
		},
		drawLinePoint: function(current) {	

			cfn.beginPath();
			cfn.fillStyle = "orange";
			cfn.arc(current.x, current.y, methodXi.radius, 0, 2*Math.PI, true);
			cfn.closePath();

			cfn.fill();
		},
		drawCircle: function() {
			canvas.width = this.rectL;
			canvas.height = this.rectL;
			this.circleP.splice(0, this.circleP.length);
			var rectL = this.rectL,
				radius = this.radius; 

			cfn.fillStyle = "white";
			cfn.strokeStyle = "#c1c1c2";
			for(var i=0;i<3;i++) {
				for(var j=0;j<3;j++) {
					// 绘圆
					cfn.beginPath();
					var oP = { 
						x: j*(rectL/3) + (rectL/6), 
						y: i*(rectL/3) + (rectL/6)
					}
					cfn.arc(oP.x, oP.y, radius, 0, 2*Math.PI, true);
					cfn.fill();
					cfn.stroke();
					// 存放组里
					this.circleP.push(oP);
				}
			}	
		}
	}
    /*
    * 构造函数 linePath
    * 功能： 实现手势路线显示
    */
    var LinePath = function(circleP) {


    	this.key = 'gestureLock';
    	this.cache = 6*60*60*1000;

		this.lineP = [];         // 存放line坐标
		this.linePi = [];         // 存放line位置（即在circleP的下标）
    	this.target = methodXi.getTarget('.gesture-xi');
    	this.setPwd = {
    		'first': false,
    		'again': false
       	}
    	this.Action = {
    		'down': false,
    		'setPassword': false,
    		'resetPwd': false
    	}
    	this.eventSet = {
    		'mousedown': 'eventMouseDown',
    		'mousemove': 'eventMouseMove',
    		'mouseup'  : 'eventMouseUP',
    		'.checkbox-validate': 'eventClickVali',
    		'.checkbox-setPassword': 'eventClickSet'
    	}
    }
    /**
     * [prototype description]
     * @type {Object}
     */
    LinePath.prototype = {
    	constructor: LinePath,
    	init: function(){
    		this.handleEvent();
    	},
    	handleEvent: function() {
  			var self = this;
  			var	event = Object.getOwnPropertyNames(self.eventSet); 
  			// 添加监听事件
  			methodXi.each(self, event, function(name){
  				var reg = /^[a-z]+$/;
  				var arr = name.match(reg),
  				    key = this.eventSet[name];
  				if(arr)  this.eventIE(this.target, name, this[key].bind(this));
  				else {
  					var dom = methodXi.getTarget(name);
  					this.eventIE(dom, 'click', this[key].bind(this));
  				}  
  			});

    	},
		eventMouseDown: function(e){
			var downP = this.getMousePoint(e),
				currentP = this.isCirclePoint(downP);

			if(currentP)   this.transLinep(currentP);
			this.Action.down = true;
		},
		eventMouseMove: function(e) {
			if(!this.Action.down)  return;
			var mouseP = this.getMousePoint(e),
				currentPi = this.isCirclePoint(mouseP);

			cfn.lineWidth = methodXi.rectL/30;
			if(currentPi) {
				this.redraw();
				this.drawLine(currentPi.p);
				this.transLinep(currentPi);
			} else{
				this.redraw();
				this.drawLine(mouseP);
			} 	

		},
		eventMouseUP: function() {

			if(!this.Action.setPassword)  this.lineReset();	

			this.redraw();
			this.Action.down = false;
			this.drawLine(false);

			if(!this.Action.setPassword ) {
				this.echoTips("请选择设置密码！", "red");
			}
			else  this.eventSetPwd();
			// else if(this.Action.resetPwd)  this.resetPwd();
		},
		eventSetPwd: function() {
			var self = this;
			var pwd = {
				setPwd: function() {

					if(self.linePi.length >= 5) {
						methodXi.setItem(self.key, self.linePi, methodXi.getTime()+self.cache);
						
						self.echoTips("请再次确认密码!", "green");
						self.setPwd.first = true;

						var value = methodXi.getItem(self.key);
					} 
					else  self.echoTips("密码太短，请至少5个点！", "red");
					self.lineReset();
					self.redraw();
				},
				again: function() {
					var value = methodXi.getItem(self.key);

					if(methodXi.ObjEqual(self.linePi, value)) {
						self.echoTips("密码设置成功！", "green");
						self.setPwd.again = true;
					}
				    else  
				    	self.echoTips("两次输入不一致！", "red");

					self.lineReset();
					self.redraw();
				}
			}
			if(!self.setPwd.first)  return pwd.setPwd();
			else   return pwd.again();
			
		},
		resetPwd: function() {

			var value = methodXi.getItem(this.key);
			methodXi.removeItem(this.key);

			this.setPwd.first = false;
			this.setPwd.again = false;

			this.echoTips("密码已经重置，请重新设置密码！", "green");
			this.lineReset();
			
		},
		getMousePoint: function(e) {
			var canvasP = canvas.getBoundingClientRect();
			var obj = {
				x: e.clientX - canvasP.left,
				y: e.clientY - canvasP.top
			}
			return obj;
		},
		// 判断鼠标是否在圆圈中按下
		isCirclePoint: function(mouseP) {
			var circleP = methodXi.circleP;
				radius = methodXi.radius;
			for(var i=0;i<circleP.length;i++) {
				var areaX = (mouseP.x>circleP[i].x-radius) && (mouseP.x<circleP[i].x+radius);
				var areaY = (mouseP.y>circleP[i].y-radius) && (mouseP.y<circleP[i].y+radius);
				if( areaX && areaY )  return { i: i, p: circleP[i]};	
			}
			return false;
		},
		lineReset: function() {
			this.lineP = [];
			this.linePi = [];
		},
		redraw: function() {
			// 重绘
			cfn.clearRect(0, 0, canvas.width, canvas.height);

			methodXi.drawCircle();
		},
		/**
		 * 画轨迹线
		 * @param  {[type]} obj [Object Boolean]
		 */
		drawLine: function(obj) {
			//this.handleEvent();
			var lineP = this.lineP;
			methodXi.each(this, lineP, methodXi.drawLinePoint);
			
			cfn.beginPath();
			methodXi.each(this, lineP, function(linep){
				cfn.drawLinePoint(linep.x, linep.y);
			});
			if(obj)  cfn.lineTo(obj.x, obj.y);
			cfn.stroke();
			cfn.closePath();
		},
		transLinep: function(currentP) {

			var pi = currentP.i,
				existP = this.linePi.indexOf(pi); 
			if(existP === -1){
				this.linePi.push(pi);
				this.lineP.push(currentP.p);
			}  
			methodXi.drawLinePoint(currentP.p);
		},
		eventClickSet: function() {
			this.Action.setPassword = true;
			this.Action.resetPwd = false;
			this.echoTips();
		},
		eventClickVali: function() {
			this.Action.resetPwd = true;
			this.Action.setPassword = false;
			this.echoTips();
			this.resetPwd();
		},
		echoTips: function(message, color) {
			var tips = methodXi.getTarget('.tips');

			if(!message)  tips.innerHTML = " ";
			else {
				tips.innerHTML = message;
				if(color)  tips.style.color = color;
			} 
			
		},
		eventIE: function(target, name, fn) {
			var addEvent = function(target, name, fn) {
				var isIE = navigator.userAgent.indexOf('MSIE') > 0;
				if(isIE) {
					addEvent = function(target, name, fn) {
						target.attachEvent('on'+name, fn);
					}
				} else{
					addEvent = function(target, name, fn) {
						target.addEventListener(name, fn, false);
					}
				}
				addEvent(target, name, fn);
			}
			addEvent(target, name, fn);
		}
    }
	/* 
	 * 构造函数 gestureLockXi
	 * 功能: 实现canvas初始化及圆圈构造 
	 */
	var GestureLockXi = function() {
 		var moveT, rectL = methodXi.rectL;
	}
	/*
	 * 原型对象  GestureLockXi.prototype
	 * @type Object 
	 */
	GestureLockXi.prototype = {
		constructor: GestureLockXi,

		// 初始化
		init: function() {
			// 画圆
			methodXi.drawCircle();
			// 实例化LinePath
			var line = new LinePath();
			line.init();
		},
	}

	// 实例化初始
	var gestureLockxi = new GestureLockXi();	
	
})(window);

