<template>
<div id="user">
	<userheader :name='name'></userheader>
	<userbody ref='userBody'></userbody>
	<userfooter></userfooter>
	<transition :name='trn'>
		<router-view class='mainAnimate'></router-view>
	</transition>
</div>
</template>

<script>
import userheader from '@/components/userHeader/userHeader'
import userbody from '@/components/userBody/userBody'
import userfooter from '@/components/userFooter/userFooter'
export default {
	data(){
		return {
			trn:"",
			bodyH:0,  //存储userbody的高
			header:0, //存储userHeader对象
			headerH:0,  //存储userHeader的高，
			maxH:0,      //存储移动的最大高度,
			scrollT:0,   //存储移动后的距离,
			name:""      //存储当移动到顶端时顶部出现的用户名
		}
	},
	computed:{
		userMsg(){
			return this.$store.state.user.userMsg ;
		}
	},
	methods:{
		scrollState(){
			let st=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
			this.scrollT = st ;
			if(st > this.maxH-1){
				document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop = this.maxH ;
				this.scrollT = this.maxH ;
			}
			console.log('滑动的高度是'+this.scrollT);
			console.log('最大高度是'+this.maxH);
			//算出百分比
			let pct = this.scrollT/this.maxH ;
			//根据百分比大小 一旦为1就变成scorll 不然就none
			if(pct == 1){
				this.name = this.userMsg.profile.nickname ;
				if(document.querySelector('#user-sheet')){
					let userSheet = document.querySelector('#user-sheet');
					userSheet.style.overflowY = 'scroll';
				}else if(document.querySelector('#user-news')){
					let userNews = document.querySelector('#user-news');
					userNews.style.overflowY = 'scroll';
				}else if(document.querySelector('#about-user')){
					let aboutUser = document.querySelector('#about-user');
					aboutUser.style.overflowY = 'scroll';
				}
			}else {
				console.log('不为1')
				this.name = ""; 
				if(document.querySelector('#user-sheet')){
					let userSheet = document.querySelector('#user-sheet');
					userSheet.style.overflowY = 'hidden';
					console.log(userSheet.style.overflowY)
				}else if(document.querySelector('#user-news')){
					let userNews = document.querySelector('#user-news');
					userNews.style.overflowY = 'hidden';
				}else if(document.querySelector('#about-user')){
					let aboutUser = document.querySelector('#about-user');
					aboutUser.style.overflowY = 'hidden';
				}
			}
			//控制背景
			this.header.style.backgroundColor = 'rgba(0,0,0,'+ (parseFloat(pct)-0.3) +')';
		}
	},
	mounted(){
		//子组件ref不能调用？ 为什么 
		this.bodyH = document.querySelector('#user-body').clientHeight;
		this.header = document.querySelector('#user-header') ;
		this.headerH = this.header.clientHeight;
		//移动的最大距离
		this.maxH = this.bodyH - this.headerH ;
		
		document.body.scrollTop?document.body.scrollTop = 0:document.documentElement.scrollTop = 0
		
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
		userheader,
		userbody,
		userfooter
	}
}
</script>

<style>
</style>