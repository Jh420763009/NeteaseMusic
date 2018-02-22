<template>
<div id="header">
	<div class="menu" @click='showSide'>
		<i class="iconfont icon-caidanlan"></i>
	</div>
	<div class="tab">
		<router-link to='/home' tag='div' exact>
			<i class="iconfont icon-yinle wasin"></i>
		</router-link>
		<router-link to='/music' tag='div' >
			<i class="iconfont icon-wangyiyunyinlezizhi-copy"></i>
		</router-link>
		<router-link to='/dynamic' tag='div' >
			<i class="iconfont icon-yonghuzu2"></i>
		</router-link>
	</div>
	<router-link class="search" tag='div' to='/search'>
		<i class="iconfont icon-sousuo"></i>
	</router-link>
</div>
</template>

<script>
export default {
	data(){
		return {
			side:true 
		}
	},
	methods:{
		showSide(){
			this.$emit('update:sideHandle',this.side);
		}
	}
	
}
</script>

<style>

</style>