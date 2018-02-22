<template>
<div id="search">
	<searchheader @update:sendVal='handleVal'></searchheader>
	<searchtap></searchtap>
	<transition name='opacity'>
	<searchsuggest v-if='suggest' :msg='keywords.msg' ></searchsuggest>
	</transition>
	<transition :name='trn'>
		<router-view 
			:lists='lists' 
			:bestMatch='bestMatch'  
			class='mainAnimate' 
		></router-view>
	</transition>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import { mapState } from 'vuex'
import searchheader from '@/components/searchHeader/searchHeader'
import searchsuggest from '@/components/searchSuggest/searchSuggest'
import searchtap from '@/components/searchTap/searchTap'
export default {
	data(){
		return {
			suggest:false ,
			trn:"",
			keywords:{
				msg:"",
				show:false
			},
			limit:16,
			lists:[],
			bestMatch:[]
		}
	},
	computed:mapState({
		keyword:state => state.user.keyword,
		type:state => state.user.searchType
	}),
	watch:{
		keyword:function(news,old){
			//子组件点击之后改变值 当值改变时 就重新发起请求
			console.log('旧的值为:'+old);
			console.log('新的值为:'+news);
			//一旦重新查找就重置limit数目 增驾监控
			this.limit = 16 ;
			window.addEventListener('scroll',this.loadMore);
			//请求数据
			this.getSingle(this.keyword,this.limit,this.type);
			this.getBest(this.keyword);
			this.suggest = false ;
		},
		type:function(news,old){
			this.limit = 16 ;
			window.addEventListener('scroll',this.loadMore);
			//请求数据
			console.log('新的type值是:'+this.type);
			this.getSingle(this.keyword,this.limit,this.type);
			this.getBest(this.keyword);
		}
	},
	methods:{
		//发起请求 获取搜索的单曲
		getSingle(val,limit,type){
			apiGet.search.to('/search',{
				limit:limit,
				keywords:val,
				type:type
			})
			.then((res)=>{
				if(res.data.result){
					//当搜索单曲时
					if(this.type == 1){
						this.lists = res.data.result.songs;
						if(this.limit > this.lists.length){
							//当所要的数量大于获得的数量就表示没有更多了  那就解除这个东西
							window.removeEventListener('scroll',this.loadMore);
						}
					//当搜索歌手时
					}else if(this.type == 100){
						this.lists = res.data.result.artists;
						if(this.limit > this.lists.length){
							window.removeEventListener('scroll',this.loadMore);
						}
					//当搜索专辑时
					}else if(this.type == 10){
						this.lists = res.data.result.albums;
						if(this.limit > this.lists.length){
							window.removeEventListener('scroll',this.loadMore);
						}
					//当搜索歌单时
					}else if(this.type == 1000){
						this.lists = res.data.result.playlists;
						if(this.limit > this.lists.length){
							window.removeEventListener('scroll',this.loadMore);
						}
					//当搜索mv时
					}else if(this.type == 1004){
						this.lists = res.data.result.mvs;
						if(this.limit > this.lists.length){
							window.removeEventListener('scroll',this.loadMore);
						}
					//当搜索用户时
					}else if(this.type == 1002){
						this.lists = res.data.result.userprofiles;
						if(this.limit > this.lists.length){
							window.removeEventListener('scroll',this.loadMore);
						}
					//当搜索电台时
					}else if(this.type == 1009){
						this.lists = res.data.result.djRadios;
						if(this.limit > this.lists.length){
							window.removeEventListener('scroll',this.loadMore);
						}
					}	
				}else {
					this.lists = [];
				}
				
			})
		},
		//获取最佳匹配
		getBest(val){
			apiGet.bestMatch.to('/search/multimatch',{
				keywords:val
			})
			.then((res)=>{
				console.log(res)
				if(res.data.result){
					this.bestMatch = res.data.result;
					//console.log(this.bestMatch);
				}else {
					this.bestMatch = [] ;
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
			if((st+ch)>=sh-1){
				console.log('到底了')
				//到底部就加载 
				this.limit += 10 ;
				this.getSingle(this.keyword,this.limit,this.type);
			}
		},
		handleVal(val){
			this.keywords.msg = val.msg ;
			this.suggest = val.show ;
		}
	},
	mounted(){
		this.getSingle(this.keyword,this.limit,this.type);
		this.getBest(this.keyword);
		
		//滑动加载更多
		window.addEventListener('scroll',this.loadMore);
	},
	destroyed(){
		//离开页面时移除loadMore
		window.removeEventListener('scroll',this.loadMore);
	},
	beforeRouteUpdate (to, from, next) {
    	if(to.meta.index < from.meta.index){
    		this.trn = 'to-left' ;
    	}else {
    		this.trn = 'to-right' ;
    	}
    	next();
  	},
	components:{
		searchheader,
		searchsuggest,
		searchtap,
	}
}
</script>

<style>
</style>