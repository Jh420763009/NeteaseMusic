<template>
<!--精品歌单头部-->
<div id="highquality-header">
	<div class="back" onclick="javascript:window.history.go(-1);" >
		<i class="iconfont icon-fanhui"></i>
	</div>
	<div class="tap">
		精品歌单	&middot;
		{{ type }}
	</div>
	<div class="filter" @click='showFilter'>
		筛选
	</div>
</div>
</template>

<script>
export default {
	props:['type'],
	methods:{
		showFilter(){
			console.log('启动filter');
			this.$emit('update:showFilterHandle',true);
		}
	}
}
</script>

<style>
</style>