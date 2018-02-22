<template>
<!--歌单详情-->
<div id="sheetDetails">
	<csheetdetailsheader :tName='tName' ></csheetdetailsheader>
	<div v-if='!loading'>
		<csheetdetailsbody :msg='msg'></csheetdetailsbody>
		<csheetdetailsfooter :playlist='playlist'></csheetdetailsfooter>
	</div>
	<loading v-if='loading'></loading>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import csheetdetailsheader from '@/components/sheetDetailsHeader/sheetDetailsHeader.vue'
import csheetdetailsbody from '@/components/sheetDetailsBody/sheetDetailsBody.vue'
import csheetdetailsfooter from '@/components/sheetDetailsFooter/sheetDetailsFooter.vue'
import loading from '@/publicComponents/loading/loading'
export default {
	data(){
		return {
			msg:"",
			playlist:[],
			toastMsg:"",
			comments:"",
			loading:true,
			//保存顶部固定栏的高度
			hHeight:"",
			//保存组件body的高度
			cHeight:"",
			//保存歌单或专辑名字传给header组件
			tName:{
				name:'歌单',
				bgUrl:"",
				arrive:false
			},
			sheetId:""
		}
	},
	watch:{
		showtoast:{
			handler:function(old,news){
				let that = this ;
				let timer = setTimeout(function(){
					that.showtoast = false ;
				},2000)
			},
			deep: true
		},
	},
	methods:{
		//滑动到最顶部固定
		loadTop(){
			//获取顶部高度
			//取网页卷上去的高度		
			let st=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
			if((this.cHeight - this.hHeight) < st+100){
				this.tName.name = this.msg.name ;
				this.tName.bgUrl = this.msg.coverImgUrl ;
			}else {
				this.tName.name = '歌单' ;
			}
			if((this.cHeight - this.hHeight) <= st){
				this.tName.arrive = true ;
			}else {
				this.tName.arrive = false ;	
			}
		},
		getPlaylist(id){
			apiGet.playListDetails.to('/playlist/detail',{
				id:id
			})
			.then((res)=>{
				this.msg = res.data.playlist ;
				this.$store.commit('savePlayList',res.data.playlist.tracks);
				this.playlist = res.data.playlist.tracks ;
				console.log(this.playlist);
				this.loading = false ;
				//保存创建者id  为的是来对比底部栏信息的创建者 来显示或隐藏删除按钮
				this.$store.dispatch('handleCreatorId',this.msg.creator.userId);
			})
		},
	},
	mounted(){
		this.sheetId = this.$route.query.id;
		//保存sheetId
		this.$store.commit('saveDelMsg',{
			sheetId:this.sheetId ,
			songId:""
		})
		if(this.sheetId){
			this.getPlaylist(this.sheetId);
		}
		window.addEventListener('scroll',this.loadTop);	
	},
	updated(){
		let sh = document.getElementById('sheetdetails-header');
		let sb = document.getElementById('sheetDetails-body');
		if(sh){
			this.hHeight = document.getElementById('sheetdetails-header').offsetHeight ;
		}
		if(sb){
			this.cHeight = document.getElementById('sheetDetails-body').offsetHeight ;
		}
	},
	destroyed(){
		window.removeEventListener('scroll',this.loadTop);
	},
	components:{
		csheetdetailsheader,
		csheetdetailsbody,
		csheetdetailsfooter,
		blackbg,
		loading
	}
}
</script>

<style>
</style>