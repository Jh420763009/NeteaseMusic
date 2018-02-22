<template>
<div id="del-prompt">
	<p>确定将所选音乐从列表中删除?</p>
	<div>
		<span @click='cancel'>取消</span>
		<span @click='delSong'>删除</span>
	</div>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import { mapState } from 'vuex'
export default {
	computed:mapState({
		sheetId:state => state.user.delMsg.sheetId ,
		songId:state => state.user.delMsg.songId ,
	}),
	methods:{
		//取消删除操作
		cancel(){
			//关闭黑色背景
			this.$store.commit('changeShowBg',false);
			//关闭delprompt
			this.$store.commit('changeShowDelprompt',false);
		},
		delSong(){
			apiGet.addordel.to('/playlist/tracks',{
				op:'del',
				pid:this.sheetId,
				tracks:this.songId
			})
			.then((res)=>{
				if(res.data.code == 200){
					this.$store.commit('changeToastMsg','已删除');
					this.$store.commit('changeShowToast',true);
					this.$store.commit('changeShowBg',false);
					this.$store.commit('changeShowDelprompt',false);
				}
			})
		}
	},
	mounted(){
		console.log(this.sheetId);
		console.log(this.songId);
	}
}
</script>

<style>
</style>