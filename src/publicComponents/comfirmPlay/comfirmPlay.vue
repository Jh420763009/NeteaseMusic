<template>
<div id="del-prompt">
	<p>开始播放<<{{ comfirmPlayMsg[0].name }}>>?</p>
	<div>
		<span @click='cancel'>取消</span>
		<span @click='comfirm'>确认</span>
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
		comfirmPlayMsg:state => state.user.comfirmPlayMsg,
		playerList:state => state.music.playerList ,
	}),
	methods:{
		//取消删除操作
		cancel(){
			//关闭黑色背景
			this.$store.commit('changeShowBg',false);
			//关闭当前确认播放组件
			this.$store.commit('changeComfirmP',false);
		},
		comfirm(){
			//作为下一首
			this.$store.commit('handleNextPlay',this.comfirmPlayMsg[0]);
			//找出这个歌曲的索引
			for(let i = 0 ; i < this.playerList.length ;i++){
				if(this.playerList[i].name == this.comfirmPlayMsg[0].name){
					//获取歌曲信息 ,歌曲文件等
					this.$store.dispatch('handlePlay',this.playerList[i].id);
					//
					this.$store.dispatch('handlePlayingIdx',i);
					this.$store.dispatch('handlePlayingLIdx',i);
					//关闭黑色背景
					this.$store.commit('changeShowBg',false);
					//关闭当前确认播放组件
					this.$store.commit('changeComfirmP',false);
					break ;
				}
			}
		}
	},
	mounted(){
		console.log(this.comfirmPlayMsg)
	}
}
</script>

<style>
</style>