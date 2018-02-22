<template>
<!--搜索mv-->
<div id="search-mv" >
	<ul v-if='lists&&lists.length > 0'>
		<li v-for='item in lists'>
			<div class="play">
				<div>
					<i class="iconfont icon-video"></i>
					{{ item.playCount | getCount }}
				</div>
				<img :src="item.cover" />
			</div>	
			<div class="music-mv">
				<p><i class="iconfont icon-liebiaomv"></i><span>{{ item.name }}</span></p>
				<p>{{ item.duration | getDuration }} <span v-if='item.artists&&item.artists.length > 0'>{{ item.artists | getSinger }}</span></p>
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
	beforeCreate(){
		this.$store.dispatch('handleSearchType',1004);
	}
}
</script>

<style>
</style>