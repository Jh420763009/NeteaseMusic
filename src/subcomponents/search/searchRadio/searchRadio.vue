<template>
<div id="search-radio" v-if='lists&&lists.length > 0'>
	<div class="radio">
		电台
	</div>
	<ul>
		<li v-for='item in lists'>
			<img class="radio-avatar" :src="item.picUrl"/>
			<div class="music-msg">
				<p>{{ item.name }}</p>
				<p v-if='item.dj'>{{ item.dj.nickname }}</p>
			</div>
		</li>
	</ul>
	<div class="nofound" v-if='lists&&lists.length == 0'>未找到与"{{ keyword }}"相关的内容</div>
</div>
</template>

<script>
export default {
	props:['lists'],
	computed:{
		keyword(){
			return this.$store.state.user.keyword;
		}
	},
	beforeCreate(){
		this.$store.dispatch('handleSearchType',1009);
	}
}
</script>

<style>
</style>