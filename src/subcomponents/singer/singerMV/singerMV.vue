<template>
<!--歌手MV-->
<div id="singer-mv">
	<loadingb v-if='loadingb'></loadingb>
	<ul v-if='!loadingb'>
		<li v-for='item in mv'>
			<div class="play">
				<div>
					<i class="iconfont icon-video"></i>
					{{ item.playCount | getCount }}
				</div>
				<img :src="item.imgurl16v9"/>
			</div>	
			<div class="music-msg">
				<p>{{ item.name }}</p>
				<p>{{ item.publishTime  }}</p>
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
			mv:[],
			loadingb:true
		}
	},
	computed:{
		id(){
			return this.$store.state.user.singerId ;
		}
	},
	mounted(){
		if(this.id){
			apiGet.singerMV.to('/artist/mv',{
				id:this.id
			})
			.then((res)=>{
				this.mv = res.data.mvs ;
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