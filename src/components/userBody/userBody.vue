<template>
<!--个人信息子组件-->
<div id="user-body"  :style="{backgroundImage:`url(${userMsg.profile.backgroundUrl})`}">
	<img :src="userMsg.profile.avatarUrl">
	<div class="name">
		{{ userMsg.profile.nickname }}
		<i v-show='userMsg.profile.gender == 1' class="iconfont icon-nanxing nan"></i>
		<i v-show='userMsg.profile.gender == 2' class="iconfont icon-nvxing nv"></i>
	</div>
	<div class="follow">
		<span>关注{{ userMsg.profile.follows }}</span><span>粉丝 {{ userMsg.profile.followeds }}</span>
	</div>
</div>
</template>

<script>
export default {
	computed:{
		userMsg(){
			return this.$store.state.user.userMsg ;
		}
	},
}
</script>

<style>
</style>