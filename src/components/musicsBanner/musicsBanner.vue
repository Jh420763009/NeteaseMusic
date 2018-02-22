<template>
<div id="musicsBanner" ref='wrap'>
	<ul ref='list' class="list" @touchstart='touchstarts($event)' @touchmove='touchmoves($event)' @touchend='touchends($event)'>
		<li v-for='item in list'>
			<img :src="item.pic">
		</li>
	</ul>
	<nav ref='nav'>
		<a class="active"></a>
		<a></a>
		<a></a>
		<a></a>
		<a></a>
		<a></a>
	</nav>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
export default {
	data(){
		return {
			list:[],
			//disX首先保存点击时的坐标
			disX:0,
			ol:0,
			n:0,
			a:null,
			len:0,
			wrap:0,
			ul:null,
			li:null,
			num:0,
			timers:null,
			banner:false
		}
	},
	methods:{
		touchstarts(ev){
			clearInterval(this.timer1);
			var e = ev.changedTouches[0] ;
			this.disX = e.pageX ;
			
			//点击时阻止transition
			this.ul.style.transition = 'none' ;
			
			if(this.num == 0 ){
				this.num = this.a.length ;
				this.ul.style.left = -this.num * this.wrap + 'px' ;
			}
			if( -this.num == this.len-1){
				this.num = this.a.length-1 ;
				this.ul.style.left = -this.num * this.wrap + 'px' ;
			}
			
			//这个必须写在这  不知道为什么
			this.ol = this.ul.offsetLeft ;
		},
		touchmoves(ev){
			clearInterval(this.timer1);
			var e = ev.changedTouches[0] ;
			this.ul.style.left = (e.pageX - this.disX) + this.ol + 'px' ;
		},
		touchends(ev){
			var e = ev.changedTouches[0] ;
			this.ol = this.ul.offsetLeft ;
			this.num = Math.round(this.ol/this.wrap)  ;
			this.ul.style.transition = '1s' ;
			this.ul.style.left = this.num * this.wrap + 'px' ;
			
			this.a[this.n].className = 'none';
			this.a[-this.num%this.a.length].className = 'active';
			this.n = -this.num%this.a.length ;
			
			this.timer1 = setInterval(this.move,3000);
		},
		move(){
			let that = this ;
			//获取当前是第几张图片
			this.num = Math.abs(Math.round(this.ul.offsetLeft / this.wrap)) ;
			this.num++;
			//console.log(this.num)
			this.a[this.n].className = '';
			this.a[this.num%this.a.length].className = 'active';
			this.n = this.num%this.a.length ;
			
			if( this.num == this.len-1){
				this.banner = true ;
			}
			
			if( this.num == 0 ){
				this.num = this.a.length ;
			}
			
			this.ul.style.transition = '.8s' ;
			this.ul.style.left = -this.num * this.wrap + 'px';
			
			if(this.banner){
				setTimeout(function(){
					that.num = that.a.length-1 ;
					that.ul.style.transition = 'none' ;
					that.ul.style.left = -that.num * that.wrap + 'px';
					/*console.log('走进来');
					console.log('新的num值'+that.num)*/
					that.banner = false ;
				},700);
			}
		}
	},
	mounted(){
		apiGet.banner.to('/banner')
		.then((res)=>{
			this.list = res.data.banners;
		})
	},
	updated(){
		//获取banner框宽度
		this.wrap = document.documentElement.clientWidth || document.body.clientWidth;
		this.ul = this.$refs.list ;
		//再次添加图片 无缝滚动的思路
		this.ul.innerHTML += this.ul.innerHTML ;
		this.li = this.ul.querySelectorAll('li');
		this.a = this.$refs.nav.querySelectorAll("a");
		this.len = this.ul.children.length ;
		this.ul.style.width = this.len * this.wrap + 'px';
		
		//获取当前是第几页
		this.ol = this.ul.offsetLeft ;
		this.num = Math.round(this.ol/this.wrap)  ;
		
		this.timer1 = setInterval(this.move,3000);
	}
}
</script>

<style>
</style>