<template>
<div id="toast">
	{{ toastMsg }}
</div>
</template>

<script>
export default {
	computed:{
		toastMsg(){
			return this.$store.state.user.toastMsg;
		}
	},
	data(){
		return {
			
		}
	}
}
</script>

<style>
</style>