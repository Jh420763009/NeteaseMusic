<template>
<!--排行榜-->
<div id="rankinglist">
	<commonheader :headerMsg='headerMsg'></commonheader>
	<rankinglistbody :globals='globals' :official="official" :officialList="officialList" ></rankinglistbody>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
import commonheader from '@/publicComponents/commonHeader/commonHeader'
import rankinglistbody from '@/components/rankingListBody/rankingListBody'
import loading from '@/publicComponents/loading/loading'
export default {
	data(){
		return {
			headerMsg:"排行榜",
			official:[],
			officialList:[],
			globals:[]
		}
	},
	mounted(){
		//官方榜--------------------------------------->
		//获取云音乐飙升榜
		apiGet.rankingList.to('/top/list',{
			idx:3
		})
		.then((res)=>{
			this.official.push(res.data.playlist);
			//filter方法 筛选前3个数组
			let list = res.data.playlist.tracks.filter((val,index,arr)=>{
				return index < 3 ;
			})
			this.officialList.push(list);
		});
		//获取云音乐新歌榜
		apiGet.rankingList.to('/top/list',{
			idx:0
		})
		.then((res)=>{
			this.official.push(res.data.playlist);
			//filter方法 筛选前3个数组
			let list = res.data.playlist.tracks.filter((val,index,arr)=>{
				return index < 3 ;
			})
			this.officialList.push(list);
		});
		//获取云音乐原创榜
		apiGet.rankingList.to('/top/list',{
			idx:2
		})
		.then((res)=>{
			this.official.push(res.data.playlist);
			//filter方法 筛选前3个数组
			let list = res.data.playlist.tracks.filter((val,index,arr)=>{
				return index < 3 ;
			})
			this.officialList.push(list);
		});
		//获取云音乐热歌榜
		apiGet.rankingList.to('/top/list',{
			idx:1
		})
		.then((res)=>{
			this.official.push(res.data.playlist);
			//filter方法 筛选前3个数组
			let list = res.data.playlist.tracks.filter((val,index,arr)=>{
				return index < 3 ;
			})
			this.officialList.push(list);
		});
		//官方榜结束--------------------------------------->
		
		//全球榜------------------------------------------------------>
		//获取云音乐新电力榜
		apiGet.rankingList.to('/top/list',{
			idx:4
		})
		.then((res)=>{
			this.globals.push(res.data.playlist);
		});
		//获取云音乐嘻哈榜
		apiGet.rankingList.to('/top/list',{
			idx:23
		})
		.then((res)=>{
			this.globals.push(res.data.playlist);
		});
		//获取云音乐ACG音乐榜
		apiGet.rankingList.to('/top/list',{
			idx:22
		})
		.then((res)=>{
			this.globals.push(res.data.playlist);
		});
		//获取Beatport全球电子舞曲榜
		apiGet.rankingList.to('/top/list',{
			idx:21
		})
		.then((res)=>{
			this.globals.push(res.data.playlist);
		});
		//获取日本Oricon周榜
		apiGet.rankingList.to('/top/list',{
			idx:10
		})
		.then((res)=>{
			this.globals.push(res.data.playlist);
		});
		//获取法国 NRJ EuroHot 30周榜
		apiGet.rankingList.to('/top/list',{
			idx:19
		})
		.then((res)=>{
			this.globals.push(res.data.playlist);
		});
		//获取iTunes榜
		apiGet.rankingList.to('/top/list',{
			idx:8
		})
		.then((res)=>{
			this.globals.push(res.data.playlist);
		});
		//获取Hit FM Top榜
		apiGet.rankingList.to('/top/list',{
			idx:9
		})
		.then((res)=>{
			this.globals.push(res.data.playlist);
		});
		//获取KTV嗨榜
		apiGet.rankingList.to('/top/list',{
			idx:7
		})
		.then((res)=>{
			this.globals.push(res.data.playlist);
		});
		//台湾Hito排行榜
		apiGet.rankingList.to('/top/list',{
			idx:20
		})
		.then((res)=>{
			this.globals.push(res.data.playlist);
		});
		// 中国TOP排行榜(港台榜)
		apiGet.rankingList.to('/top/list',{
			idx:14
		})
		.then((res)=>{
			this.globals.push(res.data.playlist);
		});
		// 中国TOP排行榜(内地榜)
		apiGet.rankingList.to('/top/list',{
			idx:15
		})
		.then((res)=>{
			this.globals.push(res.data.playlist);
		});
		//香港电台中文歌曲龙虎榜
		apiGet.rankingList.to('/top/list',{
			idx:16
		})
		.then((res)=>{
			this.globals.push(res.data.playlist);
		});
	},
	components:{
		commonheader,
		rankinglistbody,
		loading
	}
}
</script>

<style>
</style>