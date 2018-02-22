<template>
<div id="search-album">
	<ul v-if='lists&&lists.length > 0'>
		<li @click='toAlbum(index)' v-for='(item,index) in lists'>
			<img :src="item.picUrl"/>
			<img class="album" src="../../../assets/img/user/albumbg.png">
			<div class="music-album">
				<p>{{ item.name }}</p>
				<p v-if='item.artist'>{{ item.artist.name }}<span v-if='item.artist.trans'>({{ item.artist.trans }})</span>
					<span v-if='item.containedSong'>包含单曲: {{ keyword }}</span>
					<span v-if='!item.containedSong'>{{ item.publishTime | getPublishTime }}</span>
				</p>
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
	computed:{
		keyword(){
			return this.$store.state.user.keyword;
		}
	},
	methods:{
		toAlbum(idx){
			this.$router.push({
				path:'/albumdetails',
				query:{
					id:this.lists[idx].id
				}
			})
		}
	},
	beforeCreate(){
		this.$store.dispatch('handleSearchType',10);
	}
}
</script>

<style>
</style>