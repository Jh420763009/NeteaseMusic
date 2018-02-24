<template>
<div id="comment-footer">
	<div class="hot-comments" v-if='hotComments.length !== 0'>
		<div>精彩评论</div>
	</div>
	<div class="comments" v-if='hotComments.length !== 0'>
		<ul>
			<li v-for='(item,index) in hotComments'>
				<div class="msg">
					<img @click="toUserh(index)" :src="item.user.avatarUrl" >
					<div class="name">
						<p>{{ item.user.nickname }}</p>
						<p>{{ item.time | getCommentTime }}</p>
					</div>
					<div class="like" :class='item.liked ? "islike":"notlike"' @click='likeHot(index)'>
						{{ item.likedCount | getCount }}<i class="iconfont icon-dianzanshu"></i>
					</div>
				</div>
				<div class="comment" v-if='item.beReplied.length == 0'>
					<span>{{ item.content }}</span>
				</div>
				<div class="comment" v-if='item.beReplied.length>0'>
					<!--此处加userId可以传参到user页面 先暂时不写-->
					<span>回复<a @click='toUserha(index)'>@{{ item.beReplied[0].user.nickname }}</a>:{{ item.content }}</span>
					<div><a @click='toUserha(index)'>@{{ item.beReplied[0].user.nickname }}</a>:{{ item.beReplied[0].content }}</div>
				</div>
			</li>
		</ul>
	</div>
	<div class="hot-comments">
		<div>最新评论({{ total }})</div>
	</div>
	<div class="not-comment" v-if='reply'>暂无评论,欢迎抢沙发</div>
	<div class="comments" v-if='comments.length !== 0'>
		<ul>
			<li v-for='(item,index) in comments'>
				<div class="msg">
					<img @click="toUser(index)" :src="item.user.avatarUrl" >
					<div class="name">
						<p>{{ item.user.nickname }}</p>
						<p>{{ item.time | getCommentTime }}</p>
					</div>
					<div class="like" :class='item.liked ? "islike":"notlike"' @click='like(index)'>
						<span v-show='item.likedCount != 0'>{{ item.likedCount | getCount }}</span><i class="iconfont icon-dianzanshu"></i>
					</div>
				</div>
				<div class="comment" v-if='item.beReplied.length == 0'>
					<span>{{ item.content }}</span>
				</div>
				<div class="comment" v-if='item.beReplied.length>0'>
					<!--此处加userId可以传参到user页面 先暂时不写-->
					<span>回复<a @click='toUsera(index)'>@{{ item.beReplied[0].user.nickname }}</a>:{{ item.content }}</span>
					<div><a @click='toUsera(index)'>@{{ item.beReplied[0].user.nickname }}</a>:{{ item.beReplied[0].content }}</div>
				</div>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
export default {
	props:['comments','hotComments','total'],
	data(){
		return {
			reply:false,
			songId:""
		}
	},
	methods:{
		//点赞功能
		//精彩评论
		likeHot(idx){
			if(this.hotComments[idx].liked ){
				//当点赞过时 取消点赞
				apiGet.like.to('/comment/like',{
					id:this.songId,
					cid:this.hotComments[idx].user.userId,
					t:0,
					type:this.hotComments[idx].user.userType
				})
				.then((res)=>{
					this.hotComments[idx].liked = false ;
					this.hotComments[idx].likedCount -= 1 ;	
				})
			}else {
				//当没点赞时 点赞
				apiGet.like.to('/comment/like',{
					id:this.songId,
					cid:this.hotComments[idx].user.userId,
					t:1,
					type:this.hotComments[idx].user.userType
				})
				.then((res)=>{
					this.hotComments[idx].liked = true ;
					this.hotComments[idx].likedCount += 1 ;	
				})
			}
		},
		//普通评论
		like(idx){
			if(this.comments[idx].liked ){
				//当点赞过时 取消点赞
				apiGet.like.to('/comment/like',{
					id:this.songId,
					cid:this.comments[idx].user.userId,
					t:0,
					type:this.comments[idx].user.userType
				})
				.then((res)=>{
					this.comments[idx].liked = false ;
					this.comments[idx].likedCount -= 1 ;	
				})
			}else {
				//当没点赞时 点赞
				apiGet.like.to('/comment/like',{
					id:this.songId,
					cid:this.comments[idx].user.userId,
					t:1,
					type:this.comments[idx].user.userType
				})
				.then((res)=>{
					this.comments[idx].liked = true ;
					this.comments[idx].likedCount += 1 ;	
				})
			}
		},
		//点击用户头像去到用户页面
		//点击普通评论
		toUser(idx){
			this.$store.dispatch('handleCreateCollect',this.comments[idx].user.userId);
			//获取id 异步提交请求  保存id 请求后获取用户信息
			this.$store.dispatch('handleUserId',this.comments[idx].user.userId)
			.then((res)=>{
			    this.$router.push('/user');
			},(err)=>{
			})
		},
		//点击有普通评论有@的
		toUsera(idx){
			this.$store.dispatch('handleCreateCollect',this.comments[idx].beReplied[0].user.userId);
			//获取id 异步提交请求  保存id 请求后获取用户信息
			this.$store.dispatch('handleUserId',this.comments[idx].beReplied[0].user.userId)
			.then((res)=>{
			    this.$router.push('/user');
			},(err)=>{
			})
		},
		//点击精彩评论
		toUserh(idx){
			this.$store.dispatch('handleCreateCollect',this.hotComments[idx].user.userId);
			//获取id 异步提交请求  保存id 请求后获取用户信息
			this.$store.dispatch('handleUserId',this.hotComments[idx].user.userId)
			.then((res)=>{
			    this.$router.push('/user');
			},(err)=>{
			})
		},
		//点击精彩评论有@的
		toUserha(idx){
			this.$store.dispatch('handleCreateCollect',this.hotComments[idx].beReplied[0].user.userId);
			//获取id 异步提交请求  保存id 请求后获取用户信息
			this.$store.dispatch('handleUserId',this.hotComments[idx].beReplied[0].user.userId)
			.then((res)=>{
			    this.$router.push('/user');
			},(err)=>{
			})
		}
	},
	mounted(){
		if(this.$route.query.id){
			this.songId = this.$route.query.id ;
		}
		console.log(this.comments)
		if(this.comments !== ""){
			this.reply = false ;
		}else {
			this.reply = true ;
		}
	}
}
</script>

<style>
</style>