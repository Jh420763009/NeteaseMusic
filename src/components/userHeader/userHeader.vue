<template>
<div id="user-header">
	<div class="back" @click='back'>
		<i class="iconfont icon-fanhui"></i>
	</div>
	<div class="tap">
		{{ name }}
	</div>
	<!--<div class="clear">
		
	</div>-->
</div>
</template>

<script>
export default {
	props:['name'],
	methods:{
		back(){
			let params = this.$store.state.user.uid ;
			let login = this.$local.fetch('user').waslogin ;
			if(login){
				this.$router.push({
					path:'/home',
					query:params 
				})
			}
		}
	}
}
</script>

<style>
</style>