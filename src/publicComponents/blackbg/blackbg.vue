<template>
<div id="blackbg" @click.stop='hideSide'></div>
</template>

<script>
export default {
	data(){
		return {
			side:false
		}
	},
	methods:{
		hideSide(){
			this.$emit('update:sideHandle',this.side);
			//关闭黑色背景
			this.$store.commit('changeShowBg',false);
			//关闭single
			this.$store.commit('changeSingle',false);
			//关闭player播放器
			this.$store.commit('changeShowPl',false);
			//关闭确认删除歌曲框
			this.$store.commit('changeShowDelprompt',false);
			//关闭选择歌手框
			this.$store.commit('changeShowEjectS',false);
			//关闭选择歌单框
			this.$store.commit('changeShowEjectC',false);
			//关闭确认播放组件
			this.$store.commit('changeComfirmP',false);
		}
	}
}
</script>

<style>
</style>