<template>
<!--每日推荐歌曲-->
<div id="day-recommon">
	<commonheader :headerMsg='headerMsg'></commonheader>
	<dayrecommonbody></dayrecommonbody>
</div>
</template>

<script>
import commonheader from '@/publicComponents/commonHeader/commonHeader'
import dayrecommonbody from '@/components/dayRecommonBody/dayRecommonBody'
export default {
	data(){
		return {
			headerMsg:"每日推荐"
		}
	},
	components:{
		commonheader,
		dayrecommonbody
	}
}
</script>

<style>
</style>