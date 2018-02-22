<template>
<!--精品歌单-->
<div id="highquality">
	<!--头部-->
	<highqualityheader 
		:type='type' 
		@update:showFilterHandle='showFilter'
	></highqualityheader>
	<!--body-->
	<highqualitybody 
		v-if='!loading' 
		:highQuality='highQuality'
	></highqualitybody>
	<!--弹出选择框-->
	<transition name='scroll'>
		<highqualityfilter 
			@update:sendTypeHandle='sendType' 
			@update:hideFilterHandle='hideFilter' 
			v-show='filter'
		></highqualityfilter>
	</transition>
	<loadingno v-if='loadingno'></loadingno>
	<loading v-if='loading'></loading>
	
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import highqualityheader from '@/components/highQualityHeader/highQualityHeader'
import highqualitybody from '@/components/highQualityBody/highQualityBody'
import highqualityfilter from '@/components/highQualityFilter/highQualityFilter'
import loading from '@/publicComponents/loading/loading'
import loadingb from '@/publicComponents/loadingb/loadingb'
import loadingno from '@/publicComponents/loadingno/loadingno'
export default {
	data(){
		return {
			filter:false,
			type:"全部",
			highQuality:[],
			loading:true,
			loadingno:false,
			limit:5
		}
	},
	watch:{
		type:{
			handler:function(old,news){
				//console.log('监控后旧的值为'+old);
				//子组件点击之后改变值 当值改变时 就重新发起请求
				this.limit = 5 ;
				this.getHighQuality();
			},
			deep: true
		}
	},
	methods:{
		showFilter(val){
			this.filter = val ;
		},
		hideFilter(val){
			this.filter = val ;
		},
		sendType(val){
			this.filter = val.state ;
			this.type = val.type ;
			this.loading = val.loading ;
			this.loadingno = !val.loading ;
			/*console.log('this.loadingno修改后:'+this.loadingno);
			console.log('this.type修改后:'+this.type);*/
		},
		//获取精品歌单
		getHighQuality(){
			apiGet.highquality.to('/top/playlist/highquality',{
				limit:this.limit,
				cat:this.type
			})
			.then((res)=>{
				//如果取得的数量小于所要取的数量 那么这个东西就没有 反之继续取
				if(this.limit > res.data.total){
					window.removeEventListener('scroll',this.loadMore);
					this.loadingno = true ;
				}else {
					window.addEventListener('scroll',this.loadMore);
					this.loadMore();
				}
				this.loading = false ;
				this.highQuality = res.data.playlists ;
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
			if((st+ch)>=sh-1){
				//到底部就加载 
				this.limit += 5 ;
				console.log('limit的值为:'+this.limit)
				this.getHighQuality();
			}
		}
	},
	mounted(){
		this.getHighQuality();
		
		//滑动加载更多
		window.addEventListener('scroll',this.loadMore);
	},
	destroyed(){
		//离开页面时移除loadMore
		window.removeEventListener('scroll',this.loadMore);
	},
	components:{
		highqualityheader,
		highqualitybody,
		highqualityfilter,
		loading,
		loadingb,
		loadingno
	}
}
</script>

<style>
</style>