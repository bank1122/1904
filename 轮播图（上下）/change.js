function Change(){
	this.div = tools.$(".box");
	this.divImg = tools.$(".imgs");
	this.imgs = this.divImg.children;
	this.ol = tools.$("ol");
	this.index = 0;
	this.lastIndex = 0;
	this.btns = [];
	this.goNext = tools.$("#goNext");
	this.goPrev = tools.$('#goPrev');
	this.timer = null;
}

Change.prototype = {
	constructor : Change,
	
	
	//创建按钮
	creatBtns : function(){
		for(let i = 0;i < this.imgs.length - 1 ;i++){
			this.li = document.createElement("li");
			this.li.innerHTML = i+1;
			if(i === 0)this.li.className = 'ac';
			this.ol.appendChild(this.li);
			this.btns.push(this.li);
		};
 		this.bindEvent();
 		this.changeNext();
 		this.changePrev();
// 		this.timeChange();
// 		this.stopChange();
 	},
// 	
	//给上面的按钮绑点击事件
	bindEvent : function(){
		for(let i = 0; i < this.btns.length;i++){
			this.btns[i].onclick = () => {
				this.index = i;				
				this.changeImg();
				this.lastIndex = this.index;
			}
		}
	},	
	
	//给→绑事件
	changeNext : function (){
		this.goNext.onclick = () => {
			if(++this.index === this.btns.length){
				this.changeImg2();
				this.lastIndex = this.index;
			}else{
				this.changeImg()
				this.lastIndex = this.index;
			}			
		}
	},
	
	//给←绑事件
	changePrev : function (){
		this.goPrev.onclick = () => {
			if(--this.index < 0){
				this.changeImg3();
				this.lastIndex = this.index;
			}else{
				this.changeImg()
				this.lastIndex = this.index;
			}			
		}
	},
	
// 	timeChange: function(){
// 		let _this = this;
// 		this.div.onmouseleave = (function autoPlay(){
// 			_this.timer = setInterval(_this.goNext.onclick,1500);
// 			return autoPlay;
// 		})()
// 	},
// 	
// 	stopChange : function(){
// 		this.div.onmouseenter = () => {
// 			clearInterval(this.timer)
// 		}
// 	},
// 	
// 	
	//切图专用事件
	changeImg : function(){
		tools.move(this.divImg,'top',-500*this.index,600);
		this.btns[this.lastIndex].classList.remove('ac');
		this.btns[this.index].classList.add('ac');		
	},
	//切图专用事件2
	changeImg2 : function(){
		tools.move(this.divImg,'top',-500*this.index,600);
		setTimeout(function(){
			this.divImg.style.top = '0px';
		}.bind(this),600)
		
		this.index = 0
		this.btns[this.lastIndex].classList.remove('ac');
		this.btns[this.index].classList.add('ac');		
	},
	//切图专用事件3
	changeImg3 : function(){
		this.divImg.style.top = '-2500px';
		this.index = this.btns.length-1;
		tools.move(this.divImg,'top',-500*this.index,600);						
		this.btns[this.lastIndex].classList.remove('ac');
		this.btns[this.index].classList.add('ac');		
	}
		
}

new Change().creatBtns();