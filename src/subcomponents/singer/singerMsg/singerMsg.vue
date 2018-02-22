<template>
<!--歌手信息-->
<div id="singer-msg">
	<loadingb v-if='loadingb'></loadingb>
	<div v-if='!loadingb'>
		<div class="introduce" v-if='msg'>
			<div class="title">简介</div>
			<p>{{ msg }}</p>
			<!--<div class="more-introduce">完整歌手介绍<i class="iconfont icon-dayuhao"></i></div>-->
		</div>
		<div class="article" v-if='articles'>
			<div class="title">相关文章专栏</div>
			<div class="msg" v-for='item in articles'>
				<img :src="item.rectanglePicUrl"/>
				<div>
					<p>{{ item.title }}</p>
					<p>BY {{ item.creator.nickname }} 阅读{{ item.readCount | getCount }}</p>
				</div>
			</div>
			<!--<div class="more-introduce">全部专栏文章(6)</div>-->
		</div>
		<div class="similar">
			<div class="title">相似歌手</div>
			<ul>
				<li v-for='(item,index) in simi' @click='toSinger(index)'>
					<img :src="item.picUrl"/>
					<div>{{ item.name }}</div>
				</li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import loadingb from '@/publicComponents/loadingb/loadingb'
export default {
	data(){
		return {
			msg:"",
			articles:null,
			simi:null,
			loadingb:true,
			loading:true
		}
	},
	computed:{
		id(){
			return this.$store.state.user.singerId ;
		}
	},
	methods:{
		toSinger(idx){
			console.log(this.simi);
			//关闭single
			this.$store.commit('changeSingle',false);
			//关闭播放器
			this.$store.commit('showPlayer',false);
			
			this.$store.dispatch('handleSingerId',this.simi[idx].id);
			this.$router.push('/singer');
			//关闭黑色背景
			this.$store.commit('changeShowBg',false);
		}
	},
	mounted(){
		if(this.id){
			//获取歌手描述
			apiGet.singerDesc.to('/artist/desc',{
				id:this.id
			})
			.then((res)=>{
				if(res.data.briefDesc){
					this.msg = res.data.briefDesc ;
				}
				if(res.data.topicData){
					this.articles = res.data.topicData ;
				}
			})
			
			//获取相似歌手
			apiGet.singerDesc.to('/simi/artist',{
				id:this.id
			})
			.then((res)=>{
				this.simi = res.data.artists ;
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