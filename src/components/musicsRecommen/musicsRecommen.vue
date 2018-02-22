<template>
<div id="musics-recommon">
	<div class="sheet-recommon">
		<p>推荐歌单<i class="iconfont icon-dayuhao"></i></p>
		<ul>
			<li @click='toSheet(index)' v-for='(item,index) in recommonSheet'>
				<div class="count">
					<div>
						<i class="iconfont icon-1"></i>
						{{ item.playCount | getCount }}
					</div>
					<img :src="item.picUrl">
				</div>
				<p>{{ item.name }}</p>
			</li>
		</ul>
	</div>
	<div class="exclusive">
		<p>独家放送<i class="iconfont icon-dayuhao"></i></p>
		<ul>
			<li v-for='item in privateContent'>
				<img :src="item.picUrl">
				<p>{{ item.name }}</p>
			</li>
			
		</ul>
	</div>
	<div class="newmusic">
		<p>最新音乐<i class="iconfont icon-dayuhao"></i></p>
		<ul>
			<li @click='toAlbum(index)' v-for='(item,index) in newSong' v-if='newSong'>
				<img :src="item.song.album.picUrl">
				<p>{{ item.song.album.name }}</p>
				<p v-if='item.song.artists'>{{ item.song.artists[0].name }}</p>
			</li>
		</ul>
	</div>
	<div class="recommon-mv">
		<p>推荐MV<i class="iconfont icon-dayuhao"></i></p>
		<ul>
			<li v-for='item in recommonMv'>
				<div class="count">
					<div>
						<i class="iconfont icon-1"></i>
						{{ item.playCount }}
					</div>
					<img :src="item.picUrl">
				</div>
				<p>{{ item.name }}</p>
				<p>{{ item.artists[0].name }}</p>
			</li>
		</ul>
	</div>
	<div class="radios">
		<p>主播电台<i class="iconfont icon-dayuhao"></i></p>
		<ul>
			<li v-for='item in radios'>
				<div>
					<img :src="item.picUrl">
					<div>{{ item.program.mainSong.artists[0].name }}</div>
				</div>
				<p>{{ item.name }}</p>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
export default {
	data(){
		return {
			recommonSheet:[],
			privateContent:[],
			newSong:[],
			recommonMv:[],
			radios:[]
		}
	},
	methods:{
		toSheet(idx){
			this.$router.push({
				path:"/sheetdetails",
				query:{
					id:this.recommonSheet[idx].id
				}
			})
		},
		toAlbum(idx){
			this.$router.push({
				path:"/albumdetails",
				query:{
					id:this.newSong[idx].id
				}
			})
		}
	},
	mounted(){
		//推荐歌单
		apiGet.recommonSheet.to('/personalized')
		.then((res)=>{
			for(var i = 0 ; i < 6;i++){
				this.recommonSheet = this.recommonSheet.concat(res.data.result[i]);
			}

		})
		//独家放送
		apiGet.privatecontent.to('/personalized/privatecontent')
		.then((res)=>{
			for(var i = 0 ; i < 3;i++){
				this.privateContent = this.privateContent.concat(res.data.result[i]);
			}
			//获取数据后颠倒位置
			for(var i = 0 ; i < this.privateContent.length;i++){
				var s = this.privateContent[0] ;
				this.privateContent[0] =  this.privateContent[this.privateContent.length-1];
				this.privateContent[this.privateContent.length-1] = s ;
			}
		})
		//最新音乐
		apiGet.newsong.to('/personalized/newsong')
		.then((res)=>{
			for(var i = 0 ; i < 6;i++){
				this.newSong = this.newSong.concat(res.data.result[i]);
			}
		})
		//推荐MV
		apiGet.recommonMV.to('/personalized/mv')
		.then((res)=>{
			//recommonMv
			for(var i = 0 ; i < 4;i++){
				this.recommonMv = this.recommonMv.concat(res.data.result[i]);
			}
		})
		//主播电台
		apiGet.recommonRadios.to('/personalized/djprogram')
		.then((res)=>{
			//recommonMv
			for(var i = 0 ; i < 6;i++){
				this.radios = this.radios.concat(res.data.result[i]);
			}
		})
	}
}
</script>

<style>
</style>