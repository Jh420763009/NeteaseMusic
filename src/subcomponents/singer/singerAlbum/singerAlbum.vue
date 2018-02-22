<template>
<!--歌手专辑-->
<div id="singer-album">
	<loadingb v-if='loadingb'></loadingb>
	<ul v-if='!loadingb'>
		<li v-for='(item,index) in album' @click='toSheet(index)'>
			<img :src="item.picUrl"/>
			<img class="album" src="../../../assets/img/user/albumbg.png">
			<div class="music-msg">
				<p>{{ item.name }}</p>
				<p>{{ item.publishTime | getPublishTime }} 歌曲{{ item.size }}</p>
			</div>
		</li>		
	</ul>
	
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import loadingb from '@/publicComponents/loadingb/loadingb'
export default {
	data(){
		return {
			album:[],
			loadingb:true
		}
	},
	computed:{
		id(){
			return this.$store.state.user.singerId ;
		}
	},
	methods:{
		toSheet(idx){
			console.log(this.album);
			this.$router.push({
				path:'/albumdetails',
				query:{
					id:this.album[idx].id 
				}
			})
		}
	},
	mounted(){
		if(this.id){
			apiGet.singerAlbum.to('/artist/album',{
				id:this.id,
				limit:50
			})
			.then((res)=>{
				this.album = res.data.hotAlbums ;
				this.loadingb = false ;
			})
		}
	},
	components:{
		loadingb
	}
	
}
</script>

<style>
</style>