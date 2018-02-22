<template>
<router-link 
	tag='div' 
	:to="{path:'sheetdetails',query:{ id : msg.id }}"
	id="comment-body" 
	v-if='msg'
>
	<img :src="msg.coverImgUrl"/>
	<div class="msg">
		<p>{{ msg.name }}</p>
		<p v-if='msg.creator'>{{ msg.creator.nickname }}</p>
	</div>
	<div class="to">
		<i class="iconfont icon-dayuhao"></i>
	</div>
</router-link>
</template>

<script>
export default {
	props:['msg'],
	mounted(){
		console.log(this.msg)
	}
}
</script>

<style>
</style>