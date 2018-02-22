<template>
<div id="list-tab">
	<ul>
		<li>
			<div><i class="iconfont icon-yinle wasin"></i></div>
			<div class="type">
				本地音乐<span>(330)</span>
			</div>
		</li>
		<router-link to='/playrecord' tag='li'>
			<div><i class="iconfont icon-bofang"></i></div>
			<div class="type">
				最近播放<span>({{ playRecord }})</span>
			</div>
		</router-link>
		<li>
			<div><i class="iconfont icon-xiazai"></i></div>
			<div class="type">
				下载管理<span>(330)</span>
			</div>
		</li>
		<li>
			<div><i class="iconfont icon-diantai"></i></div>
			<div class="type">
				我的电台<span>(330)</span>
			</div>
		</li>
		<li>
			<div><i class="iconfont icon-wodeshoucang"></i></div>
			<div class="type">
				我的收藏<span>(330)</span>
			</div>
		</li>
	</ul>
</div>
</template>

<script>
export default {
	props:['playRecord']
}
</script>

<style>
</style>