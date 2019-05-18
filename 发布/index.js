function Issue(){
	this.btn = tools.$("#btn1");
	this.issueBtn = tools.$("#btn2");
	this.container = tools.$('.container');
	this.dialog = tools.$('#dialog');
	this.talkArea = tools.$('.talkArea');
	//this.textkArea = tools.$('textArea');
	this.cont = tools.$('#cont');
	this.text = "";
	this.body = tools.$('body');
	this.userName = tools.$('#userName')
}

Issue.prototype = {
	constructor : Issue,
	
	textArea : tools.$("#textArea"),
	
	bindEvent : function(){
		this.btn.onclick = () => {
			this.popBox();
		}
		console.log(textArea)
		this.container.onclick = e => {
			switch(e.target.id){
				case "closeBtn" : this.closeClick();break;
				case "btn2" : this.issueClick();break;
			}
		};
 		this.textArea.onkeyup = () => {
 			this.issueBtn.disabled = this.textArea.value !="" ? false:true;
 		};
		
 	},
	//页面显示功能
	popBox : function(){
		tools.showCenter(this.container);
		this.modal = document.createElement("div");
		this.modal.className = 'modal';
		document.body.appendChild(this.modal);
	},
	//关闭功能
	closeClick : function(){
		this.container.style.display = "none";
		this.modal.remove();
	},
	//发布功能
	issueClick : function(){
		let date = new Date(),
			startTime = date.getTime(),
			year = date.getFullYear(),
			month = date.getMonth()+1,
			day = date.getDate(),
			hours = date.getHours(),
			minutes = date.getMinutes();
		
		this.cont.innerHTML += '<p class="content"><span>'+this.textArea.value+'</span>'+'<i>'+year+'年'+month+'月'
		 +day+'日'+hours+'时'+minutes+'分' +'</i>'+'<b>'+ startTime +'</b>'+'</p>';
		this.dialog.scrollTop=this.dialog.scrollHeight-this.dialog.clientHeight;
		this.issueBtn.disabled = true;
		this.text = this.textArea.value;
		this.textArea.value = "";
		
		//右键弹撤回框功能
		this.cont.oncontextmenu = e => {
			this.ul = document.createElement("ul");
			this.ul.className = 'menu';
			this.ul.innerHTML = '<li>撤回</li>';
			this.ul.style.left = e.clientX + "px";
			this.ul.style.top = e.clientY + "px";
			this.E = e.target.parentNode;
			document.body.appendChild(this.ul);
			console.log(e.clientX);
			if(e.preventDefault){
				e.preventDefault()
			}else{
				window.event.returnValue = false;
			};
			this.body.onmouseup = () => {
				this.ul.remove();
			};
			
			
			//撤回功能
			this.ul.onmousedown = () => {
				//console.log(this.E)
				this.startTime  = this.E.querySelector("b").innerHTML;
				let date2 = new Date(),
					endTime = date2.getTime();
				console.log(endTime,startTime)
				if(endTime - this.startTime < 1200000){
				this.cont.removeChild(this.E)
				}else{
					alert("超时")
				}
			}
			

		}
	}

};


new Issue().bindEvent();