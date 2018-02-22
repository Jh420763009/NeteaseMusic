<template>
  <div id="app">
    	<router-view/>
      <playTab v-if='playTab'></playTab>
      <player></player>
      <transition-group name='player'>
      	<playerList v-show='showPl' :key='keys.pl'></playerList>
      	<singleoperation v-if='showSingle' :key='keys.so' ></singleoperation>
      </transition-group>
      <transition-group name='opacity'>
      	<!--黑色背景-->
      	<blackbg v-show='showBg' :key="keys.bb"></blackbg>
      	<!--删除后结果提示框-->
      	<toast v-if='showToast' :key="keys.t"></toast>
      	<!--删除操作确认框-->
      	<delprompt v-if='showDelprompt' :key="keys.dp"></delprompt>
      	<!--添加到歌单时弹出的歌单列表-->
      	<ejectsongsheet v-if='showEjectS' :key="keys.es"></ejectsongsheet>
      	<!--查看歌手时多个歌手选择框-->
      	<ejectchoosesinger v-if='showEjectC' :key="keys.ec"></ejectchoosesinger>
      	<!--点击去评论时确认播放歌曲-->
      	<comfirmPlay v-if='showComfirmP' :key="keys.cp"></comfirmPlay>
      </transition-group>
  </div>
</template>

<script>
import playTab from '@/publicComponents/playTab/playTab'
import playerList from '@/publicComponents/playerList/playerList'
import player from '@/page/player/player'
import blackbg from '@/publicComponents/blackbg/blackbg'
import singleoperation from '@/publicComponents/singleOperation/singleOperation'
import toast from '@/publicComponents/toast/toast'
import delprompt from '@/publicComponents/delPrompt/delPrompt'
import ejectsongsheet from '@/publicComponents/ejectSongSheet/ejectSongSheet'
import ejectchoosesinger from '@/publicComponents/ejectChooseSinger/ejectChooseSinger'
import comfirmPlay from '@/publicComponents/comfirmPlay/comfirmPlay'
import { mapState } from 'vuex'
export default {
	data(){
		return {
			players:"",
			//多个transition过渡的key
			keys:{
				pl:1,
				so:2,
				bb:3,
				t:4,
				dp:5,
				es:6,
				ec:7,
				cp:8
			}
		}
	},
	computed:mapState({
		playTab:state => state.publics.playTab ,
		player :state => state.publics.player,
		showPl :state => state.publics.showPl,
		showBg :state => state.publics.showBg,
		showSingle:state => state.publics.showSingle ,
		showDelprompt:state => state.publics.showDelprompt ,
		showToast:state => state.publics.showToast ,
		showEjectS:state => state.publics.showEjectS ,
		showEjectC:state => state.publics.showEjectC ,
		showComfirmP:state => state.publics.showComfirmP
	}),
	watch:{
		player:function(news,old){
			if(this.player){
				 this.players.style.top = 0 ;
			}else {
				 this.players.style.top = '100%';
			}
		},
		showToast:function(news,old){
			if(this.showToast){
				let that =this ;
				let timer = setTimeout(function(){
						that.$store.commit('changeShowToast',false);
				},1000);
			}
		},
	},
	methods:{
		
	},
	mounted(){
		this.players = document.getElementById('player');
	},
  components:{
  	playTab,
  	player,
  	playerList,
  	blackbg,
  	singleoperation,
  	delprompt,
  	toast,
  	ejectsongsheet,
  	ejectchoosesinger,
  	comfirmPlay
  }
}
</script>

<style>

</style>
