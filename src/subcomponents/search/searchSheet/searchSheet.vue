<template>
<!--搜索歌单-->
<div id="search-sheet" v-if='lists&&lists.length > 0'>
	<ul>
		<li @click='toSheet(index)' v-for='(item,index) in lists'>
			<img :src="item.coverImgUrl"/>
			<div class="music-sheet">
				<p>{{ item.name }}</p>
				<p>{{ item.trackCount }}首 <span v-if='item.creator'>by{{ item.creator.nickname }}</span> , 播放{{ item.playCount | getCount }}次</p>
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
	methods:{
		toSheet(idx){
			this.$router.push({
				path:'/sheetdetails',
				query:{
					id:this.lists[idx].id
				}
			})
		}
	},
	beforeCreate(){
		this.$store.dispatch('handleSearchType',1000);
	}
}
</script>

<style>
</style>