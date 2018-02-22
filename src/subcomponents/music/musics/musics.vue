<template>
<div id="musics">
	<musicsbanner></musicsbanner>
	<musicsmenu></musicsmenu>
	<musicsrecommen></musicsrecommen>
</div>
</template>

<script>
import musicsbanner from '@/components/musicsBanner/musicsBanner'
import musicsmenu from '@/components/musicsMenu/musicsMenu'
import musicsrecommen from '@/components/musicsRecommen/musicsRecommen'
export default {
	components:{
		musicsbanner,
		musicsmenu,
		musicsrecommen
	}
}
</script>

<style>
</style>