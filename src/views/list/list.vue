<template>
<div id="list">
	<div class="" v-if='!showLoad'>
		<listtab :playRecord='playRecord'></listtab>
		<songsheet></songsheet>
		<recommonsheet></recommonsheet>
	</div>
	<loading v-if='showLoad'></loading>
</div>
</template>

<script>
import listtab from '@/components/listTab/listTab'
import songsheet from '@/components/songSheet/songSheet'
import recommonsheet from '@/components/recommonSheet/recommonSheet'
import loading from '@/publicComponents/loading/loading'

import { apiGet } from '@/api/api'
export default {
	data(){
		return {
			showLoad:true,
			playRecord:""
		}
	},
	mounted(){
		let params = this.$store.state.user.uid ;
		if(params){
			apiGet.record.to('/user/record',{
				uid : params ,
				type : 0
			})
			.then((res)=>{
				this.showLoad = false ;
				this.playRecord = res.data.allData.length ;
			})
			
			apiGet.userdj.to('/user/dj',{
				uid : params 
			})
			.then((res)=>{
				console.log(res)
			})
		}
	},
	components:{
		listtab,
		songsheet,
		recommonsheet,
		loading
	}
}
</script>

<style>
</style>