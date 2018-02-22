<template>
<div id="highquality-filter">
	<header>
		<span>选择你喜欢的分类</span>
		<i @click='hideFilter' class="iconfont icon-x"></i>
	</header>
	<div class="all">
		<div :class="{'wasselect':selectedAll}" @click="selectAll">
			全部歌单
			<i v-if='selectedAll'></i>
		</div>
	</div>
	<div class="type">
		<ul>
			<li :class='selected==index?"wasselect":""'  @click="select(index)" v-for='(item,index) in type'>{{ item }}<i v-if='selected==index?true:false'></i></li>
		</ul>
	</div>
</div>
</template>

<script>
export default {
	data(){
		return {
			type:['华语','欧美','韩语','日语','粤语','小语种','运动','ACG','影视原声','流行','摇滚','后摇','古风','民谣','轻音乐','电子','器乐','古典','说唱','爵士'],
			selected:false ,
			selectedAll:false,
		}
	},
	methods:{
		select(idx){
			this.selectedAll = false ;
			this.selected = idx ;
			this.$emit('update:sendTypeHandle',{
				type:this.type[idx],
				state:false,
				loading:true
			});
		},
		selectAll(){
			this.selectedAll = true ;
			this.selected = -1 ;
			this.$emit('update:sendTypeHandle',{
				type:'全部',
				state:false,
				loading:true
			});
		},
		hideFilter(){
			console.log('关闭filter');
			this.$emit('update:hideFilterHandle',false);
		}
	}
}
</script>

<style>
</style>