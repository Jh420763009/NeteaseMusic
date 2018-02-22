<template>
<div id="search-suggest" @click='search'>
	<div class="search">
		搜索"{{ msg }}"
	</div>
	<!--<ul>
		<li>
			<i class="iconfont icon-sousuo"></i>
			周杰伦周杰伦周杰伦周杰伦周杰伦周杰伦周杰伦周杰伦周杰伦周杰伦周杰伦周杰伦
		</li>
	</ul>-->
</div>
</template>

<script>
import { apiGet } from '@/api/api'
export default {
	props:['msg'],
	methods:{
		search(){
			//保存关键词
			this.$store.dispatch('handleKeyword',this.msg.trim());
			//获取最佳匹配
		}
	}
}
</script>

<style>
</style>