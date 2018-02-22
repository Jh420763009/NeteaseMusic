<template>
<div id="musics-menu">
	<ul>
		<li>
			<div>
				<i class="iconfont icon-flyme_icon-2"></i>
			</div>
			<span>私人FM</span>
		</li>
		<router-link to='/dayreommon' tag='li'>
			<div>
				<i class="iconfont icon-tuijian"></i>
			</div>
			<span>每日推荐</span>
		</router-link>
		<router-link to='/highquality' tag='li'>
			<div>
				<i class="iconfont icon-flyme_icon-3"></i>
			</div>
			<span>精品歌单</span>
		</router-link>
		<router-link to='/rankinglist' tag='li'>
			<div>
				<i class="iconfont icon-paixing1"></i>
			</div>
			<span>排行榜</span>
		</router-link>
	</ul>
</div>
</template>

<script>
</script>

<style>
</style>