<template>
<!--查看歌手主页有多个歌手时弹出的确认列表-->
<div id="eject-choosesinger">
	<p class="collect">请选择要查看的歌手</p>
	<ul v-if='singer'>
		<li v-for='(item,index) in singer' @click='toUser(index)'>
			<img :src="item.img">
			<div>
				<p>{{ item.name }}</p>
			</div>
		</li>
	</ul>
	<!--<div class="nologin" >您还未登录</div>-->
</div>
</template>

<script>
import { apiGet } from '@/api/api'
export default {
	data(){
		return {
			
		}
	},
	methods:{
		toUser(idx){
			this.$store.dispatch('handleSingerId',this.singer[idx].id);
			this.$router.push('/singer');
			this.$store.commit('changeShowEjectC',false);
			this.$store.commit('changeShowBg',false);
		}
	},
	computed:{
		singer(){
			return this.$store.state.user.singer;
		}
	},
	mounted(){
	}
}
</script>

<style>
</style>