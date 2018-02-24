import Vue from 'vue'

//我喜欢的音乐
Vue.filter('myLoveMusic',(val)=>{
	if(val){
		if(val.indexOf('喜欢的音乐') != -1 ){
			return '我喜欢的音乐' ;
		}else {
			return val ;
		}
	}
	
})

//评论时间戳过滤
Vue.filter('getCommentTime',(val)=>{
	var getDate = new Date(parseInt(val));
    Date.prototype.toLocaleString = function() {
          //return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " + this.getHours() + "点" + this.getMinutes() + "分" + this.getSeconds() + "秒";
    	  return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " ;
    };
	return getDate.toLocaleString();
})
//出版时间过滤
Vue.filter('getPublishTime',(val)=>{
	var getDate = new Date(parseInt(val));
    Date.prototype.toLocaleString = function() {
          //return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " + this.getHours() + "点" + this.getMinutes() + "分" + this.getSeconds() + "秒";
    	  return this.getFullYear() + "." + (this.getMonth() + 1) + "." + this.getDate()  ;
    };
	return getDate.toLocaleString();
})

//点赞数过滤
Vue.filter('getCount',(val)=>{
	if(val == 0) {
		return 0 ;
	}
	var s = parseInt(val)/10000 ;
	if(s>10){
		return s.toString().substring(0,s.toString().indexOf('.')+2) + '万';
	}else {
		return val ;
	}
})

//更新时间戳过滤
Vue.filter('getUpdateTime',(val)=>{
	var getDate = new Date(parseInt(val));
    Date.prototype.toLocaleString = function() {
        //return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " + this.getHours() + "点" + this.getMinutes() + "分" + this.getSeconds() + "秒";
	    switch(this.getDay())
	    {
    	  	case 0:
    	  	return '每周日更新';
    	  	break;
    	  	case 1:
    	  	return '每周一更新';
    	  	break;
    	  	case 2:
    	  	return '每周二更新';
    	  	break;
    	  	case 3:
    	  	return '每周三更新';
    	  	break;
    	  	case 4:
    	  	return '每周四更新';
    	  	break;
    	  	case 5:
    	  	return '每周五更新';
    	  	break;
    	  	case 6:
    	  	return '每周六更新';
    	  	break;
	    }
	};
	return getDate.toLocaleString();
})

//当信息有多个歌手时获取多个歌手 
Vue.filter('getSinger',(val)=>{
	var str = [];
	if(val.length > 1){
		val.forEach(function(item,index,arr){
			if(arr[index].name){
				str.push(arr[index].name)
			}
		})
		return str.join(' / ');
	}else if(val.length == 1){
		if(val[0].name){
			return val[0].name ;
		}
	}
})

//获取mv等视频的总时长
Vue.filter('getDuration',(val)=>{
	var getDate = new Date(parseInt(val));
    Date.prototype.toLocaleString = function() {
          //return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " + this.getHours() + "点" + this.getMinutes() + "分" + this.getSeconds() + "秒";
    	  if(parseInt(this.getMinutes()) > 9 && parseInt(this.getSeconds()) > 9){
    	  	 return this.getMinutes() + ':' + this.getSeconds() ;
    	  }else if(parseInt(this.getMinutes()) > 9 && parseInt(this.getSeconds()) < 10){
    	  	 return this.getMinutes() + ':' + '0' + this.getSeconds() ;
    	  }else if(parseInt(this.getMinutes()) < 10 && parseInt(this.getSeconds()) > 9){
    	  	 return '0' + this.getMinutes() + ':'  + this.getSeconds() ;
    	  }else {
    	  	 return '0' + this.getMinutes() + ':' + '0' + this.getSeconds() ;
    	  }
    	   
    };
	return getDate.toLocaleString();
})

//获取歌曲进度长度(不含毫秒)
Vue.filter('getSeconds',(val)=>{
	if(val/60 >= 10 && val%60 >= 10 ){
		return parseInt(val/60) + ':' + parseInt(val%60) ;
	}else if(val/60 < 10 && val%60 >= 10 ){
		return '0' + parseInt(val/60) + ':' + parseInt(val%60) ;
	}else if(val/60 < 10 && val%60 < 10 ){
		return '0' + parseInt(val/60) + ':' + '0' + parseInt(val%60) ; 
	}else if(val/60 >= 10 && val%60 < 10 ){
		return parseInt(val/60) + ':' + '0' + parseInt(val%60) ;
	}
})