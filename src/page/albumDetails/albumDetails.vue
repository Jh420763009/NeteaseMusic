<template>
<!--专辑详情-->
<div id="sheetDetails">
	<csheetdetailsheader :tName='tName' ></csheetdetailsheader>
	<div v-if='!loading'>
		<calbumdetailsbody :msg='msg'></calbumdetailsbody>
		<calbumdetailsfooter :playlist='playlist'></calbumdetailsfooter>
	</div>
	<loading v-if='loading'></loading>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import csheetdetailsheader from '@/components/sheetDetailsHeader/sheetDetailsHeader.vue'
import calbumdetailsbody from '@/components/albumDetailsBody/albumDetailsBody.vue'
import calbumdetailsfooter from '@/components/albumDetailsFooter/albumDetailsFooter.vue'
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
				name:'专辑',
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
			var st=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
			if((this.cHeight - this.hHeight) < st+100){
				this.tName.name = this.msg.name ;
				this.tName.bgUrl = this.msg.blurPicUrl ;
			}else {
				this.tName.name = '专辑' ;
			}
			
			if((this.cHeight - this.hHeight) <= st){
				this.tName.arrive = true ;
			}else {
				this.tName.arrive = false ;
			}
		},
		getPlaylist(id){
			apiGet.albumDetails.to('/album',{
				id:id
			})
			.then((res)=>{
				console.log(res.data)
				this.msg = res.data.album ;
				this.$store.commit('savePlayList',res.data.songs);
				this.playlist = res.data.songs ;
				this.loading = false ;
				//保存创建者id  为的是来对比底部栏信息的创建者 来显示或隐藏删除按钮
				this.$store.dispatch('handleCreatorId','');
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
		let sb = document.getElementById('albumDetails-body');
		if(sh){
			this.hHeight = document.getElementById('sheetdetails-header').offsetHeight ;
		}
		if(sb){
			this.cHeight = document.getElementById('albumDetails-body').offsetHeight ;
		}
		
	},
	destroyed(){
		window.removeEventListener('scroll',this.loadTop);
	},
	components:{
		csheetdetailsheader,
		calbumdetailsbody,
		calbumdetailsfooter,
		loading,

	}
}
</script>

<style>
</style>