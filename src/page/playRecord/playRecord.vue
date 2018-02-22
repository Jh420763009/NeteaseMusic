<template>
<!--播放记录-->
<div id="play-record">
	<commonheader :headerMsg='headerMsg'></commonheader>
	<playrecordbody 
		v-show='!loading' 
		@update:showLoading='showLoadingHandle'
	></playrecordbody>
	<loading v-if='loading' ></loading>
</div>
</template>

<script>
import commonheader from '@/publicComponents/commonHeader/commonHeader'
import playrecordbody from '@/components/playRecordBody/playRecordBody'
import loading from '@/publicComponents/loading/loading'
export default {
	data(){
		return {
			headerMsg:"最近播放",
			showSingle:false,
			loading:true
		}
	},
	methods:{
		//确认获取数据后 loading变为false
		showLoadingHandle(val){
			this.loading = val;
		},
	},
	components:{
		commonheader,
		playrecordbody,
		loading,
	}
}
</script>

<style>
</style>