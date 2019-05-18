var tools = {
	 $: function (selector, isAll, parent) {
		parent = parent || document;
		if(isAll){
		
			return parent.querySelectorAll(selector);
		}
		return parent.querySelector(selector);
	},

	getStyle: function (obj, attr) {
		if(obj.currentStyle) {
			return obj.currentStyle[attr];
			
		}else{
			return getComputedStyle(obj, false)[attr];
		}
	},
	

	setStyle: function (obj, attrJson) {
		for(var key in attrJson) {
			obj.style[key] = attrJson[key];
		}
	},
	
	move: function (obj, attr, end, time, fn) {
		clearInterval(obj.timer);
		let start = parseInt(this.getStyle(obj, attr));
		let distance = end - start;
		let steps = Math.floor(time / 20);
		let speed = distance / steps;
		
		let n = 0; 
		obj.timer = setInterval(function () {
			n++;
			obj.style[attr] = start + n*speed + "px";
			if(n === steps) {
				clearInterval(obj.timer);
				obj.style[attr] = end + "px";
				fn && fn();
			}
		}, 20);
	},
	

	showCenter: function (obj) {
		this.setStyle(obj, {
			display: "block",
			left: 0,
			top: 0,
			right: 0,
			bottom: 0,
			margin: "auto",
			position: "absolute"
		});
	}
}


