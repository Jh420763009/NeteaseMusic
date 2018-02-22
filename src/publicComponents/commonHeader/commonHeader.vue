<template>
<!--公共组件头部-->
<div id="common-header">
	<div class="back" onclick="javascript:window.history.go(-1);" >
		<i class="iconfont icon-fanhui"></i>
	</div>
	<div class="tap">
		{{ headerMsg }}
	</div>
</div>
</template>

<script>
export default {
	props:['headerMsg']
}
</script>

<style>
</style>