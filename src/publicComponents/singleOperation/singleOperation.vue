<template>
<!--单曲操作:点击列表的弹出框-->
<!--有song的条件下-->
<!--在歌单详情里面是没有song这个文件夹的  在播放记录则有 所以要做判断-->
<div id="single-operation" v-if='comments.data'>
	<div class="music-name">
		歌曲: {{ comments.data.name }}
	</div>
	<ul>
		<li @click='nextPlay'>
			<div><i class="iconfont icon-bofang1"></i></div>
			<div>下一首播放</div>
		</li>
		<li @click='saveToSheet'>
			<div><i class="iconfont icon-flyme_icon-1"></i></div>
			<div>收藏到歌单</div>
		</li>
		<li @click='toComment' >
			<div><i class="iconfont icon-pinglun"></i></div>
			<div>评论({{ comments.numbers }})</div>
		</li>
		<li @click='toSinger'>
			<div><i class="iconfont icon-flyme_icon-"></i></div>
			<div v-if='comments.data.ar'>歌手: {{ comments.data.ar | getSinger }}</div>
			<div v-if='comments.data.artists'>歌手: {{ comments.data.artists | getSinger }}</div>
		</li>
		<li @click='toAlbum'>
			<div><i class="iconfont icon-bofangye_gengduo_chakanzhuanji"></i></div>
			<div v-if='comments.data.al'>专辑: {{ comments.data.al.name }}</div>
			<div v-if='comments.data.album'>专辑: {{ comments.data.album.name }}</div>
		</li>
		<li @click='delSong' v-if='userId === creatorId'>
			<div><i class="iconfont icon-lajitong"></i></div>
			<div>删除</div>
		</li>
	</ul>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { apiGet } from '@/api/api'
export default {
	computed:mapState({
		//用户id 和 歌单创建者id对比来确定要不要显示删除按钮
		userId:state => state.user.uid ,
		creatorId:state => state.user.creatorId ,
		comments:state => state.user.sendComment
	}),
	methods:{
		//下一首播放
		nextPlay(){
			this.$store.commit('handleNextPlay',this.comments.data);
			//关闭播放器
			this.$store.commit('showPlayer',false);
			//关闭single
			this.$store.commit('changeSingle',false);
			//关闭黑色背景
			this.$store.commit('changeShowBg',false);
		},
		toComment(){
			//关闭黑色背景
			this.$store.commit('changeShowBg',false);
			//关闭single
			this.$store.commit('changeSingle',false);
			//关闭播放器
			this.$store.commit('showPlayer',false);
			this.$router.push({
				path:"comment",
				query:{
					id:this.comments.data.id
				}
			})
		},
		toAlbum(){
			//关闭黑色背景
			this.$store.commit('changeShowBg',false);
			//关闭single
			this.$store.commit('changeSingle',false);
			//关闭播放器
			this.$store.commit('showPlayer',false);
			//匹配多种情况
			let album ;
			if(this.comments.data.al){
				album = this.comments.data.al ;
			}else if(this.comments.data.album){
				album = this.comments.data.album ;
			}
			
			this.$router.push({
				path:"albumdetails",
				query:{
					id:album.id
				}
			})
		},
		saveToSheet(){
			//关闭single
			this.$store.commit('changeSingle',false);
			//打开所要添加的歌单列表
			this.$store.commit('changeShowEjectS',true);
			//关闭播放器
			this.$store.commit('showPlayer',false);
			//保存当前操作的歌曲的id
			this.$store.commit('saveDelMsg',{
				songId:this.comments.data.id
			})
		},
		delSong(){
			//保存当前操作的歌曲的id
			this.$store.commit('saveDelMsg',{
				songId:this.comments.data.id
			})
			//打开delprompt
			this.$store.commit('changeShowDelprompt',true);
			//关闭single
			this.$store.commit('changeSingle',false);
			//关闭播放器
			this.$store.commit('showPlayer',false);
		},
		toSinger(){
			let arr ;
			if(this.comments.data.ar){
				arr = this.comments.data.ar ;
			}else if(this.comments.data.artists){
				arr = this.comments.data.artists ;
			}
			let len = arr.length;
			//关闭single
			this.$store.commit('changeSingle',false);
			//关闭播放器
			this.$store.commit('showPlayer',false);
			if(len > 1){
				//打开歌手列表
				this.$store.commit('changeShowEjectC',true);
				//先清除之前保存的歌手信息
				this.$store.commit('clearSinger');
				arr.forEach((item,index,arrs)=>{
					apiGet.singerSingle.to('/artists',{
						id:arrs[index].id
					})
					.then((res)=>{
						console.log(res)
						//保存多个歌手信息
						this.$store.dispatch('handleSinger',{
							id:res.data.artist.id ,
							name:res.data.artist.name,
							img:res.data.artist.img1v1Url
						})
					})
				})
			}else if(len == 1){
				//匹配歌单 播放记录 专辑 和 搜索
				let arr ;
				if(this.comments.data.ar){
					arr = this.comments.data.ar ;
				}else if(this.comments.data.artists){
					arr = this.comments.data.artists ;
				}
				this.$store.dispatch('handleSingerId',arr[0].id);
				this.$router.push('/singer');
				//关闭黑色背景
				this.$store.commit('changeShowBg',false);
			}
			
		}
	},
	mounted(){
		console.log(this.comments);
	}
}

</script>

<style>
</style>