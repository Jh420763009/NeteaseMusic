<template>
<!--查找用户-->
<div id="search-user" v-if='lists&&lists.length > 0'>
	<ul>
		<li @click="toUser(index)" v-for='(item,index) in lists'>
			<img :src="item.avatarUrl"/>
			<div class="music-user">
				<!--下面有信息的话就不显示 notSignature这个类-->
				<p :class='{"notMsg":!item.signature}'>{{ item.nickname }}
					<i v-if='item.gender == 1' class="iconfont icon-nanxing nan"></i>
					<i v-if='item.gender == 2' class="iconfont icon-nvxing nv"></i>
				</p> 
				<p class="msg" v-if='item.signature'>{{ item.signature }}</p>
			</div>
		</li>
	</ul>
	<div class="nofound" v-if='lists&&lists.length == 0'>未找到与"{{ keyword }}"相关的内容</div>
</div>
</template>

<script>
export default {
	props:['lists'],
	computed:{
		keyword(){
			return this.$store.state.user.keyword;
		}
	},
	methods:{
		toUser(idx){
			//获取id 异步提交请求  保存id 请求后获取用户信息
			this.$store.dispatch('handleUserId',this.lists[idx].userId)
			.then((res)=>{
			    this.$router.push('/user');
			},(err)=>{
			})
		}
	},
	beforeCreate(){
		this.$store.commit('saveSearchType',1002);
	}
}
</script>

<style>
</style>