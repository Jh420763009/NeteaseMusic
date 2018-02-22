<template>
<div class="login-box">
	<div class="username">
		<span><i class="iconfont icon-icoyonghuming"></i></span>
		<input type="text" placeholder="请输入手机号" v-model='user' />
	</div>
	<div class="password">
		<span><i class="iconfont icon-icomima"></i></span>
		<span @click='showPsd'><i :class="changeType?'showpassword':'hidepassword'" class="iconfont icon-yanjing"></i></span>
		<input ref='psd' type="password" placeholder="请输入密码" v-model="psd" />
	</div>
	<div class="login">
		<input type="button" :value="BtnVal" @click='login'  />
	</div>
</div>
</template>

<script>
import { apiGet } from '@/api/api'
export default {
	data(){
		return {
			BtnVal:"登录",
			//存储账号
			user:"",
			//存储密码
			psd:"",
			changeType:true,
			
		}
	},
	methods:{
		login(){
			let that = this ;
			if(this.user == "" || this.psd == ""){
				this.$store.commit('changeShowToast',true);
				this.$store.commit('changeToastMsg','手机号或者密码为空');
			}else{
				this.$store.dispatch('toLogin',{
					user:this.user,
					psd:this.psd
				})
				.then((res)=>{
					console.log('登录成功');
					this.$local.save('user',{
						username : this.user ,
						password : this.psd,
						waslogin : true,	
					});
					
					//保存uid
					this.$store.commit('saveUid',res.data.account.id);
					this.$router.push({
						path:'/home'
					})
				},(err)=>{
					this.$store.commit('changeShowToast',true);
					this.$store.commit('changeToastMsg','手机号或者密码错误');
				})
				
			}
			
		},
		showPsd(){
			if( this.$refs.psd.type === 'password' ){
				this.$refs.psd.type = 'text';
				this.changeType = false ;
			}else {
				this.$refs.psd.type = 'password' ;
				this.changeType = true ;
			}
		}
	},
	mounted(){
		if(this.$local.fetch('user')){
			let info = this.$local.fetch('user') ;
			this.user = info.username ;
			this.psd = info.password ;
		}
	},
	computed:{
		waslogin(){
			return this.$store.state.waslogin ;
		}
	}
}
</script>

<style>

</style>