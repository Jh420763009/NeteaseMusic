<template>
<div id="comment-body" v-if='msg[0]' @click='showPlayer'>
	<img :src="msg[0].al.picUrl"/>
	<div class="msg">
		<p>{{ msg[0].name }}</p>
		<p>{{ msg[0].ar[0].name }}</p>
	</div>
	<div class="to">
		<i class="iconfont icon-dayuhao"></i>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props:['msg'],
	methods:{
		showPlayer(){
			console.log(this.musicMsg.name)
			console.log(this.msg[0].name)
			if(this.musicMsg.name != "" && this.msg[0].name == this.musicMsg.name){
				this.$store.commit('showPlayer',true);
			}else if(this.msg[0].name == this.musicMsg.name){
				console.log('什么都不走')
			}else {
				//保存信息
				this.$store.commit('saveComfirmPlayMsg',this.msg);
				//打开组件
				this.$store.commit('changeComfirmP',true);
				this.$store.commit('changeShowBg',true);
			}
			
		}
	},
	computed:mapState({
		musicMsg:state => state.music.musicMsg
	}),
	mounted(){
		console.log('this.msg出现')
		console.log(this.msg)
	}
}
</script>

<style>
</style>