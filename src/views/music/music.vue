<template>
<!--音乐页面-->
<div id="music">
	<div class="tap">
		<ul>
			<router-link tag='li' to='/music' exact>音乐</router-link>
			<router-link tag='li' to='/music/videos' >视频</router-link>
			<router-link tag='li' to='/music/radios' >电台</router-link>
		</ul>
	</div>
	<keep-alive>
		<transition :name='trn'>
			<router-view class='mainAnimate'></router-view>
		</transition>
	</keep-alive>
</div>
</template>

<script>
export default {
	data(){
		return {
			trn:""
		}
	},
	beforeRouteUpdate (to, from, next) {
    	if(to.meta.index < from.meta.index){
    		this.trn = 'to-left' ;
    	}else {
    		this.trn = 'to-right' ;
    	}
    	next();
  	}
}
</script>

<style>
</style>