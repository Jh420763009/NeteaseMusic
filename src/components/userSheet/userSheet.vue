<template>
<div id="user-sheet">
	<div class="num" v-if='createSheet.length > 0'>
		<span>歌单({{createSheet.length}})</span>
		<span>共被收藏2次</span>
	</div>
	<div class="sheet" v-if='createSheet.length > 0'>
		<ul>
			<router-link 
				:to="{path:'sheetdetails',query:{ id : item.id }}" 
				tag='li' 
				v-for='item in createSheet'
				:key='item.id'
			>
				<img :src="item.coverImgUrl"/>
				<div>
					<p>{{ item.name | myLoveMusic }}</p>
					<p>{{ item.trackCount }}首 , 播放{{ item.playCount | getCount }}次</p>
				</div>
			</router-link>
		</ul>
	</div>
	<div class="num" v-if='collectSheet.length > 0'>
		<span>收藏的歌单({{ collectSheet.length }})</span>
		<span>共被收藏2次</span>
	</div>
	<div class="sheet" v-if='collectSheet.length > 0'>
		<ul>
			<router-link 
				:to="{path:'sheetdetails',query:{ id : item.id }}" 
				tag='li' 
				v-for='item in collectSheet'
				:key='item.id'
			>
				<img :src="item.coverImgUrl"/>
				<div>
					<p>{{ item.name | myLoveMusic }}</p>
					<p>{{ item.trackCount }}首 , 播放{{ item.playCount | getCount }}次</p>
				</div>
			</router-link>
		</ul>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data(){
		return {
			
		}
	},
	//保存着分类好的歌单
	computed:mapState({
		createSheet:state => state.user.createSheet ,
		collectSheet:state => state.user.collectSheet
	}),
	mounted(){
		console.log(this.createSheet);
		console.log(this.collectSheet);
	}
}
</script>

<style>
</style>