<template>
<div id="singer-body">
	<div id="singerBodys" class="bg" :style="{backgroundImage:`url(${msg.picUrl})`}">
		<div>
			<i class="iconfont icon-geren"></i>个人主页
		</div>
		<div class="collect">
			<i class="iconfont icon-add"></i><!--<i class="iconfont icon-dui"></i>-->收藏
		</div>
	</div>
	<ul class="tap">
		<router-link to='/singer' tag='li' exact>
			热门
		</router-link>
		<router-link to='/singeralbum' tag='li'>
			专辑
		</router-link>
		<router-link to='/singermv' tag='li'>
			MV
		</router-link>
		<router-link to='/singermsg' tag='li'>
			歌手信息
		</router-link>
	</ul>
	
</div>
</template>

<script>
import { apiGet } from '@/api/api'
export default {
	data(){
		return {
			msg:[]
		}
	},
	watch:{
		id:{
			handler:function(old,news){
				console.log('监控后旧的值为'+old);
				//子组件点击之后改变值 当值改变时 就重新发起请求
				this.getMsg(this.id);
			},
			deep: true
		}
	},
	computed:{
		//歌手id
		id(){
			return this.$store.state.user.singerId ;
		}
	},
	methods:{
		getMsg(id){
			apiGet.singerSingle.to('/artists',{
				id:id
			})
			.then((res)=>{
				console.log(res.data)
				this.msg = res.data.artist ;
				this.$store.dispatch('handleSingerSingle',res.data.hotSongs);
				
				let len = res.data.artist.alias.length ;
				if(len == 0){
					this.$emit('update:sendName',{
						name:res.data.artist.name ,
						alias:""
					});
				}else if(len == 1){
					this.$emit('update:sendName',{
						name:res.data.artist.name ,
						alias:res.data.artist.alias[0]
					});
				}
				
			})
		}
	},
	mounted(){
		if(this.id){
			this.getMsg(this.id);
		}
	}
}
</script>

<style>
</style>