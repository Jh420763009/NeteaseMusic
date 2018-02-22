<template>
<div id="player-list">
	<div class="player-header">
		<div v-if='listLoop' @click='changeModuleList'>
			<i class="iconfont icon-xunhuanbofang"></i>列表循环 ({{ playerList.length }})
		</div>
		<div v-if='singleLoop' @click='changeModuleSingle'>
			<i class="iconfont icon-danquxunhuan"></i>单曲循环 ({{ playerList.length }})
		</div>
		<div v-if='random' @click='changeModuleRandom'>
			<i class="iconfont icon-suijibofang"></i>随机播放 ({{ playerList.length }})
		</div>
		<div>
			<i class="iconfont icon-lajitong"></i>清空
		</div>
	</div>
	<div class="list">
		<ul id="playerList">
			<li 
				v-for='(item,index) in playerList'  
				:class='playingLIdx==index?"wasplaying":"notplaying"'
				@click.stop='toplay(index)'
			>
				<p>
					<i class="iconfont icon-ttsbofangzhong"></i>
					<span class="name">{{ item.name }}</span>
					<!--普通数据-->
					<span class="ar" v-if='item.ar'>-{{ item.ar | getSinger }}</span>
					<!--搜索时的数据-->
					<span class="ar" v-if='item.artists'>-{{ item.artists | getSinger }}</span>
				</p>
				<div>
					<i class="iconfont icon-link about"></i>
					<i @click.stop='delList(index)' class="iconfont icon-cuo del"></i>
				</div>
			</li>
		</ul>
	</div>
	
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data(){
		return {
			show:false,
			indexs:0,
			ul:null
		}
	},
	computed:mapState({
		
		playerList:state => state.music.playerList ,
		//正在播放歌曲的索引
		playingLIdx:state => state.music.playingLIdx,
		//歌单歌曲列表 比较用 
		playList:state => state.music.playList,
		//列表循环
		listLoop:state => state.music.listLoop,
		//单曲循环
		singleLoop:state => state.music.singleLoop,
		//随机播放
		random:state => state.music.random,
	}),
	watch:{
		//当为空时就关闭播放组件
		playerList:function(news,old){
			if(this.playerList.length == 0){
				this.$store.commit('changeShowPl',false);
				this.$store.commit('changeShowBg',false);
				this.$store.commit('showPlayer',false);
				this.$store.commit('showPlayTab',false);
			}
		}
	},
	methods:{
		delList(idx){
			console.log('当前index是'+idx)
			if(idx == this.playingLIdx){
				this.$store.commit('delPlayerList',idx);
				this.$store.commit('savePlayingLIdx',idx);
				if(this.playerList.length != 0){
					this.toplay(idx);
				}
			}else if(idx < this.playingLIdx){
				this.$store.commit('savePlayingLIdx',this.playingLIdx-1);
				this.$store.commit('delPlayerList',idx);
			}else{
				this.$store.commit('delPlayerList',idx);
			}
		},
		toplay(idx){
			//获取歌曲信息 ,歌曲文件等
			this.$store.dispatch('handlePlay',this.playerList[idx].id);
			//
			this.$store.dispatch('handlePlayingIdx',idx);
			this.$store.dispatch('handlePlayingLIdx',idx);
		},
		//从列表循环转换成单曲循环
		changeModuleList(){
			this.$store.commit('changeListLoop');
		},
		//从单曲循环转换成随机播放
		changeModuleSingle(){
			this.$store.commit('changeSingleLoop');
		},
		//从随机播放转换成列表循环
		changeModuleRandom(){
			this.$store.commit('changeRandom');
		}
	},
	mounted(){
		this.ul = document.querySelector('#playerList');
	}
}
</script>

<style>
</style>