import {apiGet} from '../../api/api'

const state = {
	//自己登录时候的id/uid
	uid:"",
	//用户id
	userId:"",
	//用户信息
	userMsg:"",
	//用户创建的歌单
	createSheet:[],
	//用户收藏的歌单
	collectSheet:[],
	//用户歌单
	userSheet:[],
	//用户喜欢的歌单
	myLike:[],
	//用户喜欢的歌单id
	myLikeId:"",
	//判断当前播放歌曲是否在用户的歌单(我喜欢的)里面
	like:false,
	//点击当前歌曲详细时传递的数据
	sendComment:{
		data:null,
		numbers:0
	},
	//---删除或添加歌曲到歌单区域state--------start
	//删除或添加歌单
	delMsg:{
		sheetId:"",
		songId:""
	},
	//从歌单删除歌曲或添加歌曲的状态，用来做监控用一旦改变就重新发送请求
	sheetState:0,
	//操作后提示框
	toastMsg:"",
	//---删除或添加歌曲到歌单区域state--------end
	//当前所在页面的歌曲数据列表
	playList:[],
	//最近播放条数
	playrecordNum:"",
	//用户歌单创建者的id
	creatorId:"",
	//歌手id
	singerId:"",
	//保存歌手信息 id name img 等
	singer:[],
	//保存歌手单曲
	singerSingle:[],
	//搜索关键词
	keyword:"周杰伦",
	//搜索类型
	searchType:1,
	//当前歌单的id(用来做比较让播放标志出现或消失)
	currentId:1000000,
	//存放评论区body当点击的歌曲不是当前正播放歌曲时，保存的id
	comfirmPlayMsg:[]
};

const getters = {
	
};

const mutations = {
	//保存uid
	saveUid(state,data){
		state.uid = data ;
	},
	//保存用户id
	saveUserId(state,data){
		state.userId = data ;
	},
	//保存用户信息
	saveUserMsg(state,data){
		state.userMsg = data ;
	},
	//保存用户创建的歌单
	saveCreateSheet(state,data){
		state.createSheet = data ;
	},
	//保存用户收藏的歌单
	saveCollectSheet(state,data){
		state.collectSheet = data ;
	},
	//保存用户歌单
	saveUserSheet(state,data){
		state.userSheet = data ;
		//保存自己喜欢的歌单的id
		state.myLikeId = data[0].id;
	},
	//保存歌单(我喜欢的)
	saveMyLike(state,data){
		state.myLike = data
	},
	//是否喜欢
	changeLike(state,data){
		state.like = data ;	
	},
	//保存最近播放条数
	savePlayRecord(state,data){
		state.playrecordNum = data ;
	},
	//保存点击单曲右侧列表icon时传递的数据
	saveSendComment(state,data){
		state.sendComment.data = data.data ;
		state.sendComment.numbers = data.numbers ;
	},
	//
	savePlayList(state,data){
		state.playList = data ;
	},
	//
	changeToastMsg(state,data){
		state.toastMsg = data ;
	},
	//--------删除歌曲操作区域----------------start
	//delMsg
	saveDelMsg(state,data){
		if(data.sheetId){
			state.delMsg.sheetId = data.sheetId ;
		}else if(data.songId){
			state.delMsg.songId = data.songId ;
		}
	},
	//改变歌单删除歌曲或添加歌曲的状态
	addsheetState(state){
		state.sheetState += 1 ;
	},
	//--------删除歌曲操作区域----------------end
	saveCreatorId(state,data){
		state.creatorId = data ;
	},
	//保存歌手id
	saveSingerId(state,data){
		state.singerId = data ;
	},
	//保存歌手信息
	saveSinger(state,data){
		state.singer.push(data) ;
	},
	//清除歌手信息
	clearSinger(state){
		state.singer = [];
	},
	//保存歌手单曲
	saveSingerSingle(state,data){
		state.singerSingle = data ;
	},
	//保存关键词
	saveKeyword(state,data){
		state.keyword = data ;
	},
	//保存搜索类型
	saveSearchType(state,data){
		state.searchType = data ;
	},
	saveCurrentId(state,data){
		state.currentId = data ;
	},
	saveComfirmPlayMsg(state,data){
		state.comfirmPlayMsg = data.map(function(item,idx,arr){
			return item ;
		})
	},
};

const actions = {
	//es6promise异步登录
	toLogin({commit},data){
		return new Promise((resolve, reject)=>{
			apiGet.login.to('/login/cellphone',{
				phone:data.user,
				password:data.psd
			})
			.then((res)=>{
				if(res.data.code !== 200){
					reject(res);
				}else {
					resolve(res);
				}
			})
		})
	},
	handleUserId({commit},data){
		return new Promise((resolve, reject)=>{
			commit('saveUserId',data);
			apiGet.user.to('/user/detail',{
				uid:data
			})
			.then((res)=>{
				if(res.data.code == 200){
					commit('saveUserMsg',res.data);
					resolve(res);
				}else{
					reject(res);
				}
			})
		})
	},
	//保存用户创建的歌单和收藏的歌单
	handleCreateCollect({commit},data){
		let createSheet = [] ;
		let collectSheet = [] ;
		let userSheet = [];
		apiGet.playlist.to('/user/playlist',{
			uid:data
		})
		.then((res)=>{
			//console.log(res.data.playlist)
			//for in 循环遍历所有的歌单 如果里面的userid不是当前的userid 则这个歌单就是收藏的歌单
			for(let i in res.data.playlist){
				if(res.data.playlist[i]["creator"].userId == data){							
					createSheet.push(res.data.playlist[i]);
					userSheet.push(res.data.playlist[i]);
				}else {
					collectSheet.push(res.data.playlist[i]);
				}
			}
			commit('saveCreateSheet',createSheet);
			commit('saveCollectSheet',collectSheet);
			console.log(userSheet);
			if(data == state.uid){
				//获取歌单(我喜欢的)
				apiGet.playListDetails.to('/playlist/detail',{
					id:userSheet[0].id
				})
				.then((res)=>{
					//保存歌单(我喜欢的)
					commit('saveMyLike',res.data.playlist.tracks);
				})
				commit('saveUserSheet',userSheet);
			}
		})
	},
	handleCreatorId({commit},data){
		commit('saveCreatorId',data);
	},
	handleSingerId({commit},data){
		commit('saveSingerId',data);
	},
	handleSinger({commit},data){
		commit('saveSinger',data);
	},
	handleSingerSingle({commit},data){
		commit('saveSingerSingle',data);
	},
	handleKeyword({commit},data){
		commit('saveKeyword',data);
	},
	handleSearchType({commit},data){
		commit('saveSearchType',data);
	},
};

export default {
	state,
	getters,
	mutations,
	actions
}
