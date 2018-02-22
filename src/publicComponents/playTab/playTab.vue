<template>
<div id="play-tab" @click.stop='showPlayer'>
	<div class="avatar">
		<img :src="musicMsg.picUrl"/>
	</div>
	<div class="music-name">
		<p>{{ musicMsg.name }}</p>
		<p>{{ musicMsg.ar | getSinger }}</p>
	</div>
	<div class="play">
		<div class="stop-play">
			<i @click.stop='pause' class="iconfont icon-play-circle-o" v-if='!playing'></i>
			<i @click.stop='play' class="iconfont icon-pause-circle-o" v-if='playing' ></i>
		</div>
		<div class="list" @click.stop='showList'>
			<i class="iconfont icon-bars"></i>
		</div>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed:mapState({
		playing:state => state.music.playing ,
		musicMsg:state => state.music.musicMsg,
		
	}),
	methods:{
		showPlayer(){
			this.$store.commit('showPlayer',true);
		},
		pause(){
			//歌曲暂停
			this.$store.dispatch('handlePlaying',true);
		},
		play(){
			//歌曲开始
			this.$store.dispatch('handlePlaying',false);
		},
		showList(){
			this.$store.commit('changeShowPl',true);
			this.$store.commit('changeShowBg',true);
		}
	},
}
</script>

<style>
</style>