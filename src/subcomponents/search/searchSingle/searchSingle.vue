<template>
<div id="search-single">
	<div class="best-search" v-if='bestMatch.orders&&bestMatch.orders.length > 0'>
		<p class="best">最佳匹配</p>
		<ul>
			<li @click='toSinger' class="best-singer" v-if='bestMatch.artist'>
				<img :src="bestMatch.artist[0].img1v1Url">
				<div>
					歌手: {{ bestMatch.artist[0].name }}<span v-if='bestMatch.artist[0].alias.length > 0'>({{ bestMatch.artist[0].alias[0] }})</span>
				</div>
			</li>
			<li @click='toUser' class="best-user" v-if='bestMatch.user'>
				<img :src="bestMatch.user[0].avatarUrl">
				<div>
					用户: {{ bestMatch.user[0].nickname }}
				</div>
			</li>
			<li @click='toAlbum' class="best-album" v-if='bestMatch.album'>
				<img :src="bestMatch.album[0].picUrl"/>
				<img class="album" src="../../../assets/img/user/albumbg.png">
				<div class="music-mg">
					<p>专辑: {{ bestMatch.album[0].name }}<span v-if='bestMatch.album[0].alias.length > 0'>({{ bestMatch.album[0].alias[0] }})</span></p>
					<p>{{ bestMatch.album[0].artist.name }}</p>
				</div>
			</li>
			<li class="best-mv" v-if='bestMatch.mv'>
				<img :src="bestMatch.mv[0].cover"/>
				<div class="music-ms">
					<p><i class="iconfont icon-liebiaomv"></i>{{ bestMatch.mv[0].name }}</p>
					<p v-if='bestMatch.mv[0].artists' >{{ bestMatch.mv[0].artists | getSinger }}</p>
				</div>
			</li>
		</ul>
	</div>
	<ul class='list' v-if='lists&&lists.length > 0'>
		<li @click='toplay(index)' v-for='(item,index) in lists'>
			<div class="music-msg">
				<p>{{ item.name }}</p>
				<p v-if='item.album'><span v-if='item.artists&&item.artists.length > 0'>{{ item.artists | getSinger }}</span> - {{ item.album.name }}</p>
			</div>
			<div class="lists" @click.stop='showSingle(index)'>
				<i class="iconfont icon-fengexianICONCopy"></i>
			</div>
		</li>
	</ul>
	<div class="nofound" v-if='lists&&lists.length == 0'>未找到与"{{ keyword }}"相关的内容</div>
</div>
</template>


<script>
import { apiGet } from '@/api/api'
import { mapState } from 'vuex'
export default {
	props:['lists','bestMatch'],
	computed:mapState({
		keyword:state => state.user.keyword ,
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
			this.$store.dispatch('asyncMusicId',this.lists[idx].id);
			apiGet.musiccomment.to('/comment/music',{
				id:this.lists[idx].id
			})
			.then((res)=>{
				console.log(this.lists[idx])
				this.$store.commit('saveSendComment',{
					data : this.lists[idx] ,
					numbers : res.data.total ,
				});
			})
		},
		//播放歌曲
		toplay(idx){			
			//展示playtab
			this.$store.commit('showPlayTab',true);
			//获取歌曲信息 ,歌曲文件等
			this.$store.dispatch('handlePlay',this.lists[idx].id);
			//存储歌曲列表
			this.$store.dispatch('handlePlayerList',this.lists);
			//存储正在播放歌曲的idx
			this.$store.dispatch('handlePlayingIdx',idx);
			this.$store.dispatch('handlePlayingZIdx',idx);
			//存储当前歌单的id
			//this.$store.commit('saveCurrentId',this.$route.query.id);
			//存储当前播放得index
			this.$store.commit('changePlayingIdxs',idx);
		},
		toSinger(){
			this.$store.dispatch('handleSingerId',this.bestMatch.artist[0].id);
			this.$router.push('/singer');
		},
		toAlbum(){
			this.$router.push({
				path:'/albumdetails',
				query:{
					id:this.bestMatch.album[0].id
				}
			})
		},
		toUser(){
			this.$store.dispatch('handleCreateCollect',this.bestMatch.user[0].userId);
			//获取id 异步提交请求  保存id 请求后获取用户信息
			this.$store.dispatch('handleUserId',this.bestMatch.user[0].userId)
			.then((res)=>{
			    this.$router.push('/user');
			},(err)=>{
			})
		},
	},
	beforeCreate(){
		this.$store.dispatch('handleSearchType',1);
	},
	
}
</script>

<style>
</style>