<template>
<div id="search-singer" >
	<ul v-if='lists&&lists.length > 0'>
		<li @click='toUser(index)' v-for='(item,index) in lists'>
			<img :src="item.img1v1Url"/>
			<div class="singer-msg">
				{{ item.name }} <span v-if='item.transNames'>({{ item.transNames[0] }})</span>
			</div>
		</li>
	</ul>
	<div class="nofound" v-if='lists&&lists.length == 0'>未找到与"{{ keyword }}"相关的内容</div>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
export default {
	props:['lists'],
	methods:{
		toUser(idx){
			this.$store.dispatch('handleSingerId',this.lists[idx].id);
			this.$router.push('/singer');
		}
	},
	computed:{
		keyword(){
			return this.$store.state.user.keyword;
		}
	},
	beforeCreate(){
		this.$store.dispatch('handleSearchType',100);
	}
}
</script>

<style>
</style>