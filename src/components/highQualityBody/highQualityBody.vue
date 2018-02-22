<template>
<div id="highquality-body">
	<div class="sheet">
		<ul>
			<li @click='toSheet(index)' v-for='(item,index) in highQuality'>
				<div class="count">
					<div>
						<i class="iconfont icon-1"></i>
						{{ item.playCount | getCount }}
					</div>
					<img :src="item.coverImgUrl">
				</div>
				<div class="msg">
					<p>{{ item.name }}</p>
					<p>by {{ item.creator.nickname }}</p>
					<p><span>{{ item.tags[0] }}</span>{{ item.copywriter }}</p>
				</div>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
export default {
	props:['highQuality'],
	methods:{
		toSheet(idx){
			this.$router.push({
				path:"/sheetDetails",
				query:{
					id:this.highQuality[idx].id 
				}
			})
		}
	},
}
</script>

<style>
</style>