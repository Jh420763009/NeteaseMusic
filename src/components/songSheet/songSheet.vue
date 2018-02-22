<template>
<!--登录的用户自己的歌单-->
<div id="song-sheet">
	<div class="header" @click='sheetHandle'>
		<div class="up" ref='icon'>
			<i class="iconfont icon-down-trangle-copy"></i>
		</div>
		<div class="msg">
			创建的歌单({{ createSheet.length }})
		</div>
	</div>
	<!--未登录-->
	<div v-if='!showSheet'>
		<div class="sheet-notlogin" v-if='createSheet.length'>
			<ul>
				<li>
					<div>
						<div class="like">
							<img src="../../assets/img/home/user.png" />
							<!--<span class="black"></span>
							<span class="love"><i class="iconfont icon-icon1460188445268"></i></span>-->
						</div>
					</div>
					<div class="music">
						<p>我喜欢的音乐未登录</p>0首
					</div>
					<div class="playing">
						<i class="iconfont icon-ttsbofangzhong"></i>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<!--已经登录-->
	<div v-if='sheet'>
		<div class="sheet-login" v-if='showSheet'>
			<ul v-if='createSheet&&createSheet.length>0'>
				<router-link tag='li' :to="{path:'sheetdetails',query:{ id : item.id }}" v-for='item in createSheet' :key='item.id'>
					<div>
						<div class="like">
							<img :src="item.coverImgUrl" />
							<!--<span class="black"></span>
							<span class="love"><i class="iconfont icon-icon1460188445268"></i></span>-->
						</div>
					</div>
					<div class="music">
						<p>{{ item.name | myLoveMusic }}</p>{{ item.trackCount }}首
					</div>
					<div class="playing">
						<!--<i class="iconfont icon-ttsbofangzhong"></i>-->
					</div>
				</router-link>
			</ul>
		</div>
	</div>
	<!--已经登录-->
	<div class="header" @click='sheetHandles'  v-if='collectSheet&&collectSheet.length>0'>
		<div class="up" ref='icons'>
			<i  class="iconfont icon-down-trangle-copy"></i>
		</div>
		<div class="msg">收藏的歌单({{ collectSheet.length }})</div>
	</div>
	<div v-if='sheets'>
		<div class="sheet-login" v-if='collectSheet&&collectSheet.length>0'>
			<ul>
				<router-link tag='li' :to="{path:'sheetdetails',query:{ id : item.id }}" v-for='item in collectSheet' :key='item.id'>
					<div>
						<div class="like">
							<img :src="item.coverImgUrl" />
							<!--<span class="black"></span>
							<span class="love"><i class="iconfont icon-icon1460188445268"></i></span>-->
						</div>
					</div>
					<div class="music">
						<p>{{ item.name }}</p>{{ item.trackCount }}首
					</div>
					<div class="playing">
						<!--<i class="iconfont icon-ttsbofangzhong"></i>-->
					</div>
				</router-link>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import { mapState } from 'vuex'
export default {
	data(){
		return {
			showSheet:true,
			sheet:true,
			sheets:true,
		}
	},
	computed:mapState({
		createSheet:state => state.user.createSheet ,
		collectSheet:state => state.user.collectSheet
	}),
	methods:{
		//控制菜单 自己的菜单
		sheetHandle(){
			if(this.sheet){
				this.sheet = false ;
				this.$refs.icon.style.transform = 'rotate(-90deg)';
			}else {
				this.sheet = true ;
				this.$refs.icon.style.transform = 'rotate(0deg)';
			}
		},
		//控制菜单 收藏的菜单
		sheetHandles(){
			if(this.sheets){
				this.sheets = false ;
				this.$refs.icons.style.transform = 'rotate(-90deg)';
			}else {
				this.sheets = true ;
				this.$refs.icons.style.transform = 'rotate(0deg)';
			}
		},
	},
	mounted(){
		//判断是否 登录  如果登录就获取歌单
		let waslogin = this.$local.fetch('user').waslogin ;
		if(waslogin){
			this.showSheet = true ;
			//如果登录 验证params 并且获取歌单
			let params = this.$store.state.user.uid ;
			if(params){
				//提交一个action 获取歌单
				this.$store.dispatch('handleCreateCollect',params);
			}
		}else {
			this.showSheet = false ;
		}
		
	}
}
</script>

<style>
</style>