<template>
<div id="player" ref='player'>
	<playerheader></playerheader>
	<playerbody></playerbody>
</div>
</template>

<script>
import playerheader from '@/components/playerHeader/playerHeader'
import playerbody from '@/components/playerBody/playerBody'
//import playerfooter from '@/components/playerFooter/playerFooter'
export default {
	components:{
		playerheader,
		playerbody,
	}
}
</script>

<style>
</style>