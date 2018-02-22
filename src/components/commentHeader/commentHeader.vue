<template>
<div id="comment-header">
	<div class="back" onclick="javascript:window.history.go(-1);" >
		<i class="iconfont icon-fanhui"></i>
	</div>
	<div class="tap">
		评论<span v-if='total != 0'>({{ total }})</span>
	</div>
</div>
</template>

<script>
export default {
	props:['total']
}
</script>

<style>
</style>