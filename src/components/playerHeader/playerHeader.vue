<template>
<div id="player-header">
	<div class="back" @click='hidePlayer' >
		<i class="iconfont icon-fanhui"></i>
	</div>
	<div class="tap">
		<p>{{ musicMsg.name }}</p>
		<p>{{ musicMsg.ar | getSinger }}</p>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	computed:mapState({
		musicMsg:state => state.music.musicMsg
	}),
	methods:{
		tohome(){
			this.$router.push('/home');
		},
		hidePlayer(){
			this.$store.commit('showPlayer',false);
		}
	}
}
</script>

<style>
</style>