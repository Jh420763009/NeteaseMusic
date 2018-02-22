<template>
<!--排行榜头部-->
<!--因为头部通用 所以不写了-->
<div id="singer-header" >
	<div class="back" @click='toHome' >
		<i class="iconfont icon-fanhui"></i>
	</div>
	<div class="tap" v-if='name'>{{ name.name }}<span v-if='name.alias'>({{ name.alias }})</span></div>
</div>
</template>

<script>
export default {
	props:['name'],
	methods:{
		toHome(){
			this.$router.push('/home');
		}
	}
}
</script>

<style>
</style>