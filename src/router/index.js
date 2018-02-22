import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
//	linkExactActiveClass: "v-link", 
	linkActiveClass: "v-link", 
	mode:'history',
	routes: [
	  {
	    path: '/home',
	    component: r => require(['@/page/home/home.vue'],r),
	    children:[
	    	{
	    		path: '/',
	    		component: r => require(['@/views/list/list.vue'],r),
	    		meta:{ index : 1 }
	    	},
	    	{
	    		path: '/dynamic',
	    		component: r => require(['@/views/dynamic/dynamic.vue'],r),
	    		meta:{ index : 3 }
	    	},
	    	{
	    		path: '/music',
	    		component: r => require(['@/views/music/music.vue'],r),
	    		meta:{ index : 2 },
	    		children:[
			    	{
			    		path: '',
			    		component: r => require(['@/subcomponents/music/musics/musics.vue'],r),
			    		meta:{ index : 2 }
			    	},
			    	{
			    		path: 'videos',
			    		component: r => require(['@/subcomponents/music/videos/videos.vue'],r),
			    		meta:{ index : 5 }
			    	},
			    	{
			    		path: 'radios',
			    		component: r => require(['@/subcomponents/music/radios/radios.vue'],r),
			    		meta:{ index : 6 },
			    		
			    	}
			    ]
	    	}
	    ]
	  },
	  {
	    path: '/',
	    component: r => require(['@/page/login/login.vue'],r)
	  },
	  {
	    path: '/highquality',
	    component: r => require(['@/page/highQuality/highQuality.vue'],r)
	  },
	  {
	    path: '/rankinglist',
	    component: r => require(['@/page/rankingList/rankingList.vue'],r)
	  },
	  {
	    path: '/comment',
	    component: r => require(['@/page/comment/comment.vue'],r)
	  },
	  {
	    path: '/songsheetcomment',
	    component: r => require(['@/page/songSheetComment/songSheetComment.vue'],r)
	  },
	  {
	    path: '/playrecord',
	    component: r => require(['@/page/playRecord/playRecord.vue'],r)
	  },
	  {
	    path: '/sheetdetails',
	    component: r => require(['@/page/sheetDetails/sheetDetails.vue'],r)
	  },
	  {
	    path: '/albumdetails',
	    component: r => require(['@/page/albumDetails/albumDetails.vue'],r)
	  },
	  {
	    path: '/albumcomment',
	    component: r => require(['@/page/albumComment/albumComment.vue'],r)
	  },
	  {
	    path: '/search',
	    component: r => require(['@/page/search/search.vue'],r),
	    children:[
	    	{
	    		path:'/',
	    		component: r => require(['@/subcomponents/search/searchSingle/searchSingle.vue'],r),
	    		meta:{ index : 1 }
	    	},
	    	{
	    		path:'/searchalbum',
	    		component: r => require(['@/subcomponents/search/searchAlbum/searchAlbum.vue'],r),
	    		meta:{ index : 3 }
	    	},
	    	{
	    		path:'/searchmv',
	    		component: r => require(['@/subcomponents/search/searchMV/searchMV.vue'],r),
	    		meta:{ index : 5 }
	    	},
	    	{
	    		path:'/searchradio',
	    		component: r => require(['@/subcomponents/search/searchRadio/searchRadio.vue'],r),
	    		meta:{ index : 6 }
	    	},
	    	{
	    		path:'/searchsheet',
	    		component: r => require(['@/subcomponents/search/searchSheet/searchSheet.vue'],r),
	    		meta:{ index : 4 }
	    	},
	    	{
	    		path:'/searchsinger',
	    		component: r => require(['@/subcomponents/search/searchSinger/searchSinger.vue'],r),
	    		meta:{ index : 2 }
	    	},
	    	{
	    		path:'/searchuser',
	    		component: r => require(['@/subcomponents/search/searchUser/searchUser.vue'],r),
	    		meta:{ index : 7 }
	    	}
	    ]
	  },
	  {
	    path: '/user',
	    component: r => require(['@/page/user/user.vue'],r),
	    children:[
	    	{
	    		path: '/',
	    		component: r => require(['@/components/userSheet/userSheet.vue'],r),
	    		meta:{ index : 1 }
	    	},
	    	{
	    		path: '/usernews',
	    		component: r => require(['@/components/userNews/userNews.vue'],r),
	    		meta:{ index : 2 }
	    	},
	    	{
	    		path: '/aboutuser',
	    		component: r => require(['@/components/aboutUser/aboutUser.vue'],r),
	    		meta:{ index : 3 }
	    	}
	    ]
	  },
	  {
	    path: '/singer',
	    component: r => require(['@/page/singer/singer.vue'],r),
	    children:[
	    	{
	    		path: '/',
	    		component: r => require(['@/subcomponents/singer/singerSingle/singerSingle.vue'],r),
	    		meta:{ index : 1 }
	    	},
	    	{
	    		path: '/singeralbum',
	    		component: r => require(['@/subcomponents/singer/singerAlbum/singerAlbum.vue'],r),
	    		meta:{ index : 2 }
	    	},
	    	{
	    		path: '/singermv',
	    		component: r => require(['@/subcomponents/singer/singerMV/singerMV.vue'],r),
	    		meta:{ index : 3 }
	    	},
	    	{
	    		path: '/singermsg',
	    		component: r => require(['@/subcomponents/singer/singerMsg/singerMsg.vue'],r),
	    		meta:{ index : 4 }
	    	}
	    ]
	  },
	  {
	  	//每日推荐
	  	path: '/dayreommon',
	    component: r => require(['@/page/dayRecommon/dayRecommon.vue'],r),
	  },
	]
})
