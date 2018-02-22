<template>
<div id="home">
	<!--头部-->
	<cheader @update:sideHandle='showSideHandle'></cheader>
	<!--侧边栏-->
	<transition-group name='side'>
		<!--侧边栏header-->
		<csidebar :msg='msg' v-if='showSide' :key='side.header'></csidebar>
		<!--侧边栏footer 因定位无法嵌套 故模拟效果-->
		<csidefoot v-if='showSide' :key='side.footer'></csidefoot>
	</transition-group>
	<!--黑色背景-->
	<transition name='opacity' >
		<cblackbg 
			v-show='showSide' 
			@update:sideHandle='showSideHandle'
		></cblackbg>
	</transition>
	<transition :name='trn'>
		<router-view class='mainAnimate'></router-view>
	</transition>
	
</div>
</template>

<script>
import cheader from '@/components/header/header'
import csidebar from '@/components/sidebar/sidebar'
import csidefoot from '@/components/sidefoot/sidefoot'
import cblackbg from '@/publicComponents/blackbg/blackbg'
import { apiGet } from '@/api/api'
export default {
	data(){
		return {
			showSide:false,
			msg:[],
			query:"",
			uid:"",
			trn:"",
			side:{
				header:0,
				footer:1
			}
		}
	},
	methods:{
		showSideHandle(val){
			this.showSide = val ;
		}
	},
	mounted(){
		//获取传递的uid
		this.query = this.$store.state.user.uid ;
		if(this.query){
			apiGet.user.to('/user/detail',{
				uid : this.query
			})
			.then((res)=>{
				//取得用户信息
				this.msg = res.data;
			})
		}
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
		cheader,
		csidebar,
		csidefoot,
		cblackbg,
	}
}
</script>

<style>
</style>