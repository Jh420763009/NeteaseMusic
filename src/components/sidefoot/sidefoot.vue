<template>
<div id="slidefoot">
	<div class="foot">
		<ul>
			<li>
				<i class="iconfont icon-iconset0454"></i>
				夜间模式
				
			</li>
			<li>
				<i class="iconfont icon-shezhi"></i>
				设置
			</li>
			<li @click='signout'>
				<i class="iconfont icon-dianyuan"></i>
				退出
			</li>
		</ul>
	</div>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
export default {
	methods:{
		signout(){
			apiGet.signout.to('/login/refresh')
			.then((res)=>{
				console.log(res);
				if(res.status === 200){
					this.$store.dispatch('handlePlaying',false);
					this.$store.dispatch('handlePlayingZIdx','xsh');
					this.$store.commit('showPlayTab',false);
					
					//跳转到登录页
					this.$router.push('/');
					//清楚登录账号信息
					this.$local.clear() ;
				}
			})
		},
	}
}
</script>

<style>
</style>