<template>
<div id="singer">
	<singerheader :name='name'></singerheader>
	<singerbody @update:sendName='saveName'></singerbody>
	<transition :name='trn'>
		<keep-alive>
			<router-view class='mainAnimate'></router-view>
		</keep-alive>
	</transition>
</div>
</template>

<script>
import singerheader from '@/components/singerHeader/singerHeader'
import singerbody from '@/components/singerBody/singerBody'
import singermenu from '@/components/singerMenu/singerMenu'
export default {
	data(){
		return {
			trn:"",
			name:"",
			bodyH:0,  //存储userbody的高
			header:0, //存储userHeader对象
			headerH:0,  //存储userHeader的高，
			maxH:0,      //存储移动的最大高度,
			scrollT:0,   //存储移动后的距离,
		}
	},
	methods:{
		saveName(val){
			this.name = val ;
		},
		scrollState(){
			let st=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
			this.scrollT = st ;
			if(st > this.maxH-1){
				document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop = this.maxH ;
				this.scrollT = this.maxH ;
				
			}
			//算出百分比
			let pct = this.scrollT/this.maxH ;
			//根据百分比大小 一旦为1就变成scorll 不然就none
			if(pct == 1 ){
				if(document.querySelector('#singer-single')){
					let singerSingle = document.querySelector('#singer-single');
					singerSingle.style.overflowY = 'scroll';
				}else if(document.querySelector('#singer-album')){
					let singerAlbum = document.querySelector('#singer-album');
					singerAlbum.style.overflowY = 'scroll';
				}else if(document.querySelector('#singer-mv')){
					let singerMv = document.querySelector('#singer-mv');
					singerMv.style.overflowY = 'scroll';
				}else if(document.querySelector('#singer-msg')){
					let singerMsg = document.querySelector('#singer-msg');
					singerMsg.style.overflowY = 'scroll';
				}
			}else {
				if(document.querySelector('#singer-single')){
					let singerSingle = document.querySelector('#singer-single');
					singerSingle.style.overflowY = 'hidden';
				}else if(document.querySelector('#singer-album')){
					let singerAlbum = document.querySelector('#singer-album');
					singerAlbum.style.overflowY = 'hidden';
				}else if(document.querySelector('#singer-mv')){
					let singerMv = document.querySelector('#singer-mv');
					singerMv.style.overflowY = 'hidden';
				}else if(document.querySelector('#singer-msg')){
					let singerMsg = document.querySelector('#singer-msg');
					singerMsg.style.overflowY = 'hidden';
				}
			}
			//控制背景
			this.header.style.backgroundColor = 'rgba(0,0,0,'+ (parseFloat(pct)-0.3) +')';
		}
	},
	mounted(){
		//子组件ref不能调用？ 为什么 
		this.bodyH = document.querySelector('#singerBodys').clientHeight;
		this.header = document.querySelector('#singer-header') ;
		this.headerH = this.header.clientHeight;
		//移动的最大距离
		this.maxH = this.bodyH - this.headerH ;

		document.addEventListener('scroll',this.scrollState);
	},
	destroyed(){
		document.removeEventListener('scroll',this.scrollState);
	},
	beforeRouteUpdate (to, from, next) {
    	if(to.meta.index < from.meta.index){
    		this.trn = 'to-left' ;
    	}else {
    		this.trn = 'to-right' ;
    	}
    	next();
  	},
	components:{
		singerheader,
		singerbody,
		singermenu
	}
}
</script>

<style>
</style>