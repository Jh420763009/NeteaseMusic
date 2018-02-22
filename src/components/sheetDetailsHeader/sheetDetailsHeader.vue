<template>
<div id="sheetdetails-header">
	<div class="back" onclick='javascript:window.history.go(-1);'>
		<i class="iconfont icon-fanhui"></i>
	</div>
	<div class="tap">
		{{ tName.name | myLoveMusic }}
	</div>
	<transition name='showTop'>
		<div class="bg" v-if='tName.arrive' :style="{backgroundImage:`url(${tName.bgUrl})`}"></div>
	</transition>
</div>
</template>

<script>
export default {
	props:['tName']

}
</script>

<style>
</style>>