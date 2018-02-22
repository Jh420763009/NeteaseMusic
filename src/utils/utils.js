//本地存储
let local = {
  save (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  fetch (key) {
    return JSON.parse(localStorage.getItem(key)) || {}
  },
  clear(){
  	 localStorage.clear()   
  }
}

//定义滚动高度
function getScrollTop()
{
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop)
    {
        scrollTop=document.documentElement.scrollTop;
    }
    else if(document.body)
    {
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}

//获取歌曲进度长度(不含毫秒)

function getSeconds(val){
	if(val/60 >= 10 && val%60 >= 10 ){
		return parseInt(val/60) + ':' + parseInt(val%60) ;
	}else if(val/60 < 10 && val%60 >= 10 ){
		return '0' + parseInt(val/60) + ':' + parseInt(val%60) ;
	}else if(val/60 < 10 && val%60 < 10 ){
		return '0' + parseInt(val/60) + ':' + '0' + parseInt(val%60) ; 
	}else if(val/60 >= 10 && val%60 < 10 ){
		return parseInt(val/60) + ':' + '0' + parseInt(val%60) ;
	}
}


export default {
	install:function(vm){
		vm.prototype.$local = local ; 
		vm.prototype.$getSeconds = getSeconds ;
	}
}
