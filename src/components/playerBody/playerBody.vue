<template>
<div id="player-body">
	<div class="bg" :style="{backgroundImage:`url(${musicMsg.picUrl})`}"></div>
	<audio id='audio' autoplay="autoplay" ref='player' >
		<source :src="musicUrl"></source>
	</audio>
	<div class="volume-lyric" ref='volumeLyric'>
		<div class="content">
			<transition-group name='opacity' >
				<div :key='keys.div1' class="volume" v-show='show' @click.stop='showCenter'>
					<div class="volume-top" @touchstart.stop='forwardBackV($event)' ref='volume'>
						<div><i class="iconfont icon-yinliang"></i></div>
						<div ref='progressV' @touchstart='forwardBackV($event)' >
							<div ref='probgV' class="progressbg"></div>
							<div ref='speedV' class="speed"></div>
							<div
								ref='dragV'
								class="drag"
								@touchstart.stop='startThereV($event)'
								@touchmove.stop='moveThereV($event)'
								@touchend.stop='inThereV($event)'
							></div>
						</div>
					</div>
					<div class="volume-bottom" ref='lyricBox'>
						<!--歌词区域-->
						<ul 
							@touchstart.stop='startLyric($event)'
							@touchmove.stop='moveLyric($event)'
							@touchend.stop='endLyric($event)'
							ref='lyric'
						>
							<li v-if='lyricIdx === "noScorll"'>*该歌词不支持自动滚动*</li>
							<li v-if='lyricIdx === "none"'>没有找到歌词哦</li>
							<li :class='{"active":lyricIdx == index}' v-for='(item,index) in lyricText'>{{ item }}</li>
						</ul>
					</div>
				</div>
				<div :key='keys.div2' class="lyric" v-show='!show' @click.stop='showCenter'>
					<div class="needlebox">
						<img class="yuan" src="../../assets/img/player/yuan.png">
						<img ref='needle' class="needle" src="../../assets/img/player/needle.png">
					</div>
					<div class="record-box">
						<div>
							<img ref='record' class="record" src="../../assets/img/player/record.png">
							<img ref='albumbg' class="albumbg" :src="musicMsg.picUrl" />
						</div>
					</div>
					<div class="menu">
						<ul>
							<li>
								<i @click.stop='collectIt' :class='like?"like":"notLike"' class="iconfont icon-shoucang"></i>
							</li>
							<li>
								<i class="iconfont icon-xiazai2"></i>
							</li>
							<li>
								<i class="iconfont icon-comment"></i>
							</li>
							<li>
								<i @click.stop='showSingle' class="iconfont icon-fengexianICONCopy"></i>
							</li>
						</ul>
					</div>
				</div>
			</transition-group>
		</div>
	</div>
	<div class="handle-play">
		<div class="volume" >
			<div>{{ cTime | getSeconds }}</div>
			<div ref='progress' @touchstart='forwardBack($event)' >
				<div ref='probg' class="progressbg" ></div>
				<div ref='speed' class="speed"></div>
				<div
					ref='drag'
					class="drag"
					@touchstart.stop='startThere($event)'
					@touchmove.stop='moveThere($event)'
					@touchend.stop='inThere($event)'
					></div>
			</div>
			<div>{{ dTime | getSeconds }}</div>
		</div>
		<div class="play">
			<div class="mode">
				<i v-if='listLoop' @click='changeModuleList' class="iconfont icon-icon-1"></i>
				<i v-if='singleLoop' @click='changeModuleSingle' class="iconfont icon-icon-"></i>
				<i v-if='random' @click='changeModuleRandom' class="iconfont icon-icon-2"></i>
			</div>
			<ul>
				<li @click='prev'>
					<i class="iconfont icon-back"></i>
				</li>
				<li>
					<i @click='play' v-if='!playing' class="iconfont icon-play"></i>
					<i @click='pause' v-if='playing' class="iconfont icon-stop"></i>
				</li>
				<li @click='next'>
					<i class="iconfont icon-next"></i>
				</li>
			</ul>
			<div class="modes">
				<i @click.stop='showList' class="iconfont icon-list"></i>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { apiGet } from '@/api/api'
export default {
	data(){
		return {
			show:true,   //显示歌词或者唱盘 
			cTime: null,  //正在播放的时间
			dTime: null,  //歌曲的全部时长
			//到这是下面音乐进度条的变量  
			drag:null,   //存储进度圆点对象
			speed:null,  //存储播放进度对象
			probg:0,	 //存储播放进度条背景对象
			speedLeft:0,  //存储播放进度对象的offsetLeft值
			dragWidth:0,	//存储进度圆点对象的宽度
			progressLeft:0,  //存储整个进度条div的offsetLeft值
			//到这是下面音量进度条的变量   具体同上注释
			dragV:null,
			speedV:null,
			probgV:0,
			speedLeftV:0,
			dragWidthV:0,
			progressLeftV:0,
			volume:0,
			keys:{    //多个对象过渡的不同key值
				div1:"div1",
				div2:"div2"
			},
			//歌词变量区域    
			lyricText:null ,  //存储处理后的歌词文本
			lyricTime:null ,   //存储处理后的歌词时间
			lyricTop:0,     // 存储ref='lyrics'的ul的offsetTop
			lyricTopOnces:0 ,	// 存储ref='lyrics'的ul的offsetTop,只存储一次
			volumeLyricTop:0,   //存储ref='volumeLyric'的offsetTop
			setTop: 0 ,       //存储ref='lyrics'的ul的offsetTop,只存储一次,重置高度时候用
			lyric:null,		//存储整个歌词对象
			lyricH:null ,    //存储整个歌词对象的高度
			lyricLi:null,   //存储整个歌词对象下面的li
			lyricIdx:0  ,   // 存储响应歌词的class的index
			distance:0 ,   //存储上一段的距离
			max:0,			// 歌词可拖动的最大距离
			scollDistance:0, //存储滚动距离,
			inEvent:true   //是否正在事件中
		}
	},
	computed:mapState({
		 //判断是否在播放  控制播放或者暂停
		playing:state => state.music.playing ,
		musicMsg:state => state.music.musicMsg,
		musicUrl:state => state.music.musicUrl,
		lyricOrigin:state => state.music.musicLyric, //存储原始歌词，
		playerList:state => state.music.playerList,
		playingZIdx:state => state.music.playingZIdx,
		playingLIdx:state => state.music.playingLIdx,
		//列表循环
		listLoop:state => state.music.listLoop,
		//单曲循环
		singleLoop:state => state.music.singleLoop,
		//随机播放
		random:state => state.music.random,
		//用户歌单  我喜欢的
		myLike:state => state.user.myLike,
		//判断当前播放歌曲是否在用户的歌单(我喜欢的)里面
		like:state => state.user.like,
		//用户歌单  我喜欢的 的id值
		myLikeId:state => state.user.myLikeId
	}),
	watch:{
		//当音频变化时就重新加载音乐
		musicUrl:function(news,old){
			this.$refs.player.load();
		},
		//监控播放时间变化 进度条和圆点也随之变化 
		cTime:function(news,old){
			this.speed.style.width = (news/this.dTime)*this.probg + 'px' ;
			this.drag.style.left = (news/this.dTime)*this.probg - this.dragWidth/2 + 'px' ;
		},
		volume:function(news,old){
			this.speedV.style.width = news * this.probgV + 'px' ;
			this.dragV.style.left =  news * this.probgV - this.dragWidthV/2 + 'px' ;
		},
		scollDistance:function(news,old){
			this.$refs.lyric.style.top = this.setTop - news + 'px'; 
		},
		playing:function(news,old){
			if(this.playing){
				this.$refs.player.play();
				//唱针移动
				this.$refs.needle.style.transform = 'rotate(26deg)' ;
				//唱盘转动
				this.$refs.record.style.animationPlayState = 'running';
				this.$refs.albumbg.style.animationPlayState = 'running';
				
			}else {
				this.$refs.player.pause();
				//唱针移动
				this.$refs.needle.style.transform = 'rotate(-2deg)' ;
				//唱盘停止
				this.$refs.record.style.animationPlayState = 'paused';
				this.$refs.albumbg.style.animationPlayState = 'paused';
			}
		},
		lyricOrigin:function(news,old){
			//一旦歌词改变  高度就变化
			this.$refs.lyric.style.top = this.setTop + 'px' ;
			//如果歌词存在 并且可以滚动 就存储进去
			if(this.lyricOrigin && this.lyricOrigin.indexOf('[') != -1){     //当有歌词且歌词可以滚动时

				this.lyricTime = this.lyricOrigin.match(/\[(.{5})/g).map(function(item,index,arr){
					return arr[index].slice(1);
				})
				this.lyricText = this.lyricOrigin.match(/\](.*?)\[/g).map(function(item,index,arr){
					return arr[index].slice(1,arr[index].length-1).replace(/\\n/,''); //.replace(/(\r\n)|(\n)/g,'');
				})
				//此处有bug最后一项没有获取到 暂时先加个空
				this.lyricText[this.lyricText.length] = "";
				
				//歌词区域相关存储
				//存储volumeLyric高度
				this.volumeLyricTop = this.$refs.volumeLyric.offsetTop ;
				this.volumeH = this.$refs.volume.clientHeight ;
				
				this.lyricTopOnces = this.lyric.offsetTop;
				
				if(this.lyric.getElementsByTagName('li').length){
					this.lyricLi = this.lyric.getElementsByTagName('li') ;
				}
				this.lyricH = this.lyric.clientHeight ;
				//改变歌词提示
				this.lyricIdx = "xxx";
			}else if(this.lyricOrigin && this.lyricOrigin != '""' && this.lyricOrigin.indexOf('[') == -1){   //当有歌词但是歌词无法滚动时
				
				this.lyricText = JSON.stringify(this.lyricOrigin).slice(3,this.lyricOrigin.length-1).split("\\n").map(function(item,index,arr){
					return item.replace(/\\/,"");
				})
				//如果没有时间的话就清空
				this.lyricTime = [] ;
				//当歌词是无法滚动的歌词时改变样式
				this.lyricIdx = "noScorll";
			}else if(this.lyricOrigin == '""'){   //没有歌词时
				//没有歌词全部清空
				this.lyricText = [];
				this.lyricTime = [] ;
				this.lyricIdx = "none";
			}
		},
		playingLIdx(news,old){
			this.getMsgs();
		},
		//当为空时就关闭播放组件
		playerList:function(news,old){
			if(this.playerList.length == 0){
				this.$refs.player.pause();
			}
		}
	},
	methods:{
		//查看歌曲信息
		showSingle(){
			//点击就出现列表和黑色背景
			this.$store.commit('changeSingle',true);
			this.$store.commit('changeShowBg',true);
			this.getMsgs();
		},
		//获取信息用于操作列表
		getMsgs(){
			/*console.log(this.playerList);
			console.log(this.playingZIdx);*/
			//console.log(this.playerList[this.playingLIdx]);
			apiGet.musiccomment.to('/comment/music',{
				id:this.playerList[this.playingLIdx].id
			})
			.then((res)=>{
				this.$store.commit('saveSendComment',{
					data : this.playerList[this.playingLIdx] ,
					numbers : res.data.total ,
				});
			})
		},
		//呼出播放列表
		showList(){
			this.$emit('update:showList',true);
		},
		showCenter(){
			this.show = !this.show ;
		},
		showList(){
			this.$store.commit('changeShowPl',true);
			this.$store.commit('changeShowBg',true);
		},
		//----------------------歌词滚动显示等---------------------------
		startLyric(ev){
			console.log('点击了歌词区域')
			const e = ev.changedTouches[0] ;
			this.lyricTop = this.lyric.offsetTop;
			this.distance = e.clientY ;
			//阻止歌词滚动
			this.inEvent = false ;
		},
		moveLyric(ev){
			this.lyric.style.transition = 'none';
			const e = ev.changedTouches[0] ;
			
			this.max = e.clientY - this.distance + this.lyricTop ;
			
			if(Math.abs(this.max) > this.lyric.clientHeight - 100){
				this.max = -(this.lyric.clientHeight - 100)  ;
			}else if(this.max > 300){
				this.max = 300 ;
			}
			this.lyric.style.top = this.max + 'px' ;
		},
		endLyric(ev){
			const e = ev.changedTouches[0] ;
			this.lyric.style.top =  this.max + 'px' ;
			this.lyric.style.transition = '.8s';
			this.inEvent = true ;
		},
		//----------------------音量高低调节-----------------------------
		//音量点击红色进度条后退
		forwardBackV(ev){
			const e = ev.changedTouches[0] ;
			this.$refs.player.volume = (e.pageX - this.progressLeftV)/this.probgV ;
			this.volume = this.$refs.player.volume ;
		},
		startThereV(ev){
			const e = ev.changedTouches[0] ;
		},
		moveThereV(ev){
			const e = ev.changedTouches[0] ;
			let limit = e.pageX - this.progressLeftV ;
			if(limit > this.probgV){
				limit = this.probgV ;
			}else if (limit < 0){
				limit = 0 ;
			}
			this.speedV.style.width = limit + 'px';
			this.dragV.style.left = limit - this.dragWidthV/2 + 'px';
			
			let val = limit/this.probgV ;
			if(val > 1){
				val = 1 ;
			}else if(val < 0){
				val = 0 ;
			}
			this.$refs.player.volume = val ;
			this.volume = val;
		},
		inThereV(ev){
			const e = ev.changedTouches[0] ;
			this.$refs.player.volume = (e.pageX - this.progressLeftV)/this.probgV ;
			this.volume = this.$refs.player.volume ;
		},
		//-----------------------音乐进度调节-------------------------------
		startThere(ev){
			const e = ev.changedTouches[0] ;
		},
		moveThere(ev){
			const e = ev.changedTouches[0] ;
			let limit = e.pageX - this.progressLeft ;
			if(limit > this.probg){
				limit = this.probg ;
			}else if (limit < 0){
				limit = 0 ;
			}
			this.speed.style.width = limit + 'px';
			this.drag.style.left = limit - this.dragWidth/2 + 'px';
		},
		inThere(ev){
			const e = ev.changedTouches[0] ;
			this.$refs.player.currentTime = (e.pageX - this.progressLeft)/this.probg * this.dTime ;
		},
		//前进后退
		forwardBack(ev){
			const e = ev.changedTouches[0] ;
			this.$refs.player.currentTime = (e.pageX - this.progressLeft)/this.probg * this.dTime ;
		},
		pause(){
			this.$store.dispatch('handlePlaying',false);
			this.$refs.player.pause();
			//唱针移动
			this.$refs.needle.style.transform = 'rotate(-2deg)' ;
			//唱盘停止
			this.$refs.record.style.animationPlayState = 'paused';
			this.$refs.albumbg.style.animationPlayState = 'paused';
		},
		play(){
			this.$store.dispatch('handlePlaying',true);
			this.$refs.player.play();
			//唱针移动
			this.$refs.needle.style.transform = 'rotate(26deg)' ;
			//唱盘转动
			this.$refs.record.style.animationPlayState = 'running';
			this.$refs.albumbg.style.animationPlayState = 'running';
		},
		removeEventListeners(){  
	        const self = this;  
	        self.$refs.player.removeEventListener('timeupdate', self.currentTime);  
	        self.$refs.player.removeEventListener('canplay', self.durationTime);
	        self.$refs.player.removeEventListener('ended', self.isEnd);
        },
		addEventListeners(){  
	        const self = this;  
	        self.$refs.player.addEventListener('timeupdate', self.currentTime); 
	        self.$refs.player.addEventListener('canplay', self.durationTime); 
	        self.$refs.player.addEventListener('ended', self.isEnd);
	    },
	    playModule(){
	    	//获取歌曲信息 ,歌曲文件等
			this.$store.dispatch('handlePlay',this.playerList[this.playingLIdx].id);
			//
			this.$store.dispatch('handlePlayingIdx',this.playingLIdx);
			this.$store.dispatch('handlePlayingLIdx',this.playingLIdx);
			this.$refs.player.load();
	    },
	    isEnd(){
	    	//如果是列表循环
	    	if(this.listLoop){
	    		//如果当前歌曲不是列表的最后一首
	    		if(this.playingLIdx != this.playerList.length-1){
	    			//把当前播放的index加1
	    			this.$store.commit('savePlayingLIdx',this.playingLIdx+1);
	    			this.playModule();
	    		}else {
	    			//是最后一首就变为第一首
	    			this.$store.commit('savePlayingLIdx',0);
	    			this.playModule();
	    		}
	    	//如果是单曲循环
	    	}else if(this.singleLoop){
	    		this.$refs.player.load();
	    	//如果是随机播放	
	    	}else if(this.random){
	    		let num = Math.floor(Math.random()*this.playerList.length);
	    		console.log(num);
	    		this.$store.commit('savePlayingLIdx',num);
	    		this.playModule();
	    	}
	    },
	    currentTime(){  
	        const self = this;  
	        self.cTime = parseInt(self.$refs.player.currentTime) ; 
	        //对比时间 这里调用自定义原型方法 getSeconds
	        if(self.lyricTime && self.lyricTime.length>0){
	        	for(var i = 0 ; i < self.lyricTime.length;i++){
	        	if(self.$getSeconds(self.cTime) == self.lyricTime[i]){
		        		//console.log('走到这'+self.lyricTime[i]);
		        		self.lyricIdx =  i ;
		        		if(self.lyric.getElementsByTagName('li').length){
							self.lyricLi = self.lyric.getElementsByTagName('li') ;
							//如果用户没有自己擅自拖动歌词  那么歌词就滚动
							if(this.inEvent){
								self.scollDistance = self.lyricLi[i].offsetTop ; 
							}
						}
		        	}
		        }
	        }    
      	}, 
	    durationTime(){  
	        const self = this;  
	        self.$store.dispatch('handlePlaying',true);
	        self.dTime = parseInt(self.$refs.player.duration) ; 
			//判断是否在歌单(我喜欢的)里面
	        self.$store.commit('changeLike',false);
	        self.myLike.forEach(function(item,index){
	        	if(item.id == self.musicMsg.id){
	        		self.$store.commit('changeLike',true);
	        	}
	        })
	        
	        this.audioAutoPlay('audio');
        },
        //将当前播放歌曲收藏到歌单(我收藏的)或者从里面删除
        collectIt(){
        	if(this.like){
        		//添加到歌单  登录没有用处  先暂存 后面再做
				apiGet.addordel.to('/playlist/tracks',{
					op:'del',
					pid:this.myLikeId,
					tracks:this.musicMsg.id
				})
				.then((res)=>{
					console.log(res)
					if(res.data.code == 200){
						this.$store.commit('changeLike',false);
					}	
				})
        	}else{
        		//从歌单删除 
				apiGet.addordel.to('/playlist/tracks',{
					op:'add',
					pid:this.myLikeId,
					tracks:this.musicMsg.id
				})
				.then((res)=>{
					console.log(res)
					if(res.data.code == 200){
						this.$store.commit('changeLike',true);
					}	
				})
        	}	
        },
        //上一首
        prev(){
       		//如果当前歌曲不是列表的最后一首
    		if(this.playingLIdx != 0){
    			//把当前播放的index加1
    			this.$store.commit('savePlayingLIdx',this.playingLIdx-1);
    			this.playModule();
    		}else {
    			//是最后一首就变为第一首
    			this.$store.commit('savePlayingLIdx',this.playerList.length-1);
    			this.playModule();
    		}
        },
        //下一首
        next(){
       		//如果当前歌曲不是列表的最后一首
    		if(this.playingLIdx != this.playerList.length-1){
    			//把当前播放的index加1
    			this.$store.commit('savePlayingLIdx',this.playingLIdx+1);
    			this.playModule();
    		}else {
    			//是最后一首就变为第一首
    			this.$store.commit('savePlayingLIdx',0);
    			this.playModule();
    		}
       },
        //从列表循环转换成单曲循环
		changeModuleList(){
			this.$store.commit('changeListLoop');
		},
		//从单曲循环转换成随机播放
		changeModuleSingle(){
			this.$store.commit('changeSingleLoop');
		},
		//从随机播放转换成列表循环
		changeModuleRandom(){
			this.$store.commit('changeRandom');
		},
		audioAutoPlay(id){
		    var audio = document.getElementById(id),
		        play = function(){
		        audio.play();
		        document.removeEventListener("touchstart",play, false);
		    };
		    audio.play();
		    document.addEventListener("WeixinJSBridgeReady", function () {//微信
		       play();
		    }, false);
		    document.addEventListener('YixinJSBridgeReady', function() {//易信
		              play();
		     }, false);
		    document.addEventListener("touchstart",play, false);
		},
	},
	mounted(){		
		//音乐变量 
		//获取进度条背景长度
		this.probg = this.$refs.probg.clientWidth ;
		//获取整个播放进度区域到左边浏览器窗口的距离
		this.progressLeft = this.$refs.progress.offsetLeft ;
		//获取进度条及其left值;
		this.speed = this.$refs.speed ;
		this.speedLeft = this.speed.offsetLeft ;
		//获取播放原点及其宽度;
		this.drag = this.$refs.drag ;
		this.dragWidth = this.drag.clientWidth ;
		
		//音量变量
		//获取进度条背景长度
		this.probgV = this.$refs.probgV.clientWidth ;
		//获取整个播放进度区域到左边浏览器窗口的距离
		this.progressLeftV = this.$refs.progressV.offsetLeft ;
		//获取进度条及其left值;
		this.speedV = this.$refs.speedV ;
		this.speedLeftV = this.speedV.offsetLeft ;
		//获取播放原点及其宽度;
		this.dragV = this.$refs.dragV ;
		this.dragWidthV = this.dragV.clientWidth ;
		//设置音量
		this.$refs.player.volume = .8 ;
		this.volume = this.$refs.player.volume ;
		
		//获取歌词区域的top值 切换歌曲重置top时候用
		this.lyric = this.$refs.lyric ;
		this.setTop = this.$refs.lyric.offsetTop;
		//此处因为v-show之后获取不到dom宽度 所以先获取再变成false来显示唱盘
		this.show = false ;
		//实行监听
		this.addEventListeners();	
	},
	destroyed() {  
      	this.removeEventListeners()  ;
    }  
}
</script>

<style>
</style>