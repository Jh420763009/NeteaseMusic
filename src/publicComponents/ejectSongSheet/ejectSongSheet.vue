<template>
<!--收藏单曲时弹出的歌单列表-->
<div id="eject-songsheet">
	<p>收藏到歌单</p>
	<ul v-if='!login'>
		<li v-for='(item,index) in songSheet' @click='addSongSheet(index)'>
			<img :src="item.coverImgUrl">
			<div>
				<p>{{ item.name | myLoveMusic }}</p>
				<p>{{ item.trackCount }}首</p>
			</div>
		</li>
	</ul>
	<div class="nologin" v-if='login'>您还未登录</div>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import { mapState } from 'vuex'
export default {
	data(){
		return {
			songSheet:[],
			login:false
		}
	},
	computed:mapState({
		songId:state => state.user.delMsg.songId ,
	}),
	methods:{
		addSongSheet(idx){
			let SheetId = this.songSheet[idx].id ;
			console.log('歌单id'+SheetId)
			console.log('歌曲id'+this.collectSong)
			//添加到歌单  登录没有用处  先暂存 后面再做
			apiGet.addordel.to('/playlist/tracks',{
				op:'add',
				pid:SheetId,
				tracks:this.songId
			})
			.then((res)=>{
				if(res.data.code == 200){
					this.$store.commit('changeToastMsg','已添加');
					this.$store.commit('changeShowToast',true);
					this.$store.commit('changeShowBg',false);
					this.$store.commit('changeShowEjectS',false);
				}else {
					this.$store.commit('changeToastMsg','已存在');
					this.$store.commit('changeShowToast',true);
					this.$store.commit('changeShowBg',false);
					this.$store.commit('changeShowEjectS',false);
				}
				
			})
			
		}
	},
	mounted(){
		//判断是否 登录  如果登录就把
		let waslogin = this.$local.fetch('user').waslogin ;
		if(waslogin){
			//如果登录 就把获取的歌单填进去
			this.songSheet = this.$store.state.user.userSheet ;
			this.login = false ;
		}else {
			this.login = true ;
		}
	}
}
</script>

<style>
</style>