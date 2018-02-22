<template>
<!--歌单评论-->
<div id="comment">
	<div v-if='!loading'>
		<!--评论的的header和comment的header是通用的 所以使用comment的header-->
		<songsheetcommentheader :total='total'></songsheetcommentheader>
		<songsheetcommentbody :msg='msg'></songsheetcommentbody>
		<songsheetcommentfooter 
			:total='total' 
			:comments='comments' 
			:hotComments='hotComments'
		></songsheetcommentfooter>
		<loadingno v-if='loadingno'></loadingno>
		<loadingb v-if='loadingb'></loadingb>
	</div>
	<loading v-if='loading'></loading>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import songsheetcommentheader from '@/components/commentHeader/commentHeader'
import songsheetcommentbody from '@/components/songSheetCommentBody/songSheetCommentBody'
import songsheetcommentfooter from '@/components/songSheetCommentFooter/songSheetCommentFooter'
import loadingb from '@/publicComponents/loadingb/loadingb'
import loading from '@/publicComponents/loading/loading'
import loadingno from '@/publicComponents/loadingno/loadingno'
export default {
	data(){
		return {
			id:"",
			page:-1,
			comments:[],
			hotComments:[],
			total:0,
			msg:[],
			loadingno:false,
			loading:true,
			loadingb:false,
			limit:7
		}
	},
	methods:{
		loadComment(){
			//歌曲评论musiccomment.to
			apiGet.songSheetComment.to('/comment/playlist',{
				id:this.id,
				limit:this.limit
			})
			.then((res)=>{
				if(this.limit > res.data.total){
					window.removeEventListener('scroll',this.loadMore);
					this.loadingno = true ;
					this.loadingb = false ;
				}else {
					this.loadingno = false ;
					this.loadingb = true ;
					window.addEventListener('scroll',this.loadMore);
					this.loadMore();
				}
				this.loading = false ;
				this.comments = res.data.comments ;
				
				if(res.data.hotComments){
					this.hotComments = res.data.hotComments;
				}
				if(res.data.total){
					this.total = res.data.total ;
				}
			})
		},
		loadMore(){
			//取网页卷上去的高度
			var st=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
			//取网页中能看到高
			var ch=document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
			//取网页正文高，包含被卷上去的内容
			var sh=document.documentElement.scrollHeight?document.documentElement.scrollHeight:document.body.scrollHeight;
			//判断到达底部
			if(this.comments.length >= 7){
				//此处在chrome下有bug 所以减一
				if((st+ch)>=sh-1){
					this.limit += 5 ;
					//到底部就加载 
					console.log('到底了');
					this.loadComment();
				}
			}
			
		}
	},
	mounted(){
		this.id = this.$route.query.id ;
		if(this.id){
			this.loadComment();
			//歌曲信息songdetail.to
			apiGet.playListDetails.to('/playlist/detail',{
				id:this.id
			})
			.then((res)=>{
				console.log(res.data)
				this.msg = res.data.playlist ;
				this.loading = false ;
			})
		}
		//滑动加载更多
		window.addEventListener('scroll',this.loadMore);
	},
	destroyed(){
		//离开页面时移除loadMore
		window.removeEventListener('scroll',this.loadMore);
	},
	components:{
		songsheetcommentheader,
		songsheetcommentbody,
		songsheetcommentfooter,
		loadingb,
		loading,
		loadingno
	}
}
</script>

<style>
</style>