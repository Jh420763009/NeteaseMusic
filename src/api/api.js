import axios from './factory.js'

class apiConfig {
	constructor(){
		this.api = {} ;
		//账号密码登录
		this.api.login = {
			to:{ 'url':'/login/cellphone' }
		}
		//用户详情
		this.api.user = {
			to:{ 'url':'/user/detail' }
		}
		//登出 /login/refresh
		this.api.signout = {
			to:{ 'url':'/login/refresh' }
		}
		//播放记录 /user/record
		this.api.record = {
			to:{ 'url':'/user/record' }
		}
		//获取歌单 /user/playlist
		this.api.playlist = {
			to:{ 'url':'/user/playlist' }
		}
		//歌单评论 /comment/playlist?id=705123491
		this.api.songSheetComment = {
			to:{ 'url':'/comment/playlist' }
		}
		//歌单详情 /playlist/detail?id=24381616
		this.api.playListDetails = {
			to:{ 'url':'/playlist/detail' }
		}
		//专辑详情 /album?id=32311
		this.api.albumDetails = {
			to:{ 'url':'/album' }
		}
		//专辑评论 /comment/album?id=32311
		this.api.albumComment = {
			to:{ 'url':'/comment/album' }
		}
		//歌曲评论 /comment/music
		this.api.musiccomment = {
			to:{ 'url':'/comment/music' }
		}
		//歌曲详情/song/detail
		this.api.songdetail = {
			to:{ 'url':'/song/detail' }
		}
		//用户电台/user/dj
		this.api.userdj = {
			to:{ 'url':'/user/dj' }
		}
		//点赞/comment/like
		this.api.like = {
			to:{ 'url':'/comment/like' }
		}
		//获取每日推荐/recommend/songs
		this.api.recommendSong = {
			to:{ 'url':'/recommend/songs' }
		}
		//获取轮播图/banner
		this.api.banner = {
			to:{ 'url':'/banner' }
		}
		//推荐歌单
		this.api.recommonSheet = {
			to:{ 'url':'/personalized' }
		}
		//推荐新音乐
		this.api.newsong = {
			to:{ 'url':'/personalized/newsong' }
		}
		//推荐MV
		this.api.recommonMV = {
			to:{ 'url':'/personalized/mv' }
		}
		//推荐电台/personalized/djprogram
		this.api.recommonRadios = {
			to:{ 'url':'/personalized/djprogram' }
		}
		//独家放送personalized/privatecontent 
		this.api.privatecontent = {
			to:{ 'url':'personalized/privatecontent ' }
		}
		//获取精品歌单/top/playlist/highquality?limit=数量&cat='类型'
		this.api.highquality = {
			to:{ 'url':'/top/playlist/highquality' }
		}
		//排行榜/top/list
		this.api.rankingList = {
			to:{ 'url':'/top/list' }
		}
		//歌手榜/toplist/artist
		this.api.artist = {
			to:{ 'url':'/toplist/artist' }
		}
		///playlist/tracks添加歌曲到歌单或者从歌单删除歌曲
		this.api.addordel = {
			to:{ 'url':'/playlist/tracks' }
		}
		//获取歌手单曲/artists?id=6452
		this.api.singerSingle = {
			to:{ 'url':'/artists' }
		}
		//获取歌手专辑/artist/album?id=6452&limit=30
		this.api.singerAlbum = {
			to:{ 'url':'/artist/album' }
		}
		//获取歌手MV	/artist/mv?id=6452
		this.api.singerMV = {
			to:{ 'url':'/artist/mv' }
		}
		//获取歌手描述/artist/desc?id=6452
		this.api.singerDesc = {
			to:{ 'url':'/artist/desc' }
		}
		//获取相似歌手/simi/artist?id=6452
		this.api.simiSinger = {
			to:{ 'url':'/simi/artist' }
		}
		//查找/search?keywords=
		this.api.search = {
			to:{ 'url':'/search' }
		}
		//获取搜索的最佳匹配/search/multimatch?keywords=周杰伦
		this.api.bestMatch = {
			to:{ 'url':'/search/multimatch' }
		}
		//获取音乐url /music/url?id=33894312
		this.api.musicUrl = {
			to:{ 'url':'/music/url' }
		}
		//获取歌词/lyric?id=33894312
		this.api.lyric = {
			to:{ 'url':'/lyric' }
		}
	}
	
	apiget(){
		var all = this.api ;
		var fs = {};
		for(let i in all){
			fs[i] = {} ;
			for(let j in all[i]){
				fs[i][j] = (url,params) => {
					params = { params : params,time:new Date().getTime()} ;
					return axios.get(url,params) ;
				}
			}
		}
		return fs ;
	}
	
}

export const apiGet = new apiConfig().apiget();
