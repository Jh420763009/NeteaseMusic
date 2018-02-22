<template>
	<div id="sidebar">
		<div class="list">
			<div class="header" >
				<div class="waslogin" v-if='wasLogin' :style="{backgroundImage:`url(${msg.profile.backgroundUrl})`}">
					<div class="avatar">
						<img @click='toUser' :src="msg.profile.avatarUrl"/>
						<div class="name-level">
							<p class="usern">
								{{ msg.profile.nickname }}
							</p>
							<p class="level">
								LV.{{ msg.level }}
							</p>
							<p class="sign">
								<i class="iconfont icon-integral"></i> 签到
							</p>
						</div>
						
					</div>
				</div>
				<div class="notlogin" v-if='!wasLogin'>
					<div class="tips">
						<p>登录网易云音乐</p>
						<p>320K高音质无限下载,手机电脑多端同步</p>
					</div>
					<router-link tag='div' class="login" to='/' >立即登录</router-link>
				</div>
			</div>
			<div class="content">
				<ul>
					<li>
						<i class="iconfont icon-xiaoxi"></i>
						 我的消息
					</li>
					<li>
						<i class="iconfont icon-xiaoxi"></i>
						会员中心
					</li>
					<li>
						<i class="iconfont icon-xiaoxi"></i>
						商城
					</li>
					<li>
						<i class="iconfont icon-xiaoxi"></i>
						免费听歌
					</li>
				</ul>
				<ul>
					<li>
						<i class="iconfont icon-xiaoxi"></i>
						 我的好友
					</li>
					<li>
						<i class="iconfont icon-xiaoxi"></i>
						附近的人
					</li>
				</ul>
				<ul>
					<li v-for='item in list'>
						<i class="iconfont icon-xiaoxi"></i>
						{{ item.type }}
					</li>
					
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
let list = [
	{
		"type":"个性换肤"
	},
	{
		"type":"听歌识曲"
	},
	{
		"type":"定时停止播放"
	},
	{
		"type":"扫一扫"
	},
	{
		"type":"音乐闹钟"
	},
	{
		"type":"驾驶模式"
	},
	{
		"type":"音乐云盘"
	}
];
export default {
	props:['msg'],
	data(){
		return {
			list:list,
			id:0
		}
	},
	computed:{
		//检测登录
		wasLogin(){
			if(this.$local.fetch('user').waslogin === true ){
				return true ;
			}else {
				return false ;
			}			
		}		
	},
	methods:{
		toUser(){
			//获取id 异步提交请求  保存id 请求后获取用户信息
			this.$store.dispatch('handleUserId',this.msg.profile.userId)
			.then((res)=>{
			    this.$router.push('/user');
			},(err)=>{
			})
		}
	}
}
</script>

<style>
</style>