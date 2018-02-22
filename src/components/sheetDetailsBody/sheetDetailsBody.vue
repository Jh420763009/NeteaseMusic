<template>
<div id="sheetDetails-body" v-if='msg'>
	<div class="blur" :style="{backgroundImage:`url(${msg.coverImgUrl})`}"></div>
	<div class="msg">
		<div class="avatar">
			<div>
				<i class="iconfont icon-1"></i>
				{{ msg.playCount | getCount }}
			</div>
			<img :src="msg.coverImgUrl"/>
		</div>
		<div class="author" @click='toUser'>
			<div>
				<p v-if='msg.name'>{{ msg.name | myLoveMusic }}</p>
			</div>
			<div class="to-user" >
				<img :src="msg.creator.avatarUrl"/>
				<div>{{ msg.creator.nickname }}<i class="iconfont icon-dayuhao"></i></div>
			</div>
		</div>
	</div>
	<ul>
		<li>
			<i class="iconfont icon-flyme_icon-1"></i>
			<span v-if='msg.subscribedCount == 0'>收藏</span>
			<span v-if='msg.subscribedCount > 0'>{{ msg.subscribedCount }}</span>
		</li>
		<router-link tag='li' :to="{path:'songSheetComment',query:{ id : msg.id }}">
			<i class="iconfont icon-pinglun"></i>
			<span v-if='msg.commentCount == 0'>评论</span>
			<span v-if='msg.commentCount > 0'>{{ msg.commentCount }}</span>
		</router-link>
		<li>
			<i class="iconfont icon-share"></i>
			<span v-if='msg.shareCount == 0'>分享</span>
			<span v-if='msg.shareCount > 0'>{{ msg.shareCount }}</span>
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
		toUser(){
			this.$store.dispatch('handleCreateCollect',this.msg.userId);
			//获取id 异步提交请求  保存id 请求后获取用户信息
			this.$store.dispatch('handleUserId',this.msg.userId)
			.then((res)=>{
			    this.$router.push('/user');
			},(err)=>{
			})
		}
	},
}
</script>

<style>
</style>