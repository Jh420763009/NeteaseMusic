<template>
<div id="play-record-body">
	<div class="play" @click='playAll'>
		<div class="play-all">
			<i class="iconfont icon-bofang"></i>
		</div>
		<div>
			播放全部<span v-if='record.length > 0 '>(共{{ record.length }}首)</span>
		</div>
	</div>
	<ul>
		<li 
			v-for='(item,index) in record'
			@click.stop='toplay(index)'
		>
			<div class="playnow" v-if='playingZIdx==index'>
				<i class="iconfont icon-ttsbofangzhong"></i>
			</div>
			<div class="music-msg">
				<p>{{ item.name }}</p>
				<p>{{ item.ar[0].name }}-{{ item.al.name }}</p>
			</div>
			<div class="list" @click.stop='showSingle(index)'>
				<i class="iconfont icon-fengexianICONCopy"></i>
			</div>
		</li>
	</ul>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import { mapState } from 'vuex'

export default {
	data(){
		return {
			record:[],
			play:false,
			musicId:"",
		}
	},
	computed:mapState({
		//正在播放歌曲的索引
		playingZIdx:state => state.music.playingZIdx,
		currentId:state => state.user.currentId
	}),
	methods:{
		//展现下方列表
		showSingle(idx){
			//点击就出现列表和黑色背景
			this.$store.commit('changeSingle',true);
			this.$store.commit('changeShowBg',true);
			//保存歌曲id
			this.$store.dispatch('asyncMusicId',this.record[idx].id);
			apiGet.musiccomment.to('/comment/music',{
				id:this.record[idx].id
			})
			.then((res)=>{
				this.$store.commit('saveSendComment',{
					data : this.record[idx] ,
					numbers : res.data.total ,
				});
			})
		},
		//播放歌曲
		toplay(idx){			
			//展示playtab
			this.$store.commit('showPlayTab',true);
			//获取歌曲信息 ,歌曲文件等
			this.$store.dispatch('handlePlay',this.record[idx].id);
			//存储歌曲列表
			this.$store.dispatch('handlePlayerList',this.record);
			//存储正在播放歌曲的idx
			this.$store.dispatch('handlePlayingIdx',idx);
			this.$store.dispatch('handlePlayingZIdx',idx);
			//存储当前歌单的id
			this.$store.commit('saveCurrentId','playRecord');
			//存储当前播放得index
			this.$store.commit('changePlayingIdxs',idx);
		},
		//播放全部
		playAll(){
			//展示playtab
			this.$store.commit('showPlayTab',true);
			//获取歌曲信息 ,歌曲文件等
			this.$store.dispatch('handlePlay',this.record[0].id);
			//存储歌曲列表
			this.$store.dispatch('handlePlayerList',this.record);
			//存储正在播放歌曲的idx
			this.$store.dispatch('handlePlayingIdx',0);
			this.$store.dispatch('handlePlayingZIdx',0);
		}
	},
	mounted(){
		let waslogin = this.$local.fetch('user').waslogin ;
		let userSheet = this.$store.state.user.userSheet ;
		let uid = this.$store.state.user.uid ;
		if(waslogin){
			apiGet.record.to('/user/record',{
				uid:uid,
				type:0
			})
			.then((res)=>{
				//清空数组
				this.record.splice(0,this.record.length);
				//处理数组
				this.record = res.data.allData.map(function(item,idx,arr){
					return item.song ;
				}) ;
				console.log(this.record);
				this.$emit('update:showLoading',false);
			})
		}
		
		//如果当前id不是所播放得歌单得id 就让播放标志消失 反之出现
		if(this.currentId != 'playRecord'){
			this.$store.commit('savePlayingZIdx','xxx');
		}else {
			this.$store.commit('savePlayingZIdx',this.playingIdxs);
		}
	}
}
</script>

<style>
</style>