<template>
<!--list组件未登录时的推荐歌单-->
<div id="rec-sheet" v-if='!sheet'>
	<p>推荐歌单</p>
	<div class="sheet">
		<div>
			<img src="../../assets/img/home/user.png"/>
			<p>滚石杂志史上最强的xxxxxxxxxxx</p>
		</div>
		<div>
			<img src="../../assets/img/home/user.png"/>
			<p>滚石杂志史上最强的xxxxxxxxxxx</p>
		</div>
		<div>
			<img src="../../assets/img/home/user.png"/>
			<p>滚石杂志史上最强的xxxxxxxxxxx</p>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data(){
		return {
			sheet:false 
		}
	},
	mounted(){
		//判断是否 登录  如果登录就把
		let waslogin = this.$local.fetch('user').waslogin ;
		if(waslogin){
			console.log(waslogin)
			this.sheet = true ;
		}else {
			this.sheet = false ;
		}
	}
}
</script>

<style>
</style>