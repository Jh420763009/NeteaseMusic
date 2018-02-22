import { apiGet } from '../../api/api'

//控制公共组件的页面
const state = {
	//展示底部列表栏 (可查看评论的列表栏)
	showSingle:false,
	//展示播放器
	player:false,
	//展示playtab
	playTab:false ,
	//展示播放列表
	showPl:false,
	//展示是否删除提示框
	showDelprompt:false,
	//删除完成后的提示toast
	showToast:false,
	//展示黑色背景
	showBg:false,
	//展示收藏到歌单 用户创建的歌单
	showEjectS:false,
	//展示多个歌手时的歌手列表
	showEjectC:false,
	//展示确认播放歌曲框
	showComfirmP:false
};

const getters = {
	
};

const mutations = {
	changeSingle(state,data){
		state.showSingle = data ;
	},
	changeShowPl(state,data){
		state.showPl = data ;
	},
	changeShowBg(state,data){
		state.showBg = data ;
	},
	changeComfirmP(state,data){
		state.showComfirmP = data ;
	},
	saveMusicId(state,data){
		state.id = data ;
	},
	changeShowDelprompt(state,data){
		state.showDelprompt = data ;
	},
	changeShowToast(state,data){
		state.showToast = data ;
	},
	//展示playtab
	showPlayTab(state,data){
		state.playTab = data ;
	},
	showPlayer(state,data){
		state.player = data ;
	},
	changeShowEjectS(state,data){
		state.showEjectS = data ;
	},
	changeShowEjectC(state,data){
		state.showEjectC = data ;
	},
};

const actions = {
	
};

export default {
	state,
	getters,
	mutations,
	actions
}
