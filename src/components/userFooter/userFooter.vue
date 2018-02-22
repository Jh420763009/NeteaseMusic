<template>
<div id="user-tap">
	<ul class="tap">
		<router-link tag='li' to='/user'>
			音乐
		</router-link>
		<router-link tag='li' to='/usernews'>
			动态
		</router-link>
		<router-link tag='li' to='/aboutuser'>
			{{ aboutState }}
		</router-link>
	</ul>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data(){
		return {
			aboutState:"关于我"
		}
	},
	computed:mapState({
		uid:state => state.user.uid ,
		userId:state => state.user.userId
	}),
	mounted(){
		if(this.uid != this.userId){
			this.aboutState = '关于TA'
		}else {
			this.aboutState = '关于我';
		}
	}
}

</script>

<style>
</style>