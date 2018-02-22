<template>
<div id="sheetDetails-footer" v-if='playlist'>
	<div class="play">
		<div class="play-all">
			<i class="iconfont icon-bofang"></i>
		</div>
		<div @click='playAll'>
			播放全部<span v-if="playlist.length > 0">(共{{ playlist.length }}首)</span>
		</div>
	</div>
	<ul>
		<li 
			v-for='(item,index) in playlist'
			@click='toplay(index)'
			:class='playingZIdx==index?"playing":"notplaying"'
		>
			<div class="indexs" >
				<span class="index">{{ index+1 }}</span>
				<i class="iconfont icon-ttsbofangzhong plays"></i>
			</div>
			<div class="music-msg">
				<div class="msg">
					<p>{{ item.name }}<span v-if='item.alia.length > 0'>({{ item.alia[0] }})</span></p>
					<p>{{ item.ar | getSinger }}</p>
				</div>
				<div class="list">
					<i class="iconfont icon-fengexianICONCopy" @click.stop='showSingle(index)'></i>
				</div>
			</div>
		</li>
	</ul>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import { mapState } from 'vuex'
export default {
	props:['playlist'],
	computed:mapState({
		//正在播放歌曲的索引
		playingZIdx:state => state.music.playingZIdx,
		currentId:state => state.user.currentId,
		playingIdxs:state => state.music.playingIdxs
	}),
	methods:{
		//展现下方列表
		showSingle(idx){
			//点击就出现列表和黑色背景
			this.$store.commit('changeSingle',true);
			this.$store.commit('changeShowBg',true);
			//保存歌曲id
			this.$store.dispatch('asyncMusicId',this.playlist[idx].id);
			apiGet.musiccomment.to('/comment/music',{
				id:this.playlist[idx].id
			})
			.then((res)=>{
				this.$store.commit('saveSendComment',{
					data : this.playlist[idx] ,
					numbers : res.data.total ,
				});
			})
		},
		//播放歌曲
		toplay(idx){			
			//展示playtab
			this.$store.commit('showPlayTab',true);
			//获取歌曲信息 ,歌曲文件等
			this.$store.dispatch('handlePlay',this.playlist[idx].id);
			//存储歌曲列表
			this.$store.dispatch('handlePlayerList',this.playlist);
			//存储正在播放歌曲的idx
			this.$store.dispatch('handlePlayingIdx',idx);
			this.$store.dispatch('handlePlayingZIdx',idx);
			//存储当前歌单的id
			this.$store.commit('saveCurrentId',this.$route.query.id);
			//存储当前播放得index
			this.$store.commit('changePlayingIdxs',idx);
		},
		//播放全部
		playAll(){
			//展示playtab
			this.$store.commit('showPlayTab',true);
			//获取歌曲信息 ,歌曲文件等
			this.$store.dispatch('handlePlay',this.playlist[0].id);
			//存储歌曲列表
			this.$store.dispatch('handlePlayerList',this.playlist);
			//存储正在播放歌曲的idx
			this.$store.dispatch('handlePlayingIdx',0);
			this.$store.dispatch('handlePlayingZIdx',0);
		}
	},
	mounted(){
		//如果当前id不是所播放得歌单得id 就让播放标志消失 反之出现
		if(this.currentId != this.$route.query.id){
			this.$store.commit('savePlayingZIdx','xxx');
		}else {
			this.$store.commit('savePlayingZIdx',this.playingIdxs);
		}
	}
}
</script>

<style>
</style>