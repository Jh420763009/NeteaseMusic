<template>
<div id="rankinglist-body">
	<div class="content">
		<!--官方榜-->
		<div class="official">
			<p class="title">官方榜</p>
			<ul>
				<li v-for='(item,index) in official'>
					<div class="img">
						<img :src="item.coverImgUrl"/>
						<div>{{ item.updateTime | getUpdateTime }}</div>
					</div>
					<div class="msg">
						<p v-for='(list,index) in officialList[index]'>{{ index+1 }}.{{ list.name }} - {{ list.ar[0].name }}</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="global">
			<p class="title">全球榜</p>
			<ul>
				<li v-for='item in globals'>
					<div class="count">
						<div>{{ item.updateTime | getUpdateTime }}</div>
						<div class="bg"></div>
						<img :src="item.coverImgUrl">
					</div>
					<p class="msgs">{{ item.name }}</p>
				</li>
				
			</ul>
		</div>
	</div>
	
</div>
</template>

<script>
export default {
	props:['officialList','official','globals']
}
</script>

<style>
</style>