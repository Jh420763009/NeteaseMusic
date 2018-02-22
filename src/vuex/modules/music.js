import { apiGet } from '../../api/api'

const state = {
	id:"", 
	//歌曲播放状态
	playing:false,
	//歌曲播放的索引(作为比较的值要设定一个不可能出现的值)
	playingIdx:1000000,
	//歌单播放的中间比较的索引 (此处3个索引需要细看 很容易混乱)
	playingLIdx:1000000,
	//歌曲播放列表正在播放歌曲的索引
	playingZIdx:1000000,
	//播放的歌曲的信息
	musicMsg:{
		id:"",
		picUrl:"",
		ar:"",
		name:"",
	},
	//音乐url
	musicUrl:"",
	//音乐歌词
	musicLyric:"",
	//播放歌曲列表
	playerList:[],
	//歌单歌曲列表
	playList:[],
	//-------歌曲播放模式控制start
	//列表循环
	listLoop:true,
	//单曲循环
	singleLoop:false,
	//随机播放
	random:false,
	//-------歌曲播放模式控制end
	playingIdxs:10000000
};

const getters = {
	
};

const mutations = {
	saveMusicId(state,data){
		state.id = data ;
	},
	//----------------------------这一段多个idx提交会比较混乱
	savePlayingIdx(state,data){
		state.playingIdx = data ;
	},
	savePlayingLIdx(state,data){
		state.playingLIdx = data ;
		
	},
	savePlayingZIdx(state,data){
		state.playingZIdx = data ;
	},
	//------------------------------
	changePlaying(state,data){
		state.playing = data ;
	},
	saveMusicMsg(state,data){
		state.musicMsg.id = data.id ;
		state.musicMsg.name = data.name ;
		state.musicMsg.ar = data.ar ;
		state.musicMsg.picUrl = data.al.picUrl ;
	},
	saveMusicUrl(state,data){
		state.musicUrl = data ;
	},
	saveMusicLyric(state,data){
		state.musicLyric = JSON.stringify(data);
	},
	//保存歌曲列表
	savePlayerList(state,data){
		//先清空数组
		state.playerList = [] ;
		//填入
		data.forEach((item,idx)=>{
			state.playerList.push(item);
		})
	},
	//保存歌曲列表
	savePlayList(state,data){
		state.playList = [] ;
		data.forEach((item,idx)=>{
			state.playList.push(item);
		})
	},
	//按照index删除歌曲列表的各项
	delPlayerList(state,data){
		return state.playerList.splice(data,1);
	},
	//-------歌曲播放模式控制start
	//列表循环
	changeListLoop(state,data){
		state.listLoop = false ;
		state.random = false ;
		state.singleLoop = true ;
	},
	changeSingleLoop(state,data){
		state.listLoop = false ;
		state.random = true ;
		state.singleLoop = false;
	},
	changeRandom(state,data){
		state.listLoop = true ;
		state.random = false ;
		state.singleLoop = false;
	},
	//-------歌曲播放模式控制end
	handleNextPlay(state,data){
		/*console.log('执行循环')
		console.log(state.playerList)*/
		for(let i = 0 ; i < state.playerList.length ; i++){
			/*console.log(state.playerList[i].id);
			console.log(data.data.id);
			console.log(state.musicMsg.id);*/
			if(state.playerList[i].id == data.id && state.playerList[i].id != state.musicMsg.id){
				//如果歌单里面有同样的，就把同样的那一项删除
				state.playerList.splice(i,1);
				//同时如果是再前面，索引就要减去1
				if(state.playingLIdx > i){
					//如果不是列表的第一个
					state.playingLIdx -= 1 ;
				}
				//再添加一项进去
				state.playerList.splice(state.playingLIdx+1,0,data);
				break ;
			//如果下一首播放的是当前播放的歌曲 就什么都不足 ,终止循环
			}else if(data.id == state.musicMsg.id){
				break ;
			}else if(state.playerList[i].id != data.id && state.playerList[i].id != state.musicMsg.id){
				//如果已经循环到最后一位没有 同样的
				if(i == state.playerList.length-1){
					state.playerList.splice(state.playingLIdx+1,0,data);
					break;
				}
			}
		}
	},
	changePlayingIdxs(state,data){
		state.playingIdxs = data ;
	}
};

const actions = {
	asyncMusicId({commit},data){
		commit('saveMusicId',data);
	},
	//---------------------------------
	handlePlayingIdx({commit},data){
		commit('savePlayingLIdx',data);
	},
	handlePlayingLIdx({commit},data){
		//此处data表示idx
		for(let i = 0 ; i < state.playList.length;i++){
			if(state.playerList[data].id == state.playList[i].id ){
				commit('savePlayingZIdx',i);
				commit('changePlayingIdxs',i);
				break ;
			}else {
				//如果到最后一个都没找到  就改变index
				if(i == state.playerList.length-2){
					commit('savePlayingZIdx','xsh');
					commit('changePlayingIdxs','xsh');
				}
				
			}
		}
	},
	handlePlayingZIdx({commit},data){
		commit('savePlayingZIdx',data);
	},
	//---------------------------------
	//改变播放状态 
	handlePlaying({commit},data){
		commit('changePlaying',data);
	},
	//播放歌曲
	handlePlay({commit},data){
		//获取歌曲信息
		apiGet.songdetail.to('/song/detail',{
			ids:data
		})
		.then((res)=>{
			//保存歌曲歌手,封面,id,名字等--
			commit('saveMusicMsg',res.data.songs[0]);
		})
		//获取歌曲url
		apiGet.musicUrl.to('/music/url',{
			id:data
		})
		.then((res)=>{
			//保存url
			commit('saveMusicUrl',res.data.data[0].url);
			commit('changePlaying',true)
		})
		//获取歌词
		apiGet.lyric.to('/lyric',{
			id:data
		})
		.then((res)=>{
			if(res.data.lrc){
				//保存歌词
				commit('saveMusicLyric',res.data.lrc.lyric);
			}else {
				//找不到歌词就保存为空
				commit('saveMusicLyric',"");
			}
		})
	},
	handlePlayerList({commit},data){
		commit('savePlayerList',data);
		commit('savePlayList',data);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}
