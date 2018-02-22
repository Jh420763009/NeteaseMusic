<template>
<div id="about-user">
	<div>
		<p>个人信息</p>
		<ul>
			<li>
				等级: LV.{{ userMsg.level }}
			</li>
			<li v-if='userMsg.profile.gender'>
				性别: <span v-if='userMsg.profile.gender == 1'>男</span><span v-if='userMsg.profile.gender == 2'>女</span>
			</li>
		</ul>
	</div>
	<div>
		<p>个人介绍</p>
		<ul>
			<li>
				<span class="notMsg" v-show='userMsg.profile.signature == 0'>还没有填写个人介绍</span>
				<span v-show='userMsg.profile.signature != 0'>{{ userMsg.profile.signature }}</span>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
export default {
	computed:{
		userMsg(){
			return this.$store.state.user.userMsg ;
		}
	}
}
</script>

<style>
</style>