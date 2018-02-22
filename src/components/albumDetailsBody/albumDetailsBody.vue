<template>
<div id="albumDetails-body" v-if='msg'>
	<div class="blur" :style="{backgroundImage:`url(${msg.blurPicUrl})`}"></div>
	<div class="msg">
		<div class="avatar">
			<img :src="msg.picUrl"/>
			<img src="../../assets/img/user/album.png" />
		</div>
		<div class="author" to='user'>
			<div>
				<p>{{ msg.name |  myLoveMusic}}</p>
			</div>
			<div class="to-user">
				<!--<img :src="msg.creator.avatarUrl"/>-->
				<div @click='toSinger'>歌手 : {{ msg.artist.name }}<i class="iconfont icon-dayuhao"></i></div>
				<div>发行时间 : {{ msg.publishTime |  getPublishTime }}</div>
			</div>
		</div>
	</div>
	<ul>
		<li>
			<i class="iconfont icon-flyme_icon-1"></i>
			<span v-if='msg.info.likedCount == 0'>收藏</span>
			<span v-if='msg.info.likedCount > 0'>{{ msg.info.likedCount }}</span>
		</li>
		<router-link tag='li' :to="{path:'albumcomment',query:{ id : msg.id }}">
			<i class="iconfont icon-pinglun"></i>
			<span v-if='msg.info.commentCount == 0'>评论</span>
			<span v-if='msg.info.commentCount > 0'>{{ msg.info.commentCount }}</span>
		</router-link>
		<li>
			<i class="iconfont icon-share"></i>
			<span v-if='msg.info.shareCount == 0'>分享</span>
			<span v-if='msg.info.shareCount > 0'>{{ msg.info.shareCount }}</span>
		</li>
		<li>
			<i class="iconfont icon-download" ></i>
			下载
		</li>
	</ul>
</div>
</template>

<script>
export default {
	props:['msg'],
	data(){
		return {
			
		}
	},
	methods:{
		toSinger(){
			this.$store.dispatch('handleSingerId',this.msg.artist.id);
			this.$router.push('/singer');
		}
	},
	mounted(){
		console.log(this.msg)
	}
}
</script>

<style>
</style>