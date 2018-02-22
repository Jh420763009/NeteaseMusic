<template>
<div id="comment">
	<div v-if='!loading'>
		<commentheader :total='total'></commentheader>
		<commentbody :msg='msg'></commentbody>
		<commentfooter :total='total' :comments='comments' :hotComments='hotComments'></commentfooter>
		<loadingno v-if='loadingno'></loadingno>
		<loadingb v-if='loadingb'></loadingb>
	</div>
	<loading v-if='loading'></loading>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import commentheader from '@/components/commentHeader/commentHeader'
import commentbody from '@/components/commentBody/commentBody'
import commentfooter from '@/components/commentFooter/commentFooter'
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
			apiGet.musiccomment.to('/comment/music',{
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
			apiGet.songdetail.to('/song/detail',{
				ids:this.id
			})
			.then((res)=>{
				this.msg = res.data.songs ;
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
	beforeRouteEnter (to, from, next) {
	  next(vm => {
	  	console.log(from)
	    if(from.path == '/sheetdetails'){
	    	console.log(vm.$route.query.id)
	    }
	  })
	},
	components:{
		commentheader,
		commentbody,
		commentfooter,
		loadingb,
		loading,
		loadingno
	}
}
</script>

<style>
</style>