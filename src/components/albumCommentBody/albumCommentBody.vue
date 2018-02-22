<template>
<router-link 
	tag='div' 
	:to="{path:'albumdetails',query:{ id : msg.id }}" 
	id="comment-body" 
	v-if='msg'
>
	<img :src="msg.picUrl"/>
	<div class="msg">
		<p>{{ msg.name }}</p>
		<p>{{ msg.artist.name }}</p>
	</div>
	<div class="to">
		<i class="iconfont icon-dayuhao"></i>
	</div>
</router-link>
</template>

<script>
export default {
	props:['msg']
}
</script>

<style>
</style>